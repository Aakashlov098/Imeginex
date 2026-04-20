import React from 'react';

export default function AdminStatsCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-[#111118]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-105 hover:brightness-110 transition-all duration-300 shadow-lg relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 flex justify-between items-start mb-4">
        <h3 className="text-gray-400 text-sm font-medium font-['DM_Sans']">{title}</h3>
        <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="relative z-10 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 font-['Syne']">
        {value}
      </div>
    </div>
  );
}
