import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import ActionMenu from './ActionMenu';
import { publishUnPublishPost } from '../../features/admin/adminSlice';

export default function PostRow({ post, onRemove, onRestore }) {
  const navigate = useNavigate();

  const actions = [
    { label: 'View Post', icon: '👁️', onClick: () => navigate(`/post/${post.id}`) },
    post.status === 'removed'
      ? { label: 'Restore Post', icon: '🔄', onClick: () => onRestore(post.id) }
      : { label: 'Remove Post', icon: '🗑️', onClick: () => onRemove(post.id), variant: 'danger' }
  ];

  const handlePublishUnpublishPost = (pid) => {
    dispatch(publishUnPublishPost(pid))
  }

  return (
    <tr className="hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0 group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img src={post.imageUrl} alt="post thumbnail" className="w-12 h-12 rounded-lg object-cover border border-white/10" />
          <div className="max-w-xs truncate text-sm text-gray-300 font-medium" title={post.prompt}>
            {post.prompt}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <img src={post.author.avatar} alt={post.author.username} className="w-6 h-6 rounded-full" />
          <span className="text-gray-300">{post.author.username}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-pink-400 font-medium bg-pink-400/10 px-2 py-0.5 rounded-lg w-max">
          ❤️ <span>{post.likes}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className={`flex items-center gap-1.5 font-medium px-2 py-0.5 rounded-lg w-max ${post.reportCount > 0 ? 'text-red-400 bg-red-400/10' : 'text-gray-400'}`}>
          🚨 <span>{post.reportCount}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={post.status} />
      </td>
      <td className="px-6 py-4 text-gray-400 text-sm">
        {new Date(post.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 text-right">
        <ActionMenu actions={actions} />
      </td>
    </tr>
  );
}
