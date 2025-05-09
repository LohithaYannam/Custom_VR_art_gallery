import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sampleGalleries } from '../data/sampleData';
import { Gallery, ArtworkItem } from '../types/gallery';

interface GalleryContextType {
  galleries: Gallery[];
  currentGallery: Gallery | null;
  setCurrentGallery: React.Dispatch<React.SetStateAction<Gallery | null>>;
  createGallery: (name: string) => Gallery;
  updateGallery: (gallery: Gallery) => void;
  deleteGallery: (id: string) => void;
  getGalleryById: (id: string) => Gallery | undefined;
  addArtworkToGallery: (galleryId: string, artwork: ArtworkItem) => void;
  removeArtworkFromGallery: (galleryId: string, artworkId: string) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [currentGallery, setCurrentGallery] = useState<Gallery | null>(null);

  // Load galleries from localStorage on initial render
  useEffect(() => {
    const storedGalleries = localStorage.getItem('galleries');
    if (storedGalleries) {
      setGalleries(JSON.parse(storedGalleries));
    } else {
      // Load sample galleries if none exist
      setGalleries(sampleGalleries);
      localStorage.setItem('galleries', JSON.stringify(sampleGalleries));
    }
  }, []);

  // Save galleries to localStorage whenever they change
  useEffect(() => {
    if (galleries.length > 0) {
      localStorage.setItem('galleries', JSON.stringify(galleries));
    }
  }, [galleries]);

  const createGallery = (name: string): Gallery => {
    const newGallery: Gallery = {
      id: uuidv4(),
      name,
      description: '',
      layout: 'circular',
      wallColor: '#1e293b',
      floorTexture: 'wood',
      ceilingTexture: 'plain',
      backgroundMusic: '',
      artworks: [],
      createdAt: new Date().toISOString(),
      thumbnail: '/assets/thumbnails/default.jpg'
    };
    
    setGalleries([...galleries, newGallery]);
    return newGallery;
  };

  const updateGallery = (updatedGallery: Gallery) => {
    setGalleries(galleries.map(gallery => 
      gallery.id === updatedGallery.id ? updatedGallery : gallery
    ));
  };

  const deleteGallery = (id: string) => {
    setGalleries(galleries.filter(gallery => gallery.id !== id));
  };

  const getGalleryById = (id: string) => {
    return galleries.find(gallery => gallery.id === id);
  };

  const addArtworkToGallery = (galleryId: string, artwork: ArtworkItem) => {
    const gallery = galleries.find(g => g.id === galleryId);
    if (gallery) {
      const updatedGallery = {
        ...gallery,
        artworks: [...gallery.artworks, artwork]
      };
      updateGallery(updatedGallery);
    }
  };

  const removeArtworkFromGallery = (galleryId: string, artworkId: string) => {
    const gallery = galleries.find(g => g.id === galleryId);
    if (gallery) {
      const updatedGallery = {
        ...gallery,
        artworks: gallery.artworks.filter(artwork => artwork.id !== artworkId)
      };
      updateGallery(updatedGallery);
    }
  };

  return (
    <GalleryContext.Provider value={{
      galleries,
      currentGallery,
      setCurrentGallery,
      createGallery,
      updateGallery,
      deleteGallery,
      getGalleryById,
      addArtworkToGallery,
      removeArtworkFromGallery
    }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};