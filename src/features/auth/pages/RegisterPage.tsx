import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/lib/constants';
import { useAuthStore } from '@/app/providers/AuthProvider';
import type { UserRole } from '../types';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('rider');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await register({ fullName, email, password, role });

    if (role === 'driver') navigate(ROUTES.driver);
    else if (role === 'dispatcher') navigate(ROUTES.dispatch);
    else if (role === 'admin') navigate(ROUTES.admin);
    else navigate(ROUTES.rider);
  }

  return (
    <div className="auth-layout">
      <Card title="Create a Zyntrip account">
        <p className="muted">Launch your account to request rides, drive, or operate dispatch.</p>
        <form onSubmit={onSubmit} className="form-grid">
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" required />
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required />
          <label className="label" htmlFor="role-register">
            Account role
          </label>
          <select id="role-register" className="input" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
            <option value="rider">Rider</option>
            <option value="driver">Driver</option>
            <option value="dispatcher">Dispatcher</option>
            <option value="admin">Admin</option>
          </select>
          <Button type="submit">Create account</Button>
        </form>
        <p className="footnote">
          Already have an account? <Link to={ROUTES.login}>Sign in</Link>
        </p>
      </Card>
    </div>
  );
}
