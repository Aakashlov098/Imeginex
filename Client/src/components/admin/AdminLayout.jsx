import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen w-full font-sans text-white overflow-hidden bg-[#080810]" style={{
      backgroundImage: 'radial-gradient(circle, #ffffff08 1px, transparent 1px)',
      backgroundSize: '24px 24px'
    }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
