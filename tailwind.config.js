/** @type {import('tailwindcss').Config} */
export default {
  // 'content' memberitahu Tailwind file mana saja yang harus di-scan untuk mencari class Tailwind
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Di sini Anda bisa menambahkan warna kustom, font, dll jika diperlukan nanti
      colors: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      }
    },
  },
  plugins: [
    // Plugin tambahan bisa ditambahkan di sini
  ],
}
