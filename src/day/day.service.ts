import { Injectable } from '@nestjs/common';
import { Task } from 'src/tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getDailyRoutine(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();
    const today = new Date();
    const dailyRoutine = tasks.filter((task) => {
      const daysSinceCreated = Math.floor(
        (today.getTime() - task.createdAt.getTime()) / (1000 * 60 * 60 * 24),
      );
      return daysSinceCreated % task.frequency === 0;
    });
    return dailyRoutine;
  }
}
