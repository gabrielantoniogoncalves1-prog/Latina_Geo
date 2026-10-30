import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// O workflow de deploy define VITE_BASE_PATH=/NOME_DO_REPO/ (ou "/" para OWNER.github.io).
export default defineConfig({
  plugins: [vue()],
  base: process.env.VITE_BASE_PATH || '/',
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: { outDir: 'dist' },
  test: { environment: 'node', include: ['tests/unit/**/*.test.ts'] },
})
