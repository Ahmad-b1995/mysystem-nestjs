import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsInt,
  ArrayNotEmpty,
  ArrayMinSize,
  IsIn,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Clean the house',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Tasks to ensure the house is clean and tidy',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The steps to complete the task',
    example: ['Do the dishes', 'Vacuum the house', 'Mop the house'],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  steps: string[];

  @ApiProperty({
    description: 'How often the task should be done, in days',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  frequency: number;

  @ApiProperty({ description: 'The IDs of associated goals', example: [1, 2] })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  goalId: number[];

  @ApiProperty({
    description: 'The time of day the task is scheduled for',
    example: 'morning',
    enum: ['morning', 'afternoon', 'evening', 'night'],
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['morning', 'afternoon', 'evening', 'night'])
  timeOfDay: string;

  @ApiProperty({
    description: 'The current streak of the task',
    example: 0,
  })
  @IsInt()
  @IsNotEmpty()
  streak: number;

  @ApiProperty({
    description: 'Is the task open',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isOpen: boolean;

  @ApiProperty({
    description: 'Is the task checked',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isChecked: boolean;
}
