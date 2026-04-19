import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import AgriVisionPage from './pages/AgriVisionPage';
import HydroMindPage from './pages/HydroMindPage';
import PestAlertPage from './pages/PestAlertPage';
import CarbonTracePage from './pages/CarbonTracePage';

const AppContent = () => {
  const location = useLocation();

  // Define pages that use the MainLayout (Header & BottomNav)
  const isAppPage = ['/dashboard', '/agrivision', '/pestalert', '/hydromind', '/carbontrace'].includes(location.pathname);

  // Home (Map) and others that need full screen within layout
  const isFullScreenPage = ['/dashboard', '/agrivision', '/pestalert', '/hydromind'].includes(location.pathname);

  if (location.pathname === '/') {
    return <LandingPage />;
  }

  return (
    <MainLayout isFullScreenPage={isFullScreenPage}>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/agrivision" element={<AgriVisionPage />} />
        <Route path="/hydromind" element={<HydroMindPage />} />
        <Route path="/pestalert" element={<PestAlertPage />} />
        <Route path="/carbontrace" element={<CarbonTracePage />} />
      </Routes>
    </MainLayout>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
