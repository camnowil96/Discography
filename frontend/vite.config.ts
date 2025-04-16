import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  preview: {
    host: true,
    port: 4173
  },
  define: {
    'process.env.VITE_BACKEND_URL': "http://54.152.188.133:30200"
  }
})


