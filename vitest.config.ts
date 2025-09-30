import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      $lib: '/src/lib',
      'svelte-echarts': '/src/lib/svelte-echarts',
    },
  },
})
