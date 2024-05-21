import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user', example: 'john_doe' })
  @IsOptional()
  @IsString()
  @Length(3, 20)
  username: string;

  @ApiProperty({ description: 'The nickname of the user', example: 'Johnny' })
  @IsOptional()
  @IsString()
  @Length(2, 30)
  nickName: string;

  @ApiProperty({ description: 'The password of the user', example: 'strongpassword123' })
  @IsOptional()
  @IsString()
  @Length(8, 100)
  password: string;

  @ApiProperty({ description: 'The email of the user', example: 'john.doe@example.com' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The description of the user', example: 'A brief description about John' })
  @IsOptional()
  @IsString()
  desc: string;

  @
