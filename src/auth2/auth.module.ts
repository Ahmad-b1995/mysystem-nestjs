import { SmsService } from './../sms/sms/sms.service';
import { MailModule } from './../mail/mail.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptService } from './bcrypt.service';
import { User } from '../users/entities/user.entity';
import jwtConfig from '../common/config/jwt.config';

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
