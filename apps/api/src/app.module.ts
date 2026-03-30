import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaymentsModule } from './payments/payments.module';
import { RealtimeModule } from './realtime/realtime.module';
import { SupabaseModule } from './supabase/supabase.module';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [SupabaseModule, RealtimeModule, HealthModule, AuthModule, TripsModule, NotificationsModule, PaymentsModule],
})
export class AppModule {}
