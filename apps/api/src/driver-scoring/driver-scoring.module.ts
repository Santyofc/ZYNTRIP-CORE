import { Module } from '@nestjs/common';
import { DriverScoringController } from './driver-scoring.controller';
import { DriverScoringService } from './driver-scoring.service';

@Module({
  controllers: [DriverScoringController],
  providers: [DriverScoringService],
  exports: [DriverScoringService],
})
export class DriverScoringModule {}
