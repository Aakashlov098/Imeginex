import PostCard from './PostCard';

const MasonryGrid = ({ posts }) => {
  const publishedPosts = posts?.filter(post => post.isPublished) ?? []; 
  if (!publishedPosts || publishedPosts.length === 0) {
    return (
      <div className="text-center py-20 text-white/50">
        No creations to show
      </div>
    );
  }

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
      {publishedPosts.map((post, index) => (
        <PostCard key={post._id} post={post} index={index} />
      ))}
    </div>
  );
};

export default MasonryGrid;