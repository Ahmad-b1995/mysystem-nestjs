import { ApiProperty } from '@nestjs/swagger';

export class PostsQuery {
  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    default: 10,
    required: false,
  })
  pageSize: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
    default: 1,
    required: false,
  })
  pageNo: number;

  @ApiProperty({
    description: 'Sorting field',
    example: 'createAt',
    default: 'createAt',
    required: false,
  })
  sortField: string;

  @ApiProperty({
    description: 'Sort order',
    example: 'descend',
    default: 'descend',
    required: false,
  })
  sortOrder: string;
}
