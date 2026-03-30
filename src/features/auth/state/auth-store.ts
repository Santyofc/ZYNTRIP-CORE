import type { UserProfile, UserRole } from '../types';

export interface LoginPayload {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterPayload extends LoginPayload {
  fullName: string;
}

export interface AuthStoreValue {
  state: {
    isAuthenticated: boolean;
    profile: UserProfile | null;
  };
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}
