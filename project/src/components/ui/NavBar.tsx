import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palette, Home, User, Image, LogOut } from 'lucide-react';

interface NavBarProps {
  transparent?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ transparent = false }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
      transparent 
        ? 'bg-transparent' 
        : 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800'
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Palette className="h-8 w-8 text-primary-500" />
          <span className="text-xl font-bold text-white">VR Gallery</span>
        </Link>
        
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link 
              to="/" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'text-white bg-primary-700/40' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/explore" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/explore') 
                  ? 'text-white bg-primary-700/40' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Image className="h-4 w-4" />
              <span>Explore</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/dashboard') 
                  ? 'text-white bg-primary-700/40' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </li>
        </ul>
        
        <div className="flex items-center space-x-4">
          <button className="btn btn-outline hidden md:flex">
            <span className="flex items-center">
              <LogOut className="h-4 w-4 mr-1" />
              Sign Out
            </span>
          </button>
          
          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg bg-slate-800/50">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;