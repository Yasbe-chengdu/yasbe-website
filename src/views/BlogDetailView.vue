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

              <!-- <div v-if="post.author" class="blog-author">
                <span class="blog-author__avatar" aria-hidden="true">{{ (post.author || 'Y').charAt(0).toUpperCase() }}</span>
                <span>
                  <strong>{{ post.author }}</strong>
                </span>
              </div> -->
            </div>

            <div v-if="post.coverImage" v-reveal="{ delay: 120, distance: 28, scale: 0.98 }" class="blog-detail__image">
              <img :src="post.coverImage" :alt="post.title" fetchpriority="high" decoding="async" />
            </div>
          </div>
        </section>

        <article class="blog-detail__article" v-html="articleHtml"></article>

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
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { getBlogDetail } from '../api/blog.js'
import { localeOptions, setAppLocale } from '../i18n'
import { formatPostDate } from '../utils/format.js'

const route = useRoute()
const { locale } = useI18n()
const post = ref(null)
const loading = ref(false)

let lastFetchKey = ''

async function fetchDetail(id) {
  if (!id) {
    post.value = null
    return
  }
  // URL 的 language 参数和 locale 监听可能先后触发同一篇文章的拉取：
  // 用「语言 + 文章 id」作为请求标识去重，并丢弃等待期间已过期的响应。
  const fetchKey = `${locale.value}:${id}`
  if (fetchKey === lastFetchKey) return
  lastFetchKey = fetchKey
  loading.value = true
  try {
    const data = await getBlogDetail(id)
    if (lastFetchKey === fetchKey) post.value = data
  } catch (e) {
    if (lastFetchKey === fetchKey) post.value = null
  } finally {
    if (lastFetchKey === fetchKey) loading.value = false
  }
}

const articleHtml = computed(() => {
  const html = post.value?.content || ''
  return html.replace(
    /<table\b([^>]*)>([\s\S]*?)<\/table>/gi,
    (_match, attrs = '', inner = '') => {
      // 去掉影响布局的内联 width 样式，让外层 CSS 接管
      const cleanedAttrs = attrs.replace(/\sstyle\s*=\s*"(?:[^"]*\s)?width\s*:\s*[^;"]+;?[^"]*"/gi, '')
      return `<div class="blog-article__table-wrap"><table${cleanedAttrs}>${inner}</table></div>`
    },
  )
})

// 外部链接会带 language 参数进入（如 https://beeznis.com/blog/9?language=zh-TW）。
// 进入页面时先切换语言再拉数据，保证首次请求头 lang 与 URL 参数一致；
// Navbar 的语言菜单读取 i18n 的 locale，切换后会自动高亮对应语言。
async function applyQueryLanguage() {
  const language = route.query.language
  if (typeof language !== 'string' || !language) return
  // 兼容大小写不一致的语言码，如 ?language=zh-tw
  const option = localeOptions.find((item) => item.code.toLowerCase() === language.toLowerCase())
  if (option && option.code !== locale.value) {
    await setAppLocale(option.code)
  }
}

watch(
  () => route.params.id,
  async (id) => {
    // 首次进入先进入加载态，等语言应用完再发首次请求，避免语言包加载期间空态闪现。
    if (!lastFetchKey && id) loading.value = true
    await applyQueryLanguage()
    fetchDetail(id)
  },
  { immediate: true },
)

// 博客详情按语言由接口返回，切换语言后重新拉取当前文章，拿到对应语种的内容。
watch(locale, () => fetchDetail(route.params.id))
</script>

<style scoped src="../styles/views/BlogView.css"></style>
