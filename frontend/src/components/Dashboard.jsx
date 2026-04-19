import React, { useEffect, useState } from 'react';
import { Activity, Droplets, AlertTriangle, TrendingUp } from 'lucide-react';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalFarmers: 12500,
    waterSaved: 1245000,
    pestAlerts: 23,
    carbonCredits: 125.5
  });

  useEffect(() => {
    // Fetch real-time stats from backend
    api.get('/carbontrace/my_credits?user_id=demo')
      .then(res => setStats(prev => ({ ...prev, carbonCredits: res.data.total_credits_ton })))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="card flex items-center gap-4">
        <div className="bg-green-100 p-3 rounded-full">
          <Activity className="text-primary w-8 h-8" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Petani Aktif</p>
          <p className="text-2xl font-bold">{stats.totalFarmers.toLocaleString()}</p>
        </div>
      </div>
      <div className="card flex items-center gap-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <Droplets className="text-blue-600 w-8 h-8" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Air Tersimpan (L)</p>
          <p className="text-2xl font-bold">{stats.waterSaved.toLocaleString()}</p>
        </div>
      </div>
      <div className="card flex items-center gap-4">
        <div className="bg-red-100 p-3 rounded-full">
          <AlertTriangle className="text-red-500 w-8 h-8" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Peringatan Hama Aktif</p>
          <p className="text-2xl font-bold">{stats.pestAlerts}</p>
        </div>
      </div>
      <div className="card flex items-center gap-4">
        <div className="bg-emerald-100 p-3 rounded-full">
          <TrendingUp className="text-emerald-600 w-8 h-8" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Kredit Karbon (tCO₂e)</p>
          <p className="text-2xl font-bold">{stats.carbonCredits}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;