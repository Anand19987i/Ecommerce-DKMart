import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/_redirects', // Source path
          dest: '.' // Destination path in build/ directory
        }
      ]
    })
  ],
  build: {
    outDir: 'build', // Ensure build folder is named 'build'
  },
  server: {
    headers: {
      "Content-Security-Policy": 
        "frame-ancestors 'self' https://www.gstatic.com https://www.google.com;",
    },
  },
})
