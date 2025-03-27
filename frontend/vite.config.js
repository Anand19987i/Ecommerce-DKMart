import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    headers: {
      "Content-Security-Policy":
        "frame-ancestors 'self' https://www.gstatic.com https://www.google.com;",
    },
  },
})
