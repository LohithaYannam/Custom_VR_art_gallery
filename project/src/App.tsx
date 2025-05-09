import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import GalleryBuilder from './pages/GalleryBuilder';
import VRViewer from './pages/VRViewer';
import ExplorePage from './pages/ExplorePage';
import { GalleryProvider } from './context/GalleryContext';

function App() {
  return (
    <GalleryProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/builder" element={<GalleryBuilder />} />
          <Route path="/builder/:id" element={<GalleryBuilder />} />
          <Route path="/view/:id" element={<VRViewer />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Routes>
      </div>
    </GalleryProvider>
  );
}

export default App;