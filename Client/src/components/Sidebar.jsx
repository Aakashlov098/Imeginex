import { Link, NavLink } from 'react-router-dom';
import { LayoutGrid, Compass, Sparkles, User } from 'lucide-react';
import UserAvatar from './UserAvatar';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const {user,profile} = useSelector((state)=> state.auth)
  const navItems = [
    { label: 'Home', icon: LayoutGrid, path: '/' },
    { label: 'Explore', icon: Compass, path: '/explore' },
    { label: 'Generate', icon: Sparkles, path: '/generate' },
    { label: 'My Profile', icon: User, path: `/profile/${user.name}` },
  ];

  return (
  <aside className="w-64 h-screen bg-[#0a0a0f] border-r border-white/5 flex flex-col justify-between py-6 sticky top-0">
    
    {/* Logo - sidebar ke andar */}
    <div>
      <div className="px-6 mb-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-shadow">
            <Sparkles className="text-white w-5 h-5 animate-pulse" />
          </div>
          <span className="font-syne font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Imaginex
          </span>
        </Link>
      </div>

      <nav className="px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-violet-600/20 text-violet-400 font-medium'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>

    {/* Mini Profile Card */}
    <div className="px-4 pb-4">
      <div className="bg-[#111118] border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center">
        <UserAvatar username={profile?.name?.slice(0,1)} size="lg" className="mb-3" />
        <h3 className="font-syne font-semibold text-white mt-2">{profile?.name}</h3>
        <p className="text-xs text-white/40 mt-1">{profile?.bio}</p>
        
        <div className="flex w-full mt-4 border-t border-white/10 pt-3">
          <div className="flex-1">
            <div className="text-white font-semibold">{profile?.following?.length}</div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">Following</div>
          </div>
          <div className="w-px bg-white/10 mx-2"></div>
          <div className="flex-1">
            <div className="text-white font-semibold">{profile?.followers?.length}</div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">Followers</div>
          </div>
        </div>
      </div>
    </div>
  </aside>
);
};

export default Sidebar;
