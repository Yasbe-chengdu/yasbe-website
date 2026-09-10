<template>
  <div class="news-page">
    <Navbar />

    <main class="newsroom-list">
      <section class="newsroom-list__inner">
        <header class="newsroom-heading">
          <h1>{{ $t('newsPage.heading') }}</h1>
          <p>{{ $t('newsPage.subtitle') }}</p>
        </header>

        <div class="newsroom-items">
          <template v-if="loading">
            <div
              v-for="n in pageSize"
              :key="`skeleton-${n}`"
              class="newsroom-item newsroom-item--skeleton"
              aria-hidden="true"
            >
              <div class="newsroom-item__copy">
                <span class="newsroom-skeleton__line newsroom-skeleton__line--sm"></span>
                <span class="newsroom-skeleton__line newsroom-skeleton__line--lg"></span>
                <span class="newsroom-skeleton__line newsroom-skeleton__line--md"></span>
              </div>
            </div>
          </template>

          <template v-else-if="newsList.length">
            <RouterLink
              v-for="post in newsList"
              :key="post.id"
              :to="`/news/${post.id}`"
              class="newsroom-item"
              :class="{ 'newsroom-item--media': post.coverImage }"
            >
              <div class="newsroom-item__copy">
                <time>{{ formatNewsDate(post.createdAt) }}</time>
                <h2>{{ post.title }}</h2>
                <p v-if="post.category || post.author">{{ post.category || post.author }}</p>
                <strong>{{ $t('newsPage.readMore') }}</strong>
              </div>

              <div v-if="post.coverImage" class="newsroom-item__image">
                <img :src="post.coverImage" :alt="post.title" loading="lazy" decoding="async" />
              </div>
            </RouterLink>
          </template>

          <p v-else class="newsroom-empty">{{ $t('newsPage.empty') }}</p>
        </div>

        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          aria-label="News pagination"
          :prev-label="$t('pagination.prev')"
          :next-label="$t('pagination.next')"
          :page-label="$t('pagination.goToPage')"
          @update:current-page="goToPage"
        />
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Pagination from '../components/Pagination.vue'
import { getNewsList } from '../api/news.js'
import { formatNewsDate } from '../utils/format.js'

const { locale } = useI18n()

const newsList = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(0)
const totalElements = ref(0)

async function fetchNews() {
  loading.value = true
  try {
    const data = await getNewsList({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      status: 'published',
    })
    newsList.value = Array.isArray(data.content) ? data.content : []
    const page = data.page || {}
    totalPages.value = page.totalPages ?? 0
    totalElements.value = page.totalElements ?? 0
  } catch (e) {
    newsList.value = []
    totalPages.value = 0
    totalElements.value = 0
  } finally {
    loading.value = false
  }
}

function goToPage(page) {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  currentPage.value = page
}

onMounted(fetchNews)
watch(currentPage, fetchNews)

// 新闻列表按语言由接口返回，切换语言后需要重新拉取最新数据。
// 监听注册在组件内，离开页面时自动销毁，因此只在新闻列表页生效。
watch(locale, () => {
  // 不同语言的数据量不同，回到第一页再请求，避免停留在已经越界的页码上。
  if (currentPage.value === 1) {
    fetchNews()
  } else {
    currentPage.value = 1 // 由上面的 watch(currentPage) 触发重新拉取
  }
})
</script>

<style scoped src="../styles/views/NewsView.css"></style>
