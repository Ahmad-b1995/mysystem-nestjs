import { Entity, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Step } from './step.entity';
import { Abstract } from 'src/database/abstract.entity';
import { Goal } from 'src/goals/entities/goal.entity';

@Entity('tasks')
export class Task extends Abstract {
  @ApiProperty({ description: 'The title of the task' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ description: 'The description of the task', nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'The frequency of the task' })
  @Column({ type: 'int' })
  frequency: number;

  @ApiProperty({ description: 'The streak of the task' })
  @Column({ type: 'int' })
  streak: number;

  @ApiProperty({ description: 'The time of day the task is scheduled for' })
  @Column({ type: 'varchar', length: 50 })
  timeOfDay: string;

  @ApiProperty({ description: 'The creation date of the task' })
  @Column({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({ description: 'The last update date of the task' })
  @Column({ type: 'timestamp' })
  updated_at: Date;

  @ApiProperty({ description: 'Is the task open' })
  @Column({ type: 'boolean' })
  isOpen: boolean;

  @ApiProperty({ description: 'Is the task checked' })
  @Column({ type: 'boolean' })
  isChecked: boolean;

  @ApiProperty({ type: () => Step, isArray: true })
  @OneToMany(() => Step, (step) => step.task)
  steps: Step[];

  @ApiProperty({ type: () => Goal, isArray: true })
  @ManyToMany(() => Goal, (goal) => goal.tasks)
  @JoinTable()
  goals: Goal[];
}
