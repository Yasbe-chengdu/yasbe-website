<template>
  <div class="blog-page">
    <Navbar />

    <main class="blog-list">
      <section class="blog-list__inner">
        <h1 v-reveal class="blog-list__title">{{ $t('blogPage.heading') }}</h1>

        <form v-reveal="{ delay: 60, distance: 18 }" class="blog-filter" @submit.prevent>
          <label class="blog-filter__field">
            <span>{{ $t('blogPage.filters.search') }}</span>
            <span class="blog-filter__control blog-filter__control--search">
              <span class="blog-filter__search-icon" aria-hidden="true"></span>
              <input
                v-model.trim="searchQuery"
                type="search"
                :placeholder="$t('blogPage.filters.search')"
                :aria-label="$t('blogPage.filters.searchAria')"
              />
            </span>
          </label>
        </form>

        <div class="blog-grid" aria-live="polite">
          <template v-if="loading">
            <div
              v-for="n in pageSize"
              :key="`skeleton-${n}`"
              class="blog-card blog-card--skeleton"
              aria-hidden="true"
            >
              <div class="blog-card__image blog-skeleton__block"></div>
              <div class="blog-card__content">
                <span class="blog-skeleton__line blog-skeleton__line--sm"></span>
                <span class="blog-skeleton__line blog-skeleton__line--lg"></span>
                <span class="blog-skeleton__line blog-skeleton__line--md"></span>
              </div>
              <footer class="blog-card__meta">
                <span class="blog-skeleton__line blog-skeleton__line--sm"></span>
                <span class="blog-skeleton__line blog-skeleton__line--md"></span>
              </footer>
            </div>
          </template>

          <template v-else-if="blogList.length">
            <RouterLink
              v-for="(post, index) in blogList"
              :key="post.id"
              v-reveal="{ delay: Math.min(index * 55, 220), distance: 22 }"
              :to="`/blog/${post.id}`"
              class="blog-card"
            >
              <div class="blog-card__image">
                <img
                  v-if="post.coverImage"
                  :src="post.coverImage"
                  :alt="post.title"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div class="blog-card__content">
                <span v-if="post.category" class="blog-card__tag">{{ post.category }}</span>
                <h2>{{ post.title }}</h2>
                <p v-if="post.excerpt || post.summary">{{ post.excerpt || post.summary }}</p>
              </div>
              <footer class="blog-card__meta">
                <strong>{{ post.author }}</strong>
                <span>{{ formatPostDate(post.createdAt) }}</span>
              </footer>
            </RouterLink>
          </template>

          <p v-else class="blog-empty">{{ $t('blogPage.empty') }}</p>
        </div>

        <nav v-if="totalPages > 1" class="blog-pagination" aria-label="Blog pagination">
          <button
            type="button"
            aria-label="Previous page"
            class="blog-pagination__arrow"
            :disabled="currentPage <= 1"
            @click="goToPage(currentPage - 1)"
          ></button>
          <template v-for="(page, index) in pageNumbers" :key="`${page}-${index}`">
            <span v-if="page === '...'" class="blog-pagination__item">...</span>
            <button
              v-else
              type="button"
              class="blog-pagination__item"
              :class="{ 'blog-pagination__item--active': page === currentPage }"
              @click="goToPage(page)"
            >{{ page }}</button>
          </template>
          <button
            type="button"
            aria-label="Next page"
            class="blog-pagination__arrow blog-pagination__arrow--next"
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
import { getBlogList } from '../api/blog.js'
import { formatPostDate } from '../utils/format.js'

const blogList = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(9)
const totalPages = ref(0)
const searchQuery = ref('')

async function fetchBlog() {
  loading.value = true
  try {
    const data = await getBlogList({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      search: searchQuery.value,
      status: 'published',
    })
    blogList.value = Array.isArray(data.content) ? data.content : []
    totalPages.value = data.totalPages ?? 0
  } catch (e) {
    blogList.value = []
    totalPages.value = 0
  } finally {
    loading.value = false
  }
}

function goToPage(page) {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  currentPage.value = page
  fetchBlog()
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

let searchTimer
watch(searchQuery, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    currentPage.value = 1
    fetchBlog()
  }, 400)
})

onMounted(fetchBlog)
</script>

<style scoped src="../styles/views/BlogView.css"></style>
