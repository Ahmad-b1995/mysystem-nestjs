import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DayService } from './day.service';

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
}
