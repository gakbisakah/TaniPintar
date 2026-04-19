import React from 'react';
import { Settings, CheckCircle2, Loader2, CalendarDays, Atom } from 'lucide-react';

const CarbonTrace = () => {
  const steps = [
    {
      id: 1,
      title: "Audit Lapangan",
      status: "SELESAI - Jan 2026",
      desc: "Verifikasi independen oleh Sucofindo (Audit Field)",
      icon: "audit",
      active: true,
      completed: true
    },
    {
      id: 2,
      title: "Verifikasi Auditor",
      status: "SEDANG DIPROSES - Mar 2026",
      desc: "Audit Disetujui, Penerbitan Sertifikasi Verified Carbon Standard",
      icon: "process",
      active: true,
      completed: false
    },
    {
      id: 3,
      title: "Listing Bursa Karbon",
      status: "TERJADWAL - Jun 2026",
      desc: "Listing & Perdagangan di Bursa Karbon Indonesia (Listed)",
      icon: "calendar",
      active: false,
      completed: false
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto pb-32">
      {/* Carbon Wallet Card */}
      <div className="px-4 mt-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#d4e9d7] via-[#f0f9f1] to-[#e8f5e9] rounded-[32px] p-6 shadow-2xl border border-[#c8e6c9]/50 group">
          <div className="absolute top-0 right-0 w-48 h-48 opacity-20 pointer-events-none translate-x-12 -translate-y-8">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#2e7d32" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-46.2C87.4,-33.3,90.1,-17.7,89.1,-2.4C88.1,12.8,83.4,27.7,75.2,40.8C67.1,53.8,55.5,65,41.9,73.4C28.2,81.8,12.5,87.4,-2.9,92.5C-18.3,97.6,-33.4,102.1,-46.6,97.5C-59.8,92.9,-71.1,79.1,-79.3,64.2C-87.5,49.3,-92.6,33.3,-94.1,17.2C-95.6,1.1,-93.5,-15.1,-86.3,-29.1C-79.1,-43.1,-66.8,-54.9,-53.2,-62.4C-39.6,-69.9,-24.7,-73.1,-9.6,-77.5C5.5,-81.9,20.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 p-4">
             <div className="w-12 h-12 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                <Atom className="w-6 h-6 text-green-800 opacity-60" />
             </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-gray-600 font-bold text-sm tracking-tight mb-1 text-emerald-900/60 uppercase">Ringkasan Dompet Karbon</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-gray-900 tracking-tighter">Rp 25.600.000,00</span>
            </div>
            <p className="text-gray-500 font-bold text-[10px] mt-1 uppercase tracking-widest">Saldo Karbon</p>

            <div className="mt-8 pt-6 border-t border-gray-400/20">
              <p className="text-gray-600 font-bold text-xs">Total CO2e Tersimpan:</p>
              <p className="text-2xl font-black text-gray-900 mt-1 tracking-tight">25.5 Ton CO2e</p>
              <p className="text-[9px] text-gray-400 font-bold mt-3 uppercase tracking-wider">Diperbarui: Hari ini, 13:45 WIB</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-10">
        <h2 className="text-lg font-black text-gray-900 tracking-tight mb-8">Status Verifikasi MRV</h2>
        <div className="relative">
          <div className="absolute left-6 top-4 bottom-4 w-1 bg-gradient-to-b from-green-800 via-green-700 to-gray-200 rounded-full"></div>
          <div className="space-y-12">
            {steps.map((step) => (
              <div key={step.id} className="relative pl-16 group">
                <div className={`absolute left-0 top-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300 z-10 ${
                  step.completed ? 'bg-green-800 text-white' :
                  step.active ? 'bg-green-700 text-white ring-4 ring-green-100' : 'bg-white border-2 border-gray-100 text-gray-400'
                }`}>
                  {step.icon === 'audit' && <div className="relative">
                    <Settings className="w-6 h-6 animate-spin-slow" />
                    <CheckCircle2 className="w-3 h-3 absolute -top-1 -right-1 text-green-400 fill-white" />
                  </div>}
                  {step.icon === 'process' && <Loader2 className="w-6 h-6 animate-spin" />}
                  {step.icon === 'calendar' && <CalendarDays className="w-6 h-6" />}
                  {step.completed && (
                    <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm border border-green-800">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900 leading-none">{step.id}. {step.title}</h3>
                  <p className={`text-[10px] font-bold mt-1 uppercase tracking-tight ${step.active ? 'text-green-700' : 'text-gray-400'}`}>
                    {step.status}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-2 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonTrace;
