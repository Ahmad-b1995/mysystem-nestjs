import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Goal } from './entities/goal.entity';

@ApiTags('goals')
@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new goal' })
  @ApiResponse({
    status: 201,
    description: 'The goal has been successfully created.',
    type: Goal,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createGoalDto: CreateGoalDto) {
    return this.goalsService.create(createGoalDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of goals' })
  @ApiResponse({
    status: 200,
    description: 'List of goals retrieved successfully.',
    type: [Goal],
  })
  findAll() {
    return this.goalsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific goal' })
  @ApiParam({ name: 'id', description: 'ID of the goal to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Goal retrieved successfully.',
    type: Goal,
  })
  @ApiResponse({ status: 404, description: 'Goal not found.' })
  findOne(@Param('id') id: string) {
    return this.goalsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific goal' })
  @ApiParam({ name: 'id', description: 'ID of the goal to update' })
  @ApiResponse({
    status: 200,
    description: 'Goal updated successfully.',
    type: Goal,
  })
  @ApiResponse({ status: 404, description: 'Goal not found.' })
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalsService.update(+id, updateGoalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific goal' })
  @ApiParam({ name: 'id', description: 'ID of the goal to delete' })
  @ApiResponse({ status: 200, description: 'Goal deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Goal not found.' })
  remove(@Param('id') id: string) {
    return this.goalsService.remove(+id);
  }
}
