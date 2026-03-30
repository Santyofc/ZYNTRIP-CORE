import { Module } from '@nestjs/common';
import { DriverScoringModule } from '../driver-scoring/driver-scoring.module';
import { DriversModule } from '../drivers/drivers.module';
import { RealtimeModule } from '../realtime/realtime.module';
import { MatchingService } from './matching.service';

@Module({
  imports: [DriversModule, RealtimeModule, DriverScoringModule],
  providers: [MatchingService],
  exports: [MatchingService],
})
export class MatchingModule {}
