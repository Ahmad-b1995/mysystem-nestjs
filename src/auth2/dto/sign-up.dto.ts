import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { phone_or_email_regex } from 'src/regex/regex';

import { Match } from '../../common/decorators/match.decorator';

export class SignUpDto {
  @ApiProperty({
    description: 'full name of the user',
    example: 'david smith',
  })
  @IsNotEmpty()
  @MinLength(2)
  readonly fullName: string;

  @ApiProperty({
    example: 'atest@email.com or 09121111111',
    description: 'Email or phonenumber of the user',
  })
  @Matches(phone_or_email_regex, {
    message: 'contact info must be an email or a phone number',
  })
  @MaxLength(255)
  @IsNotEmpty()
  readonly emailOrPhonenumber: string;

  @ApiProperty({
    description: 'Password of user',
    example: 'Pass#123',
  })
  @MinLength(8, {
    message: 'password must be at least 8 characters',
  })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/, {
    message: 'password must contain numbers or symbols',
  })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    description: 'Repeat same value as in password field',
    example: 'Pass#123',
  })
  @Match('password')
  @IsNotEmpty()
  readonly passwordConfirm: string;

  @ApiProperty({
    description: 'OTP - one time password',
    example: '12345',
  })
  @IsOptional()
  @Min(10000)
  @Max(99999)
  @IsPositive()
  @IsNumber()
  readonly otp: number;
}
