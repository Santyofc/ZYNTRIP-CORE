export type UserRole = 'rider' | 'driver' | 'admin' | 'dispatcher';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  isAuthenticated: boolean;
  profile: UserProfile | null;
}
