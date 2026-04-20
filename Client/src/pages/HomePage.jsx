import { useState, useMemo, useEffect } from "react";
import MasonryGrid from "../components/MasonryGrid";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../features/Post/postSlice";
import Loader from "../components/Loader";
import { getProfile } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const HomePage = () => {
  const { postLoading, postSuccess, postErrorMessage, postError, posts} = useSelector((state) => state.post);
  const { profile,user,isError,message} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("Latest");
  
  
  const filteredPosts = posts?.filter(post =>
    profile?.following?.some(follow =>
      follow._id === post.user._id
    )
  ).filter(post => post.isPublished)


  

  useEffect(() => {

    // GET POST
    dispatch(getPosts());

     // Fetch Profile
    if (user) {
      dispatch(getProfile(user?.name))
    }

    if (postError && postErrorMessage || isError && message) {
      toast.error(postErrorMessage || message, { position: "top-center" })
    }
  }, [user,postError,postErrorMessage,isError,message]);

  if (postLoading || !filteredPosts) {
    return <Loader />;
  }
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="font-syne font-bold text-3xl md:text-4xl text-white">
          Your Feed
        </h1>

        {/* Tabs */}
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10 w-max">
          <button
            className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-violet-600 shadow-[0_0_15px_rgba(124,58,237,0.4)] text-white ">
            Following
          </button>
        </div>
      </div>

      <MasonryGrid posts={filteredPosts} />
    </div>
  );
};

export default HomePage