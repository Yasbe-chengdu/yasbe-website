<template>
  <div class="blog-page">
    <Navbar />

    <main class="blog-detail">
      <template v-if="loading">
        <section class="blog-detail__hero">
          <div class="blog-detail__hero-inner">
            <div class="blog-detail__intro">
              <span class="blog-skeleton__line blog-skeleton__line--sm"></span>
              <span class="blog-skeleton__line blog-skeleton__line--lg"></span>
              <span class="blog-skeleton__line blog-skeleton__line--md"></span>
            </div>
            <div class="blog-detail__image blog-skeleton__block"></div>
          </div>
        </section>
        <article class="blog-detail__article">
          <span class="blog-skeleton__line"></span>
          <span class="blog-skeleton__line"></span>
          <span class="blog-skeleton__line blog-skeleton__line--md"></span>
          <span class="blog-skeleton__line"></span>
          <span class="blog-skeleton__line blog-skeleton__line--md"></span>
        </article>
      </template>

      <template v-else-if="post">
        <section class="blog-detail__hero">
          <div class="blog-detail__hero-inner">
            <div v-reveal class="blog-detail__intro">
              <nav class="blog-breadcrumb" aria-label="Breadcrumb">
                <RouterLink to="/">Home</RouterLink>
                <span aria-hidden="true"></span>
                <RouterLink to="/blog">Blog</RouterLink>
                <span v-if="post.category" aria-hidden="true"></span>
                <strong v-if="post.category">{{ post.category }}</strong>
              </nav>

              <p class="blog-detail__date">Published on {{ formatPostDate(post.createdAt) }}</p>
              <h1>{{ post.title }}</h1>

              <div v-if="post.author" class="blog-author">
                <span class="blog-author__avatar" aria-hidden="true">{{ (post.author || 'Y').charAt(0).toUpperCase() }}</span>
                <span>
                  <strong>{{ post.author }}</strong>
                </span>
              </div>
            </div>

            <div v-if="post.coverImage" v-reveal="{ delay: 120, distance: 28, scale: 0.98 }" class="blog-detail__image">
              <img :src="post.coverImage" :alt="post.title" fetchpriority="high" decoding="async" />
            </div>
          </div>
        </section>

        <article class="blog-detail__article" v-html="post.content"></article>

        <nav class="blog-back" aria-label="Back to blog list">
          <RouterLink to="/blog">{{ $t('blogPage.backToList') }}</RouterLink>
        </nav>
      </template>

      <section v-else class="blog-detail__empty-wrap">
        <p class="blog-empty">{{ $t('blogPage.empty') }}</p>
        <RouterLink to="/blog" class="blog-back__link">{{ $t('blogPage.backToList') }}</RouterLink>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { getBlogDetail } from '../api/blog.js'
import { formatPostDate } from '../utils/format.js'

const route = useRoute()
const post = ref(null)
const loading = ref(false)

async function fetchDetail(id) {
  if (!id) {
    post.value = null
    return
  }
  loading.value = true
  try {
    post.value = await getBlogDetail(id)
  } catch (e) {
    post.value = null
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.id,
  (id) => fetchDetail(id),
  { immediate: true },
)
</script>

<style scoped src="../styles/views/BlogView.css"></style>
