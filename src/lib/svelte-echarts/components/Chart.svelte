<script lang="ts">
  import { EVENT_NAMES } from '$lib/svelte-echarts/constants/events'
  import { onMount } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { ChartProps } from 'svelte-echarts/types'
  import { debounce } from '../utils'

  let {
    init,
    theme = 'light',
    initOptions = {},
    options,
    notMerge = true,
    lazyUpdate = false,
    silent = false,
    replaceMerge,
    transition,
    chart = $bindable(),
    // Accessibility props
    'aria-label': ariaLabel = 'Interactive chart',
    'aria-describedby': ariaDescribedby,
    role = 'application',
    tabindex = 0,
    ...restProps
  }: ChartProps = $props()

  let element: HTMLDivElement

  $effect(() => {
    if (chart) {
      chart.setOption(options, { notMerge, lazyUpdate, silent, replaceMerge, transition })
    }
  })

  const initChart = () => {
    if (chart) chart.dispose()

    chart = init(element, theme, initOptions)

    EVENT_NAMES.forEach((eventName) => {
      (chart as any).on(eventName, (event: any) => {
        const handler = (restProps as any)[`on${eventName}`]
        if (typeof handler === 'function') {
          handler(event)
        }
      })
    })
  }

  onMount(() => {
    initChart()
    
    // Debounced resize handler for better performance
    const debouncedResize = debounce(() => {
      chart?.resize()
    }, 150)
    
    const resizeObserver = new ResizeObserver(debouncedResize)
    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
      chart?.dispose()
    }
  })

  const otherProps = $derived(
    Object.keys(restProps)
      .filter((key) => !key.startsWith('on'))
      .reduce(
        (r, k) => ({ ...r, [k]: (restProps as any)[k] }),
        {} as HTMLAttributes<HTMLDivElement>,
      ),
  )
</script>

<!-- Chart container with accessibility support -->
<div
  bind:this={element}
  style="width: 100%; height: 100%; {otherProps.style}"
  aria-label={ariaLabel}
  aria-describedby={ariaDescribedby}
  {role}
  {tabindex}
  {...otherProps}
></div>
