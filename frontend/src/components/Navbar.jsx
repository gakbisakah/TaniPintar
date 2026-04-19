import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, Camera, Droplets, Bug, Coins, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { path: '/', name: 'Beranda', icon: Leaf },
    { path: '/agrivision', name: 'Agri-Vision AI', icon: Camera },
    { path: '/hydromind', name: 'HydroMind', icon: Droplets },
    { path: '/pestalert', name: 'PestAlert', icon: Bug },
    { path: '/carbontrace', name: 'CarbonTrace', icon: Coins },
  ];

  return (
    <nav className="bg-primary/95 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-accent" />
            <span className="text-white font-bold text-xl">TaniPintar</span>
          </div>
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive ? 'bg-accent text-dark' : 'text-white hover:bg-secondary/50'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-primary px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                  isActive ? 'bg-accent text-dark' : 'text-white'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;