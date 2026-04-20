import { User } from 'lucide-react';

const UserAvatar = ({ src, username, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-2xl',
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div 
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden bg-violet-900 ring-2 ring-violet-500 flex-shrink-0 ${sizeClasses[size]}`}
      title={username}
    >
      {src ? (
        <img 
          src={src} 
          alt={username || 'Avatar'} 
          className="w-full h-full object-cover" 
          loading="lazy"
        />
      ) : (
        <span className="font-syne font-semibold text-white">
          {getInitials(username)}
        </span>
      )}
    </div>
  );
};

export default UserAvatar;
