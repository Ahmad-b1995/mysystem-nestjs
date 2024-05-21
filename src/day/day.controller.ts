import { Controller, Get } from '@nestjs/common';
import { DayService } from './day.service';

@Controller('day')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Get('daily-routine')
  getDailyRoutine() {
    return this.dayService.getDailyRoutine();
  }
}
