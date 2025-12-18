<template>
  <div class="home">
    <!-- 英雄区域 -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            探索
            <span class="gradient-text">艺术之美</span>
          </h1>
          <p class="hero-subtitle">
            在这里发现世界各地的精美艺术作品，感受创意与灵感的碰撞
          </p>
          <div class="hero-actions">
            <el-button 
              type="primary" 
              size="large" 
              @click="$router.push('/gallery')"
              class="cta-button"
            >
              <el-icon><Picture /></el-icon>
              开始探索
            </el-button>
            <el-button 
              size="large" 
              @click="scrollToFeatured"
              class="secondary-button"
            >
              <el-icon><ArrowDown /></el-icon>
              了解更多
            </el-button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-card card-1">
            <img src="https://picsum.photos/200/300?random=1" alt="艺术作品1" />
          </div>
          <div class="floating-card card-2">
            <img src="https://picsum.photos/200/250?random=2" alt="艺术作品2" />
          </div>
          <div class="floating-card card-3">
            <img src="https://picsum.photos/250/200?random=3" alt="艺术作品3" />
          </div>
        </div>
      </div>
    </section>

    <!-- 特色作品 -->
    <section class="featured-section" ref="featuredRef">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">精选作品</h2>
          <p class="section-subtitle">精心挑选的优秀艺术作品</p>
        </div>
        <GalleryGrid :images="featuredImages" />
      </div>
    </section>

    <!-- 统计数据 -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">{{ animatedStats.artworks }}</div>
            <div class="stat-label">艺术作品</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ animatedStats.artists }}</div>
            <div class="stat-label">艺术家</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ animatedStats.categories }}</div>
            <div class="stat-label">艺术分类</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ animatedStats.visitors }}</div>
            <div class="stat-label">访客数量</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Picture, ArrowDown } from '@element-plus/icons-vue'
import GalleryGrid from '@/components/GalleryGrid.vue'

const featuredRef = ref<HTMLElement>()

const featuredImages = [
  {
    id: 1,
    title: '山水意境',
    description: '传统中国山水画的现代诠释',
    url: 'https://picsum.photos/400/400?random=4',
    category: '山水画',
    artist: '张艺师',
    createdAt: '2024-01-15',
    featured: true
  },
  {
    id: 2,
    title: '城市夜景',
    description: '现代都市的璀璨夜色',
    url: 'https://picsum.photos/400/400?random=5',
    category: '城市摄影',
    artist: '李明',
    createdAt: '2024-02-20',
    featured: false
  },
  {
    id: 3,
    title: '抽象几何',
    description: '几何形状的艺术组合',
    url: 'https://picsum.photos/400/400?random=6',
    category: '抽象艺术',
    artist: '王创意',
    createdAt: '2024-03-10',
    featured: true
  }
]

const stats = {
  artworks: 1250,
  artists: 89,
  categories: 24,
  visitors: 15680
}

const animatedStats = ref({
  artworks: 0,
  artists: 0,
  categories: 0,
  visitors: 0
})

const scrollToFeatured = () => {
  featuredRef.value?.scrollIntoView({ behavior: 'smooth' })
}

const animateNumber = (target: number, key: keyof typeof animatedStats.value) => {
  const duration = 2000
  const start = 0
  const increment = target / (duration / 16)
  let current = start
  
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    animatedStats.value[key] = Math.floor(current)
  }, 16)
}

onMounted(() => {
  // 启动数字动画
  setTimeout(() => {
    animateNumber(stats.artworks, 'artworks')
    animateNumber(stats.artists, 'artists')
    animateNumber(stats.categories, 'categories')
    animateNumber(stats.visitors, 'visitors')
  }, 500)
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

/* 英雄区域 */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem 4rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

:global(html.dark) .hero {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.hero-text {
  color: white;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  animation: fadeInUp 1s ease-out;
}

.gradient-text {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.cta-button {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border: none;
  color: white;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.6);
}

.secondary-button {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.secondary-button:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

/* 视觉元素 */
.hero-visual {
  position: relative;
  height: 400px;
  perspective: 1000px;
}

.floating-card {
  position: absolute;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: float 6s ease-in-out infinite;
}

.floating-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-1 {
  width: 200px;
  height: 280px;
  top: 20px;
  left: 20px;
  transform: rotateY(-15deg) rotateX(5deg);
  animation-delay: 0s;
}

.card-2 {
  width: 180px;
  height: 240px;
  top: 80px;
  right: 40px;
  transform: rotateY(10deg) rotateX(-5deg);
  animation-delay: 2s;
}

.card-3 {
  width: 220px;
  height: 180px;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%) rotateY(5deg) rotateX(10deg);
  animation-delay: 4s;
}

/* 特色作品区域 */
.featured-section {
  padding: 6rem 0;
  background: var(--el-bg-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--el-color-primary), #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--el-text-color-secondary);
  margin-bottom: 0;
}

/* 统计数据 */
.stats-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

:global(html.dark) .stats-section {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-item {
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

:global(html.dark) .stat-item {
  background: #1f2937;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.stat-item:hover {
  transform: translateY(-4px);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: var(--el-color-primary);
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
}

.stat-label {
  font-size: 1.1rem;
  color: var(--el-text-color-secondary);
  font-weight: 500;
}

/* 动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotateY(var(--rotate-y, 0deg)) rotateX(var(--rotate-x, 0deg));
  }
  50% {
    transform: translateY(-20px) rotateY(var(--rotate-y, 0deg)) rotateX(var(--rotate-x, 0deg));
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-visual {
    height: 300px;
  }
  
  .floating-card {
    transform: none !important;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 5rem 1rem 3rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button,
  .secondary-button {
    width: 100%;
    max-width: 250px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .stat-item {
    padding: 1.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-visual {
    height: 250px;
  }
  
  .card-1,
  .card-2,
  .card-3 {
    width: 150px;
    height: 200px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>