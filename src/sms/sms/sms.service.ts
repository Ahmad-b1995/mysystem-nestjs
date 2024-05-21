import { Injectable } from '@nestjs/common';
import axios from 'axios';

const ENDPOINT = 'https://api.sms.ir';

@Injectable()
export class SmsService {

  async SendVerifyCode(
    mobile: string,
    otp: number,
    templateId: number = 100000,
  ) {
    return axios.post(
      `${ENDPOINT}/v1/send/verify/`,
      {
        mobile: mobile,
        templateId: templateId,
        parameters: [
          {
            name: 'code',
            value: otp.toString(),
          },
        ],
      },
      {
        headers: {
          'X-API-KEY': process.env.SMS_API_KEY,
          ACCEPT: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
