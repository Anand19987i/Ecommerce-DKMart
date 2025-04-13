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
          src: 'public/_redirects',
          dest: '.'
        }
      ]
    })
  ],
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://ecommerce-dkmart.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    headers: {
      "Content-Security-Policy": 
        "frame-ancestors 'self' https://www.gstatic.com https://www.google.com;",
    },
  },
  build: {
    outDir: 'build', // Changed from 'build' to 'dist' (Vite default)
    emptyOutDir: true,
  },
})