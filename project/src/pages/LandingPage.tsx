import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Volume2, VolumeX, Music } from 'lucide-react';
import NavBar from '../components/ui/NavBar';

const LandingPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  
  // Simulate loading A-Frame and assets
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Import A-Frame dynamically to avoid SSR issues
      import('aframe').then(() => {
        console.log('A-Frame loaded');
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };
  
  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };
  
  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900">
        <div className="w-16 h-16 border-t-4 border-b-4 border-primary-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-slate-300">Loading VR Environment...</p>
      </div>
    );
  }
  
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* VR Scene */}
      <a-scene embedded vr-mode-ui="enabled: true">
        <a-assets>
          <img id="sky" src="https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg" alt="VR background" />
        </a-assets>
        
        {/* Environment */}
        <a-sky src="#sky" rotation="0 -90 0"></a-sky>
        <a-entity ambient-particles="count: 200; color: #ffffff; size: 0.05"></a-entity>
        
        {/* Sample artworks floating in space */}
        <a-entity position="0 1.6 -3">
          <a-plane 
            src="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg" 
            width="3" 
            height="2" 
            artwork-interaction="title: Mountain Sunset; description: A beautiful mountain landscape at sunset"
            animation="property: position; to: 0 1.65 -3; dir: alternate; dur: 5000; easing: easeInOutSine; loop: true"
          ></a-plane>
        </a-entity>
        
        <a-entity position="-4 1.8 -2" rotation="0 45 0">
          <a-plane 
            src="https://images.pexels.com/photos/2693212/pexels-photo-2693212.png"
            width="2.5" 
            height="1.8" 
            artwork-interaction="title: Abstract Composition; description: Colorful abstract composition with geometric shapes"
            animation="property: position; to: -4 1.85 -2; dir: alternate; dur: 7000; easing: easeInOutSine; loop: true"
          ></a-plane>
        </a-entity>
        
        <a-entity position="4 1.7 -2" rotation="0 -45 0">
          <a-plane 
            src="https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg"
            width="2.5" 
            height="1.8" 
            artwork-interaction="title: Nebula; description: Colorful nebula in deep space"
            animation="property: position; to: 4 1.75 -2; dir: alternate; dur: 6000; easing: easeInOutSine; loop: true"
          ></a-plane>
        </a-entity>
        
        {/* Camera with cursor and controls */}
        <a-entity camera look-controls wasd-controls position="0 1.6 0">
          <a-entity cursor="fuse: true; fuseTimeout: 500" position="0 0 -1"
                    geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
                    material="color: white; shader: flat"
                    animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.1 0.1 0.1; to: 1 1 1"
                    animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 1 1 1; to: 0.1 0.1 0.1"
                    animation__mouseleave="property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 500; to: 1 1 1">
          </a-entity>
        </a-entity>
      </a-scene>
      
      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col">
        <NavBar transparent={true} />
        
        <div className="flex-grow flex items-center justify-center">
          <div className="glass-panel p-8 max-w-md text-center pointer-events-auto slide-up">
            <h1 className="text-4xl font-bold mb-2 text-white">VR Art Gallery</h1>
            <p className="text-xl text-slate-300 mb-6">Create and explore immersive virtual galleries</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore" className="btn btn-primary px-6 py-3">
                <span className="flex items-center justify-center">
                  Explore Galleries
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Link>
              <Link to="/login" className="btn btn-outline px-6 py-3">
                <span className="flex items-center justify-center">
                  Sign In
                </span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Audio controls */}
        <div className="p-4 flex justify-end pointer-events-auto">
          <div className="glass-panel p-2 flex space-x-2">
            <button 
              onClick={toggleAudio} 
              className="p-2 rounded-full hover:bg-slate-700"
            >
              {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>
            <button 
              onClick={toggleMusic} 
              className={`p-2 rounded-full hover:bg-slate-700 ${musicPlaying ? 'text-primary-500' : 'text-white'}`}
            >
              <Music className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;