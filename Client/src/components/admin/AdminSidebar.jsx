import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Image as ImageIcon, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function AdminSidebar() {
  const links = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/posts', icon: ImageIcon, label: 'Posts' },
    { to: '/admin/reports', icon: AlertTriangle, label: 'Reports' },
  ];

  return (
    <aside className="w-64 bg-[#111118]/90 backdrop-blur-md border-r border-white/10 h-screen fixed top-0 left-0 hidden md:flex flex-col z-20">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg shadow-violet-500/20 font-['Syne']">
            I
          </div>
          <span className="text-white font-bold text-lg font-['Syne'] tracking-wide">
            Imaginex <span className="text-violet-400 font-normal">Admin</span>
          </span>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-3 flex flex-col gap-2">
        {links.map((link) => (
          <NavLink 
            key={link.to}
            to={link.to} 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                isActive 
                  ? 'bg-violet-600/20 text-violet-400 border border-violet-500/20 shadow-inner' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </NavLink>
        ))}

        <div className="mt-8 mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Exit
        </div>
        
        <Link 
          to="/" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-gray-400 hover:text-white hover:bg-white/5 border border-transparent group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to App
        </Link>
      </nav>

      <div className="p-4 border-t border-white/10 mt-auto">
        <div className="flex items-center gap-3 p-3 bg-[#0a0a0f]/50 rounded-xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-violet-600/20 flex items-center justify-center font-bold text-violet-400 border border-violet-500/30">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">System Admin</span>
            <span className="text-xs text-gray-500">Superuser</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
