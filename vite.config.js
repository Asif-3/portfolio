import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise chunk warning limit to avoid noisy warnings
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split large libraries into separate cached chunks
        manualChunks: {
          'vendor-react':    ['react', 'react-dom'],
          'vendor-framer':   ['framer-motion'],
          'vendor-gsap':     ['gsap'],
          'vendor-icons':    ['react-icons'],
          'vendor-three':    ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-observer': ['react-intersection-observer'],
        },
      },
    },
    // Enable minification
    minify: 'esbuild',
    // Enable source map only for development
    sourcemap: false,
    // Target modern browsers for smaller output
    target: 'es2020',
  },
  // Enable dependency pre-bundling optimisation
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'gsap'],
  },
})
