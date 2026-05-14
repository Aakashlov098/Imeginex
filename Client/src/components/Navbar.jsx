import { Link, useNavigate } from 'react-router-dom';
import { Search, Sparkles, Bell, Compass, ChevronDown } from 'lucide-react';
import UserAvatar from './UserAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';

const Navbar = () => {
  const {user} = useSelector((state)=> state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout =()=>{
    dispatch(logoutUser())
    navigate("/")
  }
  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 lg:px-8">
      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        {/* <div className="p-1.5 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-shadow">
          <Sparkles className="text-white w-5 h-5 animate-pulse" />
        </div> */}
        <span className="font-syne font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
          Imaginex
        </span>
      </Link>

      {/* Center: Search  */}
      {/* <div className="hidden md:flex flex-1 max-w-xl mx-8 relative group">
         <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-white/40 group-focus-within:text-violet-400 transition-colors" />
        </div>
        <input 
          type="text" 
          placeholder="Search creators, prompts..."
          className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:bg-white/10 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-white/30"
        />
      </div> */}

      {/* Right: Icons & Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        <Link to="/explore" className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-full transition-colors hidden sm:block" title="Explore">
          <Compass className="w-5 h-5" />
        </Link>
        <Link to="/generate" className="p-2 text-white/70 hover:text-violet-400 hover:bg-violet-500/10 rounded-full transition-colors" title="Generate">
          <Sparkles className="w-5 h-5" />
        </Link>
        <button className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-pink-500 rounded-full"></span>
        </button>

        <div className="relative group ml-1">
          <button className="flex items-center gap-1.5 p-1 rounded-full hover:bg-white/5 transition-colors">
            <UserAvatar username={user?.name?.slice(0,1)} size="sm" />
            <ChevronDown className="w-4 h-4 text-white/50" />
          </button>
          
          <div className="absolute right-0 mt-2 w-48 bg-[#111118] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right scale-95 group-hover:scale-100 z-50 top-full">
            <div className="p-2">
              <Link to={`/profile/${user.name}`} className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
