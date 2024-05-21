import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal } from './entities/goal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
  ) {}

  async create(createGoalDto: CreateGoalDto) {
    const goal = new Goal();
    goal.title = createGoalDto.title;
    return await this.goalRepository.save(goal);
  }

  async findAll() {
    return await this.goalRepository.find();
  }

  async findOne(id: number) {
    const goal = await this.goalRepository.findOneBy({ id });
    if (!goal) {
      throw new BadRequestException('Goal not found');
    }
  }

  async update(id: number, updateGoalDto: UpdateGoalDto) {
    const goal = new Goal();
    goal.title = updateGoalDto.title;
    return await this.goalRepository.update(id, goal);
  }

  async remove(id: number) {
    return await this.goalRepository.delete(id);
  }
}
