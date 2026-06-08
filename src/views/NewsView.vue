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
          <RouterLink
            v-for="(post, index) in newsPosts"
            :key="post.slug"
            :to="`/news/${post.slug}`"
            class="newsroom-item"
            :class="{ 'newsroom-item--media': post.hasImage }"
          >
            <div class="newsroom-item__copy">
              <time>{{ post.date }}</time>
              <h2>{{ post.title }}</h2>
              <p>{{ post.excerpt }}</p>
              <strong>{{ $t('newsPage.readMore') }}</strong>
            </div>

            <div v-if="post.hasImage" class="newsroom-item__image">
              <img :src="post.image" :alt="post.title" loading="lazy" decoding="async" />
            </div>
          </RouterLink>
        </div>

        <nav class="news-pagination" aria-label="News pagination">
          <button type="button" aria-label="Previous page" class="news-pagination__arrow"></button>
          <button type="button" class="news-pagination__item news-pagination__item--active">1</button>
          <button type="button" class="news-pagination__item">2</button>
          <button type="button" class="news-pagination__item">3</button>
          <button type="button" class="news-pagination__item">4</button>
          <button type="button" class="news-pagination__item">5</button>
          <span class="news-pagination__item">...</span>
          <button type="button" class="news-pagination__item">17</button>
          <button type="button" aria-label="Next page" class="news-pagination__arrow news-pagination__arrow--next"></button>
        </nav>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { newsPosts } from '../data/newsPosts.js'
</script>

<style scoped src="../styles/views/NewsView.css"></style>
