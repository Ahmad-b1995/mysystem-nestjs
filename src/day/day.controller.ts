import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DayService } from './day.service';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@ApiTags('day')
@Controller('day')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @ApiOperation({ summary: 'Get daily routine' })
  @ApiResponse({
    status: 200,
    description: 'The daily routine has been successfully retrieved.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('daily-routine')
  getDailyRoutine() {
    return this.dayService.getDailyRoutine();
  }

  @ApiOperation({ summary: 'Update task status' })
  @ApiResponse({
    status: 200,
    description: 'The task status has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @Patch('update-task/:id')
  updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto) {
    return this.dayService.updateTaskStatus(id, updateTaskStatusDto);
  }
}
