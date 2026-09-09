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
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { getNewsDetail } from '../api/news.js'
import { localeOptions, setAppLocale } from '../i18n'
import { formatNewsDate } from '../utils/format.js'

const route = useRoute()
const { locale } = useI18n()
const post = ref(null)
const loading = ref(false)

const contentHtml = computed(() => {
  const html = post.value?.content || ''
  return html.replace(
    /<table\b([^>]*)>([\s\S]*?)<\/table>/gi,
    (_match, attrs = '', inner = '') => {
      // 去掉影响布局的内联 width 样式，让外层 CSS 接管
      const cleanedAttrs = attrs.replace(/\sstyle\s*=\s*"(?:[^"]*\s)?width\s*:\s*[^;"]+;?[^"]*"/gi, '')
      return `<div class="newsroom-article__table-wrap"><table${cleanedAttrs}>${inner}</table></div>`
    },
  )
})

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
    const data = await getNewsDetail(id)
    if (lastFetchKey === fetchKey) post.value = data
  } catch (e) {
    if (lastFetchKey === fetchKey) post.value = null
  } finally {
    if (lastFetchKey === fetchKey) loading.value = false
  }
}

// 外部链接会带 language 参数进入（如 https://beeznis.com/news/9?language=zh-TW）。
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

// 新闻详情按语言由接口返回，切换语言后重新拉取当前文章，拿到对应语种的内容。
watch(locale, () => fetchDetail(route.params.id))
</script>

<style scoped src="../styles/views/NewsView.css"></style>
