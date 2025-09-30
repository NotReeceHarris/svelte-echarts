<script lang="ts">
  import { onMount } from 'svelte'
  import { Chart } from 'svelte-echarts'

  import { init } from 'echarts'
  import type { EChartsOption } from 'echarts'

  const randomData = (length = 1, multiplier = 1) =>
    Array.from({ length }, () => Math.floor(Math.random() * multiplier))

  let data = $state(randomData(7, 100))

  let options = $derived({
    title: {
      text: 'Classic ECharts Example',
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
  <title>Classic Example - svelte-echarts</title>
</svelte:head>

<div class="page-container">
  <div class="header">
    <h1>Classic ECharts Usage</h1>
    <p class="description">
      This example demonstrates the classic way to use ECharts with svelte-echarts, 
      importing the full ECharts library without tree-shaking.
    </p>
  </div>

  <div class="chart-container">
    <Chart {init} {options} />
  </div>
  
  <div class="info">
    <h2>About This Example</h2>
    <p>
      This approach uses the classic <code>import &#123; init &#125; from 'echarts'</code> method,
      which includes the entire ECharts library. While this is easier to set up,
      it results in a larger bundle size compared to the tree-shaking approach.
    </p>
    
    <h3>Bundle Impact</h3>
    <ul>
      <li><strong>Pros:</strong> Simple setup, no need to import individual components</li>
      <li><strong>Cons:</strong> Larger bundle size (~800KB+ minified)</li>
      <li><strong>Best for:</strong> Applications that use many different chart types</li>
    </ul>
    
    <h3>Code Example</h3>
    <pre><code>{`<script>
  import { Chart } from 'svelte-echarts'
  import { init } from 'echarts'
  
  const options = {
    title: { text: 'Classic ECharts Example' },
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
  
  code {
    background: #e2e8f0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.9rem;
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
  }
</style>
