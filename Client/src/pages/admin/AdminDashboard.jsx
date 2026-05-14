import React, { useState } from 'react';
import { Users, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import AdminTable from '../../components/admin/AdminTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllPosts, getAllReports, getAllUsers } from '../../features/admin/adminSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import UserAvatar from '../../components/UserAvatar';
import { Link } from 'react-router-dom';



export default function AdminDashboard() {

  const {users,posts,reports,adminLoading,adminSuccess,adminError,adminErrorMessage,} = useSelector(state => state.admin)

  const [recentUsers, setRecentUsers] = useState(users);
  const [recentPosts, setRecentPosts] = useState(posts);

  const dispatch = useDispatch()


  useEffect(()=>{

    if(adminLoading){
      return (
        <Loader/>
      )
    }

    if(!adminError){
      // Fetch All User
      dispatch(getAllUsers())
      // Fetch All Posts
      dispatch(getAllPosts())
      // Fetch All REPORTS
      dispatch(getAllReports())
    }
    
    if(adminError && adminErrorMessage){
      toast.error(adminErrorMessage,{position : "top-center"})
    }
  },[adminError,adminErrorMessage])


  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminStatsCard title="Total Users" value={users?.length} icon={Users} />
        <AdminStatsCard title="Total Posts" value={posts?.length} icon={ImageIcon} />
        <AdminStatsCard title="Total Reports" value={reports?.length} icon={AlertTriangle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Users Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-['Syne'] text-white">Recent Users</h2>
          <AdminTable columns={['User', 'Role', 'Status']}>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                   <UserAvatar username={user.name.slice(0, 1)} size="sm" /> <div className="flex flex-col">
                      <Link to={`/profile/${user.name}`}><span className="font-medium text-white group-hover:text-violet-300 transition-colors">{user.name}</span>
                     </Link>
                       <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${user?.isAdmin ? 'bg-violet-500/20 text-violet-300' : 'bg-white/5 text-gray-400'}`}>
                    {user?.isAdmin ? "ADMIN" : "USER"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${user?.isActive? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-pink-500/10 text-pink-400 border-pink-500/20'}`}>
                    {user?.isActive ? "ACTIVE" : "BLOCKED"}
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
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="max-w-[200px] truncate text-gray-200 font-medium group-hover:text-pink-300 transition-colors">
                    {post?.prompt || post?.caption}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400">
                  {post?.user?.name}
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  {new Date(post?.createdAt).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))}
          </AdminTable>
        </div>
      </div>
      
    </div>
  );
}
