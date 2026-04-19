import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Sprout, Droplets, Bug, Globe } from 'lucide-react';

const NavItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center flex-1 transition-all duration-300 py-1`
    }
  >
    {({ isActive }) => (
      <>
        <div className={`transition-all duration-300 ${isActive ? 'text-green-600 scale-110' : 'text-gray-500'}`}>
          <Icon className={`w-6 h-6 ${isActive ? 'drop-shadow-[0_0_8px_rgba(22,163,74,0.4)]' : ''}`} />
        </div>
        <span className={`text-[9px] font-bold mt-1 text-center leading-[1.1] ${isActive ? 'text-green-700' : 'text-gray-500'}`}>
          {label}
        </span>
      </>
    )}
  </NavLink>
);

const BottomNav = () => {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-[1001] flex justify-center px-4 pointer-events-none">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 w-full max-w-[450px] flex items-center justify-between p-1.5 pointer-events-auto">
        <NavItem to="/" icon={Home} label="Beranda" />
        <NavItem to="/agrivision" icon={Sprout} label="Scan" />
        <NavItem to="/hydromind" icon={Droplets} label="Irigasi" />
        <NavItem to="/pestalert" icon={Bug} label="Hama" />
        <NavItem to="/carbontrace" icon={Globe} label="Karbon" />
      </div>
    </div>
  );
};

export default BottomNav;
