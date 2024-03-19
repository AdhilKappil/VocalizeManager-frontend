import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
    proxy: {
      '/api': {
        target: 'https://vocalizemanager-backend-1.onrender.com',
        changeOrigin: true,
      },
    },
  },
}) 
