import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const LoginPage = () => {

  const {user,isLoading,isSuccess,isError,message}= useSelector((state)=> state.auth)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginUser({email,password}))
      // Main app manages auth state, so ProtectedRoute will handle router swap
    }
  };
   useEffect(()=>{
      if(user){
        navigate("/")
      }
  
      if(isError && message){
        toast.error(message,{position : "top-center"})
      }
    },[user,isError,message])
  
    if(isLoading){
      return (
        <Loader/>
    )}

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Left side branding */}
      <div className="hidden lg:flex w-1/2 relative bg-black overflow-hidden flex-col justify-between p-12">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute top-0 -left-1/4 w-full h-full bg-violet-600 rounded-full mix-blend-screen filter blur-[150px] animate-pulse"></div>
           <div className="absolute bottom-0 -right-1/4 w-full h-full bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[150px] animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <span className="font-syne font-bold text-3xl text-white">Imaginex</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="font-syne font-bold text-5xl text-white leading-tight mb-6">
            Where AI Meets <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Creativity.
            </span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed font-dm">
            Join the global community of creators generating breathtaking art, exploring new styles, and pushing the boundaries of imagination.
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative animate-fade-in">
        {/* Mobile branding */}
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-violet-500" />
          <span className="font-syne font-bold text-xl text-white">Imaginex</span>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="font-syne font-bold text-3xl text-white mb-3">Welcome back</h2>
            <p className="text-white/50">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111118] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-white/20"
                placeholder="hello@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-white/70" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111118] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-white/20"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold py-4 rounded-xl shadow-[0_5px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_8px_25px_rgba(124,58,237,0.5)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Log in
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-white/50 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-white font-medium hover:text-violet-400 transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
