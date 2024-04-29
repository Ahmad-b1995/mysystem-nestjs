import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'wencai' })
  username: string;
  @ApiProperty({ description: '密码'})
  password: string
  @ApiProperty({ description: '真实姓名', example: 'zhang'})
  nickName: string;
  @ApiProperty({ description: '电子邮件', example: 'zhang'})
  email: string;
  @ApiProperty({ description: '个人说明', example: 'zhang'})
  desc: string;
  @ApiProperty({ description: '头像', example: 'zhang'})
  avatar: string;
}
