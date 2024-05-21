import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Goal } from 'src/goals/entities/goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TypeOrmModule.forFeature([Goal])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class OrderModule {}
