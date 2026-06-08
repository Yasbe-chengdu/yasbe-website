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

          <label class="blog-filter__field">
            <span>{{ $t('blogPage.filters.topics') }}</span>
            <span class="blog-filter__control blog-filter__control--select">
              <select v-model="selectedTopic" :aria-label="$t('blogPage.filters.topicAria')">
                <option value="">{{ $t('blogPage.filters.placeholder') }}</option>
                <option v-for="topic in blogTopics" :key="topic" :value="topic">{{ topic }}</option>
              </select>
            </span>
          </label>

          <label class="blog-filter__field">
            <span>{{ $t('blogPage.filters.industries') }}</span>
            <span class="blog-filter__control blog-filter__control--select">
              <select v-model="selectedIndustry" :aria-label="$t('blogPage.filters.industryAria')">
                <option value="">{{ $t('blogPage.filters.placeholder') }}</option>
                <option v-for="industry in blogIndustries" :key="industry" :value="industry">{{ industry }}</option>
              </select>
            </span>
          </label>
        </form>

        <div class="blog-grid" aria-live="polite">
          <RouterLink
            v-for="(post, index) in filteredPosts"
            :key="post.slug"
            v-reveal="{ delay: Math.min(index * 55, 220), distance: 22 }"
            :to="`/blog/${post.slug}`"
            class="blog-card"
          >
            <div class="blog-card__image">
              <img :src="post.image" :alt="post.cardTitle" loading="lazy" decoding="async" />
            </div>
            <div class="blog-card__content">
              <span class="blog-card__tag">{{ post.topic }}</span>
              <h2>{{ post.cardTitle }}</h2>
              <p>{{ post.excerpt }}</p>
            </div>
            <footer class="blog-card__meta">
              <strong>{{ post.author }}</strong>
              <span>{{ post.date }} * {{ post.readTime }}</span>
            </footer>
          </RouterLink>
        </div>

        <nav class="blog-pagination" aria-label="Blog pagination">
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
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { blogIndustries, blogPosts, blogTopics } from '../data/blogPosts.js'

const searchQuery = ref('')
const selectedTopic = ref('')
const selectedIndustry = ref('')

const filteredPosts = computed(() => {
  const normalizedSearch = searchQuery.value.toLowerCase()

  return blogPosts.filter((post) => {
    const matchesSearch =
      !normalizedSearch ||
      post.cardTitle.toLowerCase().includes(normalizedSearch) ||
      post.excerpt.toLowerCase().includes(normalizedSearch)
    const matchesTopic = !selectedTopic.value || post.topic === selectedTopic.value
    const matchesIndustry = !selectedIndustry.value || post.industry === selectedIndustry.value

    return matchesSearch && matchesTopic && matchesIndustry
  })
})
</script>

<style scoped src="../styles/views/BlogView.css"></style>
