import React from 'react';
import Header from './Header';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Sprout, Droplets, Bug, Globe } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  // Tambahkan /hydromind ke daftar halaman full screen agar peta leaflet bisa tampil penuh
  const isFullScreenPage = ['/', '/agrivision', '/pestalert', '/hydromind'].includes(location.pathname);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header />

      <main className={`flex-grow relative ${isFullScreenPage ? '' : 'container mx-auto px-4 py-6 max-w-7xl overflow-y-auto pb-32'}`}>
        {children}
      </main>

      {/* Global Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-[1001] flex justify-center pb-6 pointer-events-none">
        <div className="bg-white rounded-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05),0_10px_30px_rgba(0,0,0,0.1)] p-2 flex justify-around items-center border border-gray-100 w-[95%] max-w-md pointer-events-auto">
          <NavItem to="/" icon={Home} label="Beranda" />
          <NavItem to="/agrivision" icon={Sprout} label="Scan Tanaman" />
          <NavItem to="/hydromind" icon={Droplets} label="Irigasi Pintar" />
          <NavItem to="/pestalert" icon={Bug} label="Peringatan Hama" />
          <NavItem to="/carbontrace" icon={Globe} label="Karbon Saya" />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center gap-1.5 px-3 py-1.5 transition-all duration-300`
    }
  >
    {({ isActive }) => (
      <>
        <div className={`transition-all duration-300 ${isActive ? 'text-green-700' : 'text-gray-800'}`}>
          <Icon className={`w-7 h-7 stroke-[1.5] ${isActive ? 'drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]' : ''}`} />
        </div>
        <span className={`text-[10px] font-bold leading-none tracking-tight text-center whitespace-nowrap ${isActive ? 'text-green-700' : 'text-gray-800'}`}>
          {label.split(' ').map((word, i) => (
            <React.Fragment key={i}>
              {word}
              {i === 0 && label.includes(' ') && <br />}
            </React.Fragment>
          ))}
        </span>
      </>
    )}
  </NavLink>
);

export default Layout;