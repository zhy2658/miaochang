import { ref, computed, watch } from 'vue'

const THEME_KEY = 'gallery-theme'

type Theme = 'light' | 'dark'

export function useTheme() {
  const currentTheme = ref<Theme>((localStorage.getItem(THEME_KEY) as Theme) || 'light')
  
  const isDark = computed(() => currentTheme.value === 'dark')
  
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }
  
  watch(currentTheme, (newTheme) => {
    localStorage.setItem(THEME_KEY, newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }, { immediate: true })
  
  return {
    currentTheme,
    isDark,
    toggleTheme
  }
}