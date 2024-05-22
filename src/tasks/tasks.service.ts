import { DeleteResult, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Goal } from '../goals/entities/goal.entity';
import { Step } from './entities/step.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.frequency = createTaskDto.frequency;
    task.streak = createTaskDto.streak;
    task.timeOfDay = createTaskDto.timeOfDay;
    task.isOpen = createTaskDto.isOpen;
    task.isChecked = createTaskDto.isChecked;
    task.created_at = new Date();
    task.updated_at = new Date();

    if (createTaskDto.goalId && createTaskDto.goalId.length) {
      task.goals = await this.goalRepository.findByIds(createTaskDto.goalId);
    }

    if (createTaskDto.steps && createTaskDto.steps.length) {
      const steps = createTaskDto.steps.map((title) => {
        const newStep = new Step();
        newStep.title = title;
        newStep.isChecked = false;
        return newStep;
      });
      task.steps = await this.stepRepository.save(steps);
    }

    return await this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({ relations: ['goals', 'steps'] });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: id },
      relations: ['goals', 'steps'],
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    // Convert steps from string[] to Step[]
    const steps = updateTaskDto.steps?.map((title) => {
      const newStep = new Step();
      newStep.title = title;
      newStep.isChecked = false;
      return newStep;
    });

    const updatedTaskDto = {
      ...updateTaskDto,
      steps: steps ? await this.stepRepository.save(steps) : undefined,
    };

    const task = await this.taskRepository.preload({
      id,
      ...updatedTaskDto,
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
    return result;
  }
}
