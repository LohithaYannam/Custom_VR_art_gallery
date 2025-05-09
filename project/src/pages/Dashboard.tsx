import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Music, Image } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';
import NavBar from '../components/ui/NavBar';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { galleries, createGallery, deleteGallery } = useGallery();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGalleryName, setNewGalleryName] = useState('');

  const handleCreateGallery = () => {
    if (newGalleryName.trim()) {
      const gallery = createGallery(newGalleryName);
      setShowCreateModal(false);
      setNewGalleryName('');
      navigate(`/builder/${gallery.id}`);
    }
  };

  const handleDeleteGallery = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (confirm('Are you sure you want to delete this gallery?')) {
      deleteGallery(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <NavBar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Galleries</h1>
            <p className="text-slate-400 mt-1">Manage and create your virtual art galleries</p>
          </div>
          
          <button 
            className="btn btn-primary mt-4 md:mt-0 flex items-center justify-center"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Gallery
          </button>
        </div>
        
        {galleries.length === 0 ? (
          <div className="glass-panel p-8 text-center">
            <div className="rounded-full bg-slate-800 p-4 inline-block mb-4">
              <Image className="h-8 w-8 text-primary-500" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No Galleries Yet</h2>
            <p className="text-slate-400 mb-6">Create your first gallery to get started</p>
            <button 
              className="btn btn-primary flex items-center justify-center mx-auto"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Gallery
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleries.map((gallery) => (
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
                  
                  {/* Overlay buttons */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      <button 
                        className="p-2 rounded-lg bg-slate-800/90 text-white hover:bg-primary-600"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`/builder/${gallery.id}`);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-2 rounded-lg bg-slate-800/90 text-white hover:bg-red-600"
                        onClick={(e) => handleDeleteGallery(gallery.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-2 left-2 flex items-center">
                    <div className="bg-slate-800/90 px-3 py-1 rounded-lg text-sm text-white">
                      {gallery.artworks.length} {gallery.artworks.length === 1 ? 'artwork' : 'artworks'}
                    </div>
                    
                    {gallery.backgroundMusic && (
                      <div className="ml-2 bg-slate-800/90 px-2 py-1 rounded-lg">
                        <Music className="h-4 w-4 text-primary-400" />
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-1">{gallery.name}</h3>
                <p className="text-slate-400 text-sm mb-3">{gallery.description || 'No description'}</p>
                
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-700/50">
                  <span className="text-sm text-slate-500">
                    Created: {new Date(gallery.createdAt).toLocaleDateString()}
                  </span>
                  <button className="flex items-center text-primary-500 text-sm font-medium">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Create gallery modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="glass-panel p-6 max-w-md w-full fade-in">
            <h2 className="text-xl font-semibold text-white mb-4">Create New Gallery</h2>
            
            <div className="mb-4">
              <label htmlFor="gallery-name" className="block text-sm font-medium text-slate-300 mb-2">
                Gallery Name
              </label>
              <input
                id="gallery-name"
                type="text"
                placeholder="My Art Gallery"
                className="input-field w-full"
                value={newGalleryName}
                onChange={(e) => setNewGalleryName(e.target.value)}
                autoFocus
              />
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                className="btn bg-slate-700 hover:bg-slate-600"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleCreateGallery}
              >
                Create Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;