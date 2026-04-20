import React from 'react';
import StatusBadge from './StatusBadge';
import ActionMenu from './ActionMenu';

export default function ReportRow({ report, onResolve, onDismiss, onRemoveContent }) {
  const actions = [
    { label: 'Resolve', icon: '✅', onClick: () => onResolve(report.id) },
    { label: 'Dismiss', icon: '❌', onClick: () => onDismiss(report.id) },
    { label: 'Remove Content', icon: '🗑️', onClick: () => onRemoveContent(report.id), variant: 'danger' }
  ];

  return (
    <tr className="hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0 group">
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
          report.type === 'post' 
            ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
            : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
        }`}>
          {report.type}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="max-w-xs truncate text-gray-300 font-medium" title={report.reason}>
          {report.reason}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <img src={report.reportedBy.avatar} alt={report.reportedBy.username} className="w-6 h-6 rounded-full" />
          <span className="text-gray-400 text-sm">{report.reportedBy.username}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        {report.type === 'post' ? (
          <img src={report.targetPreview} alt="target" className="w-10 h-10 rounded shadow-lg border border-white/10 object-cover" />
        ) : (
          <span className="text-white font-medium bg-white/5 px-2 py-1 rounded border border-white/5">@{report.targetPreview}</span>
        )}
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={report.status} />
      </td>
      <td className="px-6 py-4 text-gray-400 text-sm">
        {new Date(report.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 text-right">
        <ActionMenu actions={actions} />
      </td>
    </tr>
  );
}
