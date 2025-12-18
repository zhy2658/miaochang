<template>
  <div class="about">
    <div class="container">
      <div class="about-content">
        <!-- 页面标题 -->
        <div class="page-header">
          <h1 class="page-title">关于我们</h1>
          <p class="page-subtitle">了解艺术画廊的故事与使命</p>
        </div>

        <!-- 简介部分 -->
        <section class="intro-section">
          <div class="intro-grid">
            <div class="intro-text">
              <h2 class="intro-title">我们的使命</h2>
              <p class="intro-description">
                画廊致力于成为连接艺术家与艺术爱好者的桥梁。我们相信艺术具有改变世界的力量，
                能够为人们带来美的享受、思想的启发和情感的共鸣。通过我们的平台，
                我们希望让更多人接触到优秀的艺术作品，感受艺术的魅力。
              </p>
              <div class="intro-features">
                <div class="feature-item">
                  <el-icon size="24" class="feature-icon"><Picture /></el-icon>
                  <div class="feature-content">
                    <h3>精选作品</h3>
                    <p>精心挑选来自世界各地的优秀艺术作品</p>
                  </div>
                </div>
                <div class="feature-item">
                  <el-icon size="24" class="feature-icon"><User /></el-icon>
                  <div class="feature-content">
                    <h3>艺术家支持</h3>
                    <p>为艺术家提供展示才华的平台和机会</p>
                  </div>
                </div>
                <div class="feature-item">
                  <el-icon size="24" class="feature-icon"><Share /></el-icon>
                  <div class="feature-content">
                    <h3>全球视野</h3>
                    <p>汇聚不同文化背景下的艺术精华</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="intro-visual">
              <div class="visual-card">
                <img src="https://picsum.photos/400/300?random=100" alt="苗畅的画廊" />
                <div class="visual-overlay">
                  <span class="overlay-text">艺术无界，创意无限</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 团队介绍 -->
        <section class="team-section">
          <h2 class="section-title">我们的团队</h2>
          <p class="section-subtitle">由艺术爱好者和技术专家组成的专业团队</p>
          <div class="team-grid">
            <div class="team-member">
              <div class="member-avatar">
                <img src="https://picsum.photos/150/150?random=101" alt="团队成员" />
              </div>
              <h3 class="member-name">张艺总监</h3>
              <p class="member-role">艺术总监</p>
              <p class="member-bio">拥有20年艺术策展经验，致力于推广当代艺术</p>
            </div>
            <div class="team-member">
              <div class="member-avatar">
                <img src="https://picsum.photos/150/150?random=102" alt="团队成员" />
              </div>
              <h3 class="member-name">李技术</h3>
              <p class="member-role">技术负责人</p>
              <p class="member-bio">专注于用技术提升艺术体验的创新者</p>
            </div>
            <div class="team-member">
              <div class="member-avatar">
                <img src="https://picsum.photos/150/150?random=103" alt="团队成员" />
              </div>
              <h3 class="member-name">王策展</h3>
              <p class="member-role">策展人</p>
              <p class="member-bio">专业的艺术史学者，擅长挖掘艺术背后的故事</p>
            </div>
          </div>
        </section>

        <!-- 价值观 -->
        <section class="values-section">
          <h2 class="section-title">我们的价值观</h2>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">
                <el-icon size="32"><Star /></el-icon>
              </div>
              <h3>热爱艺术</h3>
              <p>对艺术的热爱是推动我们前进的动力，我们相信艺术能够丰富人们的精神世界</p>
            </div>
            <div class="value-card">
              <div class="value-icon">
                <el-icon size="32"><Medal /></el-icon>
              </div>
              <h3>追求卓越</h3>
              <p>我们始终坚持高标准，力求为用户呈现最优质的艺术作品和最佳的浏览体验</p>
            </div>
            <div class="value-card">
              <div class="value-icon">
                <el-icon size="32"><Share /></el-icon>
              </div>
              <h3>连接世界</h3>
              <p>通过艺术连接不同文化背景的人们，促进文化交流与理解</p>
            </div>
            <div class="value-card">
              <div class="value-icon">
                <el-icon size="32"><TrendCharts /></el-icon>
              </div>
              <h3>创新驱动</h3>
              <p>运用最新的技术手段，为传统艺术注入新的活力和表现形式</p>
            </div>
          </div>
        </section>

        <!-- 联系我们 -->
        <section class="contact-section">
          <h2 class="section-title">联系我们</h2>
          <p class="section-subtitle">有任何问题或建议，欢迎与我们联系</p>
          <div class="contact-grid">
            <div class="contact-info">
              <div class="contact-item">
                <el-icon size="20"><Location /></el-icon>
                <div>
                  <h4>地址</h4>
                  <p>北京市朝阳区艺术区创意大道123号</p>
                </div>
              </div>
              <div class="contact-item">
                <el-icon size="20"><Phone /></el-icon>
                <div>
                  <h4>电话</h4>
                  <p>+86 10 1234 5678</p>
                </div>
              </div>
              <div class="contact-item">
                <el-icon size="20"><Message /></el-icon>
                <div>
                  <h4>邮箱</h4>
                  <p>contact@artgallery.com</p>
                </div>
              </div>
            </div>
            <div class="contact-form">
              <el-form :model="formData" label-position="top">
                <el-form-item label="姓名">
                  <el-input v-model="formData.name" placeholder="请输入您的姓名" />
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="formData.email" placeholder="请输入您的邮箱" />
                </el-form-item>
                <el-form-item label="消息">
                  <el-input
                    v-model="formData.message"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入您的消息"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleSubmit" class="submit-btn">
                    <el-icon><Position /></el-icon>
                    发送消息
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { 
  Picture, 
  User, 
  Share, 
  Star, 
  Medal, 
  TrendCharts, 
  Location, 
  Phone, 
  Message, 
  Position 
} from '@element-plus/icons-vue'

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    ElMessage.warning('请填写完整的信息')
    return
  }
  
  // 模拟提交
  ElMessage.success('消息发送成功！我们会尽快回复您。')
  formData.value = { name: '', email: '', message: '' }
}
</script>

