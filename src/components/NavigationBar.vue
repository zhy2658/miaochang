<template>
  <nav class="navbar" :class="{ 'is-dark': isDark, 'scrolled': isScrolled }">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item logo">
        <el-icon size="24" class="logo-icon">
          <Picture />
        </el-icon>
        <span class="logo-text">艺术画廊</span>
      </router-link>
      
      <!-- 移动端汉堡菜单 -->
      <div class="navbar-burger" :class="{ 'is-active': isMenuOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isMenuOpen }">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item" @click="closeMenu">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </router-link>
        <router-link to="/gallery" class="navbar-item" @click="closeMenu">
          <el-icon><PictureRounded /></el-icon>
          <span>画廊</span>
        </router-link>
        <router-link to="/about" class="navbar-item" @click="closeMenu">
          <el-icon><InfoFilled /></el-icon>
          <span>关于</span>
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <ThemeToggle />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Picture, HomeFilled, PictureRounded, InfoFilled } from '@element-plus/icons-vue'
import { useTheme } from '@/composables/useTheme'
import ThemeToggle from './ThemeToggle.vue'

const { isDark } = useTheme()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

:global(html.dark) .navbar {
  background: rgba(17, 24, 39, 0.95);
  border-bottom-color: #374151;
}

.navbar-brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  min-height: 4rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  font-weight: 600;
  font-size: 1.25rem;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  color: var(--el-color-primary);
  transition: all 0.3s ease;
}

.logo:hover .logo-icon {
  transform: rotate(15deg) scale(1.1);
}

.logo-text {
  background: linear-gradient(135deg, var(--el-color-primary), #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  padding: 0 1.5rem;
}

.navbar-start,
.navbar-end {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navbar-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.navbar-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.navbar-item:hover::before {
  left: 100%;
}

.navbar-item:hover {
  background: rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
}

.navbar-item.router-link-active {
  background: var(--el-color-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

:global(html.dark) .navbar-item:hover {
  background: rgba(59, 130, 246, 0.2);
}

:global(html.dark) .navbar-item.router-link-active {
  background: var(--el-color-primary);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
}

/* 汉堡菜单 */
.navbar-burger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

.navbar-burger:hover {
  background: rgba(0, 0, 0, 0.1);
}

:global(html.dark) .navbar-burger:hover {
  background: rgba(255, 255, 255, 0.1);
}

.navbar-burger span {
  width: 25px;
  height: 3px;
  background: currentColor;
  margin: 3px 0;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.navbar-burger.is-active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.navbar-burger.is-active span:nth-child(2) {
  opacity: 0;
}

.navbar-burger.is-active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .navbar-brand {
    padding: 0 1rem;
  }
  
  .navbar-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: inherit;
    backdrop-filter: inherit;
    flex-direction: column;
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  :global(html.dark) .navbar-menu {
    border-top-color: #374151;
  }
  
  .navbar-menu.is-active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .navbar-start,
  .navbar-end {
    width: 100%;
    flex-direction: column;
    gap: 0;
  }
  
  .navbar-item {
    width: 100%;
    justify-content: flex-start;
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 0.25rem 0;
  }
  
  .navbar-burger {
    display: flex;
  }
}

@media (max-width: 768px) {
  .navbar-brand {
    min-height: 3.5rem;
  }
  
  .logo-text {
    font-size: 1.1rem;
  }
  
  .navbar-item {
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
  }
}
</style>