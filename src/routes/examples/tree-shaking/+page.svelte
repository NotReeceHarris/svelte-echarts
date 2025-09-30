<script lang="ts">
  import { onMount } from 'svelte'
  import { Chart } from 'svelte-echarts'

  import { init, use } from 'echarts/core'
  import type { EChartsOption } from 'echarts'
  import { BarChart } from 'echarts/charts'
  import {
    DatasetComponent,
    GridComponent,
    TitleComponent,
    TooltipComponent,
    TransformComponent,
  } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'

  use([
    BarChart,
    DatasetComponent,
    GridComponent,
    TooltipComponent,
    TransformComponent,
    CanvasRenderer,
    TitleComponent,
  ])

  const randomData = (length = 1, multiplier = 1) =>
    Array.from({ length }, () => Math.floor(Math.random() * multiplier))

  let data = $state(randomData(7, 100))

  let options = $derived({
    title: {
      text: 'Tree-shaking ECharts Example',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data,
      },
    ],
  } as EChartsOption)

  const updateData = () => {
    data = randomData(7, 100)
  }

  onMount(() => {
    const interval = setInterval(updateData, 10000)
    return () => clearInterval(interval)
  })
</script>

<svelte:head>
  <title>Tree-shaking | svelte-echarts</title>
</svelte:head>

<div class="page-container">
  <div class="header">
    <h1>Tree-shaking ECharts Usage</h1>
    <p class="description">
      This example demonstrates the recommended tree-shaking approach to using ECharts with svelte-echarts,
      importing only the specific components you need for optimal bundle size.
    </p>
  </div>

  <div class="chart-container">
    <Chart {init} {options} />
  </div>
  
  <div class="info">
    <h2>About Tree-shaking</h2>
    <p>
      This approach uses <code>import &#123; init, use &#125; from 'echarts/core'</code> and only imports
      the specific chart types and components you need. This results in much smaller bundle sizes.
    </p>
    
    <h3>Bundle Impact</h3>
    <ul>
      <li><strong>Pros:</strong> Minimal bundle size (as low as ~150KB minified)</li>
      <li><strong>Pros:</strong> Better performance due to smaller JavaScript bundles</li>
      <li><strong>Cons:</strong> Requires importing each component individually</li>
      <li><strong>Best for:</strong> Production applications and specific chart implementations</li>
    </ul>
    
    <h3>Required Imports for This Example</h3>
    <div class="imports-list">
      <div class="import-category">
        <h4>Charts:</h4>
        <code>BarChart</code>
      </div>
      <div class="import-category">
        <h4>Components:</h4>
        <code>GridComponent</code>, <code>TitleComponent</code>, <code>TooltipComponent</code>
      </div>
      <div class="import-category">
        <h4>Renderer:</h4>
        <code>CanvasRenderer</code>
      </div>
    </div>
    
    <h3>Code Example</h3>
    <pre><code>{`<script>
  import { Chart } from 'svelte-echarts'
  import { init, use } from 'echarts/core'
  import { BarChart } from 'echarts/charts'
  import {
    GridComponent,
    TitleComponent,
    TooltipComponent
  } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'
  
  // Register only the components you need
  use([
    BarChart,
    GridComponent,
    TitleComponent,
    TooltipComponent,
    CanvasRenderer
  ])
  
  const options = {
    title: { text: 'Tree-shaking ECharts Example' },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: { type: 'value' },
    series: [{
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110, 130]
    }]
  }
</script>

<Chart {init} {options} />`}</code></pre>
    
    <div class="tip">
      <h4>💡 Pro Tip</h4>
      <p>
        Always use tree-shaking in production! It can reduce your bundle size by 80% or more
        compared to importing the full ECharts library.
      </p>
    </div>
  </div>
</div>

<style>
  .page-container {
    min-height: 100vh;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .header h1 {
    font-size: 2.5rem;
    color: #1e293b;
    margin-bottom: 1rem;
  }
  
  .description {
    font-size: 1.2rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  .chart-container {
    height: 500px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin-bottom: 3rem;
  }
  
  .info {
    background: #f8fafc;
    border-radius: 12px;
    padding: 2rem;
  }
  
  .info h2 {
    color: #1e293b;
    margin-bottom: 1rem;
  }
  
  .info h3 {
    color: #475569;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .info h4 {
    color: #475569;
    margin-bottom: 0.5rem;
  }
  
  .info p {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .info ul {
    color: #64748b;
    line-height: 1.6;
  }
  
  .info li {
    margin-bottom: 0.5rem;
  }
  
  .imports-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1rem 0 2rem;
  }
  
  .import-category {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }
  
  .import-category h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #667eea;
  }
  
  code {
    background: #e2e8f0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.9rem;
  }
  
  .import-category code {
    background: #f1f5f9;
    color: #475569;
    font-size: 0.8rem;
  }
  
  pre {
    background: #1e293b;
    color: #e2e8f0;
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin-top: 1rem;
  }
  
  pre code {
    background: none;
    padding: 0;
    color: inherit;
  }
  
  .tip {
    background: linear-gradient(135deg, #667eea10, #764ba210);
    border: 1px solid #667eea30;
    border-radius: 8px;
    padding: 1.5rem;
    margin-top: 2rem;
  }
  
  .tip h4 {
    color: #667eea;
    margin: 0 0 0.5rem 0;
  }
  
  .tip p {
    margin: 0;
    color: #475569;
  }
  
  @media (max-width: 768px) {
    .page-container {
      padding: 1rem;
    }
    
    .header h1 {
      font-size: 2rem;
    }
    
    .chart-container {
      height: 400px;
    }
    
    .imports-list {
      grid-template-columns: 1fr;
    }
  }
</style>
