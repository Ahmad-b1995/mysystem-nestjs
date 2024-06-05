import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from 'src/tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

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

  async updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: +id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (updateTaskStatusDto.isChecked !== undefined) {
      task.isChecked = updateTaskStatusDto.isChecked;

      if (task.isChecked) {
        task.streak += 1;
      } else {
        task.streak = 0; // Reset streak if unchecked
      }
    }

    return this.taskRepository.save(task);
  }
}
