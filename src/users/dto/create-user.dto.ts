import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Username', example: 'wencai' })
  username: string;

  @ApiProperty({ description: 'Password' })
  password: string;

  @ApiProperty({ description: 'Real name', example: 'zhang' })
  nickName: string;

  @ApiProperty({ description: 'Email', example: 'zhang' })
  email: string;

  @ApiProperty({ description: 'Personal description', example: 'zhang' })
  desc: string;

  @ApiProperty({ description: 'Avatar', example: 'zhang' })
  avatar: string;
}
