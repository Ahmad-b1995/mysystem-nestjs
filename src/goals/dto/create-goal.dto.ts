import { ApiProperty } from '@nestjs/swagger';

export class CreateGoalDto {
  @ApiProperty({ description: 'The ID of the goal', example: 1 })
  id: number;

  @ApiProperty({
    description: 'The title of the goal',
    example: 'I am healthy and strong and good-looking',
  })
  title: string;

  @ApiProperty({
    description: 'The description of the goal',
    example: 'To be healthy, strong, and good-looking',
  })
  description: string;

  @ApiProperty({
    description: 'Flag indicating if the goal is never-ending',
    example: true,
  })
  neverEnding: boolean;

  @ApiProperty({
    description: 'The deadline of the goal',
    example: '2024-12-31',
    required: false,
  })
  deadline?: Date;

  @ApiProperty({
    description: 'Tags associated with the goal',
    example: ['strength', 'health', 'good looks'],
  })
  tags: string[];

  @ApiProperty({
    description: 'The creation date of the goal',
    example: '2024-05-22',
  })
  created_at: Date;

  @ApiProperty({
    description: 'The last update date of the goal',
    example: '2024-05-22',
  })
  updated_at: Date;
}
