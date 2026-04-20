import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import MasonryGrid from '../components/MasonryGrid';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const ExplorePage = () => {

  const {postLoading,postSuccess,postErrorMessage,postError,posts} = useSelector(state => state.post)

  const trendingTags = ['#fantasy', '#cyberpunk', '#portrait', '#landscape', '#anime', '#abstract', '#scifi', '#3drender'];

    if(postLoading){
      return <Loader/>
    }
  return (
    <div className="pb-8">
      {/* Hero Banner */}
      <div className="relative w-full h-80 bg-gradient-to-br from-violet-900 via-fuchsia-900 to-[#0a0a0f] overflow-hidden flex flex-col items-center justify-center text-center px-4">
        {/* Abstract shapes in bg */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse delay-1000"></div>
        
        <h1 className="font-syne font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 z-10 drop-shadow-lg">
          Explore AI Creations
        </h1>
        
        <div className="w-full max-w-2xl relative z-10 group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-white/50 group-focus-within:text-violet-400 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search the universe of art..."
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-4 pl-12 pr-6 text-white text-lg focus:outline-none focus:border-violet-500 focus:bg-white/20 focus:ring-2 focus:ring-violet-500/50 transition-all placeholder:text-white/50 shadow-xl"
          />
        </div>
      </div>

      {/* Tags Row */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 -mt-6 relative z-20 mb-10">
        <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-4 items-center">
          {trendingTags.map(tag => (
            <button key={tag} className="flex-shrink-0 px-5 py-2.5 bg-[#111118]/80 backdrop-blur-sm border border-white/10 text-white hover:border-violet-500/50 hover:bg-violet-900/40 rounded-full text-sm font-medium transition-all shadow-lg select-none whitespace-nowrap">
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="font-syne font-semibold text-2xl text-white mb-6">Trending Today</h2>
        <MasonryGrid posts={posts} />
      </div>
    </div>
  );
};

export default ExplorePage;
