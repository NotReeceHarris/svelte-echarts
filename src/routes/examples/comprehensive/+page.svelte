<script lang="ts">
  import { onMount } from 'svelte'
  import { 
    Chart, 
    type ECMouseEvent, 
    createTheme,
    createResponsiveOptions,
    formatTimeSeriesData,
    dataTransforms,
    validateChartOptions
  } from 'svelte-echarts'

  import { init, use } from 'echarts/core'
  import { 
    BarChart, 
    LineChart, 
    PieChart,
    ScatterChart,
    GaugeChart,
    RadarChart,
    FunnelChart,
    TreemapChart,
    SankeyChart,
    HeatmapChart,
    BoxplotChart,
    CandlestickChart
  } from 'echarts/charts'
  import {
    GridComponent,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    DataZoomComponent,
    VisualMapComponent,
    CalendarComponent,
    GraphicComponent
  } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'

  use([
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    GaugeChart,
    RadarChart,
    FunnelChart,
    TreemapChart,
    SankeyChart,
    HeatmapChart,
    BoxplotChart,
    CandlestickChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    DataZoomComponent,
    VisualMapComponent,
    CalendarComponent,
    GraphicComponent,
    CanvasRenderer,
    TitleComponent,
  ])

  let currentTheme: 'light' | 'dark' | 'colorful' = $state('light')

  // Sample data generators
  const generateTimeSeriesData = (days: number) => {
    return Array.from({ length: days }, (_, i) => ({
      timestamp: new Date(Date.now() - (days - i) * 86400000),
      value: Math.random() * 100 + 50,
      volume: Math.floor(Math.random() * 1000000)
    }))
  }

  const generateScatterData = (count: number) => {
    return Array.from({ length: count }, () => [
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 50 + 10
    ])
  }

  // Chart options
  let basicBarOptions = $derived({
    title: { text: 'Basic Bar Chart', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: { type: 'value' },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      itemStyle: {
        color: '#5470c6'
      }
    }]
  })

  let stackedBarOptions = $derived({
    title: { text: 'Stacked Bar Chart', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { bottom: 10 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Direct',
        type: 'bar',
        stack: 'total',
        data: [320, 302, 301, 334, 390, 330, 320]
      },
      {
        name: 'Mail Ad',
        type: 'bar',
        stack: 'total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Affiliate Ad',
        type: 'bar',
        stack: 'total',
        data: [220, 182, 191, 234, 290, 330, 310]
      }
    ]
  })

  let horizontalBarOptions = $derived({
    title: { text: 'Horizontal Bar Chart', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'value' },
    yAxis: {
      type: 'category',
      data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
    },
    series: [{
      data: [18203, 23489, 29034, 104970, 131744, 630230],
      type: 'bar',
      itemStyle: {
        color: '#91cc75'
      }
    }]
  })

  let basicLineOptions = $derived({
    title: { text: 'Basic Line Chart', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: { type: 'value' },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }]
  })

  let multiLineOptions = $derived({
    title: { text: 'Multiple Line Chart', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { bottom: 10 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Email',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210],
        smooth: true
      },
      {
        name: 'Union Ads',
        type: 'line',
        data: [220, 182, 191, 234, 290, 330, 310],
        smooth: true
      },
      {
        name: 'Video Ads',
        type: 'line',
        data: [150, 232, 201, 154, 190, 330, 410],
        smooth: true
      }
    ]
  })

  let areaLineOptions = $derived({
    title: { text: 'Area Line Chart', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: { type: 'value' },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {
        color: 'rgba(84, 112, 198, 0.2)'
      }
    }]
  })

  let basicPieOptions = $derived({
    title: { text: 'Basic Pie Chart', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { bottom: 10 },
    series: [{
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  })

  let donutPieOptions = $derived({
    title: { text: 'Donut Chart', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { bottom: 10 },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      }
    }]
  })

  let scatterOptions = $derived({
    title: { text: 'Scatter Plot', left: 'center' },
    tooltip: { trigger: 'item' },
    xAxis: { type: 'value', scale: true },
    yAxis: { type: 'value', scale: true },
    series: [{
      type: 'scatter',
      data: generateScatterData(100),
      symbolSize: (data: number[]) => data[2]
    }]
  })

  let bubbleScatterOptions = $derived({
    title: { text: 'Bubble Chart', left: 'center' },
    tooltip: { trigger: 'item' },
    xAxis: { type: 'value', scale: true },
    yAxis: { type: 'value', scale: true },
    series: [
      {
        name: 'Category A',
        type: 'scatter',
        data: generateScatterData(50),
        symbolSize: (data: number[]) => data[2],
        itemStyle: { color: '#5470c6' }
      },
      {
        name: 'Category B',
        type: 'scatter',
        data: generateScatterData(50),
        symbolSize: (data: number[]) => data[2],
        itemStyle: { color: '#91cc75' }
      }
    ]
  })

  let gaugeOptions = $derived({
    title: { text: 'Gauge Chart', left: 'center' },
    series: [{
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 200,
      endAngle: -40,
      min: 0,
      max: 60,
      splitNumber: 12,
      itemStyle: {
        color: '#FFAB91'
      },
      progress: {
        show: true,
        width: 30
      },
      pointer: {
        show: false
      },
      axisLine: {
        lineStyle: {
          width: 30
        }
      },
      axisTick: {
        distance: -45,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      splitLine: {
        distance: -52,
        length: 14,
        lineStyle: {
          width: 3,
          color: '#999'
        }
      },
      axisLabel: {
        distance: -20,
        color: '#999',
        fontSize: 20
      },
      anchor: {
        show: false
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, '-15%'],
        fontSize: 30,
        fontWeight: 'bolder',
        formatter: '{value} km/h',
        color: 'inherit'
      },
      data: [{
        value: 40
      }]
    }]
  })

  let radarOptions = $derived({
    title: { text: 'Radar Chart', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { bottom: 10 },
    radar: {
      indicator: [
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Technology', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 }
      ]
    },
    series: [{
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    }]
  })

  let funnelOptions = $derived({
    title: { text: 'Funnel Chart', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'funnel',
      left: '10%',
      top: 60,
      bottom: 60,
      width: '80%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'inside'
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
      data: [
        { value: 60, name: 'Visit' },
        { value: 40, name: 'Inquiry' },
        { value: 20, name: 'Order' },
        { value: 80, name: 'Click' },
        { value: 100, name: 'Show' }
      ]
    }]
  })

  let treemapOptions = $derived({
    title: { text: 'Treemap Chart', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'treemap',
      data: [
        {
          name: 'nodeA',
          value: 10,
          children: [
            { name: 'nodeAa', value: 4 },
            { name: 'nodeAb', value: 6 }
          ]
        },
        {
          name: 'nodeB',
          value: 20,
          children: [
            {
              name: 'nodeBa',
              value: 20,
              children: [
                { name: 'nodeBa1', value: 20 }
              ]
            }
          ]
        },
        {
          name: 'nodeC',
          value: 40,
          children: [
            { name: 'nodeCa', value: 30 },
            { name: 'nodeCb', value: 10 }
          ]
        },
        { name: 'nodeD', value: 30 }
      ]
    }]
  })

  let sankeyOptions = $derived({
    title: { text: 'Sankey Diagram', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'sankey',
      layout: 'none',
      emphasis: {
        focus: 'adjacency'
      },
      data: [
        { name: 'a' },
        { name: 'b' },
        { name: 'a1' },
        { name: 'a2' },
        { name: 'b1' },
        { name: 'c' }
      ],
      links: [
        { source: 'a', target: 'a1', value: 5 },
        { source: 'a', target: 'a2', value: 3 },
        { source: 'b', target: 'b1', value: 8 },
        { source: 'a', target: 'b1', value: 3 },
        { source: 'b1', target: 'a1', value: 1 },
        { source: 'b1', target: 'c', value: 2 }
      ]
    }]
  })

  let heatmapOptions = $derived({
    title: { text: 'Heatmap Chart', left: 'center' },
    tooltip: { position: 'top' },
    grid: {
      height: '50%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a'],
      splitArea: { show: true }
    },
    yAxis: {
      type: 'category',
      data: ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'],
      splitArea: { show: true }
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%'
    },
    series: [{
      name: 'Punch Card',
      type: 'heatmap',
      data: Array.from({ length: 7 }, (_, day) => 
        Array.from({ length: 12 }, (_, hour) => [hour, day, Math.floor(Math.random() * 10)])
      ).flat(),
      label: { show: true },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  })

  let mixedOptions = $derived({
    title: { text: 'Mixed Chart (Bar + Line)', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { bottom: 10 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: [
      { type: 'value', name: 'Precipitation', position: 'left' },
      { type: 'value', name: 'Temperature', position: 'right' }
    ],
    series: [
      {
        name: 'Evaporation',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
      },
      {
        name: 'Precipitation',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
      },
      {
        name: 'Temperature',
        type: 'line',
        yAxisIndex: 1,
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3],
        smooth: true
      }
    ]
  })

  let candlestickOptions = $derived({
    title: { text: 'Candlestick Chart', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
    },
    yAxis: { type: 'value' },
    series: [{
      type: 'candlestick',
      data: [
        [20, 34, 10, 38],
        [40, 35, 30, 50],
        [31, 38, 33, 44],
        [38, 15, 5, 42]
      ]
    }]
  })

  const handleChartClick = (event: ECMouseEvent) => {
    console.log('Chart clicked:', event)
  }
</script>

<svelte:head>
  <title>Examples - svelte-echarts</title>
  <meta name="description" content="Comprehensive examples of chart types available in svelte-echarts">
</svelte:head>

<div class="examples-page">
  <div class="container">
    <header class="page-header">
      <h1>Comprehensive Chart Examples</h1>
      <p class="page-description">
        Explore the full range of chart types and configurations available with svelte-echarts.
        All charts are interactive, responsive, and accessible.
      </p>
      
      <!-- Theme Selector -->
      <div class="theme-selector">
        <h3>Choose Theme:</h3>
        <div class="theme-buttons">
          <button 
            class="theme-btn" 
            class:active={currentTheme === 'light'}
            onclick={() => currentTheme = 'light'}
          >
            Light
          </button>
          <button 
            class="theme-btn" 
            class:active={currentTheme === 'dark'}
            onclick={() => currentTheme = 'dark'}
          >
            Dark
          </button>
          <button 
            class="theme-btn" 
            class:active={currentTheme === 'colorful'}
            onclick={() => currentTheme = 'colorful'}
          >
            Colorful
          </button>
        </div>
      </div>
    </header>

    <!-- Chart Examples Grid -->
    <div class="charts-grid">
      <!-- Bar Charts Section -->
      <section class="chart-section">
        <h2>Bar Charts</h2>
        
        <div class="chart-card">
          <div class="chart-header">
            <h3>Basic Bar Chart</h3>
            <span class="chart-type">Bar</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={basicBarOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Basic bar chart showing weekly data"
            />
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3>Stacked Bar Chart</h3>
            <span class="chart-type">Bar</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={stackedBarOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Stacked bar chart showing multiple data series"
            />
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3>Horizontal Bar Chart</h3>
            <span class="chart-type">Bar</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={horizontalBarOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Horizontal bar chart showing country population data"
            />
          </div>
        </div>
      </section>

      <!-- Line Charts Section -->
      <section class="chart-section">
        <h2>Line Charts</h2>
        
        <div class="chart-card">
          <div class="chart-header">
            <h3>Basic Line Chart</h3>
            <span class="chart-type">Line</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={basicLineOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Basic line chart showing weekly trends"
            />
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3>Multiple Line Chart</h3>
            <span class="chart-type">Line</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={multiLineOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Multiple line chart comparing different data series"
            />
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3>Area Line Chart</h3>
            <span class="chart-type">Line</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={areaLineOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Area line chart with filled area under the curve"
            />
          </div>
        </div>
      </section>

      <!-- Pie Charts Section -->
      <section class="chart-section">
        <h2>Pie Charts</h2>
        
        <div class="chart-card">
          <div class="chart-header">
            <h3>Basic Pie Chart</h3>
            <span class="chart-type">Pie</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={basicPieOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Basic pie chart showing data distribution"
            />
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3>Donut Chart</h3>
            <span class="chart-type">Pie</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={donutPieOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Donut chart with hollow center"
            />
          </div>
        </div>
      </section>

      <!-- Scatter Charts Section -->
      <section class="chart-section">
        <h2>Scatter Charts</h2>
        
        <div class="chart-card">
          <div class="chart-header">
            <h3>Scatter Plot</h3>
            <span class="chart-type">Scatter</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={scatterOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Scatter plot showing data point distribution"
            />
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3>Bubble Chart</h3>
            <span class="chart-type">Scatter</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={bubbleScatterOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Bubble chart with variable sized bubbles"
            />
          </div>
        </div>
      </section>

      <!-- Specialty Charts Section -->
      <section class="chart-section">
        <h2>Specialty Charts</h2>
        
        <div class="chart-card">
          <div class="chart-header">
            <h3>Gauge Chart</h3>
            <span class="chart-type">Gauge</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={gaugeOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Gauge chart showing speed measurement"
            />
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3>Radar Chart</h3>
            <span class="chart-type">Radar</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={radarOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Radar chart comparing budget vs spending"
            />
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3>Funnel Chart</h3>
            <span class="chart-type">Funnel</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={funnelOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Funnel chart showing conversion process"
            />
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3>Treemap Chart</h3>
            <span class="chart-type">Treemap</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={treemapOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Treemap chart showing hierarchical data"
            />
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3>Sankey Diagram</h3>
            <span class="chart-type">Sankey</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={sankeyOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Sankey diagram showing flow data"
            />
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3>Heatmap Chart</h3>
            <span class="chart-type">Heatmap</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={heatmapOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Heatmap chart showing time-based activity"
            />
          </div>
        </div>
      </section>

      <!-- Advanced Charts Section -->
      <section class="chart-section">
        <h2>Advanced Charts</h2>
        
        <div class="chart-card">
          <div class="chart-header">
            <h3>Mixed Chart</h3>
            <span class="chart-type">Mixed</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={mixedOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Mixed chart combining bar and line charts"
            />
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3>Candlestick Chart</h3>
            <span class="chart-type">Candlestick</span>
          </div>
          <div class="chart-container">
            <Chart 
              {init} 
              options={candlestickOptions}
              theme={createTheme(currentTheme)}
              onclick={handleChartClick}
              aria-label="Candlestick chart for financial data"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</div>

<style>
  .examples-page {
    min-height: 100vh;
    background: #f8fafc;
    padding: 2rem 0;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .page-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .page-header h1 {
    font-size: 3rem;
    color: #1e293b;
    margin-bottom: 1rem;
  }

  .page-description {
    font-size: 1.2rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }

  .theme-selector {
    margin-top: 2rem;
  }

  .theme-selector h3 {
    color: #475569;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .theme-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .theme-btn {
    padding: 0.75rem 1.5rem;
    border: 2px solid #e2e8f0;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    color: #64748b;
  }

  .theme-btn:hover {
    border-color: #667eea;
    color: #667eea;
  }

  .theme-btn.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
  }

  .charts-grid {
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  .chart-section h2 {
    font-size: 2rem;
    color: #1e293b;
    margin-bottom: 2rem;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid #667eea;
  }

  .chart-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    grid-template-rows: auto;
  }

  .chart-section h2 {
    grid-column: 1 / -1;
  }

  .chart-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .chart-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  }

  .chart-header h3 {
    margin: 0;
    color: #1e293b;
    font-size: 1.2rem;
  }

  .chart-type {
    background: #667eea;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .chart-container {
    height: 400px;
    padding: 1rem;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .container {
      padding: 0 1rem;
    }

    .page-header h1 {
      font-size: 2rem;
    }

    .chart-section {
      grid-template-columns: 1fr;
    }

    .theme-buttons {
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .chart-container {
      height: 300px;
    }

    .charts-grid {
      gap: 2rem;
    }
  }

  @media (max-width: 480px) {
    .page-header {
      margin-bottom: 2rem;
    }

    .page-header h1 {
      font-size: 1.8rem;
    }

    .page-description {
      font-size: 1rem;
    }

    .chart-container {
      height: 250px;
      padding: 0.5rem;
    }
  }
</style>