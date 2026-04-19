import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AgriVisionPage from './pages/AgriVisionPage';
import HydroMindPage from './pages/HydroMindPage';
import PestAlertPage from './pages/PestAlertPage';
import CarbonTracePage from './pages/CarbonTracePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agrivision" element={<AgriVisionPage />} />
          <Route path="/hydromind" element={<HydroMindPage />} />
          <Route path="/pestalert" element={<PestAlertPage />} />
          <Route path="/carbontrace" element={<CarbonTracePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;