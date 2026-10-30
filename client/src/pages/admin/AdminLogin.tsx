import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from '../../api/client';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@mikhaelgold.com');
  const [password, setPassword] = useState('Admin@Mikhael2026');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await api.adminLogin({ email, password });
      login(res.data.token, res.data.admin);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-gold-champagne bg-slate-900 mx-auto flex items-center justify-center font-serif text-2xl font-bold text-gold-champagne shadow-gold-glow mb-4">
            M
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 tracking-wider uppercase">
            Mikhael Gold & Diamonds
          </h1>
          <p className="text-xs text-gold-champagne tracking-[0.25em] uppercase font-medium mt-1">
            Administrative Access
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="p-3.5 rounded-lg bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mikhaelgold.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne focus:outline-none transition"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne focus:outline-none transition"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-lg bg-gold-champagne text-slate-950 font-bold text-xs uppercase tracking-widest hover:bg-gold-light hover:shadow-gold-glow transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <span>{isLoading ? 'Verifying Credentials…' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Seed credentials hint for review */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-gold-champagne font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Initial Administrator Credentials:</span>
            </div>
            <p>Email: <code className="text-slate-200">admin@mikhaelgold.com</code></p>
            <p>Password: <code className="text-slate-200">Admin@Mikhael2026</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};
