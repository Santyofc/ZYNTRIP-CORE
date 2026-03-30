import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DriversModule } from './drivers/drivers.module';
import { HealthModule } from './health/health.module';
import { MatchingModule } from './matching/matching.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaymentsModule } from './payments/payments.module';
import { PricingModule } from './pricing/pricing.module';
import { RealtimeModule } from './realtime/realtime.module';
import { SupabaseModule } from './supabase/supabase.module';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [
    SupabaseModule,
    DriversModule,
    RealtimeModule,
    MatchingModule,
    PricingModule,
    HealthModule,
    AuthModule,
    TripsModule,
    NotificationsModule,
    PaymentsModule,
  ],
})
export class AppModule {}
