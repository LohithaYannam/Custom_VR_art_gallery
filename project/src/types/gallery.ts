export interface ArtworkItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  audioCommentary?: string;
  position?: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number };
  scale?: { x: number; y: number; z: number };
  category: string;
  createdAt: string;
}

export type GalleryLayout = 'circular' | 'corridor' | 'grid';
export type WallTexture = 'plain' | 'brick' | 'concrete' | 'wood' | 'marble';
export type FloorTexture = 'wood' | 'marble' | 'concrete' | 'carpet';
export type CeilingTexture = 'plain' | 'skylights' | 'industrial';

export interface Gallery {
  id: string;
  name: string;
  description: string;
  layout: GalleryLayout;
  wallColor: string;
  floorTexture: FloorTexture;
  ceilingTexture: CeilingTexture;
  backgroundMusic?: string;
  artworks: ArtworkItem[];
  createdAt: string;
  thumbnail: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  galleries: string[]; // Array of gallery IDs
}