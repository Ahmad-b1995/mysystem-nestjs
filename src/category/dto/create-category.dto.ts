import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCategory {
  @ApiProperty({ description: '分类名称', example: 'web' })
  @IsNotEmpty({ message: '请填写分类名称' })
  name: string
  
  @ApiProperty({ description: '别名，在 url 中使用', example: 'web' })
  @IsNotEmpty({ message: '请填写分类别名' })
  alias: string

  @ApiProperty({ description: '图像' })
  img: string
  
  @ApiProperty({ description: '描述', example: 'Web 前端开发' })
  desc: string
}