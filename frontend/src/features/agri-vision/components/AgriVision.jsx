import React, { useState } from 'react';
import { Upload, Camera, Image, AlertCircle, RefreshCcw } from 'lucide-react';
import api from '../../../services/api';

const AgriVision = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');

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

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setIsScanning(true);

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('lat', '-6.2');
    formData.append('lon', '106.816');

    try {
      const res = await api.post('/agrivision/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Efek animasi scanning minimal 2 detik
      setTimeout(() => {
        setAnalysis(res.data);
        setIsScanning(false);
        setLoading(false);
      }, 2000);

    } catch (err) {
      setError('Gagal menganalisis gambar. Silakan coba lagi.');
      setIsScanning(false);
      setLoading(false);
    }
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
            <h3 className="text-white font-bold text-lg mb-2">Mulai Deteksi Tanaman</h3>
            <p className="text-sm opacity-50 max-w-xs">
              Pilih foto dari galeri atau ambil foto langsung menggunakan kamera untuk mendeteksi hama dan penyakit.
            </p>
          </div>
        )}
      </div>

      {/* Scanning Overlay Animation */}
      {isScanning && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[1px]">
          <div className="relative w-72 h-96 border-2 border-white/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-green-400 shadow-[0_0_20px_rgba(74,222,128,1)] animate-scan-line"></div>

            {/* Corner Markers */}
            <div className="absolute top-4 left-4 w-10 h-10 border-t-4 border-l-4 border-white/80 rounded-tl-xl"></div>
            <div className="absolute top-4 right-4 w-10 h-10 border-t-4 border-r-4 border-white/80 rounded-tr-xl"></div>
            <div className="absolute bottom-4 left-4 w-10 h-10 border-b-4 border-l-4 border-white/80 rounded-bl-xl"></div>
            <div className="absolute bottom-4 right-4 w-10 h-10 border-b-4 border-r-4 border-white/80 rounded-br-xl"></div>
          </div>
          <div className="mt-8 bg-green-600 text-white px-8 py-3 rounded-full font-black text-sm tracking-widest animate-pulse shadow-lg">
            AI MENGANALISIS...
          </div>
        </div>
      )}

      {/* Action Buttons - Shown only when no preview or analysis */}
      {!preview && !isScanning && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 p-8">
          <div className="grid grid-cols-1 w-full max-w-xs gap-4">
            {/* Take Photo Button */}
            <label className="flex items-center gap-4 bg-white p-5 rounded-3xl shadow-2xl cursor-pointer active:scale-95 transition-transform">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                <Camera className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h3 className="font-black text-gray-800 text-base">Ambil Foto</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Kamera Langsung</p>
              </div>
              <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} className="hidden" />
            </label>

            {/* Gallery Button */}
            <label className="flex items-center gap-4 bg-white p-5 rounded-3xl shadow-2xl cursor-pointer active:scale-95 transition-transform">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Image className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="font-black text-gray-800 text-base">Buka Galeri</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Pilih Foto Tersimpan</p>
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        </div>
      )}

      {/* Analysis Result Card */}
      {analysis && !isScanning && (
        <div className="absolute bottom-32 left-4 right-4 z-20 animate-slide-up">
          <div className="bg-white/95 backdrop-blur-xl rounded-[36px] p-7 shadow-2xl border border-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Diagnosis AI</p>
                <h2 className="text-2xl font-black text-gray-900 leading-none capitalize">
                  {analysis.analysis.deficiency}
                </h2>
              </div>
              <div className="bg-green-100 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black text-green-700">{(analysis.analysis.confidence * 100).toFixed(0)}% Match</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
              <p className="text-xs text-gray-700 font-medium leading-relaxed italic">
                "{analysis.recommendation.split('.')[0]}."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={resetCapture}
                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 font-black py-4 rounded-2xl text-[11px] tracking-widest active:scale-95 transition-transform"
              >
                <RefreshCcw className="w-4 h-4" /> RETAKE
              </button>
              <button className="bg-green-600 text-white font-black py-4 rounded-2xl text-[11px] tracking-widest shadow-lg shadow-green-200 active:scale-95 transition-transform">
                DETAIL INFO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Analyze Button after image selected */}
      {preview && !isScanning && !analysis && (
        <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center gap-4 z-20">
           <button
            onClick={handleAnalyze}
            className="bg-green-600 text-white px-10 py-5 rounded-full font-black shadow-2xl flex items-center gap-3 active:scale-95 transition-all hover:bg-green-700 tracking-widest text-sm"
          >
            MULAI SCAN AI
          </button>
          <button
            onClick={resetCapture}
            className="text-white/70 font-bold text-xs underline underline-offset-4"
          >
            Batal
          </button>
        </div>
      )}

      {error && (
        <div className="absolute top-6 left-4 right-4 z-30 bg-red-600 text-white p-4 rounded-2xl flex items-center gap-3 text-xs font-black shadow-2xl animate-bounce">
          <AlertCircle className="w-5 h-5 shrink-0" /> {error}
        </div>
      )}
    </div>
  );
};

export default AgriVision;
