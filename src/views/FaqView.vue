<template>
  <div class="faq-page">
    <Navbar />

    <main>
      <section class="faq-hero">
        <div class="faq-hero__pattern" aria-hidden="true"></div>
        <div class="faq-hero__inner">
          <div class="faq-hero__copy">
            <h1 v-reveal class="faq-hero__title">{{ t('faqPage.hero.title') }}</h1>
            <p v-reveal="{ delay: 80, distance: 20 }" class="faq-hero__subtitle">
              {{ t('faqPage.hero.subtitle') }}
            </p>
            <RouterLink v-reveal="{ delay: 140, distance: 18 }" to="/contact" class="faq-hero__cta">
              <span>{{ t('faqPage.hero.cta') }}</span>
              <img :src="arrowIcon" alt="" aria-hidden="true" />
            </RouterLink>
          </div>

          <img
            v-reveal="{ delay: 160, distance: 28, scale: 0.98 }"
            :src="heroIllustration"
            alt=""
            class="faq-hero__illustration"
            fetchpriority="high"
            decoding="async"
            aria-hidden="true"
          />
        </div>
      </section>

      <section class="faq-questions" aria-labelledby="faq-heading">
        <div class="faq-questions__inner">
          <div class="faq-questions__header">
            <h2 id="faq-heading">{{ t('faqPage.commonTitle') }}</h2>

            <div class="faq-questions__controls">
              <div class="faq-category-tabs" aria-label="FAQ categories">
                <button
                  v-for="category in categories"
                  :key="category.key"
                  type="button"
                  class="faq-category-tabs__item"
                  :class="{ 'faq-category-tabs__item--active': activeCategoryKey === category.key }"
                  @click="selectCategory(category.key)"
                >
                  {{ category.label }}
                </button>
              </div>

              <label class="faq-search">
                <img :src="searchIcon" alt="" aria-hidden="true" />
                <input v-model.trim="searchQuery" type="search" :placeholder="t('faqPage.searchPlaceholder')" />
              </label>
            </div>
          </div>

          <div class="faq-layout">
            <aside class="faq-sidebar" aria-label="Question list">
              <button
                v-for="question in filteredQuestions"
                :key="question.id"
                type="button"
                class="faq-sidebar__item"
                :class="{ 'faq-sidebar__item--active': activeQuestionId === question.id }"
                @click="activeQuestionId = question.id"
              >
                {{ question.question }}
              </button>
              <p v-if="!filteredQuestions.length" class="faq-sidebar__empty">
                {{ isFaqListLoading ? t('faqPage.loadingQuestions') : t('faqPage.noData') }}
              </p>
            </aside>

            <article class="faq-answer-card">
              <div v-if="activeQuestion" class="faq-answer-card__content">
                <div class="faq-answer-card__main">
                  <h3>{{ activeQuestion.question }}</h3>
                  <div
                    v-if="activeQuestion.answerHtml"
                    class="faq-answer-card__body"
                    :class="{ 'faq-answer-card__body--loading': activeQuestion.isDetailLoading }"
                    v-html="activeQuestion.answerHtml"
                  ></div>
                  <p v-else-if="activeQuestion.isDetailLoading" class="faq-answer-card__lead">
                    {{ t('faqPage.loadingAnswer') }}
                  </p>
                  <p v-else class="faq-answer-card__lead">{{ activeQuestion.lead }}</p>
                  <ol v-if="!activeQuestion.answerHtml && activeQuestion.steps.length">
                    <li v-for="step in activeQuestion.steps" :key="step">{{ step }}</li>
                  </ol>
                  <p v-if="!activeQuestion.answerHtml && activeQuestion.summary" class="faq-answer-card__summary">
                    {{ activeQuestion.summary }}
                  </p>
                </div>

                <nav class="faq-toc" :aria-label="t('faqPage.toc')">
                  <h4>{{ t('faqPage.toc') }}</h4>
                  <div class="faq-toc__list">
                    <span
                      v-for="item in tableOfContents"
                      :key="item"
                      class="faq-toc__item"
                      :class="{ 'faq-toc__item--active': item === activeQuestion.question }"
                    >
                      {{ item }}
                    </span>
                  </div>
                </nav>
              </div>
              <div v-else class="faq-empty-state">
                <div class="faq-empty-state__mark" aria-hidden="true"></div>
                <p>{{ isFaqListLoading ? t('faqPage.loadingQuestions') : t('faqPage.noData') }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { getFaqCategoryList, getFaqDetail, getFaqList } from '../api/faq.js'
import heroIllustration from '../assets/images/faq/faq-hero-illustration@2x.png'
import searchIcon from '../assets/images/faq/faq-search-icon@4x.png?no-inline'
import arrowIcon from '../assets/images/faq/faq-arrow-icon@4x.png?no-inline'

const { t, tm } = useI18n()
const activeCategoryKey = ref('all')
const searchQuery = ref('')
const activeQuestionId = ref('')
const remoteQuestions = ref([])
const hasLoadedRemoteQuestions = ref(false)
const isFaqListLoading = ref(false)
const remoteCategories = ref([])
const faqDetailsById = ref({})
const detailLoadingById = ref({})
let searchTimer
let faqListRequestId = 0

const fallbackCategoryValues = {
  general: 'General',
  account: 'Account',
  payments: 'Payments',
  security: 'Security',
  technical: 'Technical',
}

const fallbackCategories = computed(() =>
  tm('faqPage.categories').map((category) => ({
    ...category,
    value: category.key === 'all' ? '' : fallbackCategoryValues[category.key] || category.label,
  })),
)
const allCategory = computed(() => fallbackCategories.value.find((category) => category.key === 'all') ?? { key: 'all', label: 'All', value: '' })
const categories = computed(() => [allCategory.value, ...remoteCategories.value])
const questions = computed(() => remoteQuestions.value)

const filteredQuestions = computed(() => {
  const normalizedQuery = searchQuery.value.toLowerCase()

  return questions.value.filter((question) => {
    const matchesCategory = activeCategoryKey.value === 'all' || question.category === activeCategoryKey.value
    const detail = faqDetailsById.value[question.id]
    const searchableText = `${question.question} ${question.lead} ${question.summary} ${detail?.answerText ?? ''}`.toLowerCase()
    const matchesSearch = question.source === 'api' || !normalizedQuery || searchableText.includes(normalizedQuery)
    return matchesCategory && matchesSearch
  })
})

const activeQuestion = computed(() => {
  const baseQuestion = filteredQuestions.value.find((question) => question.id === activeQuestionId.value) ?? filteredQuestions.value[0]

  if (!baseQuestion) {
    return null
  }

  return {
    ...baseQuestion,
    ...(faqDetailsById.value[baseQuestion.id] ?? {}),
    isDetailLoading: Boolean(detailLoadingById.value[baseQuestion.id]),
  }
})

const tableOfContents = computed(() => {
  if (!activeQuestion.value) {
    return []
  }

  return filteredQuestions.value.slice(0, 4).map((question) => question.question)
})

const selectCategory = (categoryKey) => {
  if (activeCategoryKey.value === categoryKey) {
    return
  }

  activeCategoryKey.value = categoryKey
  loadFaqList(searchQuery.value, getSelectedCategoryName(categoryKey))
}

watch(filteredQuestions, (nextQuestions) => {
  if (!nextQuestions.some((question) => question.id === activeQuestionId.value)) {
    activeQuestionId.value = nextQuestions[0]?.id ?? ''
  }
})

watch(activeQuestion, (question) => {
  if (question?.source === 'api') {
    loadFaqDetail(question)
  }
}, { immediate: true })

watch(searchQuery, (value) => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    loadFaqList(value, getSelectedCategoryName())
  }, 300)
})

