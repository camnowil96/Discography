import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  preview: {
    host: true,
    allowedHosts: ["https://discography.cameronnwilson.com"],
    port: 4173
  }
})


