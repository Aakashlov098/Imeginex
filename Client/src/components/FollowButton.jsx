export const FollowButton = ({ isFollowing, onToggle }) => {
  return (
    <button
      
      onClick={onToggle}
      className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all duration-300 ${
        isFollowing
          ? 'bg-violet-600/20 text-violet-400 border border-violet-600/50 hover:bg-violet-600/30'
          : 'bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.4)]'
      }`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};


export const FollowButtonPost = ({ isFollowing, onToggle }) => {
  return (
    <button
      disabled = {isFollowing}
      onClick={onToggle}
      className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all duration-300 ${
        isFollowing
          ? 'bg-violet-600/20 text-violet-400 border border-violet-600/50 hover:bg-violet-600/30'
          : 'bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.4)]'
      }`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};


