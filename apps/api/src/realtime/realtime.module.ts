import { Module } from '@nestjs/common';
import { DriversModule } from '../drivers/drivers.module';
import { RealtimeGateway } from './realtime.gateway';
import { RealtimeService } from './realtime.service';

@Module({
  imports: [DriversModule],
  providers: [RealtimeGateway, RealtimeService],
  exports: [RealtimeService],
})
export class RealtimeModule {}
