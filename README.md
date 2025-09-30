# svelte-echarts

A powerful and flexible [Apache ECharts](https://echarts.apache.org/) component for [Svelte](https://svelte.dev/) with full TypeScript support, accessibility features, and comprehensive utilities! Check out the [demo](https://bherbruck.github.io/svelte-echarts/).

[![npm version](https://badge.fury.io/js/svelte-echarts.svg)](https://badge.fury.io/js/svelte-echarts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## ✨ Features

- 🚀 **Full Svelte 5 support** with modern runes API
- 📦 **Tree-shaking friendly** - only include the ECharts components you need
- 🎨 **Built-in themes** and easy customization
- ♿ **Accessibility first** with ARIA labels and keyboard navigation
- 🔧 **Powerful utilities** for data transformation and responsive design
- 📊 **Comprehensive event handling** for all ECharts interactions
- 🧪 **Fully tested** with extensive test coverage
- 📝 **TypeScript support** with complete type definitions
- 🎯 **Performance optimized** with debounced resize and memory leak prevention

## 📦 Installation

```bash
npm install svelte-echarts echarts
```

## 🚀 Quick Start

```svelte
<script lang="ts">
  import { Chart } from 'svelte-echarts'
  import { init, use } from 'echarts/core'
  import { BarChart } from 'echarts/charts'
  import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'
  import type { EChartsOption } from 'echarts'

  // Register ECharts components for tree-shaking
  use([BarChart, GridComponent, TitleComponent, TooltipComponent, CanvasRenderer])

  const options: EChartsOption = {
    title: {
      text: 'My First Chart'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110, 130]
    }]
  }

  // Handle chart interactions
  const handleClick = (event) => {
    console.log('Chart clicked:', event)
  }
</script>

<div class="chart-container">
  <Chart 
    {init} 
    {options} 
    onclick={handleClick}
    aria-label="Weekly sales bar chart"
  />
</div>

<style>
  .chart-container {
    width: 100%;
    height: 400px;
  }
</style>
```

## 📖 API Reference

### Chart Component

The main `Chart` component accepts the following props:

#### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `init` | `typeof echarts.init` | ECharts init function from `echarts/core` or `echarts` |
| `options` | `EChartsOption` | ECharts configuration object |

#### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'light' \| 'dark' \| object` | `'light'` | Chart theme |
| `initOptions` | `EChartsInitOpts` | `{}` | ECharts initialization options |
| `notMerge` | `boolean` | `true` | Whether to merge with previous options |
| `lazyUpdate` | `boolean` | `false` | Whether to update chart lazily |
| `silent` | `boolean` | `false` | Whether to trigger events |
| `replaceMerge` | `string \| string[]` | `undefined` | Which components to replace when merging |
| `transition` | `object` | `undefined` | Animation configuration |

#### Accessibility Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aria-label` | `string` | `'Interactive chart'` | Accessibility label |
| `aria-describedby` | `string` | `undefined` | ID of element describing the chart |
| `role` | `string` | `'application'` | ARIA role |
| `tabindex` | `number` | `0` | Tab index for keyboard navigation |

#### Event Handlers

All ECharts events are supported as props with `on` prefix:

**Mouse Events:**
- `onclick`, `ondblclick`, `onmousedown`, `onmousemove`, `onmouseover`, `onmouseout`, `onglobalout`, `oncontextmenu`

**Interaction Events:**  
- `onhighlight`, `ondownplay`, `onselectchanged`, `onlegendselectchanged`, `onlegendselected`, `onlegendunselected`, `onlegendinverseselect`, `onlegendscroll`, `ondatazoom`, `ondatarangeselected`, `ontimelinechanged`, `ontimelineplaychanged`, `onrestore`, `ondataviewchanged`, `onmagictypechanged`, `ongeoselectchanged`, `ongeoselected`, `ongeounselected`, `onaxisareaselected`, `onbrush`, `onbrushend`, `onbrushselected`, `onglobalcursortaken`, `onrendered`, `onfinished`

#### Two-way Binding

```svelte
<script>
  import { Chart } from 'svelte-echarts'
  import type { EChartsType } from 'echarts'
  
  let chart: EChartsType
</script>

<Chart {init} {options} bind:chart />
```

### Utility Functions

#### `createTheme(themeName)`

Create predefined themes:

```typescript
import { createTheme } from 'svelte-echarts'

const lightTheme = createTheme('light')
const darkTheme = createTheme('dark')
const colorfulTheme = createTheme('colorful')
```

#### `formatTimeSeriesData(data, options?)`

Format time series data for charts:

```typescript
import { formatTimeSeriesData } from 'svelte-echarts'

const data = [
  { timestamp: new Date('2023-01-01'), value: 100 },
  { timestamp: new Date('2023-01-02'), value: 150 }
]

const { categories, values } = formatTimeSeriesData(data, {
  timeFormat: 'locale', // 'iso' | 'timestamp' | 'locale'
  locale: 'en-US',
  timeStyle: { hour: '2-digit', minute: '2-digit' }
})
```

#### `createResponsiveOptions(baseOptions, width, height)`

Create responsive chart options:

```typescript
import { createResponsiveOptions } from 'svelte-echarts'

const responsiveOptions = createResponsiveOptions(
  baseOptions, 
  containerWidth, 
  containerHeight
)
```

#### `dataTransforms`

Data transformation utilities:

```typescript
import { dataTransforms } from 'svelte-echarts'

// Convert to dataset format
const dataset = dataTransforms.toDataset(arrayOfObjects)

// Group data
const grouped = dataTransforms.groupBy(data, item => item.category)

// Calculate moving average
const smoothed = dataTransforms.movingAverage(values, windowSize)
```

#### `validateChartOptions(options)`

Validate chart configuration:

```typescript
import { validateChartOptions } from 'svelte-echarts'

const validation = validateChartOptions(options)
if (!validation.isValid) {
  console.error('Chart errors:', validation.errors)
}
if (validation.warnings.length > 0) {
  console.warn('Chart warnings:', validation.warnings)
}
```

#### `debounce(func, wait)`

Debounce function calls:

```typescript
import { debounce } from 'svelte-echarts'

const debouncedResize = debounce(() => {
  chart.resize()
}, 150)
```

## 📚 Examples

### Basic Line Chart

```svelte
<script lang="ts">
  import { Chart } from 'svelte-echarts'
  import { init, use } from 'echarts/core'
  import { LineChart } from 'echarts/charts'
  import { GridComponent, TitleComponent } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'

  use([LineChart, GridComponent, TitleComponent, CanvasRenderer])

  const options = {
    title: { text: 'Line Chart' },
    xAxis: { type: 'category', data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' },
    series: [{ type: 'line', data: [1, 2, 3] }]
  }
</script>

<Chart {init} {options} />
```

### Pie Chart with Events

```svelte
<script lang="ts">
  import { Chart } from 'svelte-echarts'
  import { init, use } from 'echarts/core'
  import { PieChart } from 'echarts/charts'
  import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'

  use([PieChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer])

  const options = {
    title: { text: 'Pie Chart' },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      data: [
        { name: 'A', value: 335 },
        { name: 'B', value: 310 },
        { name: 'C', value: 234 }
      ]
    }]
  }

  const handleClick = (event) => {
    alert(`Clicked: ${event.name}`)
  }
</script>

<Chart {init} {options} onclick={handleClick} />
```

### Real-time Chart with Utilities

```svelte
<script lang="ts">
  import { Chart, formatTimeSeriesData, dataTransforms } from 'svelte-echarts'
  import { init, use } from 'echarts/core'
  import { LineChart } from 'echarts/charts'
  import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'
  import { onMount } from 'svelte'

  use([LineChart, GridComponent, TitleComponent, TooltipComponent, CanvasRenderer])

  let data = Array.from({ length: 20 }, (_, i) => ({
    timestamp: new Date(Date.now() - (20 - i) * 60000),
    value: Math.random() * 100
  }))

  $: options = (() => {
    const { categories, values } = formatTimeSeriesData(data)
    const smoothedValues = dataTransforms.movingAverage(values, 5)

    return {
      title: { text: 'Real-time Data' },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: categories },
      yAxis: { type: 'value' },
      series: [
        { name: 'Raw', type: 'line', data: values },
        { name: 'Smoothed', type: 'line', data: smoothedValues }
      ]
    }
  })()

  onMount(() => {
    const interval = setInterval(() => {
      data = [
        ...data.slice(1),
        { timestamp: new Date(), value: Math.random() * 100 }
      ]
    }, 1000)

    return () => clearInterval(interval)
  })
</script>

<Chart {init} {options} />
```

### Accessible Chart

```svelte
<script lang="ts">
  import { Chart } from 'svelte-echarts'
  // ... imports

  const options = {
    title: { text: 'Sales Performance' },
    // ... chart config
  }
</script>

<Chart 
  {init} 
  {options}
  aria-label="Monthly sales performance showing growth from Jan to Dec"
  aria-describedby="chart-description"
  role="img"
  tabindex={0}
/>

<div id="chart-description" class="sr-only">
  This chart displays monthly sales data from January to December 2023,
  showing a steady growth trend with peaks in November and December.
</div>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
```

### Responsive Chart

```svelte
<script lang="ts">
  import { Chart, createResponsiveOptions } from 'svelte-echarts'
  import { onMount } from 'svelte'
  // ... other imports

  let containerElement
  let containerWidth = 800
  let containerHeight = 400

  const baseOptions = {
    title: { text: 'Responsive Chart' },
    xAxis: { type: 'category', data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [1, 2, 3] }]
  }

  $: options = createResponsiveOptions(baseOptions, containerWidth, containerHeight)

  onMount(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        containerWidth = entry.contentRect.width
        containerHeight = entry.contentRect.height
      }
    })

    resizeObserver.observe(containerElement)
    return () => resizeObserver.disconnect()
  })
</script>

<div bind:this={containerElement} class="responsive-container">
  <Chart {init} {options} />
</div>

<style>
  .responsive-container {
    width: 100%;
    height: 50vh;
    min-height: 300px;
  }
</style>
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Build package
npm run build

# Check TypeScript
npm run check

# Lint code
npm run lint

# Format code
npm run format
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Brennen Herbruck](https://github.com/bherbruck)

## 🚀 Changelog

See [CHANGELOG.md](CHANGELOG.md) for details.
