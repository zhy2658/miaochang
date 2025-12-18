<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-left">
        <span class="brand">
          <el-icon size="18" class="brand-icon">
            <Picture />
          </el-icon>
          苗畅的画廊
        </span>
        <span class="copyright">© {{ year }} 苗畅的画廊 · 保留所有权利</span>
      </div>
      <div class="footer-right">
        <router-link to="/about" class="link">关于</router-link>
        <a href="#" class="link">隐私</a>
        <a href="#" class="link">条款</a>
      </div>
    </div>
  </footer>
  
</template>

<script setup lang="ts">
import { Picture } from '@element-plus/icons-vue'
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  width: 100%;
  border-top: 1px solid var(--el-border-color);
  background-color: var(--el-bg-color);
  backdrop-filter: blur(8px);
}

:global(html.dark) .site-footer {
  background-color: var(--el-bg-color);
  border-top-color: var(--el-border-color);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--el-text-color-secondary);
  font-size: 0.95rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.brand-icon {
  color: var(--el-color-primary);
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.link {
  text-decoration: none;
  color: var(--el-text-color-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.link:hover {
  color: var(--el-color-primary);
  background: rgba(59, 130, 246, 0.08);
}

:global(html.dark) .link:hover {
  background: rgba(59, 130, 246, 0.18);
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .footer-right {
    flex-wrap: wrap;
  }
}
</style>

