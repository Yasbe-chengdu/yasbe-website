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

        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          aria-label="Blog pagination"
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
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Pagination from '../components/Pagination.vue'
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
    totalPages.value = data.page?.totalPages ?? 0
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
