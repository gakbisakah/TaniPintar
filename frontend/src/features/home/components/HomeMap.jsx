import React from 'react';
import { MapContainer, TileLayer, Polygon, Tooltip, ZoomControl } from 'react-leaflet';
import { Sun } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const HomeMap = () => {
  const center = [-6.315, 106.815];

  const plots = [
    {
      id: 'A1_Main',
      label: 'PLOT A-1\n(SEHAT)',
      color: '#22c55e',
      coords: [
        [-6.310, 106.810],
        [-6.310, 106.816],
        [-6.313, 106.818],
        [-6.313, 106.810]
      ],
      animate: false
    },
    {
      id: 'B2_Left',
      label: 'PLOT B-2\n(KURANG AIR)',
      color: '#eab308',
      coords: [
        [-6.313, 106.810],
        [-6.313, 106.814],
        [-6.316, 106.816],
        [-6.317, 106.811]
      ],
      animate: true
    },
    {
      id: 'B2_Center',
      label: 'PLOT B-2\n(KURANG AIR)',
      color: '#eab308',
      coords: [
        [-6.313, 106.814],
        [-6.312, 106.817],
        [-6.315, 106.819],
        [-6.316, 106.816]
      ],
      animate: true
    },
    {
      id: 'C3_Main',
      label: 'PLOT C-3\n(WASPADA HAMA)',
      color: '#ef4444',
      coords: [
        [-6.316, 106.819],
        [-6.315, 106.822],
        [-6.319, 106.824],
        [-6.320, 106.820]
      ],
      animate: true
    },
    {
      id: 'A3_Right',
      label: 'PLOT A-3\n(KURANG AIR)',
      color: '#22c55e',
      coords: [
        [-6.313, 106.818],
        [-6.312, 106.821],
        [-6.315, 106.823],
        [-6.316, 106.819]
      ],
      animate: false
    },
    {
      id: 'P_Red_Small',
      label: 'PLOT',
      color: '#ef4444',
      coords: [
        [-6.316, 106.816],
        [-6.315, 106.818],
        [-6.317, 106.819],
        [-6.318, 106.817]
      ],
      animate: true
    },
    {
      id: 'P_Grey',
      label: '',
      color: '#94a3b8',
      coords: [
        [-6.315, 106.819],
        [-6.314, 106.822],
        [-6.316, 106.823],
        [-6.317, 106.820]
      ],
      animate: false
    },
    {
      id: 'P_Dark_Green',
      label: 'PLO',
      color: '#15803d',
      coords: [
        [-6.317, 106.815],
        [-6.316, 106.817],
        [-6.320, 106.819],
        [-6.321, 106.816]
      ],
      animate: false
    }
  ];

  return (
    <div className="relative h-full w-full bg-gray-100 overflow-hidden flex flex-col font-sans">
      <style>
        {`
          @keyframes pulse-soft {
            0% { fill-opacity: 0.4; }
            50% { fill-opacity: 0.7; }
            100% { fill-opacity: 0.4; }
          }
          .animate-plot {
            animation: pulse-soft 3s infinite ease-in-out;
          }
          .leaflet-tooltip-pane .plot-tooltip {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            pointer-events: none !important;
          }
          .leaflet-tooltip-pane .plot-tooltip::before {
            display: none !important;
          }
        `}
      </style>

      {/* Weather Card */}
      <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 w-48 pointer-events-auto">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[11px] font-bold text-gray-800 tracking-wider">BMKG</span>
          <img src="https://warning.bmkg.go.id/img/bg.png" alt="BMKG" className="h-9 object-contain" />
        </div>

        <div className="flex items-center gap-2 mb-1">
          <Sun className="w-9 h-9 text-yellow-500 fill-yellow-100" />
          <span className="text-3xl font-black text-gray-800 tracking-tighter">30°C</span>
        </div>

        <div className="space-y-1.5 pt-1 border-t border-gray-100">
          <p className="text-[11px] font-bold text-gray-700">
            Medan, North Sumatra
          </p>
          <div className="text-[10px] leading-tight text-gray-500">
            <span className="font-bold text-gray-400 block mb-0.5 uppercase tracking-wide text-[8px]">BMKG Forecast:</span>
            Hujan Ringan (60% Probabilitas)
          </div>
        </div>
      </div>

      <div className="flex-grow z-0">
        <MapContainer
          center={center}
          zoom={16}
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; Esri'
          />

          <ZoomControl position="bottomright" />

          {plots.map(plot => (
            <Polygon
              key={plot.id}
              positions={plot.coords}
              pathOptions={{
                fillColor: plot.color,
                fillOpacity: plot.animate ? 0.6 : 0.55,
                color: 'rgba(255,255,255,0.5)',
                weight: 1.5,
                className: plot.animate ? 'animate-plot' : ''
              }}
            >
              {plot.label && (
                <Tooltip permanent direction="center" className="plot-tooltip">
                  <div className="text-center">
                    <div className="font-black text-[9px] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] uppercase leading-tight whitespace-pre-line">
                      {plot.label}
                    </div>
                  </div>
                </Tooltip>
              )}
            </Polygon>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default HomeMap;
