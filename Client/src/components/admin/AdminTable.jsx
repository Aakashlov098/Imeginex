import React from 'react';

export default function AdminTable({ columns, children }) {
  return (
    <div className="w-full bg-[#111118]/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden font-['DM_Sans'] shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap text-left text-sm text-gray-300">
          <thead className="bg-[#0a0a0f]/50 text-xs uppercase tracking-wider text-gray-400 border-b border-white/10">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 font-semibold font-['Syne']">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}
