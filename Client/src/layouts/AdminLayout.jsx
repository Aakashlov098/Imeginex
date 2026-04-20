import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminNavbar from '../components/admin/AdminNavbar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen w-full bg-[#0a0a0f] text-white font-['DM_Sans'] overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col md:ml-64 relative">
        {/* Subtle background glow effect to match main app */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
