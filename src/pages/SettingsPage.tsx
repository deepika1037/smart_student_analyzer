import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Mail, Shield, User, Database, Key, Save, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SettingsPage = () => {
  const { settings, setSettings, credentials, setCredentials, user } = useAppContext();
  const [newUsername, setNewUsername] = useState(credentials.username);
  const [newPassword, setNewPassword] = useState(credentials.password);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleAutoNotify = () => {
    setSettings(prev => ({ ...prev, autoNotify: !prev.autoNotify }));
  };

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setCredentials({ username: newUsername, password: newPassword });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-gray-400">Manage your application preferences and configurations.</p>
      </header>

      <div className="space-y-6">
        {/* Admin Credentials Section */}
        {(user?.role === 'Admin' || user?.role === 'Faculty') && (
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-dark rounded-3xl border border-white/10 overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 flex items-center gap-3">
              <Key className="text-primary" size={20} />
              <h2 className="text-xl font-bold">Admin Credentials</h2>
            </div>
            <form onSubmit={handleUpdateCredentials} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">Username</label>
                  <input 
                    type="text" 
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">Password</label>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 rounded-xl text-sm font-bold transition-all"
                >
                  <Save size={18} />
                  Save Changes
                </button>
                {showSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-emerald-500 text-sm font-bold"
                  >
                    <CheckCircle size={16} />
                    Credentials updated successfully!
                  </motion.div>
                )}
              </div>
            </form>
          </motion.section>
        )}

        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-dark rounded-3xl border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <Bell className="text-primary" size={20} />
            <h2 className="text-xl font-bold">Notifications</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Auto-Notify Parents</p>
                <p className="text-sm text-gray-400">Automatically send performance reports to parents after prediction.</p>
              </div>
              <button 
                onClick={toggleAutoNotify}
                className={`w-14 h-8 rounded-full transition-all duration-300 relative ${settings.autoNotify ? 'bg-primary' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${settings.autoNotify ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between opacity-50 cursor-not-allowed">
              <div>
                <p className="font-semibold">Email Alerts</p>
                <p className="text-sm text-gray-400">Receive system alerts via email.</p>
              </div>
              <div className="w-14 h-8 rounded-full bg-white/5 relative">
                <div className="absolute top-1 left-1 w-6 h-6 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-dark rounded-3xl border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <Database className="text-secondary" size={20} />
            <h2 className="text-xl font-bold">Data Management</h2>
          </div>
          <div className="p-6 space-y-4">
            <button className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
              <p className="font-semibold">Export All Data</p>
              <p className="text-sm text-gray-400">Download all student and prediction data as CSV.</p>
            </button>
            <button className="w-full text-left p-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 transition-colors border border-rose-500/20 text-rose-400">
              <p className="font-semibold">Clear Database</p>
              <p className="text-sm opacity-70">Permanently delete all records from the system.</p>
            </button>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-dark rounded-3xl border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <Shield className="text-emerald-500" size={20} />
            <h2 className="text-xl font-bold">Account Security</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-400">Your account is secured with role-based access control. Only Faculty members can modify system-wide settings.</p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default SettingsPage;
