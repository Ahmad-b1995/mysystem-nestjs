import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, fullName: string, otp: number) {
    const templatesDir = join(
      __dirname,
      '../../src/mail/templates/confirm-email.ejs',
    );

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'تایید ایمیل',
        template: templatesDir,
        context: {
          fullName: fullName,
          otp,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
