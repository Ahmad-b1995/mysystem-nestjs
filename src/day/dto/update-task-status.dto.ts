import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty({ description: 'Is the task checked' })
  isChecked: boolean;
}
