import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, VolumeX, Volume2 } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';
import { textures } from '../data/sampleData';

// Import A-Frame dynamically (avoid SSR issues)
import 'aframe';

const VRViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getGalleryById } = useGallery();
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    if (id) {
      const galleryData = getGalleryById(id);
      if (galleryData) {
        setGallery(galleryData);
      }
    }
    
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [id, getGalleryById]);
  
  // Handle audio toggle
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    
    // Play or pause background music
    const bgMusic = document.getElementById('bg-music') as HTMLAudioElement;
    if (bgMusic) {
      if (audioEnabled) {
        bgMusic.pause();
      } else {
        bgMusic.play();
      }
    }
  };
  
  // Hide overlay after a few seconds
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [loading]);
  
  if (loading || !gallery) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900">
        <div className="w-16 h-16 border-t-4 border-b-4 border-primary-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-slate-300">Loading VR Environment...</p>
      </div>
    );
  }
  
  // Get texture URLs for floor, walls, etc.
  const getTextureUrl = (type: 'floors' | 'walls' | 'ceilings', id: string) => {
    const texture = textures[type].find(t => t.id === id);
    return texture?.url || '';
  };
  
  const floorTextureUrl = getTextureUrl('floors', gallery.floorTexture);
  const ceilingTextureUrl = getTextureUrl('ceilings', gallery.ceilingTexture);

  // Calculate layout parameters with validation
  const hasArtworks = gallery.artworks.length > 0;
  const layoutRadius = hasArtworks
    ? (gallery.layout === 'circular' || gallery.layout === 'corridor' ? 5.5 : 9.5)
    : 0;
  const layoutSpacing = hasArtworks ? (gallery.layout === 'grid' ? 3 : 2) : 0;
  const layoutHeight = hasArtworks ? 1.6 : 0;
  
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* VR Scene */}
      <a-scene embedded vr-mode-ui="enabled: true">
        <a-assets>
          {/* Background music */}
          {gallery.backgroundMusic && (
            <audio id="bg-music" src={gallery.backgroundMusic} preload="auto" crossOrigin="anonymous"></audio>
          )}
          
          {/* Textures */}
          {floorTextureUrl && <img id="floor-texture" src={floorTextureUrl} alt="Floor texture" crossOrigin="anonymous" />}
          {ceilingTextureUrl && <img id="ceiling-texture" src={ceilingTextureUrl} alt="Ceiling texture" crossOrigin="anonymous" />}
          
          {/* Artwork images */}
          {gallery.artworks.map((artwork, index) => (
            <img 
              key={artwork.id} 
              id={`artwork-${index}`} 
              src={artwork.imageUrl} 
              alt={artwork.title}
              crossOrigin="anonymous"
            />
          ))}
        </a-assets>
        
        {/* Environment */}
        <a-entity ambient-particles="count: 150; color: #ffffff; size: 0.03"></a-entity>
        
        {/* Room/Gallery structure based on layout */}
        {gallery.layout === 'circular' && (
          <a-entity>
            {/* Floor */}
            <a-cylinder 
              position="0 0 0" 
              radius="6" 
              height="0.1" 
              segments-radial="36"
              material={floorTextureUrl ? `src: #floor-texture; repeat: 5 5` : `color: #333333`}
            ></a-cylinder>
            
            {/* Ceiling */}
            <a-cylinder 
              position="0 4 0" 
              radius="6" 
              height="0.1" 
              segments-radial="36"
              material={ceilingTextureUrl ? `src: #ceiling-texture; repeat: 5 5` : `color: #111111`}
            ></a-cylinder>
            
            {/* Circular wall */}
            <a-cylinder 
              position="0 2 0" 
              radius="6" 
              height="4" 
              open-ended="true"
              side="double"
              segments-radial="36"
              material={`color: ${gallery.wallColor}; side: double`}
            ></a-cylinder>
          </a-entity>
        )}
        
        {gallery.layout === 'corridor' && (
          <a-entity>
            {/* Floor */}
            <a-plane 
              position="0 0 0" 
              rotation="-90 0 0" 
              width="12" 
              height="24"
              material={floorTextureUrl ? `src: #floor-texture; repeat: 6 12` : `color: #333333`}
            ></a-plane>
            
            {/* Ceiling */}
            <a-plane 
              position="0 4 0" 
              rotation="90 0 0" 
              width="12" 
              height="24"
              material={ceilingTextureUrl ? `src: #ceiling-texture; repeat: 6 12` : `color: #111111`}
            ></a-plane>
            
            {/* Walls */}
            <a-plane 
              position="6 2 0" 
              rotation="0 -90 0" 
              width="24" 
              height="4"
              material={`color: ${gallery.wallColor}`}
            ></a-plane>
            <a-plane 
              position="-6 2 0" 
              rotation="0 90 0" 
              width="24" 
              height="4"
              material={`color: ${gallery.wallColor}`}
            ></a-plane>
            <a-plane 
              position="0 2 12" 
              rotation="0 180 0" 
              width="12" 
              height="4"
              material={`color: ${gallery.wallColor}`}
            ></a-plane>
            <a-plane 
              position="0 2 -12" 
              rotation="0 0 0" 
              width="12" 
              height="4"
              material={`color: ${gallery.wallColor}`}
            ></a-plane>
          </a-entity>
        )}
        
        {gallery.layout === 'grid' && (
          <a-entity>
            {/* Floor */}
            <a-plane 
              position="0 0 0" 
              rotation="-90 0 0" 
              width="20" 
              height="20"
              material={floorTextureUrl ? `src: #floor-texture; repeat: 10 10` : `color: #333333`}
            ></a-plane>
            
            {/* Ceiling */}
            <a-plane 
              position="0 4 0" 
              rotation="90 0 0" 
              width="20" 
              height="20"
              material={ceilingTextureUrl ? `src: #ceiling-texture; repeat: 10 10` : `color: #111111`}
            ></a-plane>
            
            {/* Walls */}
            <a-plane 
              position="10 2 0" 
              rotation="0 -90 0" 
              width="20" 
              height="4"
              material={`color: ${gallery.wallColor}`}
            ></a-plane>
            <a-plane 
              position="-10 2 0" 
              rotation="0 90 0" 
              width="20" 
              height="4"
              material={`color: ${gallery.wallColor}`}
            ></a-plane>
            <a-plane 
              position="0 2 10" 
              rotation="0 180 0" 
              width="20" 
              height="4"
              material={`color: ${gallery.wallColor}`}
            ></a-plane>
            <a-plane 
              position="0 2 -10" 
              rotation="0 0 0" 
              width="20" 
              height="4"
              material={`color: ${gallery.wallColor}`}
            ></a-plane>
          </a-entity>
        )}
        
        {/* Generate artwork layout only if there are artworks */}
        {hasArtworks && (
          <a-entity 
            gallery-layout={`
              layout: ${gallery.layout}; 
              count: ${gallery.artworks.length}; 
              radius: ${layoutRadius};
              spacing: ${layoutSpacing};
              height: ${layoutHeight}
            `}
          >
            {/* Artworks will be populated by the gallery-layout component */}
          </a-entity>
        )}
        
        {/* Dynamically add artworks */}
        <a-entity id="artworks-container">
          {gallery.artworks.map((artwork, index) => (
            <a-entity key={artwork.id} class="artwork" data-index={index}>
              <a-plane 
                src={`#artwork-${index}`}
                width="1.5" 
                height="1"
                artwork-interaction={`
                  title: ${artwork.title}; 
                  description: ${artwork.description};
                  ${artwork.audioCommentary ? `audioSrc: ${artwork.audioCommentary}` : ''}
                `}
              ></a-plane>
            </a-entity>
          ))}
        </a-entity>
        
        {/* Camera */}
        <a-entity position="0 1.6 0">
          <a-camera wasd-controls="acceleration: 20" look-controls>
            <a-entity cursor="fuse: true; fuseTimeout: 500" position="0 0 -1"
                      geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
                      material="color: white; shader: flat"
                      animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.1 0.1 0.1; to: 1 1 1"
                      animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 1 1 1; to: 0.1 0.1 0.1"
                      animation__mouseleave="property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 500; to: 1 1 1">
            </a-entity>
          </a-camera>
        </a-entity>
        
        {/* Lights */}
        <a-entity light="type: ambient; color: #BBB; intensity: 0.5"></a-entity>
        <a-entity light="type: directional; color: #FFF; intensity: 0.6" position="-0.5 1 1"></a-entity>
        
        {/* Script to position artworks */}
        <a-entity>
          <script>
            {`
              // This will run when the scene loads
              document.querySelector('a-scene').addEventListener('loaded', function () {
                // Get all artworks and placeholders
                const artworks = document.querySelectorAll('.artwork');
                const placeholders = document.querySelectorAll('.artwork-placeholder');
                
                // Position each artwork at its placeholder
                artworks.forEach(artwork => {
                  const index = artwork.getAttribute('data-index');
                  const placeholder = document.querySelector(\`.artwork-placeholder[data-index="\${index}"]\`);
                  
                  if (placeholder) {
                    const placeholderPosition = placeholder.getAttribute('position');
                    const placeholderRotation = placeholder.getAttribute('rotation');
                    
                    artwork.setAttribute('position', placeholderPosition);
                    artwork.setAttribute('rotation', placeholderRotation);
                  }
                });
              });
            `}
          </script>
        </a-entity>
      </a-scene>
      
      {/* UI Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 pointer-events-none fade-in">
          <div className="absolute top-0 left-0 right-0 p-4 pointer-events-auto">
            <div className="flex justify-between items-center">
              <Link 
                to="/dashboard" 
                className="flex items-center px-3 py-2 bg-black/40 backdrop-blur-sm rounded-lg text-white hover:bg-black/60 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Exit VR
              </Link>
              
              <div className="glass-panel p-2 flex items-center">
                <button 
                  className="p-2 rounded-full hover:bg-slate-700 transition-colors"
                  onClick={toggleAudio}
                >
                  {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                </button>
                <span className="ml-2 text-sm text-slate-300">{gallery.name}</span>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
            <div className="glass-panel inline-block px-4 py-2 text-sm text-slate-300">
              Use W, A, S, D keys to move • Click and drag to look around • Click on artworks to interact
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VRViewer;