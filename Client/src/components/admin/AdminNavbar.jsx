import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, LogOut } from 'lucide-react';

export default function AdminNavbar() {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin/dashboard': return 'Dashboard Overview';
      case '/admin/users': return 'Manage Users';
      case '/admin/posts': return 'Post Moderation';
      case '/admin/reports': return 'Incident Reports';
      default: return 'Admin Panel';
    }
  };

  return (
    <header className="h-16 bg-[#111118]/80 backdrop-blur-md border-b border-white/10 px-4 md:px-8 flex justify-between items-center z-10 sticky top-0">
      <h1 className="text-xl font-bold text-white font-['Syne'] tracking-wide">
        {getPageTitle()}
      </h1>
      
      <div className="flex items-center gap-3 md:gap-5">
        <div className="hidden md:flex relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search admin..." 
            className="bg-[#0a0a0f] border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors w-48 md:w-64"
          />
        </div>

        <button className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-pink-500 rounded-full border-[1.5px] border-[#111118]"></span>
        </button>
        
        <div className="h-6 w-px bg-white/10 mx-1 hidden md:block"></div>

        <button className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors px-2 py-1 rounded-lg group">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium hidden md:block group-hover:text-pink-400">Logout</span>
        </button>
      </div>
    </header>
  );
}
