import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Proxy /api to your Node.js backend during development (no CORS setup needed).
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': { target: 'http://localhost:4000', changeOrigin: true } } },
});
