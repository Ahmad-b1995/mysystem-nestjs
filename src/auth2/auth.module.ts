import { SmsService } from './../sms/sms/sms.service';
import { MailModule } from './../mail/mail.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptService } from './bcrypt.service';
import jwtConfig from '../common/config/jwt.config';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, SmsService],
  exports: [JwtModule],
})
export class AuthModule {}
