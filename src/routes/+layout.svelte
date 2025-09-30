<script lang="ts">
  import '../app.css'
  import { page } from '$app/stores'
  
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children }: Props = $props()
  let showMobileMenu = $state(false)
</script>

<div class="app">
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <a href="/svelte-echarts/" class="brand-link">
          <span class="brand-icon">📊</span>
          <span class="brand-text">svelte-echarts</span>
        </a>
      </div>
      
      <button 
        class="mobile-menu-btn"
        class:active={showMobileMenu}
        onclick={() => showMobileMenu = !showMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div class="nav-menu" class:active={showMobileMenu}>
        <a href="/svelte-echarts/" class="nav-link" class:active={$page.url.pathname === '/'}>Home</a>
        <a href="/svelte-echarts/examples/comprehensive" class="nav-link" class:active={$page.url.pathname.includes('comprehensive')}>Examples</a>
        <a href="/svelte-echarts/examples/classic" class="nav-link" class:active={$page.url.pathname.includes('classic')}>Classic</a>
        <a href="/svelte-echarts/examples/tree-shaking" class="nav-link" class:active={$page.url.pathname.includes('tree-shaking')}>Tree-shaking</a>
        <a href="https://github.com/bherbruck/svelte-echarts" class="nav-link external" target="_blank">GitHub</a>
      </div>
    </div>
  </nav>
  
  <main class="main-content">
    {@render children?.()}
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    z-index: 1000;
    transition: all 0.3s ease;
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
  }

  .nav-brand {
    display: flex;
    align-items: center;
  }

  .brand-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #1e293b;
    font-weight: 600;
    font-size: 1.2rem;
  }

  .brand-icon {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }

  .nav-menu {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-link {
    text-decoration: none;
    color: #64748b;
    font-weight: 500;
    transition: color 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 6px;
  }

  .nav-link:hover,
  .nav-link.active {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }

  .nav-link.external::after {
    content: ' ↗';
    font-size: 0.8rem;
    opacity: 0.7;
  }

  .mobile-menu-btn {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  .mobile-menu-btn span {
    width: 20px;
    height: 2px;
    background: #64748b;
    margin: 2px 0;
    transition: all 0.3s ease;
  }

  .mobile-menu-btn.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-4px, 4px);
  }

  .mobile-menu-btn.active span:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-btn.active span:nth-child(3) {
    transform: rotate(45deg) translate(-4px, -4px);
  }

  .main-content {
    flex: 1;
    padding-top: 70px;
  }

  @media (max-width: 768px) {
    .nav-container {
      padding: 0 1rem;
    }

    .mobile-menu-btn {
      display: flex;
    }

    .nav-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      flex-direction: column;
      padding: 2rem;
      gap: 1rem;
      border-bottom: 1px solid rgba(226, 232, 240, 0.8);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .nav-menu.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .nav-link {
      text-align: center;
      padding: 1rem;
    }
  }
</style>
