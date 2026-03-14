import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, History, Bell, Mail, Smartphone } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SecurityPage = () => {
  const { notifications } = useAppContext();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Security & Logs</h1>
        <p className="text-gray-400">Monitor system activity and notification history.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark p-6 rounded-3xl border border-white/10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/20 rounded-2xl text-primary">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Emails Sent</p>
              <p className="text-2xl font-bold">{notifications.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-dark p-6 rounded-3xl border border-white/10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-secondary/20 rounded-2xl text-secondary">
              <Smartphone size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">SMS Alerts</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-dark p-6 rounded-3xl border border-white/10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-500">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">System Status</p>
              <p className="text-2xl font-bold">Secure</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-dark rounded-3xl border border-white/10 overflow-hidden"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <History className="text-primary" size={20} />
            <h2 className="text-xl font-bold">Notification History</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium">Parent Contact</th>
                <th className="px-6 py-4 font-medium">Message</th>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {notifications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No notifications sent yet.
                  </td>
                </tr>
              ) : (
                notifications.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{log.studentName}</td>
                    <td className="px-6 py-4 text-gray-400">{log.parentContact}</td>
                    <td className="px-6 py-4 max-w-xs truncate text-gray-400">{log.message}</td>
                    <td className="px-6 py-4 text-gray-400">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-medium border border-emerald-500/20">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default SecurityPage;
