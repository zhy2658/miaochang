<template>
  <div class="gallery">
    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="page-title">艺术画廊</h1>
        <p class="page-subtitle">探索精美的艺术作品收藏</p>
      </div>

      <!-- 筛选和搜索 -->
      <div class="filter-section">
        <div class="search-box">
          <el-input
            v-model="searchQuery"
            placeholder="搜索艺术作品..."
            clearable
            size="large"
            class="search-input"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
        
        <div class="filter-controls">
          <el-select v-model="selectedCategory" placeholder="选择分类" clearable>
            <el-option
              v-for="category in categories"
              :key="category"
              :label="category"
              :value="category"
            />
          </el-select>
          
          <el-select v-model="sortBy" placeholder="排序方式">
            <el-option label="最新发布" value="newest" />
            <el-option label="最旧发布" value="oldest" />
            <el-option label="标题A-Z" value="title-asc" />
            <el-option label="标题Z-A" value="title-desc" />
          </el-select>
          
          <el-radio-group v-model="viewMode" size="small">
            <el-radio-button label="grid">
              <el-icon><Grid /></el-icon>
            </el-radio-button>
            <el-radio-button label="list">
              <el-icon><List /></el-icon>
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <!-- 作品网格 -->
      <div class="gallery-content">
        <div v-if="loading" class="loading-state">
          <el-icon class="loading-icon"><Loading /></el-icon>
          <p>正在加载作品...</p>
        </div>
        
        <div v-else-if="filteredImages.length === 0" class="empty-state">
          <el-icon size="64" class="empty-icon"><Picture /></el-icon>
          <h3>暂无作品</h3>
          <p>没有找到符合条件的艺术作品</p>
        </div>
        
        <GalleryGrid v-else :images="filteredImages" />
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="pagination-section">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="totalImages"
          layout="prev, pager, next"
          background
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search, Grid, List, Loading, Picture } from '@element-plus/icons-vue'
import GalleryGrid from '@/components/GalleryGrid.vue'

interface GalleryImage {
  id: number
  title: string
  description: string
  url: string
  category: string
  artist: string
  createdAt: string
  featured: boolean
}

// 模拟数据
const allImages = ref<GalleryImage[]>([])
const loading = ref(false)

// 筛选条件
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('newest')
const viewMode = ref('grid')

// 分页
const currentPage = ref(1)
const pageSize = ref(12)
const totalImages = ref(0)

const categories = computed(() => {
  const cats = new Set(allImages.value.map(img => img.category))
  return Array.from(cats).sort()
})

const filteredImages = computed(() => {
  let images = allImages.value

  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    images = images.filter(img => 
      img.title.toLowerCase().includes(query) ||
      img.description.toLowerCase().includes(query) ||
      img.artist.toLowerCase().includes(query)
    )
  }

  // 分类筛选
  if (selectedCategory.value) {
    images = images.filter(img => img.category === selectedCategory.value)
  }

  // 排序
  images = [...images].sort((a, b) => {
    switch (sortBy.value) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'title-asc':
        return a.title.localeCompare(b.title)
      case 'title-desc':
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  totalImages.value = images.length

  // 分页
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return images.slice(start, end)
})

const totalPages = computed(() => Math.ceil(totalImages.value / pageSize.value))

const handlePageChange = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 生成模拟数据
const generateMockImages = () => {
  const mockImages: GalleryImage[] = []
  const categories = ['山水画', '人物画', '花鸟画', '抽象艺术', '城市摄影', '自然风光', '静物画', '现代艺术'] as const
  const artists = ['张艺师', '李明', '王创意', '陈画家', '刘艺术', '赵大师', '孙画师', '周艺术家'] as const
  const pick = <T>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)]!
  
  for (let i = 1; i <= 48; i++) {
    mockImages.push({
      id: i,
      title: `艺术作品 ${i}`,
      description: `这是一件精美的艺术作品，展现了独特的艺术风格和创作理念。作品融合了传统与现代的元素，呈现出独特的视觉效果。`,
      url: `https://picsum.photos/400/400?random=${i + 10}`,
      category: pick(categories),
      artist: pick(artists),
      createdAt: new Date(2024 - Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
        .toISOString()
        .slice(0, 10),
      featured: i <= 8
    })
  }
  
  return mockImages
}

onMounted(() => {
  loading.value = true
  setTimeout(() => {
    allImages.value = generateMockImages()
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
.gallery {
  min-height: 100vh;
  padding-top: 4rem;
  background: var(--el-bg-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 0;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--el-color-primary), #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--el-text-color-secondary);
  margin: 0;
}

.filter-section {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
}

:global(html.dark) .filter-section {
  background: #1f2937;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  max-width: 500px;
}

.filter-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.gallery-content {
  min-height: 400px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: var(--el-text-color-secondary);
}

.loading-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: spin 1s linear infinite;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  text-align: center;
  color: var(--el-text-color-secondary);
}

.empty-icon {
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--el-text-color-primary);
}

.pagination-section {
  display: flex;
  justify-content: center;
  padding: 3rem 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .page-header {
    padding: 2rem 0;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1.1rem;
  }
  
  .filter-section {
    padding: 1.5rem;
  }
  
  .filter-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-controls > * {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.75rem;
  }
  
  .filter-section {
    padding: 1rem;
  }
}
</style>
