import { ref } from 'vue'
import { defineStore } from 'pinia'

export type ThemeMode = 'light' | 'dark'
const STORAGE_KEY = 'tp-theme'

/** Lê o tema já aplicado pelo script inline do index.html (sem flash). */
function currentTheme(): ThemeMode {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>(currentTheme())

  function apply(next: ThemeMode) {
    mode.value = next
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* armazenamento indisponível: o tema vale só para esta sessão */
    }
  }

  function toggle() {
    apply(mode.value === 'dark' ? 'light' : 'dark')
  }

  return { mode, toggle }
})
