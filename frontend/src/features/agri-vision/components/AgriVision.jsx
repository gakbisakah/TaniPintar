import React, { useState } from 'react';
import { Upload, Camera, Image, AlertCircle, RefreshCcw } from 'lucide-react';

const AgriVision = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');

  // Dummy Data for variety
  const dummyResults = [
    {
      analysis: { deficiency: "Nitrogen (N) - Klorosis", confidence: 0.89 },
      recommendation: "Terlihat gejala klorosis pada daun. Rekomendasi: Aplikasikan pupuk urea 50 kg/ha secara terbagi. Kombinasikan dengan pupuk organik cair."
    },
    {
      analysis: { deficiency: "Kalium (K) - Nekrosis Tepi", confidence: 0.76 },
      recommendation: "Defisiensi Kalium terdeteksi. Rekomendasi: Tambahkan KCl 75 kg/ha dan pastikan sirkulasi air di area akar terjaga dengan baik."
    },
    {
      analysis: { deficiency: "Fosfor (P) - Daun Ungu", confidence: 0.82 },
      recommendation: "Gejala daun keunguan menunjukkan kurang Fosfor. Rekomendasi: Gunakan pupuk SP-36 100 kg/ha dan campurkan dengan kompos matang."
    },
    {
      analysis: { deficiency: "Tanaman Sehat", confidence: 0.95 },
      recommendation: "Tanaman Anda dalam kondisi prima. Lanjutkan pemeliharaan rutin dan pemantauan berkala setiap 3 hari."
    },
    {
      analysis: { deficiency: "Hama Wereng Cokelat", confidence: 0.91 },
      recommendation: "Waspada! Terdeteksi populasi wereng di pangkal batang. Segera gunakan agens hayati Beauveria bassiana secara merata."
    }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setAnalysis(null);
      setError('');
    }
  };

  const resetCapture = () => {
    setSelectedImage(null);
    setPreview(null);
    setAnalysis(null);
    setError('');
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;

    setLoading(true);
    setIsScanning(true);
    setError('');

    // Simulate Network & AI Processing Delay for realism
    setTimeout(() => {
      // Pick a random result from dummy data
      const randomIndex = Math.floor(Math.random() * dummyResults.length);
      const result = dummyResults[randomIndex];

      setAnalysis(result);
      setIsScanning(false);
      setLoading(false);
    }, 3000); // 3 seconds for scanning effect
  };

  return (
    <div className="relative h-full w-full bg-black overflow-hidden flex flex-col font-sans">
      <style>
        {`
          @keyframes scan-line {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .animate-scan-line {
            animation: scan-line 3s infinite linear;
          }
          @keyframes slide-up {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-up {
            animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
      </style>

      {/* Preview Layer */}
      <div className="absolute inset-0 z-0 bg-gray-900">
        {preview ? (
          <img src={preview} alt="Scan preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center text-gray-400">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
               <Camera className="w-10 h-10 opacity-30" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2 text-center">Deteksi Penyakit & Nutrisi</h3>
            <p className="text-sm opacity-50 max-w-xs">
              Gunakan kamera untuk mendeteksi kondisi kesehatan tanaman secara instan menggunakan AI.
            </p>
          </div>
        )}
      </div>

      {/* Scanning Overlay Animation */}
      {isScanning && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="relative w-72 h-96 border-2 border-green-400/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,255,0,0.2)]">
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-green-400 shadow-[0_0_20px_rgba(74,222,128,1)] animate-scan-line"></div>

            {/* Corner Markers */}
            <div className="absolute top-4 left-4 w-10 h-10 border-t-4 border-l-4 border-green-400 rounded-tl-xl"></div>
            <div className="absolute top-4 right-4 w-10 h-10 border-t-4 border-r-4 border-green-400 rounded-tr-xl"></div>
            <div className="absolute bottom-4 left-4 w-10 h-10 border-b-4 border-l-4 border-green-400 rounded-bl-xl"></div>
            <div className="absolute bottom-4 right-4 w-10 h-10 border-b-4 border-r-4 border-green-400 rounded-br-xl"></div>
          </div>
          <div className="mt-8 bg-green-600 text-white px-8 py-3 rounded-full font-black text-xs tracking-widest animate-pulse shadow-lg uppercase">
            Menganalisis Pola Daun...
          </div>
        </div>
      )}

      {/* Initial Action Buttons */}
      {!preview && !isScanning && (
        <div className="absolute bottom-32 left-0 right-0 z-20 flex flex-col items-center gap-4 px-8">
          <div className="grid grid-cols-1 w-full max-w-xs gap-3">
            <label className="flex items-center gap-4 bg-white/95 backdrop-blur-md p-5 rounded-[28px] shadow-2xl cursor-pointer active:scale-95 transition-transform border border-white/20">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-black text-gray-800 text-sm">Ambil Foto</h3>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Kamera Perangkat</p>
              </div>
              <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} className="hidden" />
            </label>

            <label className="flex items-center gap-4 bg-white/95 backdrop-blur-md p-5 rounded-[28px] shadow-2xl cursor-pointer active:scale-95 transition-transform border border-white/20">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Image className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-black text-gray-800 text-sm">Dari Galeri</h3>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">File Tersimpan</p>
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        </div>
      )}

      {/* Analysis Result Card */}
      {analysis && !isScanning && (
        <div className="absolute bottom-32 left-4 right-4 z-20 animate-slide-up">
          <div className="bg-white/95 backdrop-blur-xl rounded-[36px] p-6 shadow-2xl border border-white">
            <div className="flex justify-between items-start mb-4">
              <div className="max-w-[70%]">
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Diagnosis Selesai</p>
                <h2 className="text-xl font-black text-gray-900 leading-tight">
                  {analysis.analysis.deficiency}
                </h2>
              </div>
              <div className="bg-green-100 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black text-green-700">{(analysis.analysis.confidence * 100).toFixed(0)}% Akurat</span>
              </div>
            </div>

            <div className="bg-green-50/50 rounded-2xl p-4 mb-6 border border-green-100">
              <p className="text-[11px] text-gray-700 font-bold leading-relaxed">
                <span className="text-green-800 uppercase text-[9px] block mb-1">Saran Perbaikan:</span>
                "{analysis.recommendation}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={resetCapture}
                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 font-black py-4 rounded-2xl text-[10px] tracking-widest active:scale-95 transition-transform"
              >
                <RefreshCcw className="w-4 h-4" /> ULANGI
              </button>
              <button className="bg-green-600 text-white font-black py-4 rounded-2xl text-[10px] tracking-widest shadow-lg shadow-green-200 active:scale-95 transition-transform">
                UNDUH LAPORAN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Analyze Button (After Selection) */}
      {preview && !isScanning && !analysis && (
        <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center gap-4 z-20 px-8">
           <button
            onClick={handleAnalyze}
            className="w-full max-w-xs bg-green-600 text-white py-5 rounded-[24px] font-black shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all hover:bg-green-700 tracking-widest text-sm"
          >
            ANALISIS DENGAN AI
          </button>
          <button
            onClick={resetCapture}
            className="text-white/70 font-bold text-[10px] tracking-wider uppercase bg-black/20 px-4 py-2 rounded-full border border-white/10"
          >
            Batal & Hapus
          </button>
        </div>
      )}
    </div>
  );
};

export default AgriVision;
