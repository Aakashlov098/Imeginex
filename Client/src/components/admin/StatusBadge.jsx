import React from 'react';

export default function StatusBadge({ status }) {
  const styles = {
    active: 'bg-green-500/10 text-green-400 border-green-500/20',
    banned: 'bg-red-500/10 text-red-400 border-red-500/20',
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    resolved: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    flagged: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    removed: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  };

  const selectedStyle = styles[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border capitalize ${selectedStyle}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
      {status}
    </span>
  );
}
