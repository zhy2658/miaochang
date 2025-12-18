<template>
  <div class="gallery-grid">
    <div 
      v-for="(image, index) in images" 
      :key="image.id"
      class="gallery-item"
      :class="{ 'featured': image.featured }"
      @click="openImage(index)"
    >
      <div class="image-container">
        <img 
          :src="image.url" 
          :alt="image.title"
          class="gallery-image"
          loading="lazy"
        >
        <div class="image-overlay">
          <div class="overlay-content">
            <h3 class="image-title">{{ image.title }}</h3>
            <p class="image-description">{{ image.description }}</p>
            <div class="image-meta">
              <span class="image-category">{{ image.category }}</span>
              <span class="image-date">{{ formatDate(image.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 图片预览模态框 -->
  <el-dialog
    v-model="dialogVisible"
    :title="currentImage?.title"
    width="90%"
    top="5vh"
    class="gallery-dialog"
    destroy-on-close
  >
    <div v-if="currentImage" class="dialog-content">
      <img :src="currentImage.url" :alt="currentImage.title" class="dialog-image">
      <div class="dialog-info">
        <p class="dialog-description">{{ currentImage.description }}</p>
        <div class="dialog-meta">
          <span class="meta-item">
            <el-icon><User /></el-icon>
            {{ currentImage.artist }}
          </span>
          <span class="meta-item">
            <el-icon><Calendar /></el-icon>
            {{ formatDate(currentImage.createdAt) }}
          </span>
          <span class="meta-item">
            <el-icon><Collection /></el-icon>
            {{ currentImage.category }}
          </span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { User, Calendar, Collection } from '@element-plus/icons-vue'

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

const props = defineProps<{
  images: GalleryImage[]
}>()

const dialogVisible = ref(false)
const currentIndex = ref(0)

const currentImage = computed(() => props.images[currentIndex.value])

const openImage = (index: number) => {
  currentIndex.value = index
  dialogVisible.value = true
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.gallery-item {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

:global(html.dark) .gallery-item {
  background: #1f2937;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.gallery-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

.gallery-item.featured {
  grid-column: span 2;
  grid-row: span 2;
}

.image-container {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
}

.gallery-item:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  color: white;
  transform: translateY(20px);
  transition: transform 0.4s ease;
}

.gallery-item:hover .overlay-content {
  transform: translateY(0);
}

.image-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.image-description {
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.image-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  opacity: 0.8;
}

.image-category {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}

/* 模态框样式 */
:global(.gallery-dialog) {
  --el-dialog-bg-color: transparent;
  --el-dialog-box-shadow: none;
}

:global(html.dark .gallery-dialog) {
  --el-dialog-bg-color: transparent;
}

.dialog-content {
  text-align: center;
}

.dialog-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.dialog-info {
  margin-top: 2rem;
  padding: 0 1rem;
}

.dialog-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: var(--el-text-color-primary);
}

.dialog-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--el-text-color-secondary);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .gallery-item.featured {
    grid-column: span 1;
    grid-row: span 1;
  }
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
  
  .image-overlay {
    padding: 1rem;
  }
  
  .image-title {
    font-size: 1.1rem;
  }
  
  .image-description {
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }
  
  .dialog-meta {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    padding: 0.5rem;
  }
  
  .gallery-item {
    border-radius: 0.75rem;
  }
}
</style>