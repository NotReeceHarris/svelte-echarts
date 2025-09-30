import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  optimizeDeps: {
    include: [
      'echarts/core',
      'echarts/charts',
      'echarts/components',
      'echarts/renderers'
    ]
  },
  build: {
    rollupOptions: {
      external: ['echarts'],
      output: {
        globals: {
          echarts: 'echarts'
        }
      }
    }
  }
})
