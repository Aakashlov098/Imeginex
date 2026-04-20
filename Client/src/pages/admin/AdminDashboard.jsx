import React, { useState } from 'react';
import { Users, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import AdminTable from '../../components/admin/AdminTable';

// Mock data
const mockUsers = [
  { id: 1, name: "Alice Cooper", email: "alice@example.com", avatar: "https://i.pravatar.cc/150?u=1", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", avatar: "https://i.pravatar.cc/150?u=2", role: "User", status: "Active" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", avatar: "https://i.pravatar.cc/150?u=3", role: "User", status: "Blocked" },
];

const mockPosts = [
  { id: 101, prompt: "A glowing futuristic city", author: "Bob Rossi", date: "2 hrs ago" },
  { id: 102, prompt: "Serene mountain landscape", author: "Charlie Puth", date: "5 hrs ago" },
];

export default function AdminDashboard() {
  const [recentUsers, setRecentUsers] = useState(mockUsers);
  const [recentPosts, setRecentPosts] = useState(mockPosts);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminStatsCard title="Total Users" value="12,450" icon={Users} />
        <AdminStatsCard title="Total Posts" value="84,320" icon={ImageIcon} />
        <AdminStatsCard title="Total Reports" value="142" icon={AlertTriangle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Users Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-['Syne'] text-white">Recent Users</h2>
          <AdminTable columns={['User', 'Role', 'Status']}>
            {recentUsers.map(user => (
              <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full border border-white/10" />
                    <div className="flex flex-col">
                      <span className="font-medium text-white group-hover:text-violet-300 transition-colors">{user.name}</span>
                      <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === 'Admin' ? 'bg-violet-500/20 text-violet-300' : 'bg-white/5 text-gray-400'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${user.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-pink-500/10 text-pink-400 border-pink-500/20'}`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </AdminTable>
        </div>

        {/* Recent Posts Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-['Syne'] text-white">Recent Posts</h2>
          <AdminTable columns={['Prompt', 'Author', 'Date']}>
            {recentPosts.map(post => (
              <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="max-w-[200px] truncate text-gray-200 font-medium group-hover:text-pink-300 transition-colors">
                    {post.prompt}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400">
                  {post.author}
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  {post.date}
                </td>
              </tr>
            ))}
          </AdminTable>
        </div>
      </div>
      
    </div>
  );
}
