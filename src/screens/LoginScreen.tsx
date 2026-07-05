import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShieldCheck, User, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'student' | 'staff' | 'admin'>('student');
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = false;
    if (role === 'student') {
      if ((nim === '202410370110329' || nim === '202410370110303') && password === '123') {
        isValid = true;
      }
    } else if (role === 'staff') {
      if (nim === 'StaffUMM' && password === '123') {
        isValid = true;
      }
    } else if (role === 'admin') {
      if (nim === 'AdminUMM' && password === '123') {
        isValid = true;
      }
    }

    if (isValid) {
      // Persist role for demo purposes
      localStorage.setItem('userRole', role);
      localStorage.setItem('userIdentifier', nim);

      if (role === 'student') navigate('/dashboard');
      else if (role === 'staff') navigate('/staff');
      else if (role === 'admin') navigate('/admin');
    } else {
      alert('Invalid credentials. Please use the correct NIM/Username and Password.');
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8 bg-white">
      <div className="mt-12 mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl text-primary mb-4">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
        <p className="text-slate-500 text-sm mt-1">Sign in to manage your helmet storage</p>
      </div>

      <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
        {(['student', 'staff', 'admin'] as const).map((r) => (
          <button
            key={r}
            onClick={() => {
              setRole(r);
              setNim('');
              setPassword('');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition-all ${
              role === r ? 'bg-white text-primary shadow-sm' : 'text-slate-400'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
            {role === 'student' ? 'NIM' : 'Username'}
          </label>
          <div className="relative">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={role === 'student' ? '202410370110329' : role === 'staff' ? 'StaffUMM' : 'AdminUMM'}
              className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="button" className="text-xs font-semibold text-primary">Forgot Password?</button>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-6"
        >
          Sign In
          <ArrowRight size={18} />
        </motion.button>
      </form>

      <div className="mt-auto text-center py-6">
        <p className="text-slate-400 text-xs font-medium">
          New user? <button className="text-primary font-bold">Register here</button>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
