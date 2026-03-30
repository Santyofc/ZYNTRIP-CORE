import { Injectable, Logger } from '@nestjs/common';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './supabase.types';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private adminClient: SupabaseClient<Database> | null = null;
  private warnedMissingConfig = false;

  isConfigured() {
    return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  }

  getAdminClient() {
    if (!this.isConfigured()) {
      if (!this.warnedMissingConfig) {
        this.logger.warn('Supabase credentials are missing. Falling back to in-memory backend services.');
        this.warnedMissingConfig = true;
      }

      return null;
    }

    if (!this.adminClient) {
      this.adminClient = createClient<Database>(
        process.env.SUPABASE_URL as string,
        process.env.SUPABASE_SERVICE_ROLE_KEY as string,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        },
      );
    }

    return this.adminClient;
  }
}
