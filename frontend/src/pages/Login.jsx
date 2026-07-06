import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-xl p-8 w-full max-w-sm"
      >
        <h1 className="text-slate-100 text-xl font-semibold mb-1">NetMonitor</h1>
        <p className="text-slate-500 text-sm mb-6">Sign in to view the dashboard</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-md px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-5 bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium py-2 rounded-md transition-colors"
        >
          Sign In
        </button>

        <p className="text-slate-500 text-xs mt-4 text-center">
          No account?{' '}
          <Link to="/register" className="text-sky-400 hover:underline">
            Register
          </Link>
        </p>
        <p className="text-slate-600 text-xs mt-3 text-center">
          Demo: admin@example.com / admin123
        </p>
      </form>
    </div>
  );
};

export default Login;
