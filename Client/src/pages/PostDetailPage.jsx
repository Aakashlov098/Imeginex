import { useParams, Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Share2, Download, ArrowLeft } from "lucide-react";
import UserAvatar from "../components/UserAvatar";
import { FollowButtonPost } from "../components/FollowButton";
import LikeButton from "../components/LikeButton";
import MasonryGrid from "../components/MasonryGrid";
import { useDispatch, useSelector } from "react-redux";
import { getPost, likeUnlikePost } from "../features/Post/postSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { follow } from "../features/auth/authSlice";


const PostDetailPage = () => {

  const { postLoading, postSuccess, postErrorMessage, postError, post,posts } = useSelector((state) => state.post);
  const { profile,user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState();
  const [likes, setLikes] = useState();

  
  const handleLike = () => {
    dispatch(likeUnlikePost(post._id))
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  let alreadyFollowed = profile.following.some(follow => follow._id === post?.user?._id)
 

  // FOLLOW-USER
  const followUser = (id) => {
  dispatch(follow(id))
  }


  useEffect(() => {
    // FETCH POST
    dispatch(getPost(id));

    if(postError || postErrorMessage){
      toast.error(postErrorMessage || message, { position: "top-center" })
    }
  }, [id]);

  useEffect(() => {
  if(post) {
    setIsLiked(post?.likes?.includes(user?.id));
    setLikes(post?.likes?.length);
  }
  }, [post]);

  if(postLoading || !post){
    return <Loader/>
  }
  
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Feed</span>
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16">
        {/* Left: Large Image */}
        <div className="w-full lg:w-[65%] rounded-3xl overflow-hidden shadow-2xl shadow-black border border-white/5 bg-[#111118]">
          <img
            src={post?.imageLink}
            alt={post?.prompt || post?.caption}
            className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
          />
        </div>

        {/* Right: Details Panel */}
        <div className="w-full lg:w-[35%] flex flex-col space-y-8">
          <div>
            <h2 className="font-syne font-bold text-2xl text-white mb-4">
              Prompt Details
            </h2>
            <div className="bg-[#111118] border-l-2 border-violet-500 rounded-r-2xl p-5 shadow-lg relative">
              <p className="text-white/80 font-dm text-lg leading-relaxed italic z-10 relative">
                "{post.prompt}"
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Link
              to={`/profile/${post?.user?.name}`}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <UserAvatar
                // src={post.user.}
                username={post?.user?.name}
                size="lg"
              />
              <div>
                <p className="text-white font-syne font-semibold text-lg">
                  {post?.user?.name}
                </p>
                <p className="text-white/40 text-sm">{post?.user?.followers.length} Followers</p>
              </div>
            </Link>
            <FollowButtonPost
             
              isFollowing={alreadyFollowed}
              onToggle={() => followUser(post?.user?._id)}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 bg-[#111118] border border-white/5 rounded-2xl flex items-center justify-center p-4 shadow-md">
              <LikeButton
                isLiked={isLiked}
                count={likes}
                onToggle={handleLike}
              />
            </div>

            <button className="flex-1 bg-[#111118] border border-white/5 rounded-2xl flex items-center justify-center gap-2 p-4 shadow-md hover:bg-white/5 hover:border-violet-500/30 transition-all group">
              <Share2 className="w-5 h-5 text-white/70 group-hover:text-violet-400" />
              <span className="text-white font-medium">Share</span>
            </button>

            <button className="w-16 flex-shrink-0 bg-violet-600 border border-violet-500 rounded-2xl flex items-center justify-center p-4 shadow-[0_4px_15px_rgba(124,58,237,0.3)] hover:bg-violet-500 transition-all hover:-translate-y-1">
              <Download className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="bg-gradient-to-r from-violet-900/40 to-fuchsia-900/40 border border-violet-500/20 rounded-2xl p-6 mt-4">
            <h3 className="font-syne font-semibold text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
              Generation Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm mt-4">
              <div>
                <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">
                  Model
                </p>
                <p className="text-white/90">Midjourney v6</p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">
                  Aspect Ratio
                </p>
                <p className="text-white/90">4:5</p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">
                  Seed
                </p>
                <p className="text-white/90 font-mono text-xs mt-1">48291038</p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">
                  Style
                </p>
                <p className="text-white/90 inline-block px-2 py-0.5 bg-white/10 rounded">
                  Cinematic
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-syne font-semibold text-2xl text-white mb-6">
          More like this
        </h2>
        <MasonryGrid posts={posts} />
      </div>
    </div>
  );
};

export default PostDetailPage;
