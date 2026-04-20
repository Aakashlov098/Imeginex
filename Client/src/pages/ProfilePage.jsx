import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MasonryGrid from '../components/MasonryGrid';
import UserAvatar from '../components/UserAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { follow, getProfile, unfollow } from '../features/auth/authSlice';
import Loader from '../components/Loader';
import { Calendar, CircleDollarSign } from 'lucide-react';
import { toast } from 'react-toastify';
import { FollowButton } from '../components/FollowButton';

const ProfilePage = () => {
 
  const { username } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {profile,isLoading,isError,message,user} = useSelector((state)=> state.auth)
  const {post} = useSelector((state)=> state.post)
  const isOwnProfile = username === 'me' || username === user?.name;
  
  const [activeTab, setActiveTab] = useState('Posts');
  

  
  let alreadyFollowed = profile?.followers?.some(follow => follow._id === user?.id)??false;
 
  const handleFollowUnfollow = async(id)=>{
    if(alreadyFollowed){
    await dispatch(unfollow(id))
    }
    else{
    await dispatch(follow(id))
    }

    dispatch(getProfile(username));
  }
    
  console.log("URL username:", username);
  console.log("Logged in user:", user?.username, user);
  useEffect(() => {
    dispatch(getProfile(username));
  }, [username, dispatch]);
  

  useEffect(() => {
    if (isError && message) {
      toast.error(message, { position: "top-center", theme: "dark" });
      navigate('/*', { replace: true });
    }
  }, [isError, message]);

  if(isLoading){
    return(
      <Loader/>
    )
  }
  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Cover Image & Basic Info */}
      <div className="relative">
        <div className="w-full h-48 md:h-64 bg-gradient-to-r from-violet-900 to-[#111118]"></div>
        
        <div className="px-6 md:px-12 flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8 -mt-16 sm:-mt-20 relative z-10 mb-8">
          <UserAvatar 
            username={profile?.name?.split(' ').map(n => n[0]).join('')}
            size="xl" 
            className="ring-4 ring-[#0a0a0f] shadow-2xl" 
          />
          
          <div className="flex-1 text-center sm:text-left ">
            <h1 className="font-syne font-bold text-3xl text-white">
              {profile?.name}
            </h1>
            <p className="text-white/60 mt-2 max-w-lg mx-auto sm:mx-0 text-sm">
              {profile?.bio}        </p>
               <div className="flex gap-6 text-sm text-gray-400 mt-2">
                  <div className="flex items-center gap-1.5"><CircleDollarSign className="w-4 h-4" /> Credits : {profile?.credits}</div>
                  <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined {new Date(profile?.createdAt).toLocaleDateString('en-IN')}</div>
          </div>
          </div>
         
         

          {!isOwnProfile && (
            <div className="sm:pb-2">
              <FollowButton 
                isFollowing={alreadyFollowed}
                onToggle={() => handleFollowUnfollow(profile?._id)} 
              />
            </div>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex justify-center sm:justify-start gap-8 px-6 md:px-12 mb-10 border-b border-white/10 pb-6">
        <div className="text-center sm:text-left cursor-pointer hover:opacity-80 transition-opacity">
          <div className="font-bold text-xl text-white">{profile?.posts?.length}</div>
          <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Posts</div>
        </div>
        <div className="text-center sm:text-left cursor-pointer hover:opacity-80 transition-opacity">
          <div className="font-bold text-xl text-white">{profile?.followers?.length}</div>
          <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Followers</div>
        </div>
        <div className="text-center sm:text-left cursor-pointer hover:opacity-80 transition-opacity">
          <div className="font-bold text-xl text-white">{profile?.following?.length}</div>
          <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Following</div>
        </div>
      </div>

      <div className="px-6 md:px-12">
        {/* Tabs */}
        <div className="flex gap-8 border-b border-white/10 mb-8 max-w-md mx-auto sm:mx-0">
          {['Posts', 'Liked'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 font-medium transition-all text-sm relative ${
                activeTab === tab 
                  ? 'text-white' 
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-violet-500 rounded-t-full shadow-[0_-2px_10px_rgba(124,58,237,0.5)]"></span>
              )}
            </button>
          ))}
        </div>

        <MasonryGrid posts={profile?.posts} />
      </div>
    </div>
  );
};

export default ProfilePage;
