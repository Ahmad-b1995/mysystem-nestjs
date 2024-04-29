import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTag {
  @ApiProperty({ description: '标签名称', example: 'javascript' })
  @IsNotEmpty({ message: '请填写标签名称' })
  name: string;

  @ApiProperty({ description: '别名，在 url 中使用', example: 'taga' })
  @IsNotEmpty({ message: '请填写标签别名' })
  alias: string;

  @ApiProperty({ description: '图像' })
  img: string;

  @ApiProperty({ description: '描述', example: '一个标本语言' })
  desc: string;
}
