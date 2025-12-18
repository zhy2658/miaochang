<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="gallery">
    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="page-title">苗畅的画廊</h1>
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
import { fetchPics, type ApiPicItem } from '@/api/gallery'

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

const allImages = ref<GalleryImage[]>([])
const loading = ref(false)

// 筛选条件
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('newest')
const viewMode = ref('grid')

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

  return images
})

const totalPages = computed(() => Math.ceil(totalImages.value / pageSize.value))

const handlePageChange = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
  fetchImages()
}

const fetchImages = async () => {
  loading.value = true
  try {
    const res = await fetchPics(currentPage.value, pageSize.value)
    const items = res.data as ApiPicItem[]
    allImages.value = items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      url: item.url.trim(),
      category: item.category,
      artist: item.artist,
      createdAt: item.createdAt,
      featured: false
    }))
    totalImages.value = res.total
    pageSize.value = res.limit
    currentPage.value = res.page
  } catch {
    allImages.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchImages()
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
