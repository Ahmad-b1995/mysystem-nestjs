import { Entity, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from './task.entity';

@Entity('steps')
export class Step {
  @ApiProperty({ description: 'The ID of the step' })
  @Column({ primary: true, type: 'int' })
  id: number;

  @ApiProperty({ description: 'The title of the step' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ description: 'Is the step checked' })
  @Column({ type: 'boolean' })
  isChecked: boolean;

  @ApiProperty({ type: () => Task })
  @ManyToOne(() => Task, (task) => task.steps)
  task: Task;
}
