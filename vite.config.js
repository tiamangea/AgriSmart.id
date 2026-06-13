import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/AgriSmart.id/', // GANTI dengan nama repository GitHub kamu yang sebenarnya
})