import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async register(payload: RegisterDto) {
    const user = {
      id: crypto.randomUUID(),
      fullName: payload.fullName,
      email: payload.email,
      role: payload.role,
    };

    const client = this.supabaseService.getAdminClient() as any;

    if (client) {
      const { error } = await client.from('profiles').insert({
        id: user.id,
        full_name: user.fullName,
        email: user.email,
        role: user.role,
      });

      if (error) {
        throw new Error(`Supabase insert failed while creating a profile: ${error.message}`);
      }
    }

    return {
      user: {
        ...user,
      },
      nextStep: client
        ? 'Profile persisted in Supabase. Connect this flow to Supabase Auth admin user creation next.'
        : 'Persist account in Supabase Auth or your users table.',
    };
  }

  login(payload: LoginDto) {
    return {
      accessToken: 'replace-with-jwt',
      refreshToken: 'replace-with-refresh-token',
      user: {
        id: crypto.randomUUID(),
        email: payload.email,
      },
      nextStep: 'Validate credentials against Supabase Auth or your own auth provider.',
    };
  }
}
