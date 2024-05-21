import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  MaxLength,
  isBoolean,
} from 'class-validator';

export class CreateGoalDto {
  @MaxLength(255)
  @IsNotEmpty()
  readonly title: string;

  @MaxLength(255)
  @IsNotEmpty()
  readonly description: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly neverEnding: string;

  @IsArray()
  @IsNotEmpty()
  readonly tags: string[];
}
