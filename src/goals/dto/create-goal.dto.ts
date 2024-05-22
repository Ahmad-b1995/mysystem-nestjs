import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGoalDto {
  @ApiProperty({ description: 'The title of the goal' })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ description: 'The description of the goal', required: false })
  @IsString()
  @MaxLength(255)
  readonly description?: string;

  @ApiProperty({ description: 'Flag indicating if the goal is never-ending' })
  @IsBoolean()
  @IsNotEmpty()
  readonly neverEnding: boolean;

  @ApiProperty({ description: 'Tags associated with the goal' })
  @IsArray()
  @IsNotEmpty()
  readonly tags: string[];
}
