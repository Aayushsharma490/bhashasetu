import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    // Increase warning limit to 600kb (our app is feature-rich)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React + Router — cached separately
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation libraries — loaded once
          'vendor-animations': ['framer-motion', 'gsap', 'lenis'],
          // Icon library — large but static
          'vendor-icons': ['lucide-react'],
        }
      }
    }
  }
});
