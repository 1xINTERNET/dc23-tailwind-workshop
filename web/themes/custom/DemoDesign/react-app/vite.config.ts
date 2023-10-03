import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist/',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/main.tsx',
      output: {
        format: 'esm',
        entryFileNames: 'main.js',
      },
    },
  },
})
