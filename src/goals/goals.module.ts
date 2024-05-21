import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from './entities/goal.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TypeOrmModule.forFeature([Goal])],
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
