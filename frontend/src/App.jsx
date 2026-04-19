import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { useLocation } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import AgriVisionPage from './pages/AgriVisionPage';
import HydroMindPage from './pages/HydroMindPage';
import PestAlertPage from './pages/PestAlertPage';
import CarbonTracePage from './pages/CarbonTracePage';

const AppContent = () => {
  const location = useLocation();
  const isFullScreenPage = ['/', '/agrivision', '/pestalert', '/hydromind'].includes(location.pathname);

  return (
    <MainLayout isFullScreenPage={isFullScreenPage}>
      <Routes>
        <Route path="/" element={<Home />} />
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
