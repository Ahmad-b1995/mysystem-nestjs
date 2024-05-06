import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTag {
  @ApiProperty({ description: 'Tag name', example: 'javascript' })
  @IsNotEmpty({ message: 'Please fill in the tag name' })
  name: string;

  @ApiProperty({ description: 'Alias, used in URL', example: 'taga' })
  @IsNotEmpty({ message: 'Please fill in the tag alias' })
  alias: string;

  @ApiProperty({ description: 'Image' })
  img: string;

  @ApiProperty({ description: 'Description', example: 'A prototype language' })
  desc: string;
}
