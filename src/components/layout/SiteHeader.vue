<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import LogoMark from '@/components/ui/LogoMark.vue'
import { useThemeStore } from '@/stores/theme'
import { NAV_ITEMS } from '@/router/nav'

const theme = useThemeStore()
const route = useRoute()
const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && menuOpen.value) {
    closeMenu()
    document.getElementById('menu-toggle')?.focus()
  }
}

watch(() => route.fullPath, closeMenu)
onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <RouterLink to="/" class="brand" aria-label="Território & Poder, página inicial">
        <LogoMark :size="38" />
        <span class="brand-text">
          <span class="brand-name">Território &amp; Poder</span>
          <span class="brand-sub">Atlas geopolítico da América Latina</span>
        </span>
      </RouterLink>

      <nav id="main-nav" class="nav" :class="{ open: menuOpen }" aria-label="Principal">
        <ul>
          <li v-for="item in NAV_ITEMS" :key="item.to">
            <RouterLink :to="item.to" class="nav-link">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <div class="tools">
        <button
          type="button"
          class="icon-btn"
          :aria-label="theme.mode === 'dark' ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'"
          @click="theme.toggle()"
        >
          <svg v-if="theme.mode === 'dark'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
          </svg>
        </button>

        <button
          id="menu-toggle"
          type="button"
          class="icon-btn menu-btn"
          :aria-expanded="menuOpen"
          aria-controls="main-nav"
          :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
          @click="menuOpen = !menuOpen"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
            <path v-if="!menuOpen" d="M4 7h16M4 12h16M4 17h16" />
            <path v-else d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg);
  border-bottom: var(--rule);
}
.site-header::after {
  /* filete duplo, como cabeçalho de atlas impresso */
  content: '';
  position: absolute;
  inset: auto 0 -4px 0;
  border-bottom: var(--rule);
  pointer-events: none;
}
.bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: var(--space-5);
  min-height: var(--header-h);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--ink);
  text-decoration: none;
  justify-self: start;
}
.brand:hover {
  text-decoration: none;
}
.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}
.brand-name {
  font-family: var(--font-serif);
  font-variation-settings: 'opsz' 48;
  font-weight: 650;
  font-size: 1.3rem;
  letter-spacing: -0.01em;
}
.brand-sub {
  font-size: 0.78rem;
  color: var(--ink-2);
  margin-top: 2px;
}

.nav ul {
  display: flex;
  gap: var(--space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}
.nav-link {
  position: relative;
  display: block;
  padding: var(--space-2) var(--space-3);
  color: var(--ink-2);
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: color var(--dur-1) var(--ease);
}
.nav-link:hover {
  color: var(--ink);
  text-decoration: none;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: var(--space-3);
  right: var(--space-3);
  bottom: 2px;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-2) var(--ease);
}
.nav-link.router-link-exact-active {
  color: var(--ink);
}
.nav-link.router-link-exact-active::after {
  transform: scaleX(1);
}

.tools {
  display: flex;
  gap: var(--space-2);
  justify-self: end;
}
.icon-btn {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  color: var(--ink);
  background: transparent;
  border: var(--rule-strong);
  border-radius: var(--radius-2);
  cursor: pointer;
  transition:
    background-color var(--dur-1) var(--ease),
    border-color var(--dur-1) var(--ease);
}
.icon-btn:hover {
  background: var(--surface);
  border-color: var(--ink-2);
}
.menu-btn {
  display: none;
}

@media (max-width: 62rem) {
  .bar {
    display: flex;
  }
  .brand {
    margin-right: auto;
  }
  .brand-sub {
    display: none;
  }
  .menu-btn {
    display: grid;
  }
  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: none;
    background: var(--bg);
    border-bottom: var(--rule);
    padding: var(--space-2) var(--page-gutter) var(--space-4);
  }
  .nav.open {
    display: block;
  }
  .nav ul {
    flex-direction: column;
  }
  .nav-link {
    padding: var(--space-3) 0;
    border-bottom: var(--rule);
    font-size: 1.05rem;
  }
  .nav-link::after {
    left: 0;
    right: auto;
    width: 2.5rem;
    bottom: -1px;
  }
}
</style>
