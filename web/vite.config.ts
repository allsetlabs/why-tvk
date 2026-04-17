import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/why-tvk/',
  server: {
    port: 4006,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('react-dom') || id.includes('react-router')) return 'vendor';
          if (id.includes('gsap')) return 'animations';
          if (id.includes('recharts')) return 'charts';
        },
      },
    },
  },
})
