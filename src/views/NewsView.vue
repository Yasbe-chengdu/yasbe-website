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

        <nav v-if="totalPages > 1" class="news-pagination" aria-label="News pagination">
          <button
            type="button"
            aria-label="Previous page"
            class="news-pagination__arrow"
            :disabled="currentPage <= 1"
            @click="goToPage(currentPage - 1)"
          ></button>
          <template v-for="(page, index) in pageNumbers" :key="`${page}-${index}`">
            <span v-if="page === '...'" class="news-pagination__item">...</span>
            <button
              v-else
              type="button"
              class="news-pagination__item"
              :class="{ 'news-pagination__item--active': page === currentPage }"
              @click="goToPage(page)"
            >{{ page }}</button>
          </template>
          <button
            type="button"
            aria-label="Next page"
            class="news-pagination__arrow news-pagination__arrow--next"
            :disabled="currentPage >= totalPages"
            @click="goToPage(currentPage + 1)"
          ></button>
        </nav>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { getNewsList } from '../api/news.js'
import { formatNewsDate } from '../utils/format.js'

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
    totalPages.value = data.totalPages ?? 0
    totalElements.value = data.totalElements ?? 0
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

const pageNumbers = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)
  if (current > 4) pages.push('...')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (current < total - 3) pages.push('...')
  pages.push(total)

  return pages
})

onMounted(fetchNews)
watch(currentPage, fetchNews)
</script>

<style scoped src="../styles/views/NewsView.css"></style>
