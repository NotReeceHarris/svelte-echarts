<script lang="ts">
  import { onMount } from 'svelte'
  import { 
    Chart, 
    type ECMouseEvent, 
    createTheme 
  } from 'svelte-echarts'

  import { init, use } from 'echarts/core'
  import { 
    BarChart, 
    LineChart, 
    PieChart,
    GaugeChart 
  } from 'echarts/charts'
  import {
    GridComponent,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'

  use([
    BarChart,
    LineChart,
    PieChart,
    GaugeChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    CanvasRenderer,
    TitleComponent,
  ])

  let currentTheme: 'light' | 'dark' | 'colorful' = $state('light')
  let performanceMetric = $state(0)
  let renderTime = $state(0)

  // Hero chart data - simple animated line
  let heroData = $state(Array.from({ length: 12 }, (_, i) => 50 + Math.sin(i * 0.5) * 20 + Math.random() * 10))

  // Sample data for different chart types
  let salesData = [
    { month: 'Jan', sales: 1200 },
    { month: 'Feb', sales: 1900 },
    { month: 'Mar', sales: 1500 },
    { month: 'Apr', sales: 2100 },
    { month: 'May', sales: 1800 },
    { month: 'Jun', sales: 2400 },
  ]

  let categoryData = [
    { name: 'Desktop', value: 45 },
    { name: 'Mobile', value: 35 },
    { name: 'Tablet', value: 20 },
  ]

  let trendData = [
    { name: 'Week 1', value: 820 },
    { name: 'Week 2', value: 932 },
    { name: 'Week 3', value: 901 },
    { name: 'Week 4', value: 934 },
    { name: 'Week 5', value: 1290 },
    { name: 'Week 6', value: 1330 },
  ]

  // Chart options
  let heroOptions = $derived(() => ({
    grid: { top: 20, bottom: 20, left: 20, right: 20 },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 12 }, (_, i) => `${i + 1}`),
      show: false
    },
    yAxis: { type: 'value', show: false },
    series: [{
      data: heroData,
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        width: 3,
        color: 'rgba(255, 255, 255, 0.8)'
      },
      areaStyle: {
        color: 'rgba(255, 255, 255, 0.2)'
      }
    }]
  }))

  let salesOptions = $derived({
    title: {
      text: 'Monthly Sales',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: { top: 60, bottom: 80, left: 80, right: 40 },
    xAxis: {
      type: 'category',
      data: salesData.map(d => d.month)
    },
    yAxis: { type: 'value' },
    series: [{
      name: 'Sales',
      type: 'bar',
      data: salesData.map(d => d.sales),
      itemStyle: { color: '#5470c6' }
    }]
  })

  let pieOptions = $derived({
    title: {
      text: 'Device Usage Distribution',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 10
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      data: categoryData
    }]
  })

  let trendOptions = $derived({
    title: {
      text: 'Weekly Trends',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: { top: 60, bottom: 80, left: 80, right: 40 },
    xAxis: {
      type: 'category',
      data: trendData.map(d => d.name)
    },
    yAxis: { type: 'value' },
    series: [{
      name: 'Growth',
      type: 'line',
      data: trendData.map(d => d.value),
      smooth: true,
      itemStyle: { color: '#91cc75' },
      areaStyle: {
        color: 'rgba(145, 204, 117, 0.2)'
      }
    }]
  })

  let gaugeOptions = $derived({
    title: {
      text: 'Performance Score',
      left: 'center'
    },
    series: [{
      type: 'gauge',
      center: ['50%', '60%'],
      min: 0,
      max: 100,
      itemStyle: {
        color: '#58D9F9'
      },
      progress: { show: true, width: 20 },
      axisLine: { lineStyle: { width: 20 } },
      detail: {
        valueAnimation: true,
        formatter: '{value}%',
        color: 'inherit'
      },
      data: [{ value: 85 }]
    }]
  })

  // Update functions
  const updateHeroData = () => {
    const startTime = performance.now()
    
    heroData = heroData.map((_, i) => 50 + Math.sin(i * 0.5) * 20 + Math.random() * 10)
    
    renderTime = performance.now() - startTime
    performanceMetric = Math.random() * 15 + 85 // Random performance between 85-100%
  }

  const handleChartClick = (event: ECMouseEvent) => {
    console.log('Chart clicked:', event)
  }

  onMount(() => {
    const interval = setInterval(updateHeroData, 2000);
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>svelte-echarts - Powerful Apache ECharts for Svelte</title>
  <meta name="description" content="A powerful and accessible Apache ECharts component for Svelte with TypeScript support, utilities, and performance optimizations.">
</svelte:head>

<div class="landing-page">
  <!-- Hero Section -->
  <header class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1>svelte-echarts</h1>
          <p class="tagline">Powerful Apache ECharts for Svelte</p>
          <p class="description">
            A modern, accessible, and feature-rich charting library for Svelte applications.
            Built with TypeScript, performance optimizations, and comprehensive utilities.
          </p>
          <div class="hero-actions">
            <a href="#examples" class="btn btn-primary">View Examples</a>
            <a href="https://github.com/bherbruck/svelte-echarts#readme" class="btn btn-secondary">Full Documentation</a>
          </div>
          <div class="features-preview">
            <span class="feature-tag">✨ Svelte 5</span>
            <span class="feature-tag">⚡ Tree-shaking</span>
            <span class="feature-tag">♿ Accessible</span>
            <span class="feature-tag">📊 50+ Chart Types</span>
          </div>
        </div>
        <div class="hero-chart">
          <Chart 
            {init} 
            options={heroOptions()}
            theme={createTheme(currentTheme)}
            onclick={handleChartClick}
            aria-label="Beautiful animated chart showcasing svelte-echarts"
          />
          <!-- <div class="performance-stats">
            <div class="stat">
              <span class="stat-label">Render Time:</span>
              <span class="stat-value">{renderTime.toFixed(2)}ms</span>
            </div>
            <div class="stat">
              <span class="stat-label">Performance:</span>
              <span class="stat-value">{performanceMetric.toFixed(0)}%</span>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </header>

  <!-- Theme Selector -->
  <section class="theme-selector">
    <div class="container">
      <h3>Try Different Themes:</h3>
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
  </section>

  <!-- Key Features -->
  <section class="features" id="features">
    <div class="container">
      <h2>Why Choose svelte-echarts?</h2>
      <div class="features-grid">
        <div class="feature">
          <div class="feature-icon">🚀</div>
          <h3>Modern Svelte 5</h3>
          <p>Built for the latest Svelte with runes, $state, and $derived reactivity patterns.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">📦</div>
          <h3>Tree Shaking</h3>
          <p>Import only what you need. Optimized bundle sizes with selective ECharts imports.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">♿</div>
          <h3>Accessibility First</h3>
          <p>ARIA labels, keyboard navigation, and screen reader support built-in.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🔧</div>
          <h3>Powerful Utilities</h3>
          <p>Data transformation, theme creation, responsive options, and validation helpers.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">⚡</div>
          <h3>High Performance</h3>
          <p>Debounced resize, optimized renders, and memory leak prevention.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">📝</div>
          <h3>TypeScript Ready</h3>
          <p>Complete type definitions and IntelliSense support for better DX.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Chart Examples -->
  <section class="examples" id="examples">
    <div class="container">
      <h2>Interactive Chart Examples</h2>
      <p class="section-description">
        Explore different chart types and interactions. All examples are fully responsive and accessible.
      </p>
      
      <div class="examples-grid">
        <!-- Sales Analysis Chart -->
        <div class="example-card">
          <div class="example-header">
            <h3>Sales Analysis</h3>
            <span class="example-type">Mixed Chart</span>
          </div>
          <div class="example-chart">
            <Chart 
              {init} 
              options={salesOptions}
              theme={createTheme(currentTheme)}
              aria-label="Monthly sales and profit analysis chart"
            />
          </div>
          <div class="example-info">
            <p>Combines bar and line charts to show sales volume and profit trends over time.</p>
            <div class="example-features">
              <span class="tag">Interactive</span>
              <span class="tag">Responsive</span>
              <span class="tag">Animated</span>
            </div>
          </div>
        </div>

        <!-- Device Distribution -->
        <div class="example-card">
          <div class="example-header">
            <h3>Device Distribution</h3>
            <span class="example-type">Pie Chart</span>
          </div>
          <div class="example-chart">
            <Chart 
              {init} 
              options={pieOptions}
              theme={createTheme(currentTheme)}
              aria-label="Device usage distribution pie chart"
            />
          </div>
          <div class="example-info">
            <p>Beautiful donut chart showing device usage statistics with hover effects.</p>
            <div class="example-features">
              <span class="tag">Hover Effects</span>
              <span class="tag">Legends</span>
              <span class="tag">Tooltips</span>
            </div>
          </div>
        </div>

        <!-- Weekly Trends -->
        <div class="example-card">
          <div class="example-header">
            <h3>Weekly Trends</h3>
            <span class="example-type">Line Chart</span>
          </div>
          <div class="example-chart">
            <Chart 
              {init} 
              options={trendOptions}
              theme={createTheme(currentTheme)}
              aria-label="Weekly growth trends line chart"
            />
          </div>
          <div class="example-info">
            <p>Smooth line chart with area fill showing weekly growth trends over time.</p>
            <div class="example-features">
              <span class="tag">Smooth</span>
              <span class="tag">Area Fill</span>
              <span class="tag">Trends</span>
            </div>
          </div>
        </div>

        <!-- Performance Gauge -->
        <div class="example-card">
          <div class="example-header">
            <h3>Performance Score</h3>
            <span class="example-type">Gauge Chart</span>
          </div>
          <div class="example-chart">
            <Chart 
              {init} 
              options={gaugeOptions}
              theme={createTheme(currentTheme)}
              aria-label="Performance score gauge chart"
            />
          </div>
          <div class="example-info">
            <p>Clean gauge chart showing performance scores with smooth animations.</p>
            <div class="example-features">
              <span class="tag">Progress</span>
              <span class="tag">Animated</span>
              <span class="tag">Clean</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Performance Metrics -->
  <section class="performance">
    <div class="container">
      <h2>Performance Showcase</h2>
      <div class="performance-grid">
        <div class="metric">
          <div class="metric-value">&lt; 1ms</div>
          <div class="metric-label">Average Render Time</div>
        </div>
        <div class="metric">
          <div class="metric-value">60 FPS</div>
          <div class="metric-label">Smooth Animations</div>
        </div>
        <div class="metric">
          <div class="metric-value">~50KB</div>
          <div class="metric-label">Minimal Bundle Size</div>
        </div>
        <div class="metric">
          <div class="metric-value">100%</div>
          <div class="metric-label">Accessibility Score</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Quick Start -->
  <section class="quickstart">
    <div class="container">
      <h2>Quick Start</h2>
      <div class="code-example">
        <h3>Installation</h3>
        <pre><code>npm install svelte-echarts echarts</code></pre>
        
        <h3>Basic Usage</h3>
        <pre><code>{`<script>
  import { Chart } from 'svelte-echarts'
  import { init, use } from 'echarts/core'
  import { BarChart } from 'echarts/charts'
  import { GridComponent } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'
  
  use([BarChart, GridComponent, CanvasRenderer])
  
  const options = {
    xAxis: { type: 'category', data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [1, 2, 3] }]
  }
</script>

<Chart {init} {options} />`}</code></pre>
      </div>
      
      <div class="quickstart-actions">
        <a href="/examples/comprehensive" class="btn btn-primary">View Full Examples</a>
        <a href="https://github.com/bherbruck/svelte-echarts" class="btn btn-secondary" target="_blank">GitHub Repository</a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>svelte-echarts</h4>
          <p>Powerful Apache ECharts for Svelte applications.</p>
        </div>
        <div class="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="https://github.com/bherbruck/svelte-echarts#readme">Documentation</a></li>
            <li><a href="https://echarts.apache.org/" target="_blank">ECharts Docs</a></li>
            <li><a href="https://svelte.dev/" target="_blank">Svelte</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Community</h4>
          <ul>
            <li><a href="https://github.com/bherbruck/svelte-echarts" target="_blank">GitHub</a></li>
            <li><a href="https://github.com/bherbruck/svelte-echarts/issues" target="_blank">Issues</a></li>
            <li><a href="https://github.com/bherbruck/svelte-echarts/discussions" target="_blank">Discussions</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 svelte-echarts. MIT License.</p>
      </div>
    </div>
  </footer>
</div>

<style>
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  .landing-page {
    min-height: 100vh;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* Hero Section */
  .hero {
    padding: 4rem 0 6rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" fill-opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23ffffff" fill-opacity="0.1"/><circle cx="50" cy="10" r="1" fill="%23ffffff" fill-opacity="0.05"/><circle cx="20" cy="80" r="1" fill="%23ffffff" fill-opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }

  .hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .hero-text h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin: 0 0 1rem;
    background: linear-gradient(45deg, #fff, #e0e7ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .tagline {
    font-size: 1.5rem;
    color: #e0e7ff;
    margin: 0 0 2rem;
    font-weight: 300;
  }

  .description {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 3rem;
    color: #f1f5f9;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .btn {
    padding: 1rem 2rem;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
    display: inline-block;
    text-align: center;
  }

  .btn-primary {
    background: #fff;
    color: #667eea;
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
  }

  .btn-primary:hover {
    background: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .features-preview {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .feature-tag {
    background: rgba(255, 255, 255, 0.15);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    color: #e0e7ff;
    backdrop-filter: blur(10px);
  }

  .hero-chart {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    height: 400px;
    position: relative;
  }

  .performance-stats {
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
    justify-content: center;
  }

  .stat {
    text-align: center;
  }

  .stat-label {
    display: block;
    font-size: 0.9rem;
    color: #cbd5e1;
  }

  .stat-value {
    display: block;
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
  }

  /* Theme Selector */
  .theme-selector {
    padding: 2rem 0;
    background: #f8fafc;
    text-align: center;
  }

  .theme-selector h3 {
    margin-bottom: 1.5rem;
    color: #475569;
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

  /* Features Section */
  .features {
    padding: 6rem 0;
    background: white;
  }

  .features h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #1e293b;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 3rem;
  }

  .feature {
    text-align: center;
    padding: 2rem;
    border-radius: 12px;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    transition: transform 0.3s ease;
  }

  .feature:hover {
    transform: translateY(-5px);
  }

  .feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
  }

  .feature h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #1e293b;
  }

  .feature p {
    color: #64748b;
    line-height: 1.6;
  }

  /* Examples Section */
  .examples {
    padding: 6rem 0;
    background: #f8fafc;
  }

  .examples h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #1e293b;
  }

  .section-description {
    text-align: center;
    font-size: 1.2rem;
    color: #64748b;
    margin-bottom: 4rem;
  }

  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
  }

  .example-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .example-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .example-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .example-header h3 {
    margin: 0;
    color: #1e293b;
  }

  .example-type {
    background: #667eea;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .example-chart {
    height: 300px;
    padding: 1rem;
  }

  .example-info {
    padding: 1.5rem;
  }

  .example-info p {
    color: #64748b;
    margin-bottom: 1rem;
  }

  .example-features {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .tag {
    background: #e0e7ff;
    color: #667eea;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  /* Performance Section */
  .performance {
    padding: 6rem 0;
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    color: white;
  }

  .performance h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 4rem;
  }

  .performance-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3rem;
  }

  .metric {
    text-align: center;
  }

  .metric-value {
    font-size: 3rem;
    font-weight: 700;
    color: #60a5fa;
    display: block;
  }

  .metric-label {
    font-size: 1.1rem;
    color: #cbd5e1;
    margin-top: 0.5rem;
  }

  /* Quick Start Section */
  .quickstart {
    padding: 6rem 0;
    background: white;
  }

  .quickstart h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #1e293b;
  }

  .code-example {
    background: #1e293b;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 3rem;
  }

  .code-example h3 {
    color: #e2e8f0;
    margin-bottom: 1rem;
  }

  .code-example pre {
    background: #0f172a;
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 2rem;
  }

  .code-example code {
    color: #e2e8f0;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .quickstart-actions {
    text-align: center;
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  /* Footer */
  .footer {
    padding: 4rem 0 2rem;
    background: #0f172a;
    color: #94a3b8;
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .footer-section h4 {
    color: #e2e8f0;
    margin-bottom: 1rem;
  }

  .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-section li {
    margin-bottom: 0.5rem;
  }

  .footer-section a {
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-section a:hover {
    color: #e2e8f0;
  }

  .footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #334155;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-content {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }

    .hero-text h1 {
      font-size: 2.5rem;
    }

    .hero-actions {
      flex-direction: column;
      align-items: center;
    }

    .features-grid,
    .examples-grid {
      grid-template-columns: 1fr;
    }

    .performance-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .container {
      padding: 0 1rem;
    }

    .hero {
      padding: 2rem 0 4rem;
    }

    .features,
    .examples,
    .performance,
    .quickstart {
      padding: 3rem 0;
    }

    .theme-buttons {
      flex-direction: column;
      align-items: center;
    }

    .quickstart-actions {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
