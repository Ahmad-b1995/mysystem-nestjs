import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const goal = this.goalRepository.create(createGoalDto);
    return await this.goalRepository.save(goal);
  }

  async findAll() {
    return await this.goalRepository.find();
  }

  async findOne(id: number) {
    const goal = await this.goalRepository.findOneBy({ id });
    if (!goal) {
      throw new NotFoundException(`Goal with ID ${id} not found`);
    }
    return goal;
  }

  async update(id: number, updateGoalDto: UpdateGoalDto) {
    const goal = await this.goalRepository.preload({
      id,
      ...updateGoalDto,
    });
    if (!goal) {
      throw new NotFoundException(`Goal with ID ${id} not found`);
    }
    return await this.goalRepository.save(goal);
  }

  async remove(id: number) {
    const result = await this.goalRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Goal with ID ${id} not found`);
    }
  }
}
