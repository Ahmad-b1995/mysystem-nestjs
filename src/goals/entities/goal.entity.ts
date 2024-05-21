import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Abstract } from 'src/database/abstract.entity';

@Entity('goals')
export class Goal extends Abstract {
  @ApiProperty({ description: 'The title of the goal' })
  @Column()
  title: string;

  @ApiProperty({ description: 'The description of the goal' })
  @Column()
  description: string;

  @ApiProperty({ description: 'Flag indicating if the goal is never-ending' })
  @Column()
  neverEnding: boolean;

  @ApiProperty({
    description: 'Tags associated with the goal',
    example: ['strength', 'health', 'good looks'],
  })
  @Column('simple-array')
  tags: string[];

  @ApiProperty({ description: 'The tasks associated with the goal' })
  @ManyToMany(() => Task, (task) => task.goals)
  tasks: Task[];
}
