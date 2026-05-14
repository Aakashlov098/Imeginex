import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import LikeButton from './LikeButton';
import { useState } from 'react';

const heights = ['h-48', 'h-64', 'h-72', 'h-56', 'h-80', 'h-52'];
const PostCard = ({ post,index }) => {

  const heightClass = heights[index % heights.length];
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);


  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
     <div className="relative rounded-2xl overflow-hidden mb-4 group block bg-[#111118] break-inside-avoid">
      <Link to={`/post/${post._id}`} className="block w-full h-full relative">
        <img 
          src={post.imageLink} 
          alt={post?.prompt || post?.caption} 
          className={`w-full ${heightClass} object-cover scale-100 group-hover:scale-105 transition-transform duration-500 ease-in-out`}
          loading="lazy"
        />
        
        {/* Overlay */} 
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-white text-sm line-clamp-2 mb-3 font-medium drop-shadow-md">
            {post.prompt || post?.caption}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserAvatar 
                src={post?.user?.avatar} 
                username={post?.user?.name} 
                size="sm" 
              />
              <span className="text-white/90 text-xs font-medium hover:underline drop-shadow-md">
                {post?.user?.name}
              </span>
            </div>

            {/* Stop propagation so clicking like doesn't navigate */}
            <div onClick={(e) => e.preventDefault()}>
              <LikeButton 
                isLiked={isLiked} 
                count={likes.length} 
                onToggle={handleLike} 
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
