import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        copyFileSync('public/_redirects', 'dist/_redirects')
      },
    },
    tailwindcss()],
  server: {
    headers: {
      "Content-Security-Policy":
        "frame-ancestors 'self' https://www.gstatic.com https://www.google.com;",
    },
  },
})
