import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, ShieldCheck, Droplets, Zap, ChevronRight, Globe, Leaf } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sprout className="w-6 h-6 text-green-600" />,
      title: "AgriVision AI",
      desc: "Identifikasi penyakit tanaman secara instan hanya dengan foto."
    },
    {
      icon: <Droplets className="w-6 h-6 text-blue-500" />,
      title: "HydroMind",
      desc: "Manajemen irigasi pintar berbasis kebutuhan riil tanaman."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
      title: "PestAlert",
      desc: "Peringatan dini serangan hama di sekitar lokasi lahan Anda."
    },
    {
      icon: <Globe className="w-6 h-6 text-emerald-600" />,
      title: "CarbonTrace",
      desc: "Pantau jejak karbon dan kontribusi hijau pertanian Anda."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden pb-20">
      {/* Hero Section */}
      <div className="relative pt-12 pb-16 px-6 overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50"></div>

        <div className="relative z-10 max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-6 border border-green-100">
            <Leaf className="w-4 h-4 text-green-600" />
            <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Era Baru Pertanian Digital</span>
          </div>

          <h1 className="text-4xl font-black text-gray-900 leading-[1.1] mb-6">
            Tani<span className="text-green-600">Pintar</span>: Masa Depan di Genggaman
          </h1>

          <p className="text-sm text-gray-500 leading-relaxed mb-8 px-4">
            Ekosistem pertanian cerdas berbasis AI untuk hasil panen maksimal,
            penggunaan air efisien, dan perlindungan tanaman presisi.
          </p>

          <div className="flex flex-col gap-3 px-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-green-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-green-200 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              MULAI SEKARANG <ChevronRight className="w-5 h-5" />
            </button>
            <button className="bg-white text-gray-700 font-bold py-4 rounded-2xl border border-gray-100 active:scale-95 transition-all">
              PELAJARI FITUR
            </button>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="px-6 py-8">
        <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          Fitur Unggulan
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="font-black text-gray-800 text-sm mb-1">{f.title}</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <div className="mx-6 mt-8 p-6 bg-gray-900 rounded-[32px] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sprout className="w-24 h-24 text-white" />
        </div>
        <h3 className="text-white font-black text-lg mb-2 relative z-10">Siap Transformasi Lahan Anda?</h3>
        <p className="text-gray-400 text-[11px] mb-6 relative z-10 px-4">
          Bergabunglah dengan ribuan petani modern yang telah beralih ke teknologi presisi.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white text-gray-900 font-black px-8 py-3 rounded-xl text-xs tracking-widest uppercase relative z-10"
        >
          Daftar Gratis
        </button>
      </div>

      {/* Small Footer Branding */}
      <div className="mt-12 text-center pb-8">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">TaniPintar © 2024 • Build with Passion</p>
      </div>
    </div>
  );
};

export default LandingPage;