watch(categories, (nextCategories) => {
  if (!nextCategories.some((category) => category.key === activeCategoryKey.value)) {
    activeCategoryKey.value = 'all'
    loadFaqList(searchQuery.value, '')
  }
})

onMounted(() => {
  loadFaqList()
  loadFaqCategories()
})

function normalizeCategory(category) {
  const normalized = String(category || '').trim().toLowerCase()
  const categoryMap = {
    general: 'general',
    account: 'account',
    payments: 'payments',
    payment: 'payments',
    security: 'security',
    technical: 'technical',
    tech: 'technical',
  }

  const categoryKey = categoryMap[normalized] ?? normalized.replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '')
  return categoryKey || 'general'
}

function normalizeListItem(item) {
  return {
    id: String(item.id),
    rawId: item.id,
    category: normalizeCategory(item.category),
    question: item.question || '',
    lead: '',
    steps: [],
    summary: '',
    answerHtml: '',
    answerText: '',
    sortOrder: Number.isFinite(Number(item.sortOrder)) ? Number(item.sortOrder) : 0,
    source: 'api',
  }
}

function normalizeCategoryItem(item) {
  const label = String(item?.name || '').trim()

  return {
    id: item.id,
    key: normalizeCategory(label),
    label,
    value: label,
    sortOrder: Number.isFinite(Number(item.sortOrder)) ? Number(item.sortOrder) : 0,
  }
}

