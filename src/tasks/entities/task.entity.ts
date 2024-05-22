import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Goal } from '../../goals/entities/goal.entity';
import { Abstract } from 'src/database/abstract.entity';

@Entity('tasks')
export class Task extends Abstract {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Clean the house',
  })
  @Column({ type: 'varchar', length: 255, unique: true })
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Tasks to ensure the house is clean and tidy',
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    description: 'The steps to complete the task',
    example: ['Do the dishes', 'Vacuum the house', 'Mop the house'],
  })
  @Column('simple-array')
  steps: string[];

  @ApiProperty({
    description: 'How often the task should be done, in days',
    example: 1,
  })
  @Column({ type: 'int', default: 1 })
  frequency: number;

  @ApiProperty({ description: 'The current streak of the task', example: 0 })
  @Column({ type: 'int', default: 0 })
  streak: number;

  @ApiProperty({
    description: 'The time of day the task is scheduled for',
    example: 'morning',
  })
  @Column({ type: 'varchar', length: 50 })
  timeOfDay: string;

  @ApiProperty({ description: 'The goals associated with the task' })
  @ManyToMany(() => Goal, (goal) => goal.tasks)
  @JoinTable()
  goals: Goal[];
}
