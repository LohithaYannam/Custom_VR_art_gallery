import { Gallery, ArtworkItem } from '../types/gallery';
import { v4 as uuidv4 } from 'uuid';

// Sample artworks
export const sampleArtworks: ArtworkItem[] = [
  {
    id: uuidv4(),
    title: 'Mountain Sunset',
    description: 'A beautiful mountain landscape at sunset',
    imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg',
    category: 'nature',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Abstract Composition',
    description: 'Colorful abstract composition with geometric shapes',
    imageUrl: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png',
    category: 'abstract',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Coastal Waves',
    description: 'Powerful ocean waves crashing against the shore',
    imageUrl: 'https://images.pexels.com/photos/1350197/pexels-photo-1350197.jpeg',
    category: 'nature',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Night Sky',
    description: 'Stars and galaxies in the night sky',
    imageUrl: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg',
    category: 'space',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Urban Architecture',
    description: 'Modern architecture in an urban setting',
    imageUrl: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg',
    category: 'urban',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Autumn Forest',
    description: 'Colorful autumn forest with fallen leaves',
    imageUrl: 'https://images.pexels.com/photos/1808329/pexels-photo-1808329.jpeg',
    category: 'nature',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Desert Landscape',
    description: 'Expansive desert landscape with sand dunes',
    imageUrl: 'https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg',
    category: 'nature',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Abstract Fluid Art',
    description: 'Colorful abstract fluid art with flowing patterns',
    imageUrl: 'https://images.pexels.com/photos/1328891/pexels-photo-1328891.jpeg',
    category: 'abstract',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Nebula',
    description: 'Colorful nebula in deep space',
    imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    category: 'space',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Japanese Garden',
    description: 'Serene Japanese garden with traditional elements',
    imageUrl: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg',
    category: 'nature',
    createdAt: new Date().toISOString()
  }
];

// Sample galleries
export const sampleGalleries: Gallery[] = [
  {
    id: uuidv4(),
    name: 'Nature Collection',
    description: 'A collection of stunning nature photographs',
    layout: 'circular',
    wallColor: '#1e293b',
    floorTexture: 'wood',
    ceilingTexture: 'skylights',
    artworks: sampleArtworks.filter(artwork => artwork.category === 'nature').slice(0, 4),
    createdAt: new Date().toISOString(),
    thumbnail: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg'
  },
  {
    id: uuidv4(),
    name: 'Abstract Art',
    description: 'Modern abstract art gallery',
    layout: 'grid',
    wallColor: '#0f172a',
    floorTexture: 'marble',
    ceilingTexture: 'plain',
    artworks: sampleArtworks.filter(artwork => artwork.category === 'abstract'),
    createdAt: new Date().toISOString(),
    thumbnail: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png'
  },
  {
    id: uuidv4(),
    name: 'Space Exploration',
    description: 'Images of space and cosmic phenomena',
    layout: 'corridor',
    wallColor: '#020617',
    floorTexture: 'concrete',
    ceilingTexture: 'skylights',
    artworks: sampleArtworks.filter(artwork => artwork.category === 'space'),
    createdAt: new Date().toISOString(),
    thumbnail: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg'
  }
];

// Wall and floor textures
export const textures = {
  walls: [
    { id: 'plain', name: 'Plain', url: '' },
    { id: 'brick', name: 'Brick', url: 'https://images.pexels.com/photos/220182/pexels-photo-220182.jpeg' },
    { id: 'concrete', name: 'Concrete', url: 'https://images.pexels.com/photos/1693095/pexels-photo-1693095.jpeg' },
    { id: 'wood', name: 'Wood', url: 'https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg' },
    { id: 'marble', name: 'Marble', url: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg' }
  ],
  floors: [
    { id: 'wood', name: 'Wood', url: 'https://images.pexels.com/photos/172276/pexels-photo-172276.jpeg' },
    { id: 'marble', name: 'Marble', url: 'https://images.pexels.com/photos/36420/marble-tile-turquoise-beauty.jpg' },
    { id: 'concrete', name: 'Concrete', url: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg' },
    { id: 'carpet', name: 'Carpet', url: 'https://images.pexels.com/photos/5336271/pexels-photo-5336271.jpeg' }
  ],
  ceilings: [
    { id: 'plain', name: 'Plain', url: '' },
    { id: 'skylights', name: 'Skylights', url: 'https://images.pexels.com/photos/460695/pexels-photo-460695.jpeg' },
    { id: 'industrial', name: 'Industrial', url: 'https://images.pexels.com/photos/128883/pexels-photo-128883.jpeg' }
  ]
};

// Layout options
export const layoutOptions = [
  { id: 'circular', name: 'Circular', description: 'Artworks arranged in a circle' },
  { id: 'corridor', name: 'Corridor', description: 'Artworks along a hallway' },
  { id: 'grid', name: 'Grid', description: 'Artworks in a grid pattern' }
];