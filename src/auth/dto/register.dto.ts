import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ description: '登录名', example: 'wencai' })
  username: string;
  @ApiProperty({ description: '密码', example: '123456' })
  password: string
  @ApiProperty({ description: '昵称', example: 'zhang'})
  nickName: string;
  @ApiProperty({ description: '电子邮件', example: '1052642137@qq.com'})
  email: string;
}