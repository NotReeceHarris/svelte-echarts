import { describe, it, expect } from 'vitest'
import {
  createResponsiveOptions,
  formatTimeSeriesData,
  createTheme,
  debounce,
  dataTransforms,
  validateChartOptions,
} from '$lib/svelte-echarts/utils'
import type { EChartsOption } from 'echarts'

describe('Utility Functions', () => {
  describe('createResponsiveOptions', () => {
    it('should create responsive options for small screens', () => {
      const baseOptions: EChartsOption = {
        title: { text: 'Test Chart' },
        legend: { data: ['series1'] },
      }
      
      const responsiveOptions = createResponsiveOptions(baseOptions, 500, 300)
      
      expect((responsiveOptions.title as any)?.textStyle?.fontSize).toBe(14)
      expect((responsiveOptions.legend as any)?.orient).toBe('horizontal')
      expect((responsiveOptions.legend as any)?.textStyle?.fontSize).toBe(10)
      expect((responsiveOptions.grid as any)?.left).toBe('15%')
    })

    it('should create responsive options for large screens', () => {
      const baseOptions: EChartsOption = {
        title: { text: 'Test Chart' },
        legend: { data: ['series1'] },
      }
      
      const responsiveOptions = createResponsiveOptions(baseOptions, 800, 600)
      
      expect((responsiveOptions.title as any)?.textStyle?.fontSize).toBe(18)
      expect((responsiveOptions.legend as any)?.orient).toBe('vertical')
      expect((responsiveOptions.legend as any)?.textStyle?.fontSize).toBe(12)
      expect((responsiveOptions.grid as any)?.left).toBe('10%')
    })

    it('should preserve existing options', () => {
      const baseOptions: EChartsOption = {
        title: {
          text: 'Test Chart',
          textStyle: { color: 'red' }
        },
        grid: { top: 50 }
      }
      
      const responsiveOptions = createResponsiveOptions(baseOptions, 800, 600)
      
      expect((responsiveOptions.title as any)?.text).toBe('Test Chart')
      expect((responsiveOptions.title as any)?.textStyle?.color).toBe('red')
      expect((responsiveOptions.grid as any)?.top).toBe(50)
    })
  })

  describe('formatTimeSeriesData', () => {
    const testData = [
      { timestamp: new Date('2023-01-01T10:00:00'), value: 100 },
      { timestamp: new Date('2023-01-01T11:00:00'), value: 150 },
      { timestamp: new Date('2023-01-01T12:00:00'), value: 200 },
    ]

    it('should format data with locale format by default', () => {
      const result = formatTimeSeriesData(testData)
      
      expect(result.categories).toHaveLength(3)
      expect(result.values).toEqual([100, 150, 200])
      expect(result.categories[0]).toMatch(/1\/1\/2023/)
    })

    it('should format data with ISO format', () => {
      const result = formatTimeSeriesData(testData, { timeFormat: 'iso' })
      
      expect(result.categories[0]).toBe('2023-01-01T10:00:00.000Z')
      expect(result.values).toEqual([100, 150, 200])
    })

    it('should format data with timestamp format', () => {
      const result = formatTimeSeriesData(testData, { timeFormat: 'timestamp' })
      
      expect(result.categories[0]).toBe(new Date('2023-01-01T10:00:00').getTime().toString())
      expect(result.values).toEqual([100, 150, 200])
    })

    it('should handle string timestamps', () => {
      const stringData = [
        { timestamp: '2023-01-01T10:00:00', value: 100 },
        { timestamp: '2023-01-01T11:00:00', value: 150 },
      ]
      
      const result = formatTimeSeriesData(stringData, { timeFormat: 'iso' })
      
      expect(result.categories).toHaveLength(2)
      expect(result.values).toEqual([100, 150])
    })

    it('should handle number timestamps', () => {
      const numberData = [
        { timestamp: Date.now(), value: 100 },
        { timestamp: Date.now() + 60000, value: 150 },
      ]
      
      const result = formatTimeSeriesData(numberData)
      
      expect(result.categories).toHaveLength(2)
      expect(result.values).toEqual([100, 150])
    })
  })

  describe('createTheme', () => {
    it('should create light theme', () => {
      const theme = createTheme('light')
      
      expect(theme).toHaveProperty('color')
      expect(theme).toHaveProperty('textStyle')
      expect((theme as any).textStyle.color).toBe('#333')
    })

    it('should create dark theme', () => {
      const theme = createTheme('dark')
      
      expect(theme).toHaveProperty('color')
      expect((theme as any).textStyle.color).toBe('#fff')
    })

    it('should create colorful theme', () => {
      const theme = createTheme('colorful')
      
      expect(theme).toHaveProperty('color')
      expect((theme as any).color).toContain('#ff7f50')
    })
  })

  describe('debounce', () => {
    it('should debounce function calls', async () => {
      let callCount = 0
      const testFn = () => callCount++
      const debouncedFn = debounce(testFn, 50)
      
      debouncedFn()
      debouncedFn()
      debouncedFn()
      
      expect(callCount).toBe(0)
      
      await new Promise(resolve => setTimeout(resolve, 60))
      
      expect(callCount).toBe(1)
    })

    it('should pass arguments correctly', async () => {
      let lastArgs: any[] = []
      const testFn = (...args: any[]) => { lastArgs = args }
      const debouncedFn = debounce(testFn, 50)
      
      debouncedFn('a', 'b', 'c')
      
      await new Promise(resolve => setTimeout(resolve, 60))
      
      expect(lastArgs).toEqual(['a', 'b', 'c'])
    })
  })

  describe('dataTransforms', () => {
    describe('toDataset', () => {
      it('should convert array of objects to dataset format', () => {
        const data = [
          { name: 'A', value: 100 },
          { name: 'B', value: 200 },
        ]
        
        const result = dataTransforms.toDataset(data)
        
        expect(result.dimensions).toEqual(['name', 'value'])
        expect(result.source).toEqual([
          ['name', 'value'],
          ['A', 100],
          ['B', 200]
        ])
      })

      it('should handle empty array', () => {
        const result = dataTransforms.toDataset([])
        
        expect(result.dimensions).toEqual([])
        expect(result.source).toEqual([])
      })
    })

    describe('groupBy', () => {
      it('should group data by key function', () => {
        const data = [
          { category: 'A', value: 100 },
          { category: 'B', value: 200 },
          { category: 'A', value: 150 },
        ]
        
        const result = dataTransforms.groupBy(data, item => item.category)
        
        expect(result.A).toHaveLength(2)
        expect(result.B).toHaveLength(1)
        expect(result.A[0].value).toBe(100)
        expect(result.A[1].value).toBe(150)
      })

      it('should handle empty array', () => {
        const result = dataTransforms.groupBy([], (item: any) => item.key)
        
        expect(result).toEqual({})
      })
    })

    describe('movingAverage', () => {
      it('should calculate moving average', () => {
        const data = [1, 2, 3, 4, 5]
        const result = dataTransforms.movingAverage(data, 3)
        
        expect(result).toHaveLength(5)
        expect(result[0]).toBe(1) // First value with window size 1
        expect(result[1]).toBe(1.5) // Average of [1, 2]
        expect(result[2]).toBe(2) // Average of [1, 2, 3]
        expect(result[3]).toBe(3) // Average of [2, 3, 4]
        expect(result[4]).toBe(4) // Average of [3, 4, 5]
      })

      it('should handle window size larger than data', () => {
        const data = [1, 2, 3]
        const result = dataTransforms.movingAverage(data, 5)
        
        expect(result).toEqual([1, 1.5, 2])
      })

      it('should handle empty array', () => {
        const result = dataTransforms.movingAverage([], 3)
        
        expect(result).toEqual([])
      })
    })
  })

  describe('validateChartOptions', () => {
    it('should validate valid chart options', () => {
      const options: EChartsOption = {
        xAxis: { type: 'category' },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: [1, 2, 3] }]
      }
      
      const result = validateChartOptions(options)
      
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should detect missing series', () => {
      const options: EChartsOption = {
        xAxis: { type: 'category' },
        yAxis: { type: 'value' }
      }
      
      const result = validateChartOptions(options)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Chart options must include at least one series')
    })

    it('should detect empty series array', () => {
      const options: EChartsOption = {
        xAxis: { type: 'category' },
        yAxis: { type: 'value' },
        series: []
      }
      
      const result = validateChartOptions(options)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Chart options must include at least one series')
    })

    it('should warn about series without data', () => {
      const options: EChartsOption = {
        xAxis: { type: 'category' },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: [] }]
      }
      
      const result = validateChartOptions(options)
      
      expect(result.isValid).toBe(true)
      expect(result.warnings).toContain('Series at index 0 has no data')
    })

    it('should warn about missing axes', () => {
      const options: EChartsOption = {
        series: [{ type: 'bar', data: [1, 2, 3] }]
      }
      
      const result = validateChartOptions(options)
      
      expect(result.isValid).toBe(true)
      expect(result.warnings).toContain('No axes configured - chart may not display as expected')
    })
  })
})