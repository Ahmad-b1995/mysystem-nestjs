import { Module } from '@nestjs/common';
import { DayService } from './day.service';
import { DayController } from './day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [DayController],
  providers: [DayService],
})
export class DayModule {}
