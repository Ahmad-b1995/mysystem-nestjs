import { User } from 'src/users/entities/user.entity';
import { SmsService } from './../sms/sms/sms.service';
import { isEmail } from 'validator';
import { MailService } from './../mail/mail.service';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import jwtConfig from '../common/config/jwt.config';
import { MysqlErrorCode } from '../common/enums/error-codes.enum';
import { ActiveUserData } from '../common/interfaces/active-user-data.interface';
import { RedisService } from '../redis/redis.service';
import { BcryptService } from './bcrypt.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  smsWebService!: any;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
    private readonly smsService: SmsService,
  ) {}

  async getOTP(signUpDto: SignUpDto): Promise<void> {
    const { emailOrPhonenumber, fullName } = signUpDto;
    const otp = await Math.floor(10000 + Math.random() * 90000);
    await this.redisService.delete(emailOrPhonenumber);
    await this.redisService.insert(emailOrPhonenumber, otp);
    if (isEmail(emailOrPhonenumber)) {
      await this.mailService.sendUserConfirmation(
        emailOrPhonenumber,
        fullName,
        otp,
      );
    } else {
      await this.smsService.SendVerifyCode(emailOrPhonenumber, otp);
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<{ accessToken: string }> {
    const { emailOrPhonenumber, password, fullName, otp } = signUpDto;
    const redisOtp = await this.redisService.get(emailOrPhonenumber);
    if (+redisOtp != otp) throw new ForbiddenException();
    await this.redisService.delete(emailOrPhonenumber);
    try {
      const user = new User();
      user.fullName = fullName;
      user.email = isEmail(emailOrPhonenumber) ? emailOrPhonenumber : null;
      user.phonenumber = isEmail(emailOrPhonenumber)
        ? null
        : emailOrPhonenumber;
      user.password = await this.bcryptService.hash(password);
      await this.userRepository.save(user);
      const accessToken = await this.generateAccessToken(user);
      return { ...user, accessToken };
    } catch (error) {
      if (error.code === MysqlErrorCode.UniqueViolation) {
        throw new ConflictException([
          `User [${emailOrPhonenumber}] already exist`,
        ]);
      }
      throw error;
    }
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { emailOrPhonenumber, password } = signInDto;
    const user = await this.userRepository.findOne({
      where: [
        {
          email: emailOrPhonenumber,
        },
        {
          phonenumber: emailOrPhonenumber,
        },
      ],
    });
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    const isPasswordMatch = await this.bcryptService.compare(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid password');
    }
    const accessToken = await this.generateAccessToken(user);
    return { ...user, accessToken };
  }

  async signOut(userId: string): Promise<void> {
    this.redisService.delete(`user-${userId}`);
  }

  async generateAccessToken(user: Partial<User>): Promise<string> {
    const tokenId = randomUUID();

    await this.redisService.insert(`user-${user.id}`, tokenId);
    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
        tokenId,
      } as ActiveUserData,
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return accessToken;
  }
}
