import React, { useState, useEffect } from 'react';
import { 
  Feather, 
  Sparkles, 
  ArrowRight,
  Play
} from 'lucide-react';

  import { useNavigate } from 'react-router-dom';

export default function QuillLuxHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);



// Inside component:
const navigate = useNavigate();
const handleGetStarted = () => navigate('/Signup');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-600 to-slate-900 relative overflow-hidden">


      {/* Hero Section */}
      
        <div className="max-w-7xl mx-auto text-center mt-10 w-full">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-8 hover:bg-purple-500/20 transition-colors">
              <Sparkles className="w-4 h-4 text-orange-600 mr-2 animate-pulse" />
              <span className="text-orange-300 text-sm font-medium">Powered by Gemini AI</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Content Creation
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-white bg-clip-text text-transparent animate-gradient">
                Reimagined
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Transform your ideas into compelling content with QuillLux's AI-powered writing assistant. 
              Create blogs, articles, social media posts, and more in minutes.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button 
              
              onClick={handleGetStarted}
              className="group bg-gradient-to-r from-orange-800 to-orange-500 px-8 py-4 rounded-full text-white font-semibold text-lg hover:scale-105 transition-all duration-300 flex items-center shadow-2xl hover:shadow-purple-500/25">
                Start Writing Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all duration-300 flex items-center">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            
          </div>
        </div>

        

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>
      

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}