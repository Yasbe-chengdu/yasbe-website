<template>
  <div class="news-page">
    <Navbar />

    <main class="newsroom-detail">
      <section class="newsroom-detail__inner">
        <header class="newsroom-heading newsroom-heading--detail">
          <h1>{{ $t('newsPage.heading') }}</h1>
          <p>{{ $t('newsPage.subtitle') }}</p>
        </header>

        <article class="newsroom-article">
          <header class="newsroom-article__header">
            <h2>{{ post.title }}</h2>
            <time>{{ post.date }}</time>
          </header>

          <div class="newsroom-article__body">
            <template v-for="(block, index) in post.blocks" :key="`${block.type}-${index}`">
              <h2 v-if="block.type === 'heading'" v-html="formatInline(block.text)"></h2>
              <h3 v-else-if="block.type === 'subheading'" v-html="formatInline(block.text)"></h3>
              <ul v-else-if="block.type === 'list'">
                <li v-for="item in block.items" :key="item" v-html="formatInline(item)"></li>
              </ul>
              <p v-else v-html="formatInline(block.text)"></p>
            </template>
          </div>
        </article>

        <section class="news-share" :aria-label="$t('newsPage.shareAria')">
          <h2>{{ $t('newsPage.share') }}</h2>
          <div class="news-share__links">
            <a href="javascript:void(0);" class="news-share__link news-share__link--facebook" aria-label="Share on Facebook">f</a>
            <a href="javascript:void(0);" class="news-share__link news-share__link--x" aria-label="Share on X">X</a>
            <a href="javascript:void(0);" class="news-share__link news-share__link--linkedin" aria-label="Share on LinkedIn">in</a>
            <a href="javascript:void(0);" class="news-share__link news-share__link--mail" aria-label="Share by email">@</a>
          </div>
        </section>

        <nav class="news-pagination news-pagination--detail" aria-label="Announcement pagination">
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { getNewsPost } from '../data/newsPosts.js'

const route = useRoute()
const post = computed(() => getNewsPost(route.params.slug))

function formatInline(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\\([+\-*])/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}
</script>

<style scoped src="../styles/views/NewsView.css"></style>
