import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Search, User, Filter, X } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';
import NavBar from '../components/ui/NavBar';

const ExplorePage: React.FC = () => {
  const { galleries } = useGallery();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Extract unique categories from gallery artworks
  const categories = Array.from(
    new Set(
      galleries
        .flatMap(gallery => gallery.artworks)
        .map(artwork => artwork.category)
    )
  );
  
  // Filter galleries based on search term and category
  const filteredGalleries = galleries.filter(gallery => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      gallery.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      gallery.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter === null || 
      gallery.artworks.some(artwork => artwork.category === categoryFilter);
    
    return matchesSearch && matchesCategory;
  });
  
  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter(null);
  };
  
  return (
    <div className="min-h-screen bg-slate-900">
      <NavBar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Explore Galleries</h1>
          <p className="text-slate-400">Discover virtual art exhibitions created by our community</p>
        </div>
        
        {/* Search and filters */}
        <div className="glass-panel p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search galleries..."
                className="input-field w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <select
                  className="input-field appearance-none pr-8"
                  value={categoryFilter || ''}
                  onChange={(e) => setCategoryFilter(e.target.value || null)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
              </div>
              
              {(searchTerm || categoryFilter) && (
                <button 
                  className="btn bg-slate-800 hover:bg-slate-700 text-white flex items-center"
                  onClick={clearFilters}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Gallery grid */}
        {filteredGalleries.length === 0 ? (
          <div className="glass-panel p-8 text-center">
            <div className="rounded-full bg-slate-800 p-4 inline-block mb-4">
              <Search className="h-8 w-8 text-slate-500" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No Galleries Found</h2>
            <p className="text-slate-400 mb-6">Try adjusting your search filters</p>
            <button 
              className="btn btn-primary"
              onClick={clearFilters}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGalleries.map((gallery) => (
              <Link 
                key={gallery.id}
                to={`/view/${gallery.id}`}
                className="card group hover:transform hover:scale-[1.02] transition-all"
              >
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={gallery.thumbnail} 
                    alt={gallery.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  
                  <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                    <div className="bg-slate-800/90 px-3 py-1 rounded-lg text-sm text-white">
                      {gallery.artworks.length} {gallery.artworks.length === 1 ? 'artwork' : 'artworks'}
                    </div>
                    
                    {gallery.layout && (
                      <div className="bg-primary-800/90 px-3 py-1 rounded-lg text-sm text-white capitalize">
                        {gallery.layout}
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-1">{gallery.name}</h3>
                <p className="text-slate-400 text-sm mb-3 line-clamp-2">{gallery.description || 'No description'}</p>
                
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-700/50">
                  <div className="flex items-center">
                    <div className="bg-primary-700 rounded-full w-8 h-8 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="ml-2 text-sm text-slate-300">Artist</span>
                  </div>
                  
                  <button className="flex items-center text-primary-500 text-sm font-medium group-hover:text-primary-400">
                    <Eye className="h-4 w-4 mr-1" />
                    View in VR
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;