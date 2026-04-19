import axios from 'axios';

const api = axios.create({
  // Menggunakan '/api' relatif agar otomatis menggunakan proxy saat dev
  // dan routing Vercel saat production
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

export default api;
