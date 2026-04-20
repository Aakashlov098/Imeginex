import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  
  const {user,isLoading,isSuccess,isError,message}= useSelector((state)=> state.auth)
  const navigate =  useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: '',
    phone : '',
    email: '',
    bio : '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password === formData.confirmPassword) {
      dispatch(registerUser(formData))
    //   setFormData({
    //   name: '',
    //   phone: '',
    //   email: '',
    //   bio: '',
    //   password: '',
    //   confirmPassword: ''
    // });
    } else {
      alert("Passwords don't match!");
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
    return (<h1>Loading.....</h1>
  )}
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
       {/* Left side branding */}
       <div className="hidden lg:flex w-1/2 relative bg-black overflow-hidden flex-col justify-between p-12">
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
            Start Your <br/>
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Journey.</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed font-dm">
            Join thousands of artists creating stunning AI visuals. Explore to find inspiration, then build upon it with your own voice.
          </p>
        </div>
      </div>

      {/* Right side form block */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative animate-fade-in">
        {/* Mobile branding */}
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-violet-500" />
          <span className="font-syne font-bold text-xl text-white">Imaginex</span>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="font-syne font-bold text-3xl text-white mb-2">Create an account</h2>
            <p className="text-white/50">It's completely free to join</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
             <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5" htmlFor="name">
                Username
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#111118] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-white/20"
                placeholder="creative_mind"
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#111118] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-white/20"
                placeholder="+911234567890"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#111118] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-white/20"
                placeholder="hello@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5" htmlFor="bio">
               Your Bio
              </label>
              <textarea
                id="bio"
                type="text"
                required
                value={formData.bio}
                onChange={handleChange}
                className="w-full bg-[#111118] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-white/20"
                placeholder="Enter Your Bio"></textarea>
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-4 mt-2">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#111118] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-white/20"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#111118] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-white/20"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold py-4 rounded-xl shadow-[0_5px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_8px_25px_rgba(124,58,237,0.5)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Sign Up
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-white/50 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-white font-medium hover:text-violet-400 transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
