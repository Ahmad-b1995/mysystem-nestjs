import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePostDto {

  @ApiProperty({ description: '博客标题', example: '博客标题' })
  @IsNotEmpty({ message: '请填写标题' })
  title: string

  @ApiProperty({ description: '博客内容', example: '博客内容' })
  @IsNotEmpty({ message: '请填写博客内容' })
  content: string
  
  @ApiProperty({ description: '博客作者', example: 'wencaizhang' })
  author: string

  @ApiProperty({ description: '分类目录', example: [ 'front-end', 'server'] })
  categories: string[]

  @ApiProperty({ description: '标签', example: [ 'JS-API', 'ES6'] })
  tags: string[]

  @ApiProperty({ description: '摘要' })
  summary: string

  @ApiProperty({ description: '永久链接', example: "how-to-read-a-book" })
  slug: string

  @ApiProperty({ description: '特色图片', example: "how-to-read-a-book" })
  img: string

}