import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://192.168.1.138',
        changeOrigin: true,
        secure: false, 
      },
      '/media': {
        target: 'https://192.168.1.138',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});