<template>
  <div class="blog-page">
    <Navbar />

    <main class="blog-detail">
      <section class="blog-detail__hero">
        <div class="blog-detail__hero-inner">
          <div v-reveal class="blog-detail__intro">
            <nav class="blog-breadcrumb" aria-label="Breadcrumb">
              <RouterLink to="/">Home</RouterLink>
              <span aria-hidden="true"></span>
              <RouterLink to="/blog">Blog</RouterLink>
              <span aria-hidden="true"></span>
              <strong>{{ post.topic }}</strong>
            </nav>

            <p class="blog-detail__date">Published on {{ post.detailDate }} &nbsp;* &nbsp;5 minutes</p>
            <h1>{{ post.detailTitle }}</h1>

            <div class="blog-author">
              <span class="blog-author__avatar" aria-hidden="true">Y</span>
              <span>
                <strong>{{ post.author }}</strong>
                <em>{{ post.authorRole }}</em>
              </span>
            </div>
          </div>

          <div v-reveal="{ delay: 120, distance: 28, scale: 0.98 }" class="blog-detail__image">
            <img :src="post.image" :alt="post.detailTitle" fetchpriority="high" decoding="async" />
          </div>
        </div>
      </section>

      <article class="blog-detail__article">
        <template v-for="(block, index) in post.blocks" :key="`${block.type}-${index}`">
          <h2 v-if="block.type === 'heading'" v-html="formatInline(block.text)"></h2>
          <h3 v-else-if="block.type === 'subheading'" v-html="formatInline(block.text)"></h3>
          <ul v-else-if="block.type === 'list'">
            <li v-for="item in block.items" :key="item" v-html="formatInline(item)"></li>
          </ul>
          <p v-else v-html="formatInline(block.text)"></p>
        </template>
      </article>

      <section class="blog-share" aria-label="Share this article">
        <h2>Share</h2>
        <div class="blog-share__links">
          <a href="javascript:void(0);" class="blog-share__link blog-share__link--facebook" aria-label="Share on Facebook">f</a>
          <a href="javascript:void(0);" class="blog-share__link blog-share__link--x" aria-label="Share on X">X</a>
          <a href="javascript:void(0);" class="blog-share__link blog-share__link--linkedin" aria-label="Share on LinkedIn">in</a>
          <a href="javascript:void(0);" class="blog-share__link blog-share__link--mail" aria-label="Share by email">@</a>
        </div>
      </section>

      <nav class="blog-pagination blog-pagination--detail" aria-label="Article pagination">
        <button type="button" aria-label="Previous page" class="blog-pagination__arrow"></button>
        <button type="button" class="blog-pagination__item blog-pagination__item--active">1</button>
        <button type="button" class="blog-pagination__item">2</button>
        <button type="button" class="blog-pagination__item">3</button>
        <button type="button" class="blog-pagination__item">4</button>
        <button type="button" class="blog-pagination__item">5</button>
        <span class="blog-pagination__item">...</span>
        <button type="button" class="blog-pagination__item">17</button>
        <button type="button" aria-label="Next page" class="blog-pagination__arrow blog-pagination__arrow--next"></button>
      </nav>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { getBlogPost } from '../data/blogPosts.js'

const route = useRoute()
const post = computed(() => getBlogPost(route.params.slug))

function formatInline(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\\([+\-*])/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}
</script>

<style scoped src="../styles/views/BlogView.css"></style>
