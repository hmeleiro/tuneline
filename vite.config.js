import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

dotenv.config()

const { PORT = 3001 } = process.env

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr({
    svgrOptions: {
      dimensions: false,
      icon: true
    }
  }), react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist/app'
  }
})
