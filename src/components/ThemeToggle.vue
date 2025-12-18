<template>
  <button 
    @click="toggleTheme"
    class="theme-toggle-btn"
    :class="{ 'is-dark': isDark }"
    :title="isDark ? '切换到亮色主题' : '切换到暗色主题'"
  >
    <el-icon size="18">
      <Sunny v-if="isDark" />
      <Moon v-else />
    </el-icon>
  </button>
</template>

<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-toggle-btn {
  background: transparent;
  border: 2px solid var(--el-border-color);
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--el-text-color-primary);
  backdrop-filter: blur(10px);
}

.theme-toggle-btn:hover {
  transform: rotate(180deg) scale(1.1);
  border-color: var(--el-color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.theme-toggle-btn.is-dark:hover {
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
}

/* 深色主题样式 */
:global(html.dark) .theme-toggle-btn {
  border-color: #4a5568;
  background: rgba(26, 32, 44, 0.8);
}

:global(html.dark) .theme-toggle-btn:hover {
  border-color: #fbbf24;
  background: rgba(26, 32, 44, 0.9);
}

/* 动画效果 */
.el-icon {
  transition: all 0.3s ease;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .theme-toggle-btn {
    width: 38px;
    height: 38px;
  }
}
</style>