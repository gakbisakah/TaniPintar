import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

const MainLayout = ({ children, isFullScreenPage }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden font-sans">
      <Header />

      <main className={`flex-grow relative ${isFullScreenPage ? '' : 'container mx-auto px-4 py-6 max-w-7xl overflow-y-auto pb-32'}`}>
        {children}
      </main>

      <BottomNav />
    </div>
  );
};

export default MainLayout;
