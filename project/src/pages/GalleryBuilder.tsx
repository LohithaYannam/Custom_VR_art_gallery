import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Image, Palette, Layout, Music, Eye, ArrowLeft, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useGallery } from '../context/GalleryContext';
import { sampleArtworks, textures, layoutOptions } from '../data/sampleData';
import { Gallery, ArtworkItem } from '../types/gallery';
import NavBar from '../components/ui/NavBar';

const GalleryBuilder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getGalleryById, updateGallery, createGallery } = useGallery();
  
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'layout' | 'artworks'>('info');
  const [availableArtworks, setAvailableArtworks] = useState<ArtworkItem[]>(sampleArtworks);
  const [showArtworkModal, setShowArtworkModal] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkItem | null>(null);
  
  // Load gallery data
  useEffect(() => {
    if (id) {
      const galleryData = getGalleryById(id);
      if (galleryData) {
        setGallery(galleryData);
      } else {
        // Gallery not found, redirect to dashboard
        navigate('/dashboard');
      }
    } else {
      // Create a new gallery if no ID is provided
      const newGallery = createGallery('Untitled Gallery');
      setGallery(newGallery);
      navigate(`/builder/${newGallery.id}`, { replace: true });
    }
  }, [id, getGalleryById, navigate, createGallery]);
  
  // Update gallery data
  const handleGalleryUpdate = (data: Partial<Gallery>) => {
    if (gallery) {
      const updatedGallery = { ...gallery, ...data };
      setGallery(updatedGallery);
      updateGallery(updatedGallery);
    }
  };
  
  // Add artwork to gallery
  const addArtwork = (artwork: ArtworkItem) => {
    if (gallery) {
      // Check if artwork already exists in gallery
      if (!gallery.artworks.some(a => a.id === artwork.id)) {
        const artworkToAdd = {
          ...artwork,
          // Generate a new ID to allow adding the same sample artwork multiple times
          id: uuidv4()
        };
        
        const updatedGallery = {
          ...gallery,
          artworks: [...gallery.artworks, artworkToAdd],
          // Update thumbnail if this is the first artwork
          thumbnail: gallery.artworks.length === 0 ? artwork.imageUrl : gallery.thumbnail
        };
        
        setGallery(updatedGallery);
        updateGallery(updatedGallery);
      }
      
      setShowArtworkModal(false);
    }
  };
  
  // Remove artwork from gallery
  const removeArtwork = (artworkId: string) => {
    if (gallery) {
      const updatedArtworks = gallery.artworks.filter(a => a.id !== artworkId);
      const updatedGallery = {
        ...gallery,
        artworks: updatedArtworks,
        // Update thumbnail if we removed the artwork that was used as thumbnail
        thumbnail: gallery.thumbnail === gallery.artworks.find(a => a.id === artworkId)?.imageUrl
          ? (updatedArtworks[0]?.imageUrl || '/assets/thumbnails/default.jpg')
          : gallery.thumbnail
      };
      
      setGallery(updatedGallery);
      updateGallery(updatedGallery);
    }
  };
  
  // View the gallery in VR
  const viewGallery = () => {
    if (gallery) {
      navigate(`/view/${gallery.id}`);
    }
  };
  
  if (!gallery) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-900">
      <NavBar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center mb-6">
          <button 
            className="text-slate-400 hover:text-white flex items-center"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Dashboard
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main editor area */}
          <div className="lg:w-2/3">
            <div className="glass-panel p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">
                  <input
                    type="text"
                    value={gallery.name}
                    onChange={(e) => handleGalleryUpdate({ name: e.target.value })}
                    className="input-field bg-transparent border-transparent focus:border-slate-700 px-0 text-2xl font-bold"
                  />
                </h1>
                
                <div className="flex space-x-3 mt-4 sm:mt-0">
                  <button 
                    className="btn btn-primary flex items-center"
                    onClick={viewGallery}
                  >
                    <Eye className="h-5 w-5 mr-1" />
                    Preview in VR
                  </button>
                  <button 
                    className="btn btn-secondary flex items-center"
                    onClick={() => updateGallery(gallery)}
                  >
                    <Save className="h-5 w-5 mr-1" />
                    Save Changes
                  </button>
                </div>
              </div>
              
              {/* Gallery preview thumbnail */}
              <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                <img 
                  src={gallery.thumbnail} 
                  alt={gallery.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button className="btn btn-outline">
                    Change Thumbnail
                  </button>
                </div>
              </div>
            </div>
            
            {/* Editor tabs */}
            <div className="glass-panel overflow-hidden">
              <div className="flex border-b border-slate-700">
                <button 
                  className={`px-4 py-3 font-medium text-sm flex items-center ${
                    activeTab === 'info' 
                      ? 'text-white border-b-2 border-primary-500' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('info')}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Basic Info
                </button>
                <button 
                  className={`px-4 py-3 font-medium text-sm flex items-center ${
                    activeTab === 'layout' 
                      ? 'text-white border-b-2 border-primary-500' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('layout')}
                >
                  <Layout className="h-4 w-4 mr-2" />
                  Layout & Style
                </button>
                <button 
                  className={`px-4 py-3 font-medium text-sm flex items-center ${
                    activeTab === 'artworks' 
                      ? 'text-white border-b-2 border-primary-500' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('artworks')}
                >
                  <Image className="h-4 w-4 mr-2" />
                  Artworks
                </button>
              </div>
              
              <div className="p-6">
                {/* Basic Info Tab */}
                {activeTab === 'info' && (
                  <div className="space-y-6 fade-in">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Gallery Name
                      </label>
                      <input
                        type="text"
                        value={gallery.name}
                        onChange={(e) => handleGalleryUpdate({ name: e.target.value })}
                        className="input-field w-full"
                        placeholder="Enter gallery name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={gallery.description}
                        onChange={(e) => handleGalleryUpdate({ description: e.target.value })}
                        className="input-field w-full h-32 resize-none"
                        placeholder="Describe your gallery..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Background Music (optional)
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value={gallery.backgroundMusic || ''}
                          onChange={(e) => handleGalleryUpdate({ backgroundMusic: e.target.value })}
                          className="input-field w-full"
                          placeholder="Enter URL to audio file"
                        />
                        <button className="btn btn-outline ml-2 flex-shrink-0">
                          <Music className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Enter a URL to an MP3 file or leave blank for no music
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Layout Tab */}
                {activeTab === 'layout' && (
                  <div className="space-y-6 fade-in">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">
                        Gallery Layout
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {layoutOptions.map((option) => (
                          <div 
                            key={option.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              gallery.layout === option.id
                                ? 'border-primary-500 bg-primary-500/10'
                                : 'border-slate-700 hover:border-slate-600'
                            }`}
                            onClick={() => handleGalleryUpdate({ layout: option.id as any })}
                          >
                            <div className="h-24 bg-slate-800 rounded-lg mb-3 flex items-center justify-center">
                              {/* Placeholder for layout preview image */}
                              <Layout className="h-8 w-8 text-slate-500" />
                            </div>
                            <h3 className="font-medium text-white">{option.name}</h3>
                            <p className="text-sm text-slate-400">{option.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Wall Color
                      </label>
                      <div className="flex space-x-3">
                        <input
                          type="color"
                          value={gallery.wallColor}
                          onChange={(e) => handleGalleryUpdate({ wallColor: e.target.value })}
                          className="h-10 w-10 rounded border-0 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={gallery.wallColor}
                          onChange={(e) => handleGalleryUpdate({ wallColor: e.target.value })}
                          className="input-field w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Floor Texture
                        </label>
                        <select
                          value={gallery.floorTexture}
                          onChange={(e) => handleGalleryUpdate({ floorTexture: e.target.value as any })}
                          className="input-field w-full"
                        >
                          {textures.floors.map((texture) => (
                            <option key={texture.id} value={texture.id}>
                              {texture.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Ceiling Texture
                        </label>
                        <select
                          value={gallery.ceilingTexture}
                          onChange={(e) => handleGalleryUpdate({ ceilingTexture: e.target.value as any })}
                          className="input-field w-full"
                        >
                          {textures.ceilings.map((texture) => (
                            <option key={texture.id} value={texture.id}>
                              {texture.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Artworks Tab */}
                {activeTab === 'artworks' && (
                  <div className="fade-in">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        Gallery Artworks
                      </h3>
                      <button 
                        className="btn btn-primary flex items-center"
                        onClick={() => setShowArtworkModal(true)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Artwork
                      </button>
                    </div>
                    
                    {gallery.artworks.length === 0 ? (
                      <div className="text-center py-10 border border-dashed border-slate-700 rounded-lg">
                        <Image className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-500">No artworks added yet</p>
                        <button 
                          className="btn btn-outline mt-4"
                          onClick={() => setShowArtworkModal(true)}
                        >
                          Add Artwork
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                        {gallery.artworks.map((artwork) => (
                          <div 
                            key={artwork.id}
                            className="flex border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-colors"
                          >
                            <div className="w-24 h-24 flex-shrink-0">
                              <img 
                                src={artwork.imageUrl}
                                alt={artwork.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow p-3">
                              <h4 className="font-medium text-white">{artwork.title}</h4>
                              <p className="text-sm text-slate-400 line-clamp-1">{artwork.description}</p>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-slate-500">{artwork.category}</span>
                                <button 
                                  className="text-red-500 hover:text-red-400"
                                  onClick={() => removeArtwork(artwork.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right sidebar - Preview */}
          <div className="lg:w-1/3">
            <div className="glass-panel p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-4">Gallery Preview</h2>
              
              <div className="aspect-[4/3] bg-slate-800 rounded-lg overflow-hidden mb-4 relative">
                {/* Simple 3D preview of the gallery layout */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Layout className="h-12 w-12 text-slate-600 mx-auto mb-2" />
                    <p className="text-slate-500">3D Preview</p>
                    <button className="btn btn-outline mt-3">
                      <Eye className="h-4 w-4 mr-1" />
                      View in VR
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-400 mb-1">Gallery Stats</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-800 rounded-lg p-3">
                      <div className="text-2xl font-bold text-white">{gallery.artworks.length}</div>
                      <div className="text-xs text-slate-500">Artworks</div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-3">
                      <div className="text-2xl font-bold text-white capitalize">{gallery.layout}</div>
                      <div className="text-xs text-slate-500">Layout</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-slate-400 mb-1">Gallery Style</h3>
                  <div className="flex space-x-2">
                    <div className="h-8 w-8 rounded" style={{ backgroundColor: gallery.wallColor }}></div>
                    <div className="text-sm text-slate-300 flex-grow">
                      <div>Wall: {gallery.wallColor}</div>
                      <div>Floor: {gallery.floorTexture}</div>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="btn btn-primary w-full flex items-center justify-center"
                  onClick={viewGallery}
                >
                  <Eye className="h-5 w-5 mr-1" />
                  View Gallery in VR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Artwork selection modal */}
      {showArtworkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="glass-panel max-w-4xl w-full max-h-[80vh] flex flex-col fade-in">
            <div className="p-6 border-b border-slate-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Select Artwork</h2>
                <button 
                  className="text-slate-400 hover:text-white"
                  onClick={() => setShowArtworkModal(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {availableArtworks.map((artwork) => (
                  <div 
                    key={artwork.id}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedArtwork?.id === artwork.id
                        ? 'border-primary-500'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                    onClick={() => setSelectedArtwork(artwork)}
                  >
                    <div className="h-40">
                      <img 
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-white">{artwork.title}</h3>
                      <p className="text-sm text-slate-400 line-clamp-2">{artwork.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">{artwork.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-700 flex justify-between">
              <button 
                className="btn bg-slate-700 hover:bg-slate-600"
                onClick={() => setShowArtworkModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                disabled={!selectedArtwork}
                onClick={() => selectedArtwork && addArtwork(selectedArtwork)}
              >
                Add Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryBuilder;