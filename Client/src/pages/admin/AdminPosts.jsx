import React, { useState } from 'react';
import { Trash2, Edit2 } from 'lucide-react';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';

const initialPosts = Array.from({ length: 5 }).map((_, i) => ({
  id: 101 + i,
  thumbnail: `https://picsum.photos/seed/${i + 1}/80/80`,
  prompt: `A beautiful AI generated artwork featuring ${['cyberpunk', 'fantasy', 'abstract', 'nature', 'space'][i % 5]} theme with highly detailed elements.`,
  author: `Creator ${i + 1}`,
  likes: Math.floor(Math.random() * 5000),
  status: i === 2 ? 'Flagged' : 'Active'
}));

export default function AdminPosts() {
  const [posts, setPosts] = useState(initialPosts);
  const [editingPost, setEditingPost] = useState(null);

  // Handlers for "API" actions
  const deletePost = (postId) => {
    // TODO: replace with API call: deletePost()
    setPosts(posts.filter(p => p.id !== postId));
  };

  const savePostEdits = (e) => {
    e.preventDefault();
    // TODO: replace with API call: updatePost()
    setPosts(posts.map(p => p.id === editingPost.id ? editingPost : p));
    setEditingPost(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-[#111118]/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
        <div>
          <h2 className="text-2xl font-bold font-['Syne'] text-white">Post Management</h2>
          <p className="text-sm text-gray-400">Moderate platform content and generation logs</p>
        </div>
        <div className="bg-pink-500/20 text-pink-400 px-4 py-2 rounded-xl font-bold border border-pink-500/20">
          {posts.length} Total
        </div>
      </div>

      <AdminTable columns={['Thumbnail / Prompt', 'Author', 'Likes', 'Status', 'Actions']}>
        {posts.map(post => (
          <tr key={post.id} className="hover:bg-white/5 transition-colors group">
            <td className="px-6 py-4">
              <div className="flex items-center gap-4">
                <img src={post.thumbnail} alt="thumbnail" className="w-16 h-16 rounded-xl object-cover border border-white/10 shadow-lg" />
                <div className="max-w-xs truncate text-gray-200 font-medium group-hover:text-pink-300 transition-colors" title={post.prompt}>
                  {post.prompt}
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <span className="text-gray-300 bg-white/5 px-2 py-1 rounded-lg border border-white/5">@{post.author}</span>
            </td>
            <td className="px-6 py-4">
              <span className="text-pink-400 font-bold bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/20 flex items-center gap-1.5 w-max">
                <span className="text-xs">❤️</span> {post.likes}
              </span>
            </td>
            <td className="px-6 py-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${post.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-pink-500/10 text-pink-400 border-pink-500/20'}`}>
                {post.status}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => setEditingPost(post)}
                  className="p-2 bg-white/5 hover:bg-violet-500/20 text-gray-400 hover:text-violet-400 rounded-lg transition-all"
                  title="Edit Post"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => deletePost(post.id)}
                  className="p-2 bg-white/5 hover:bg-pink-500/20 text-gray-400 hover:text-pink-400 rounded-lg transition-all"
                  title="Delete Post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      <AdminModal 
        isOpen={!!editingPost} 
        onClose={() => setEditingPost(null)} 
        title="Edit Post Status"
      >
        {editingPost && (
          <form onSubmit={savePostEdits} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Prompt</label>
              <textarea 
                disabled 
                value={editingPost.prompt} 
                className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-2 text-gray-500 cursor-not-allowed resize-none h-24" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Status</label>
              <select 
                value={editingPost.status} 
                onChange={(e) => setEditingPost({...editingPost, status: e.target.value})}
                className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-violet-500"
              >
                <option value="Active">Active</option>
                <option value="Flagged">Flagged</option>
              </select>
            </div>
            <div className="pt-4 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 hover:brightness-110 text-white font-medium transition-all"
              >
                Save Updates
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
