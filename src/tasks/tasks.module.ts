import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Goal } from 'src/goals/entities/goal.entity';
import { Step } from './entities/step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Goal, Step])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
