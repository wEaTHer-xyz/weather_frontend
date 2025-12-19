import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
    },
  },
  resolve: {
    alias: {
      // Solana 관련 모듈을 stub으로 대체
      '@solana-program/system': resolve(__dirname, './src/solana-stub.js'),
    },
  },
})
