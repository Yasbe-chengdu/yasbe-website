<template>
  <div class="news-page">
    <Navbar />

    <main class="newsroom-detail">
      <section class="newsroom-detail__inner">
        <header class="newsroom-heading newsroom-heading--detail">
          <h1>{{ $t('newsPage.heading') }}</h1>
          <p>{{ $t('newsPage.subtitle') }}</p>
        </header>

        <template v-if="loading">
          <div class="newsroom-article newsroom-article--skeleton" aria-hidden="true">
            <div class="newsroom-article__header">
              <span class="newsroom-skeleton__line newsroom-skeleton__line--lg"></span>
              <span class="newsroom-skeleton__line newsroom-skeleton__line--sm"></span>
            </div>
            <div class="newsroom-article__body">
              <span class="newsroom-skeleton__line"></span>
              <span class="newsroom-skeleton__line"></span>
              <span class="newsroom-skeleton__line newsroom-skeleton__line--md"></span>
            </div>
          </div>
        </template>

        <template v-else-if="post">
          <article class="newsroom-article">
            <header class="newsroom-article__header">
              <h2>{{ post.title }}</h2>
              <time>{{ formatNewsDate(post.createdAt) }}</time>
            </header>

            <div v-if="post.coverImage" class="newsroom-article__cover">
              <img :src="post.coverImage" :alt="post.title" decoding="async" />
            </div>

            <div class="newsroom-article__body" v-html="contentHtml"></div>
          </article>

          <!-- <section class="news-share" :aria-label="$t('newsPage.shareAria')">
            <h2>{{ $t('newsPage.share') }}</h2>
            <div class="news-share__links">
              <a href="javascript:void(0);" class="news-share__link news-share__link--facebook" aria-label="Share on Facebook">f</a>
              <a href="javascript:void(0);" class="news-share__link news-share__link--x" aria-label="Share on X">X</a>
              <a href="javascript:void(0);" class="news-share__link news-share__link--linkedin" aria-label="Share on LinkedIn">in</a>
              <a href="javascript:void(0);" class="news-share__link news-share__link--mail" aria-label="Share by email">@</a>
            </div>
          </section> -->
        </template>

        <p v-else class="newsroom-empty">{{ $t('newsPage.empty') }}</p>

        <nav class="news-back" aria-label="Back to news list">
          <RouterLink to="/news">{{ $t('newsPage.backToList') }}</RouterLink>
        </nav>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { getNewsDetail } from '../api/news.js'
import { formatNewsDate } from '../utils/format.js'

const route = useRoute()
const post = ref(null)
const loading = ref(false)

const contentHtml = computed(() => post.value?.content || '')

async function fetchDetail(id) {
  if (!id) {
    post.value = null
    return
  }
  loading.value = true
  try {
    post.value = await getNewsDetail(id)
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

<style scoped src="../styles/views/NewsView.css"></style>
