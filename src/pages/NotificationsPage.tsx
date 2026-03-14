import React from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, XCircle, Clock, Search, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const NotificationsPage = () => {
  const { notifications } = useAppContext();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Notifications</h1>
          <p className="text-gray-400">History of communications sent to parents.</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search logs..." 
            className="bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
          />
        </div>
      </header>

      <div className="glass-dark rounded-[2rem] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
              <tr>
                <th className="px-6 py-5 font-bold">Student</th>
                <th className="px-6 py-5 font-bold">Recipient</th>
                <th className="px-6 py-5 font-bold">Message Preview</th>
                <th className="px-6 py-5 font-bold">Status</th>
                <th className="px-6 py-5 font-bold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {notifications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-gray-500 italic">
                    No notification logs found.
                  </td>
                </tr>
              ) : (
                notifications.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-semibold">{log.studentName}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{log.parentContact}</td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm text-gray-300 truncate">{log.message}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-2 text-xs font-bold ${
                        log.status === 'Sent' ? 'text-emerald-500' : 'text-rose-500'
                      }`}>
                        {log.status === 'Sent' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                        {log.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <Clock size={12} />
                        {new Date(log.timestamp).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
