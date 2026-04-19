import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { AlertTriangle, Bug, ChevronUp } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Custom Marker Icon for Pests (Red Circle with Bug)
const createPestIcon = () => {
  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bug"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M18 13h4"/><path d="M21 21c0-2.1-1.7-3.9-3.8-4"/></svg>
        </div>
      </div>
    `,
    className: '',
    iconSize: [32, 32],
  });
};

const userIcon = L.divIcon({
    html: `<div class="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center ring-4 ring-blue-500/30"></div>`,
    className: '',
    iconSize: [24, 24],
});

const PestAlert = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const center = [-6.77, 107.77]; // Koordinat sample area (sekitar Subang/Sumedang sesuai gambar)

  const pestLocations = [
    { id: 1, pos: [-6.775, 107.765], label: '1.8km lalu' },
    { id: 2, pos: [-6.765, 107.785], label: 'Baru Saja' },
    { id: 3, pos: [-6.785, 107.780], label: '2.1 km' },
    { id: 4, pos: [-6.790, 107.770], label: '2.1km lalu' },
    { id: 5, pos: [-6.770, 107.755], label: 'Baru Saja' },
  ];

  return (
    <div className="relative h-full w-full bg-gray-100 overflow-hidden flex flex-col">
      {/* Radar Text Header Overlay */}
      <div className="absolute top-4 left-0 right-0 z-[1000] flex justify-center pointer-events-none">
        <div className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg border border-red-400/50 tracking-wider uppercase">
          RADIUS WASPADA 5km - PestAlert Community
        </div>
      </div>

      {/* Map Content */}
      <div className="flex-grow z-0">
        <MapContainer
          center={center}
          zoom={14}
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; Esri'
          />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            opacity={0.3}
          />

          <Marker position={center} icon={userIcon} />

          <Circle
            center={center}
            radius={5000}
            pathOptions={{ color: 'red', weight: 2, fillColor: 'red', fillOpacity: 0.1 }}
          />

          <Circle
            center={center}
            radius={2500}
            className="animate-radar"
            pathOptions={{ color: 'red', weight: 1, fillColor: 'transparent' }}
          />

          {pestLocations.map(pest => (
            <Marker key={pest.id} position={pest.pos} icon={createPestIcon()}>
               <Tooltip permanent direction="bottom" offset={[0, 10]} className="pest-tooltip">
                  <span className="text-[9px] font-bold text-gray-800 bg-white/90 px-2 py-0.5 rounded-full border border-gray-200 shadow-sm">
                    {pest.label}
                  </span>
               </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Notification Card Overlay - Optimized and Compact */}
      <div className={`absolute left-4 right-4 z-[1000] transition-all duration-500 ease-in-out ${isExpanded ? 'bottom-32' : 'bottom-32'}`}>
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-4 shadow-2xl border border-white/50 relative overflow-hidden">
          {/* Header Area - Always visible */}
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
             <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-1.5 rounded-xl">
                   <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                   <h2 className="text-[13px] font-black text-gray-900 leading-none">
                     NOTIFIKASI HAMA: <span className="text-red-600 uppercase">Wereng</span>
                   </h2>
                   <p className="text-[10px] font-bold text-gray-500 mt-1">Wereng terdeteksi 2km dari lahan Anda</p>
                </div>
             </div>
             <ChevronUp className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>

          {/* Expandable Content */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-80 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
             <div className="space-y-3 mb-4">
                <div className="text-[11px] text-gray-600 space-y-1">
                   <p><span className="font-bold text-gray-800">Detail:</span> Wereng Padi Cokelat (Brown Planthopper).</p>
                   <p><span className="font-bold text-gray-800">Waktu:</span> 1 jam lalu (12:45 WIB). 3 Laporan Baru.</p>
                </div>
                <div className="p-3 bg-green-50/50 rounded-2xl border border-green-100/50">
                   <p className="text-[10px] text-green-900 leading-relaxed italic">
                      <span className="font-bold">Tindakan:</span> Segera periksa Sawah Pak Wayan (Plot A-1, Kec. Cimalaka). Pertimbangkan aplikasi agens hayati presisi. <span className="font-bold">Perlu detail?</span> ✨
                   </p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-2">
                <button className="bg-green-800 text-white font-bold py-2.5 rounded-xl text-[10px] tracking-wider active:scale-95 transition-all shadow-md">
                   LIHAT DETAIL
                </button>
                <button className="bg-white border border-red-100 text-red-500 font-bold py-2.5 rounded-xl text-[10px] tracking-wider active:scale-95 transition-all">
                   LAPORKAN
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestAlert;