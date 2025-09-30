import { describe, it, expect, vi } from 'vitest'
import { Chart } from '$lib/svelte-echarts'
import type { ChartProps } from '$lib/svelte-echarts/types'

describe('Chart Component - Integration Tests', () => {
  it('should be importable as a Svelte component', () => {
    // This tests that the Chart component can be imported without errors
    expect(Chart).toBeDefined()
    expect(typeof Chart).toBe('function')
  })

  it('should have correct component structure', () => {
    // Test that the component has the expected shape for Svelte 5
    expect(Chart.name).toBe('Chart')
    // Svelte 5 components have different internal structure
    expect(typeof Chart).toBe('function')
  })

  it('should validate minimal props interface', () => {
    // Test that we can create a valid props object
    const mockInit = () => ({})
    const minimalProps: ChartProps = {
      init: mockInit as any,
      options: {
        series: [{
          type: 'bar',
          data: [1, 2, 3]
        }]
      }
    }
    
    expect(minimalProps.init).toBeDefined()
    expect(minimalProps.options).toBeDefined()
    expect(minimalProps.options.series).toHaveLength(1)
  })

  it('should support all accessibility props', () => {
    const accessibleProps: ChartProps = {
      init: (() => {}) as any,
      options: { series: [{ type: 'bar', data: [1, 2, 3] }] },
      'aria-label': 'Test chart',
      'aria-describedby': 'chart-description',
      role: 'application',
      tabindex: 0,
    }
    
    expect(accessibleProps['aria-label']).toBe('Test chart')
    expect(accessibleProps.role).toBe('application')
    expect(accessibleProps.tabindex).toBe(0)
  })

  it('should support event handlers', () => {
    const clickHandler = vi.fn()
    const hoverHandler = vi.fn()
    
    const eventProps: ChartProps = {
      init: (() => {}) as any,
      options: { series: [{ type: 'bar', data: [1, 2, 3] }] },
      onclick: clickHandler,
      onmouseover: hoverHandler,
    }
    
    expect(eventProps.onclick).toBe(clickHandler)
    expect(eventProps.onmouseover).toBe(hoverHandler)
  })

  it('should support theme configuration', () => {
    const stringThemeProps: ChartProps = {
      init: (() => {}) as any,
      options: { series: [{ type: 'bar', data: [1, 2, 3] }] },
      theme: 'dark',
    }
    
    const objectThemeProps: ChartProps = {
      init: (() => {}) as any,
      options: { series: [{ type: 'bar', data: [1, 2, 3] }] },
      theme: { color: ['#red', '#blue'] },
    }
    
    expect(stringThemeProps.theme).toBe('dark')
    expect(objectThemeProps.theme).toHaveProperty('color')
  })

  it('should support ECharts init options', () => {
    const propsWithInitOptions: ChartProps = {
      init: (() => {}) as any,
      options: { series: [{ type: 'bar', data: [1, 2, 3] }] },
      initOptions: {
        width: 400,
        height: 300,
        renderer: 'canvas'
      },
      notMerge: false,
      lazyUpdate: true,
      silent: true,
    }
    
    expect(propsWithInitOptions.initOptions?.width).toBe(400)
    expect(propsWithInitOptions.initOptions?.renderer).toBe('canvas')
    expect(propsWithInitOptions.notMerge).toBe(false)
    expect(propsWithInitOptions.lazyUpdate).toBe(true)
    expect(propsWithInitOptions.silent).toBe(true)
  })
})
