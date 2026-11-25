import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // In development, forward API calls to the Express server.
    proxy: {
      '/api': `http://localhost:${process.env.API_PORT || 5000}`,
    },
  },
})
