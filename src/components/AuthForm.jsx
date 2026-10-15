import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import Button from './Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';

// Shared by Login and Register.
export default function AuthForm({ mode }) {
  const isLogin = mode === 'login';
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
const [showPassword, setShowPassword] = useState(false);
  const fields = [
    ...(isLogin ? [] : [{ name: 'name', label: 'Name', type: 'text', autoComplete: 'name' }]),
   { name: 'email', label: 'Email', type: 'email', autoComplete: 'username' },
    { name: 'password', label: 'Password', type: 'password', autoComplete: isLogin ? 'current-password' : 'new-password' },
  ];

  async function onSubmit(e) {
    e.preventDefault();
    setError(''); setBusy(true);
    try {
      await (isLogin ? login : register)(values);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative grid min-h-screen place-items-center px-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.25),transparent_60%)]" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-navy-800/60 p-8 backdrop-blur">
          <h1 className="text-2xl font-semibold text-white">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
          {fields.map((f) => (
            <label key={f.name} className="block text-sm text-slate-300">
              {f.label}
              
<div className="relative mt-2">
  <input
    className="input w-full"
    required
    type={
      f.name === 'password'
        ? showPassword
          ? 'text'
          : 'password'
        : f.type
    }
    name={f.name}
    autoComplete={f.autoComplete}
    minLength={f.name === 'password' && !isLogin ? 8 : undefined}
    value={values[f.name]}
    onChange={(e) =>
      setValues({ ...values, [f.name]: e.target.value })
    }
  />

  {f.name === 'password' && (
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-white"
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? '🙈' : '👁️'}
    </button>
  )}
</div>

            </label>
          ))}
          {error && <p role="alert" className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}
          <Button type="submit" disabled={busy} className="w-full">{busy ? 'Please wait…' : isLogin ? 'Log in' : 'Create account'}</Button>
          <p className="text-center text-sm text-slate-400">
            {isLogin ? 'New to NovaAI? ' : 'Already have an account? '}
            <Link to={isLogin ? '/register' : '/login'} className="text-violet-300 hover:underline">{isLogin ? 'Create an account' : 'Log in'}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