<style scoped>
.about {
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
  margin-bottom: 4rem;
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

/* 简介部分 */
.intro-section {
  margin-bottom: 6rem;
}

.intro-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: center;
}

.intro-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--el-text-color-primary);
}

.intro-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--el-text-color-secondary);
  margin-bottom: 2rem;
}

.intro-features {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

:global(html.dark) .feature-item {
  background: #1f2937;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.feature-item:hover {
  transform: translateY(-4px);
}

.feature-icon {
  color: var(--el-color-primary);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.feature-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: var(--el-text-color-primary);
}

.feature-content p {
  margin: 0;
  color: var(--el-text-color-secondary);
  line-height: 1.6;
}

.visual-card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  transform: perspective(1000px) rotateY(-5deg);
  transition: transform 0.3s ease;
}

.visual-card:hover {
  transform: perspective(1000px) rotateY(0deg) scale(1.05);
}

.visual-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.visual-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem 1.5rem 1.5rem;
  text-align: center;
}

.overlay-text {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
}

/* 团队介绍 */
.team-section {
  margin-bottom: 6rem;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--el-text-color-primary);
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--el-text-color-secondary);
  margin-bottom: 3rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.team-member {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

:global(html.dark) .team-member {
  background: #1f2937;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.team-member:hover {
  transform: translateY(-8px);
}

.member-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--el-color-primary);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--el-text-color-primary);
}

.member-role {
  color: var(--el-color-primary);
  font-weight: 500;
  margin: 0 0 1rem 0;
}

.member-bio {
  color: var(--el-text-color-secondary);
  line-height: 1.6;
  margin: 0;
}

/* 价值观 */
.values-section {
  margin-bottom: 6rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.value-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

:global(html.dark) .value-card {
  background: #1f2937;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.value-card:hover {
  transform: translateY(-8px);
  border-color: var(--el-color-primary);
  box-shadow: 0 12px 25px rgba(59, 130, 246, 0.2);
}

.value-icon {
  color: var(--el-color-primary);
  margin-bottom: 1.5rem;
}

.value-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--el-text-color-primary);
}

.value-card p {
  color: var(--el-text-color-secondary);
  line-height: 1.6;
  margin: 0;
}

/* 联系我们 */
.contact-section {
  margin-bottom: 4rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

:global(html.dark) .contact-item {
  background: #1f2937;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.contact-item:hover {
  transform: translateY(-4px);
}

.contact-item .el-icon {
  color: var(--el-color-primary);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.contact-item h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: var(--el-text-color-primary);
}

.contact-item p {
  margin: 0;
  color: var(--el-text-color-secondary);
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

:global(html.dark) .contact-form {
  background: #1f2937;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, var(--el-color-primary), #8b5cf6);
  border: none;
  font-weight: 600;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .intro-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

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
  
  .intro-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .team-grid,
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .feature-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>