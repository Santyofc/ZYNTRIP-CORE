import { Body, Controller, Post } from '@nestjs/common';
import { DriverScoringService } from './driver-scoring.service';

@Controller('driver-scoring')
export class DriverScoringController {
  constructor(private readonly driverScoringService: DriverScoringService) {}

  @Post('calculate')
  calculate(
    @Body()
    payload: {
      acceptanceRate: number;
      completionRate: number;
      cancellationRate: number;
      averageRating: number;
      incidentsLast30d?: number;
    },
  ) {
    return this.driverScoringService.calculate(payload);
  }
}
