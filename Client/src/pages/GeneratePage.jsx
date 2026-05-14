import { useState } from 'react';
import { Sparkles, Download, Share2, Loader2, Image as ImageIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePost } from '../features/Post/postSlice';
import Loader  from '../components/Loader';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'


const GeneratePage = () => {

  const {postLoading,postSuccess,postErrorMessage,postError,posts,post} = useSelector(state => state.post)
  const dispatch =  useDispatch()
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('');
  const [activeStyle, setActiveStyle] = useState('Realistic');
  const [activeRatio, setActiveRatio] = useState('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState(null);

  const styles = ['Realistic', 'Anime', 'Fantasy', 'Cyberpunk', 'Abstract', '3D Render'];
  const ratios = ['1:1', '4:3', '16:9', '9:16'];

  const handleGenerate = () => {
    if (!prompt) return;
    
    setIsGenerating(true);

    dispatch(generatePost(` ${prompt} with this style ${activeStyle}, and ratio will be ${activeRatio}`))

   
  };

  useEffect(() => {
  if (post && post.imageLink) {
    setResultImage(post.imageLink);
  }
}, [post]);

useEffect(() => {
  if (postSuccess || postError) {
    setIsGenerating(false);
    setPrompt("")
  }

  if (postError && postErrorMessage) {
    toast.error(postErrorMessage, {
      position: "top-center",
      theme: "dark"
    });
  }
}, [postSuccess, postError, postErrorMessage]);



  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto pb-24">
     {postLoading && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.85)',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px'
  }}>
    <Loader2 className="w-16 h-16 text-violet-400 animate-spin" />
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
        Creating Your Masterpiece...
      </p>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginTop: '8px' }}>
        Please wait, your image is being generated
      </p>
    </div>
  </div>
)}

      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-violet-600/20 rounded-xl border border-violet-500/30">
          <Sparkles className="w-6 h-6 text-violet-400" />
        </div>
        <h1 className="font-syne font-bold text-3xl md:text-4xl text-white">
          Generate AI Art
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Controls */}
        <div className="space-y-6">
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-5 shadow-xl shadow-black/50">
            <label className="block text-sm font-medium text-white/70 mb-2">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your imagination in detail..."
              rows={4}
              className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-white/30 resize-none font-dm leading-relaxed"
            ></textarea>
          </div>

          <div className="bg-[#111118] border border-white/5 rounded-2xl p-5 shadow-xl shadow-black/50">
            <label className="block text-sm font-medium text-white/70 mb-3">Style</label>
            <div className="flex flex-wrap gap-2">
              {styles.map(s => (
                <button
                  key={s}
                  onClick={() => setActiveStyle(s)}
                  className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                    activeStyle === s
                      ? 'bg-violet-600 text-white border border-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                      : 'bg-[#0a0a0f] text-white/70 border border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#111118] border border-white/5 rounded-2xl p-5 shadow-xl shadow-black/50">
            <label className="block text-sm font-medium text-white/70 mb-3">Aspect Ratio</label>
            <div className="flex flex-wrap gap-2">
              {ratios.map(r => (
                <button
                  key={r}
                  onClick={() => setActiveRatio(r)}
                  className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                    activeRatio === r
                      ? 'bg-violet-600 text-white border border-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                      : 'bg-[#0a0a0f] text-white/70 border border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt || isGenerating}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all duration-300 ${
              !prompt 
                ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5' 
                : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 shadow-[0_5px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_8px_25px_rgba(124,58,237,0.6)] transform hover:-translate-y-1'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Creating Magic...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>

        {/* Right Result Preview */}
        <div className="bg-[#111118] border border-white/5 rounded-2xl p-4 shadow-xl shadow-black/50 flex flex-col items-center justify-center min-h-[400px] lg:min-h-full overflow-hidden relative group">
          {resultImage ? (
            <>
              <img 
                src={resultImage} 
                alt="Generated AI Art"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                {/* <button className="px-5 py-2.5 bg-black/80 backdrop-blur border border-white/20 text-white rounded-full flex items-center gap-2 hover:bg-black hover:border-violet-500 transition-all text-sm font-medium">
                  <Share2 className="w-4 h-4" /> Share to Feed
                </button> */}
                <button className="px-5 py-2.5 bg-black/80 backdrop-blur border border-white/20 text-white rounded-full flex items-center gap-2 hover:bg-black hover:border-violet-500 transition-all text-sm font-medium">
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            </>
          ) : (
             <div className="text-center text-white/30 flex flex-col items-center">
                <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                <p>Your creation will appear here</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
