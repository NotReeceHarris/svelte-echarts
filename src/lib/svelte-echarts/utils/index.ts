import type { EChartsOption } from 'echarts'
import type { Writable } from 'svelte/store'

/**
 * Utility function to create responsive chart options that adapt to container size
 */
export function createResponsiveOptions(
  baseOptions: EChartsOption,
  containerWidth: number,
  containerHeight: number
): EChartsOption {
  const isSmall = containerWidth < 600
  
  return {
    ...baseOptions,
    title: {
      ...(baseOptions.title as any),
      textStyle: {
        fontSize: isSmall ? 14 : 18,
        ...(baseOptions.title as any)?.textStyle,
      },
    },
    legend: {
      ...(baseOptions.legend as any),
      orient: isSmall ? 'horizontal' : 'vertical',
      textStyle: {
        fontSize: isSmall ? 10 : 12,
        ...(baseOptions.legend as any)?.textStyle,
      },
    },
    grid: {
      left: isSmall ? '15%' : '10%',
      right: isSmall ? '15%' : '10%',
      top: isSmall ? '20%' : '15%',
      bottom: isSmall ? '20%' : '15%',
      ...(baseOptions.grid as any),
    },
  }
}

/**
 * Utility function to format data for time series charts
 */
export function formatTimeSeriesData(
  data: Array<{ timestamp: Date | string | number; value: number }>,
  options?: {
    timeFormat?: 'iso' | 'timestamp' | 'locale'
    locale?: string
    timeStyle?: Intl.DateTimeFormatOptions
  }
): { categories: string[]; values: number[] } {
  const { timeFormat = 'locale', locale = 'en-US', timeStyle = {} } = options || {}
  
  const categories = data.map(({ timestamp }) => {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
    
    switch (timeFormat) {
      case 'iso':
        return date.toISOString()
      case 'timestamp':
        return date.getTime().toString()
      case 'locale':
      default:
        return date.toLocaleString(locale, {
          hour12: false,
          ...timeStyle,
        })
    }
  })
  
  const values = data.map(({ value }) => value)
  
  return { categories, values }
}

/**
 * Utility function to create common chart themes
 */
export function createTheme(themeName: 'light' | 'dark' | 'colorful'): object {
  const themes = {
    light: {
      color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
      backgroundColor: 'transparent',
      textStyle: {
        color: '#333',
      },
      title: {
        textStyle: {
          color: '#333',
        },
      },
      legend: {
        textStyle: {
          color: '#333',
        },
      },
    },
    dark: {
      color: ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42'],
      backgroundColor: 'transparent',
      textStyle: {
        color: '#fff',
      },
      title: {
        textStyle: {
          color: '#fff',
        },
      },
      legend: {
        textStyle: {
          color: '#fff',
        },
      },
    },
    colorful: {
      color: ['#ff7f50', '#87ceeb', '#da70d6', '#32cd32', '#6495ed', '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0'],
      backgroundColor: 'transparent',
      textStyle: {
        color: '#333',
      },
    },
  }
  
  return themes[themeName]
}

/**
 * Utility to debounce function calls (useful for resize events)
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait) as any
  }
}

/**
 * Utility to create chart data transformation functions
 */
export const dataTransforms = {
  /**
   * Convert array of objects to ECharts dataset format
   */
  toDataset(data: Record<string, any>[]): { dimensions: string[]; source: any[][] } {
    if (data.length === 0) return { dimensions: [], source: [] }
    
    const dimensions = Object.keys(data[0])
    const source = [dimensions, ...data.map(item => dimensions.map(dim => item[dim]))]
    
    return { dimensions, source }
  },

  /**
   * Group data by a specific field
   */
  groupBy<T>(data: T[], keyFn: (item: T) => string): Record<string, T[]> {
    return data.reduce((groups, item) => {
      const key = keyFn(item)
      groups[key] = groups[key] || []
      groups[key].push(item)
      return groups
    }, {} as Record<string, T[]>)
  },

  /**
   * Calculate moving average
   */
  movingAverage(data: number[], windowSize: number): number[] {
    const result: number[] = []
    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - windowSize + 1)
      const window = data.slice(start, i + 1)
      const average = window.reduce((sum, val) => sum + val, 0) / window.length
      result.push(average)
    }
    return result
  },
}

/**
 * Utility to validate chart options
 */
export function validateChartOptions(options: EChartsOption): {
  isValid: boolean
  errors: string[]
  warnings: string[]
} {
  const errors: string[] = []
  const warnings: string[] = []
  
  // Check for required series
  if (!options.series || !Array.isArray(options.series) || options.series.length === 0) {
    errors.push('Chart options must include at least one series')
  }
  
  // Check for data in series
  if (Array.isArray(options.series)) {
    options.series.forEach((series: any, index: number) => {
      if (!series.data || (Array.isArray(series.data) && series.data.length === 0)) {
        warnings.push(`Series at index ${index} has no data`)
      }
    })
  }
  
  // Check for axes configuration
  if (options.xAxis && options.yAxis) {
    // Good - has both axes
  } else if (!options.xAxis && !options.yAxis) {
    warnings.push('No axes configured - chart may not display as expected')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}