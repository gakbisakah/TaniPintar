import React from 'react';
import { Leaf } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-[1001] px-4 py-3 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
            <img
              src="https://ui-avatars.com/api/?name=Wesly&background=22c55e&color=fff"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-bold text-gray-800 leading-tight">
              Halo, <span className="text-green-600">Wesly!</span>
            </h1>
            <p className="text-[10px] text-gray-500 font-medium italic">
              Senin, 14 April 2026, 13:45 WIB
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-green-50/50 px-3 py-1.5 rounded-full">
          <div className="bg-green-600 p-1 rounded-lg shadow-sm shadow-green-200">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-gray-800 uppercase">TaniPintar</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
