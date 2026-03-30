import { Module } from '@nestjs/common';
import { AntifraudModule } from './antifraud/antifraud.module';
import { AuthModule } from './auth/auth.module';
import { DriverScoringModule } from './driver-scoring/driver-scoring.module';
import { DriversModule } from './drivers/drivers.module';
import { HealthModule } from './health/health.module';
import { LiveSupportModule } from './live-support/live-support.module';
import { MarketDynamicsModule } from './market-dynamics/market-dynamics.module';
import { MatchingModule } from './matching/matching.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaymentsModule } from './payments/payments.module';
import { PricingModule } from './pricing/pricing.module';
import { RealtimeModule } from './realtime/realtime.module';
import { RegionsModule } from './regions/regions.module';
import { RouteOptimizationModule } from './route-optimization/route-optimization.module';
import { SupabaseModule } from './supabase/supabase.module';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [
    SupabaseModule,
    RegionsModule,
    MarketDynamicsModule,
    RouteOptimizationModule,
    AntifraudModule,
    DriverScoringModule,
    LiveSupportModule,
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
