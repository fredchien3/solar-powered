import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      proxy: {
        '/api': 'http://localhost:5000'
      }
    },
    build: {
      outDir: '../public/',
      emptyOutDir: true
    },
    plugins: [react()],
  };
});