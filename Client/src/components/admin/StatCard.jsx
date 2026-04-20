import React from 'react';

export default function StatCard({ title, value, change, changeType, icon, color }) {
  const colorStyles = {
    cyan: { iconBg: 'bg-cyan-500/10 text-cyan-400', shadow: 'shadow-cyan-500/10' },
    purple: { iconBg: 'bg-purple-500/10 text-purple-400', shadow: 'shadow-purple-500/10' },
    pink: { iconBg: 'bg-pink-500/10 text-pink-400', shadow: 'shadow-pink-500/10' },
    green: { iconBg: 'bg-green-500/10 text-green-400', shadow: 'shadow-green-500/10' }
  };

  const style = colorStyles[color] || colorStyles.cyan;

  return (
    <div className={`bg-[#13131f] border border-white/5 rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-200 shadow-lg ${style.shadow}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${style.iconBg}`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-white font-['Space_Grotesk'] mb-2">
        {value}
      </div>
      <div className="flex items-center text-sm">
        {changeType === 'up' ? (
          <span className="text-green-400 flex items-center gap-1 font-medium">
            ↗ {change}
          </span>
        ) : (
          <span className="text-red-400 flex items-center gap-1 font-medium">
            ↘ {change}
          </span>
        )}
        <span className="text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  );
}
