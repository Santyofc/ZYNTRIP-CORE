import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import type { AuthStoreValue, LoginPayload, RegisterPayload } from '@/features/auth/state/auth-store';
import { loginUser, registerUser } from '@/services/auth-service';

const AuthContext = createContext<AuthStoreValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<AuthStoreValue['state']['profile']>(null);

  async function login(payload: LoginPayload) {
    const user = await loginUser(payload);
    setProfile(user);
    setIsAuthenticated(true);
  }

  async function register(payload: RegisterPayload) {
    const user = await registerUser(payload);
    setProfile(user);
    setIsAuthenticated(true);
  }

  function logout() {
    setProfile(null);
    setIsAuthenticated(false);
  }

  const value = useMemo<AuthStoreValue>(
    () => ({
      state: { isAuthenticated, profile },
      login,
      register,
      logout,
    }),
    [isAuthenticated, profile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthStore() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthStore must be used within AuthProvider');
  }

  return context;
}
