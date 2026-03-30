import { Module } from '@nestjs/common';
import { DriversModule } from '../drivers/drivers.module';
import { MatchingModule } from '../matching/matching.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { PricingModule } from '../pricing/pricing.module';
import { RealtimeModule } from '../realtime/realtime.module';
import { SupabaseModule } from '../supabase/supabase.module';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';

@Module({
  imports: [SupabaseModule, RealtimeModule, NotificationsModule, DriversModule, MatchingModule, PricingModule],
  controllers: [TripsController],
  providers: [TripsService],
  exports: [TripsService],
})
export class TripsModule {}
