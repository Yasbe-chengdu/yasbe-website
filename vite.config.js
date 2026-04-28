import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          const assetName = name || ''

          if (assetName.endsWith('.css')) {
            return 'css/[name]-[hash][extname]'
          }

          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(assetName)) {
            return 'images/[name]-[hash][extname]'
          }

          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})
