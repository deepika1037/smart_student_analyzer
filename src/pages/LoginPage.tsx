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
    <div className="min-h-screen flex bg-black">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary/20 via-black to-secondary/20 items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/education/1920/1080')] bg-cover bg-center opacity-20 grayscale"></div>
        <div className="relative z-10 max-w-lg text-center space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-primary/40"
          >
            <GraduationCap size={48} className="text-white" />
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">
              Elevate Student <span className="text-primary">Success</span> with AI
            </h1>
            <p className="text-xl text-gray-400">
              Predict performance, identify risks, and provide personalized recommendations in real-time.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-8">
            {[
              { label: 'Predictive', icon: ShieldCheck },
              { label: 'Analytical', icon: School },
              { label: 'Personalized', icon: GraduationCap }
            ].map((item, i) => (
              <div key={i} className="glass p-4 rounded-2xl border border-white/10">
                <item.icon className="mx-auto mb-2 text-primary" size={20} />
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-gray-400 mt-2">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {(['Admin', 'Faculty', 'Student'] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-3 rounded-xl text-sm font-semibold transition-all border ${
                      role === r 
                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-rose-500 text-sm font-medium text-center bg-rose-500/10 py-2 rounded-lg border border-rose-500/20"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
            >
              Sign In
              <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-3"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
          </form>

          <div className="flex flex-col items-center gap-4">
            <p className="text-center text-gray-500 text-sm">
              Don't have an account? <span className="text-primary font-bold cursor-pointer hover:underline">Contact Admin</span>
            </p>
            <button className="text-primary text-sm font-medium hover:underline">
              Forgot Password?
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
