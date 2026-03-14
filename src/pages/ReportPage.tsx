import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Filter, Search, Calendar, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ReportPage = () => {
  const { students } = useAppContext();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Academic Reports</h1>
          <p className="text-gray-400">Generate and manage performance reports for students.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 transition-all text-sm font-bold shadow-lg shadow-primary/20">
            <Download size={18} />
            Export All (PDF)
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-dark p-6 rounded-3xl border border-white/10 flex items-center gap-4">
          <div className="p-3 bg-primary/20 rounded-2xl text-primary">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Reports</p>
            <p className="text-2xl font-bold">{students.length}</p>
          </div>
        </div>
        <div className="glass-dark p-6 rounded-3xl border border-white/10 flex items-center gap-4">
          <div className="p-3 bg-secondary/20 rounded-2xl text-secondary">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Last Generated</p>
            <p className="text-2xl font-bold">Today</p>
          </div>
        </div>
        <div className="glass-dark p-6 rounded-3xl border border-white/10 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-500">
            <Search size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Pending Review</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-dark rounded-[2.5rem] border border-white/10 overflow-hidden"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <h2 className="text-xl font-bold">Available Reports</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="bg-black/20 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <div className="p-2">
          {students.length === 0 ? (
            <div className="p-20 text-center text-gray-500 italic">
              No students available to generate reports.
            </div>
          ) : (
            students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="font-bold">{student.name}</p>
                    <p className="text-xs text-gray-400">Generated: {new Date().toLocaleDateString()} • Size: 1.2 MB</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <Download size={20} />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold transition-all">
                    View <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ReportPage;
