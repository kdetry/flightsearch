import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://sky-scrapper.p.rapidapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, _req, _res) => {
            // The actual headers will be set in our backend route handlers
            proxyReq.removeHeader('X-RapidAPI-Key');
            proxyReq.removeHeader('X-RapidAPI-Host');
          });
        },
      },
    },
  },
})