function normalizeDetail(detail) {
  const answerHtml = detail?.answer || ''

  return {
    question: detail?.question || '',
    category: normalizeCategory(detail?.category),
    answerHtml,
    answerText: answerHtml.replace(/<[^>]*>/g, ' '),
  }
}

function getSelectedCategoryName(categoryKey = activeCategoryKey.value) {
  return categories.value.find((category) => category.key === categoryKey)?.value || ''
}

async function loadFaqCategories() {
  try {
    const data = await getFaqCategoryList({ pageNum: 1, pageSize: 10 })
    const list = Array.isArray(data?.content) ? data.content : []
    const publishedCategories = list
      .filter((item) => {
        const status = String(item?.status || '').toLowerCase()
        return item?.name && (!status || status === 'published')
      })
      .map(normalizeCategoryItem)
      .filter((category) => category.key && category.key !== 'all')
      .sort((a, b) => a.sortOrder - b.sortOrder)

    const categoryMap = new Map()
    publishedCategories.forEach((category) => {
      if (!categoryMap.has(category.key)) {
        categoryMap.set(category.key, category)
      }
    })

    remoteCategories.value = Array.from(categoryMap.values())
  } catch (error) {
    console.warn('Failed to load FAQ categories', error)
  }
}

async function loadFaqList(search = searchQuery.value, category = getSelectedCategoryName()) {
  const requestId = ++faqListRequestId
  isFaqListLoading.value = true

  try {
    const data = await getFaqList({
      pageNum: 1,
      pageSize: 100,
      search: String(search || '').trim(),
      category,
    })
    if (requestId !== faqListRequestId) {
      return
    }

    const list = Array.isArray(data?.content) ? data.content : []
    const publishedList = list
      .filter((item) => {
        const status = String(item?.status || '').toLowerCase()
        const isPublished = !status || status === 'published'
        const isTopLevel = item?.parentId == null
        return item?.id != null && item?.question && isPublished && isTopLevel
      })
      .map(normalizeListItem)
      .sort((a, b) => a.sortOrder - b.sortOrder)

    hasLoadedRemoteQuestions.value = true
    remoteQuestions.value = publishedList

    if (publishedList.length) {
      activeQuestionId.value = publishedList[0].id
    }
  } catch (error) {
    if (requestId === faqListRequestId) {
      hasLoadedRemoteQuestions.value = true
      remoteQuestions.value = []
      console.warn('Failed to load FAQ list', error)
    }
  } finally {
    if (requestId === faqListRequestId) {
      isFaqListLoading.value = false
    }
  }
}

async function loadFaqDetail(question) {
  if (!question.rawId || faqDetailsById.value[question.id] || detailLoadingById.value[question.id]) {
    return
  }

  detailLoadingById.value = {
    ...detailLoadingById.value,
    [question.id]: true,
  }

  try {
    const detail = await getFaqDetail(question.rawId)
    faqDetailsById.value = {
      ...faqDetailsById.value,
      [question.id]: normalizeDetail(detail),
    }
  } catch (error) {
    console.warn('Failed to load FAQ detail', error)
  } finally {
    const nextLoading = { ...detailLoadingById.value }
    delete nextLoading[question.id]
    detailLoadingById.value = nextLoading
  }
}
</script>

<style scoped src="../styles/views/FaqView.css"></style>
