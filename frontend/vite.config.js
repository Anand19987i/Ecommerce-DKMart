import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        copyFileSync('public/_redirects', 'build/_redirects') // <- change from dist to build
      },
    },
    tailwindcss(),
  ],
  build: {
    outDir: 'build', // <- VERY IMPORTANT!
  },
  server: {
    headers: {
      "Content-Security-Policy":
        "frame-ancestors 'self' https://www.gstatic.com https://www.google.com;",
    },
  },
})
