import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { AlertTriangle, Layers, Navigation, ChevronUp } from 'lucide-react';
import { BarChart, Bar, Cell, ResponsiveContainer, LabelList, XAxis, YAxis } from 'recharts';
import 'leaflet/dist/leaflet.css';

const HydroMind = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const center = [-6.77, 107.77];

  const data = [
    { name: 'Biasa', value: 185, color: '#9ca3af', label: '185m³' },
    { name: 'HydroMind', value: 111, color: '#047857', label: '111m³' }
  ];

  const pipeLines = [
    [[-6.760, 107.760], [-6.770, 107.765], [-6.775, 107.770], [-6.785, 107.775]],
    [[-6.770, 107.765], [-6.765, 107.775], [-6.770, 107.785], [-6.768, 107.795]],
    [[-6.765, 107.775], [-6.763, 107.772]],
    [[-6.764, 107.774], [-6.762, 107.778]],
    [[-6.766, 107.776], [-6.764, 107.780]],
    [[-6.772, 107.780], [-6.775, 107.785]],
    [[-6.773, 107.782], [-6.771, 107.784]],
    [[-6.774, 107.783], [-6.772, 107.786]],
    [[-6.770, 107.765], [-6.762, 107.768]],
    [[-6.775, 107.770], [-6.775, 107.755]],
    [[-6.780, 107.772], [-6.785, 107.765]],
    [[-6.782, 107.778], [-6.786, 107.782]],
    [[-6.768, 107.795], [-6.772, 107.798]],
    [[-6.769, 107.796], [-6.767, 107.800]],
    [[-6.770, 107.797], [-6.773, 107.802]],
    [[-6.775, 107.770], [-6.772, 107.780]],
    [[-6.765, 107.775], [-6.770, 107.765]]
  ];

  return (
    <div className="absolute inset-0 flex flex-col bg-gray-100 overflow-hidden">
      <div className="flex-grow relative z-0">
        <MapContainer center={center} zoom={15} zoomControl={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution='&copy; Esri' />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" opacity={0.15} />

          {pipeLines.map((line, idx) => (
            <React.Fragment key={idx}>
              <Polyline positions={line} pathOptions={{ color: '#1e3a8a', weight: 5, opacity: 0.15, lineJoin: 'round' }} />
              <Polyline
                positions={line}
                className="animate-flow"
                pathOptions={{
                  color: '#60a5fa',
                  weight: 2.5,
                  opacity: 0.9,
                  dashArray: '8, 12',
                  lineCap: 'round'
                }}
              />
            </React.Fragment>
          ))}

          <Marker position={[-6.768, 107.768]} icon={L.divIcon({ className: '', html: '<div class="text-[8px] font-black text-white drop-shadow-lg text-center bg-green-900/40 px-1.5 py-0.5 rounded backdrop-blur-[1px]">SAWAH WAYAN</div>' })} />
          <Marker position={[-6.772, 107.775]} icon={L.divIcon({ className: '', html: '<div class="text-[8px] font-black text-white drop-shadow-lg text-center bg-green-900/40 px-1.5 py-0.5 rounded backdrop-blur-[1px]">LAHAN SUKARDAJ</div>' })} />
          <Marker position={[-6.769, 107.795]} icon={L.divIcon({ className: '', html: '<div class="text-[8px] font-black text-white drop-shadow-lg text-center bg-green-900/40 px-1.5 py-0.5 rounded backdrop-blur-[1px]">KEBUN CIMALAKA</div>' })} />
        </MapContainer>

        <div className="absolute top-4 right-4 z-[1000] pointer-events-none">
           <div className="bg-orange-600/90 backdrop-blur-md rounded-xl p-2.5 px-3 border border-orange-400/50 shadow-2xl text-white flex items-center gap-2 animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-widest">Irigasi Ditunda (Hujan)</span>
           </div>
        </div>

        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-[1000] flex flex-col gap-3">
           <button className="bg-white/70 backdrop-blur-md p-2 rounded-xl shadow-lg border border-white/50 active:scale-90 transition-transform"><Layers className="w-4 h-4 text-gray-700" /></button>
           <button className="bg-white/70 backdrop-blur-md p-2 rounded-xl shadow-lg border border-white/50 active:scale-90 transition-transform"><Navigation className="w-4 h-4 text-gray-700" /></button>
        </div>
      </div>

      <div className="fixed bottom-24 left-4 right-4 z-[1001] pointer-events-none">
        <div className="bg-white/80 backdrop-blur-3xl rounded-[24px] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/60 pointer-events-auto overflow-hidden transition-all duration-500">
          <div className="flex items-center justify-between cursor-pointer px-1" onClick={() => setIsExpanded(!isExpanded)}>
             <div className="flex items-center gap-3">
                <div className="flex flex-col items-center justify-center bg-emerald-700 text-white w-9 h-9 rounded-xl shadow-lg">
                   <span className="text-[10px] font-black">40%</span>
                </div>
                <div>
                   <h2 className="text-[10px] font-black text-gray-900 leading-none uppercase tracking-tighter">Statistik HydroMind</h2>
                   <p className="text-[8px] font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                      Efisiensi Tinggi
                   </p>
                </div>
             </div>

             <div className="flex items-center gap-4">
                {!isExpanded && (
                  <div className="flex gap-4">
                    <div className="text-center">
                       <p className="text-[7px] font-bold text-gray-400 uppercase leading-none mb-0.5">Vol. Hemat</p>
                       <p className="text-[10px] font-black text-emerald-700 leading-none">[x] m³</p>
                    </div>
                    <div className="text-center">
                       <p className="text-[7px] font-bold text-gray-400 uppercase leading-none mb-0.5">Tanah</p>
                       <p className="text-[10px] font-black text-gray-800 leading-none">75%</p>
                    </div>
                  </div>
                )}
                <ChevronUp className={`w-4 h-4 text-gray-400 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
             </div>
          </div>

          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-80 mt-3 opacity-100 border-t border-gray-100/50 pt-3' : 'max-h-0 opacity-0'}`}>
             <div className="flex justify-between items-center mb-3 px-1">
                <div className="flex gap-3">
                   <div className="flex items-center gap-1"><div className="w-2 h-2 bg-gray-400 rounded-full"></div><span className="text-[8px] font-bold text-gray-400 uppercase">Biasa</span></div>
                   <div className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-700 rounded-full"></div><span className="text-[8px] font-bold text-gray-400 uppercase">HydroMind</span></div>
                </div>
                <div className="bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                   <span className="text-[8px] font-black text-emerald-700">EFISIENSI: 40%</span>
                </div>
             </div>

             <div className="h-28 w-full relative mb-4">
                <div className="absolute top-0 left-[38%] right-[15%] h-5 border-t border-r border-dashed border-gray-300">
                   <span className="absolute -right-12 top-0 text-[8px] font-black text-emerald-800 tracking-tighter uppercase">Hemat 40%</span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={data} margin={{ top: 15, bottom: 0 }}>
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                         {data.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                         <LabelList dataKey="label" position="top" style={{fontSize: '8px', fontWeight: '900', fill: '#6b7280'}} />
                      </Bar>
                      <XAxis hide /><YAxis hide domain={[0, 210]} />
                   </BarChart>
                </ResponsiveContainer>
             </div>

             <div className="grid grid-cols-4 gap-2">
                <MiniCard label="Volume" value="[x] m³" color="text-emerald-700" />
                <MiniCard label="ETc" value="4.8 mm" />
                <MiniCard label="KC" value="1.15" />
                <MiniCard label="Tanah" value="75%" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MiniCard = ({ label, value, color = "text-gray-800" }) => (
   <div className="bg-gray-50/50 p-2 rounded-xl text-center border border-gray-100/50">
      <p className="text-[7px] font-bold text-gray-400 uppercase mb-0.5 leading-none">{label}</p>
      <p className={`text-[9px] font-black ${color} leading-none`}>{value}</p>
   </div>
);

export default HydroMind;
