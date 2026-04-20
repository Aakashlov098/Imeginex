import { Heart } from 'lucide-react';

const LikeButton = ({ isLiked, count, onToggle }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // Prevent navigating if inside a link map
        onToggle();
      }}
      className="flex items-center gap-1.5 group/btn"
    >
      <div className={`p-1.5 rounded-full transition-all duration-200 active:scale-125 ${
        isLiked 
          ? 'bg-red-500/20 text-red-500' 
          : 'bg-white/10 text-white hover:bg-white/20'
      }`}>
        <Heart size={18} className={isLiked ? 'fill-red-500' : ''} />
      </div>
      <span className="text-sm font-medium text-white drop-shadow-md">
        {count}
      </span>
    </button>
  );
};

export default LikeButton;
