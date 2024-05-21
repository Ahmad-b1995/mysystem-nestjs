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
  @Column({ unique: true })
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'learning management skills and their implementation',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'The steps to complete the task',
    example: ['Do the dishes', 'Vacuum the house', 'Mop the house'],
  })
  @Column('simple-array')
  steps: string[];

  @ApiProperty({ description: 'How often the task should be done', example: 1 })
  @Column()
  frequency: number;

  @ApiProperty({ description: 'The current streak of the task', example: 0 })
  @Column()
  streak: number;

  @ApiProperty({
    description: 'The time of day the task is scheduled for',
    example: 'morning',
  })
  @Column()
  timeOfDay: string;

  @ApiProperty({ description: 'The goals associated with the task' })
  @ManyToMany(() => Goal, (goal) => goal.tasks)
  @JoinTable()
  goals: Goal[];
}
