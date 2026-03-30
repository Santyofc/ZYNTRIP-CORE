import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/lib/constants';
import { useAuthStore } from '@/app/providers/AuthProvider';
import type { UserRole } from '../types';

function resolveRoleRoute(role: UserRole): string {
  if (role === 'rider') return ROUTES.rider;
  if (role === 'driver') return ROUTES.driver;
  if (role === 'dispatcher') return ROUTES.dispatch;
  return ROUTES.admin;
}

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('rider');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await login({ email, password, role });
    navigate(resolveRoleRoute(role));
  }

  return (
    <div className="auth-layout">
      <Card title="Sign in to Zyntrip">
        <p className="muted">Manage rides, drivers, dispatch operations, and revenue in one platform.</p>
        <form onSubmit={onSubmit} className="form-grid">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="work@zyntrip.com" required />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
          <label className="label" htmlFor="role">
            Access profile
          </label>
          <select id="role" className="input" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
            <option value="rider">Rider</option>
            <option value="driver">Driver</option>
            <option value="dispatcher">Dispatcher</option>
            <option value="admin">Admin</option>
          </select>
          <Button type="submit">Sign in</Button>
        </form>
        <p className="footnote">
          New to Zyntrip? <Link to={ROUTES.register}>Create your account</Link>
        </p>
      </Card>
    </div>
  );
}
