import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ChevronRight, GraduationCap, School, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Role } from '../types';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('Faculty');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser, credentials, students } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (role === 'Student') {
      const student = students.find(s => s.registerNumber === username);
      if (student && password === credentials.password) {
        setUser({ username, role });
        navigate('/dashboard');
        return;
      }
    }

    if (username === credentials.username && password === credentials.password) {
      setUser({ username, role });
      navigate('/dashboard');
    } else {
      setError('Invalid credentials for the selected role.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-[350px] space-y-8 text-center"
      >
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white">Welcome Back</h1>
          <p className="text-gray-500">Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              {(['Admin', 'Faculty', 'Student'] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                    role === r 
                      ? 'bg-primary border-primary text-white' 
                      : 'bg-[#111] border-[#333] text-gray-400 hover:bg-white/5'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="relative group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#111] border border-[#333] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-gray-600 transition-all"
                required
              />
            </div>

            <div className="relative group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111] border border-[#333] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-gray-600 transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-rose-500 text-xs font-medium bg-rose-500/10 py-2 rounded-lg border border-rose-500/20"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group"
          >
            Sign In →
          </button>

          <button
            type="button"
            className="w-full bg-[#111] hover:bg-white/5 text-white font-bold py-3 rounded-xl border border-[#333] transition-all flex items-center justify-center gap-3"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>
        </form>

        <div className="space-y-4">
          <p className="text-gray-500 text-sm">
            Don't have an account? <span className="text-primary font-bold cursor-pointer hover:underline">Contact Admin</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
