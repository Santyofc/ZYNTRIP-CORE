import type { LoginPayload, RegisterPayload } from '@/features/auth/state/auth-store';
import type { UserProfile } from '@/features/auth/types';

function createProfile(payload: { fullName?: string; email: string; role: UserProfile['role'] }): UserProfile {
  return {
    id: crypto.randomUUID(),
    fullName: payload.fullName ?? payload.email.split('@')[0],
    email: payload.email,
    role: payload.role,
  };
}

export async function loginUser(payload: LoginPayload): Promise<UserProfile> {
  return Promise.resolve(createProfile(payload));
}

export async function registerUser(payload: RegisterPayload): Promise<UserProfile> {
  return Promise.resolve(createProfile(payload));
}
