import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const TopNavbar = () => {
  return (
    <div className="h-20 glass border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search students, reports, analytics..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>
        
        <button className="relative p-2.5 rounded-xl hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-black"></span>
        </button>

        <div className="h-10 w-[1px] bg-white/10"></div>

        <button className="flex items-center gap-3 p-1.5 pr-4 rounded-full hover:bg-white/5 transition-colors group">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
            <User size={18} />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold">Profile</p>
            <p className="text-[10px] text-gray-400">Account Settings</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
