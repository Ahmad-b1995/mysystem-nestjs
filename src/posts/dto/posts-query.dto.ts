import { ApiProperty } from "@nestjs/swagger";

export class PostsQuery {
  @ApiProperty({
    description: '每页条数',
    // example: 10,
    default: 10,
    required: false
  })
  pageSize: number
  
  @ApiProperty({
    description: '当前页码',
    // example: 1,
    default: 1,
    required: false
  })
  pageNo: number

  @ApiProperty({
    description: '排序字段',
    example: 'createAt',
    default: 'createAt',
    required: false
  })
  sortField: string
  
  @ApiProperty({
    description: '排序方式',
    example: 'descend',
    default: 'descend',
    required: false
  })
  sortOrder: string
}