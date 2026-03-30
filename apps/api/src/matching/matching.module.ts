import { Module } from '@nestjs/common';
import { DriversModule } from '../drivers/drivers.module';
import { RealtimeModule } from '../realtime/realtime.module';
import { MatchingService } from './matching.service';

@Module({
  imports: [DriversModule, RealtimeModule],
  providers: [MatchingService],
  exports: [MatchingService],
})
export class MatchingModule {}
