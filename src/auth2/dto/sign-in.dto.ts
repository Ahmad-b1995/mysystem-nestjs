import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { phone_or_email_regex } from 'src/regex/regex';

export class SignInDto {
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
    message: 'password too short',
  })
  @MaxLength(20, {
    message: 'password too long',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsNotEmpty()
  readonly password: string;
}
