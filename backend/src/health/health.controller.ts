import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Controller('health')
export class HealthController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get()
  getHealth() {
    return {
      status: 'ok',
      service: 'zyntrip-core-backend',
      supabaseConfigured: this.supabaseService.isConfigured(),
      timestamp: new Date().toISOString(),
    };
  }
}
