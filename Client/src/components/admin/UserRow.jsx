import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import ActionMenu from './ActionMenu';

export default function UserRow({ user, onBan, onUnban, onDelete }) {
  const navigate = useNavigate();

  const actions = [
    { label: 'View Profile', icon: '👤', onClick: () => navigate(`/profile/${user.username}`) },
    user.status === 'banned'
      ? { label: 'Unban User', icon: '🔓', onClick: () => onUnban(user.id) }
      : { label: 'Ban User', icon: '⛔', onClick: () => onBan(user.id), variant: 'danger' },
    { label: 'Delete User', icon: '🗑️', onClick: () => onDelete(user.id), variant: 'danger' }
  ];

  return (
    <tr className="hover:bg-white/[0.02] transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full border border-white/10" />
          <div className="flex flex-col">
            <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">{user.username}</span>
            <span className="text-xs text-gray-500">{user.email}</span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-400' : 'bg-gray-500/10 text-gray-400'}`}>
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={user.status} />
      </td>
      <td className="px-6 py-4 text-center font-medium">
        {user.postsCount}
      </td>
      <td className="px-6 py-4 text-center font-medium">
        {user.followersCount}
      </td>
      <td className="px-6 py-4 text-gray-400">
        {new Date(user.joinedAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 text-right">
        <ActionMenu actions={actions} />
      </td>
    </tr>
  );
}
