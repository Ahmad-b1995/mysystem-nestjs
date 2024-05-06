import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PostsQuery {
  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    default: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  pageNo?: number;

  @ApiProperty({
    description: 'Sorting field',
    example: 'createAt',
    default: 'createAt',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortField?: string;

  @ApiProperty({
    description: 'Sort order',
    example: 'descend',
    default: 'descend',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortOrder?: string;
}
