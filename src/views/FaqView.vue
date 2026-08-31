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
              <label class="faq-search">
                <img :src="searchIcon" alt="" aria-hidden="true" />
                <input v-model.trim="searchQuery" type="search" :placeholder="t('faqPage.searchPlaceholder')" />
              </label>
            </div>
          </div>

          <div class="faq-layout">
            <aside class="faq-sidebar" aria-label="FAQ navigation">
              <div v-for="category in filteredCategoryTree" :key="category.id" class="faq-menu__category">
                <button type="button" class="faq-menu__category-button" :aria-expanded="isCategoryExpanded(category.id)" @click="toggleCategory(category.id)">
                  <span>{{ category.label }}</span><span class="faq-menu__chevron" aria-hidden="true"></span>
                </button>
                <div v-show="isCategoryExpanded(category.id)" class="faq-menu__sections">
                  <div v-for="section in category.sections" :key="section.id" class="faq-menu__section">
                    <button type="button" class="faq-menu__section-button" :aria-expanded="isSectionExpanded(section.id)" @click="toggleSection(section.id)">
                      <span>{{ section.name }}</span><span class="faq-menu__chevron" aria-hidden="true"></span>
                    </button>
                    <div v-show="isSectionExpanded(section.id)" class="faq-menu__questions">
                      <button v-for="question in section.faqs" :key="question.id" type="button" class="faq-menu__question" :class="{ 'faq-menu__question--active': activeQuestionId === question.id }" @click="activeQuestionId = question.id">
                        {{ question.question }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
import { getFaqCategoryList, getFaqDetail, getFaqList, getFaqSectionList } from '../api/faq.js'
import heroIllustration from '../assets/images/faq/faq-hero-illustration@2x.png'
import searchIcon from '../assets/images/faq/faq-search-icon@4x.png?no-inline'
import arrowIcon from '../assets/images/faq/faq-arrow-icon@4x.png?no-inline'

const { t } = useI18n()
const searchQuery = ref('')
const activeQuestionId = ref('')
const isFaqListLoading = ref(false)
const remoteCategories = ref([])
const sectionsByCategoryId = ref({})
const expandedCategoryIds = ref([])
const expandedSectionIds = ref([])
const faqDetailsById = ref({})
const detailLoadingById = ref({})
let searchTimer
let faqTreeRequestId = 0

const categoryTree = computed(() => remoteCategories.value.map((category) => ({
  ...category,
  sections: sectionsByCategoryId.value[category.id] ?? [],
})))

const questions = computed(() => categoryTree.value.flatMap((category) =>
  category.sections.flatMap((section) => section.faqs),
))

const filteredQuestions = computed(() => {
  const normalizedQuery = searchQuery.value.toLowerCase()

  return questions.value.filter((question) => {
    const detail = faqDetailsById.value[question.id]
    const searchableText = `${question.question} ${detail?.answerText ?? ''}`.toLowerCase()
    return !normalizedQuery || searchableText.includes(normalizedQuery)
  })
})

const filteredCategoryTree = computed(() => {
  const normalizedQuery = searchQuery.value.toLowerCase()
  if (!normalizedQuery) return categoryTree.value

  const matchedQuestionIds = new Set(filteredQuestions.value.map((question) => question.id))
  return categoryTree.value.map((category) => {
    const categoryMatches = category.label.toLowerCase().includes(normalizedQuery)
    const sections = category.sections.map((section) => {
      const sectionMatches = `${section.name} ${section.description}`.toLowerCase().includes(normalizedQuery)
      const faqs = categoryMatches || sectionMatches
        ? section.faqs
        : section.faqs.filter((question) => matchedQuestionIds.has(question.id))
      return { ...section, faqs }
    }).filter((section) => categoryMatches || section.faqs.length)
    return { ...category, sections }
  }).filter((category) => category.sections.length)
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

  const activeSection = categoryTree.value.flatMap((category) => category.sections)
    .find((section) => section.id === activeQuestion.value.sectionId)
  return (activeSection?.faqs ?? filteredQuestions.value).slice(0, 4).map((question) => question.question)
})

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
    if (String(value || '').trim()) {
      expandedCategoryIds.value = filteredCategoryTree.value.map((category) => category.id)
      expandedSectionIds.value = filteredCategoryTree.value.flatMap((category) => category.sections.map((section) => section.id))
    }
  }, 300)
})

onMounted(() => {
  loadFaqTree()
})

function normalizeListItem(item) {
  return {
    id: String(item.id),
    rawId: item.id,
    category: String(item.category || '').trim(),
    sectionId: item.sectionId == null ? null : String(item.sectionId),
    question: item.question || '',
    answerHtml: '',
    answerText: '',
    sortOrder: Number.isFinite(Number(item.sortOrder)) ? Number(item.sortOrder) : 0,
    source: 'api',
  }
}

function normalizeCategoryItem(item) {
  const label = String(item?.name || '').trim()

  return {
    id: String(item.id),
    label,
    sortOrder: Number.isFinite(Number(item.sortOrder)) ? Number(item.sortOrder) : 0,
  }
}

function normalizeSectionItem(item, faqs) {
  return {
    id: String(item.id),
    name: String(item?.name || '').trim(),
    description: String(item?.description || '').trim(),
    sortOrder: Number.isFinite(Number(item.sortOrder)) ? Number(item.sortOrder) : 0,
    faqs,
  }
}

function normalizeDetail(detail) {
  const answerHtml = detail?.answer || ''

  return {
    question: detail?.question || '',
    category: String(detail?.category || '').trim(),
    sectionId: detail?.sectionId == null ? null : String(detail.sectionId),
    answerHtml,
    answerText: answerHtml.replace(/<[^>]*>/g, ' '),
  }
}

function isPublished(item) {
  const status = String(item?.status || '').toLowerCase()
  return !status || status === 'published'
}

function isCategoryExpanded(categoryId) {
  return expandedCategoryIds.value.includes(String(categoryId))
}

function isSectionExpanded(sectionId) {
  return expandedSectionIds.value.includes(String(sectionId))
}

function toggleExpanded(ids, id) {
  const normalizedId = String(id)
  return ids.includes(normalizedId)
    ? ids.filter((item) => item !== normalizedId)
    : [...ids, normalizedId]
}

function toggleCategory(categoryId) {
  expandedCategoryIds.value = toggleExpanded(expandedCategoryIds.value, categoryId)
}

function toggleSection(sectionId) {
  expandedSectionIds.value = toggleExpanded(expandedSectionIds.value, sectionId)
}

async function loadFaqTree() {
  const requestId = ++faqTreeRequestId
  isFaqListLoading.value = true

  try {
    const data = await getFaqCategoryList({ pageNum: 1, pageSize: 100 })
    const categories = (Array.isArray(data?.content) ? data.content : [])
      .filter((item) => item?.id != null && item?.name && isPublished(item))
      .map(normalizeCategoryItem)
      .sort((a, b) => a.sortOrder - b.sortOrder)

    const sections = await Promise.all(categories.map((category) => loadFaqSections(category)))
    if (requestId !== faqTreeRequestId) return

    remoteCategories.value = categories
    sectionsByCategoryId.value = Object.fromEntries(sections)
    selectFirstQuestion()
  } catch (error) {
    if (requestId === faqTreeRequestId) {
      remoteCategories.value = []
      sectionsByCategoryId.value = {}
      console.warn('Failed to load FAQ navigation', error)
    }
  } finally {
    if (requestId === faqTreeRequestId) isFaqListLoading.value = false
  }
}

async function loadFaqSections(category) {
  try {
    const data = await getFaqSectionList(category.id)
    const sections = (Array.isArray(data) ? data : [])
      .filter((item) => item?.id != null && item?.name && isPublished(item))
      .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))

    const normalizedSections = await Promise.all(sections.map(async (section) => {
      const fallbackFaqs = (Array.isArray(section.faqs) ? section.faqs : [])
        .filter((item) => item?.id != null && item?.question && isPublished(item))
        .map(normalizeListItem)
        .sort((a, b) => a.sortOrder - b.sortOrder)

      try {
        const faqData = await getFaqList({
          pageNum: 1,
          pageSize: 100,
          sectionId: section.id,
          category: category.label,
        })
        const faqs = (Array.isArray(faqData?.content) ? faqData.content : [])
          .filter((item) => item?.id != null && item?.question && isPublished(item))
          .map(normalizeListItem)
          .sort((a, b) => a.sortOrder - b.sortOrder)
        return normalizeSectionItem(section, faqs)
      } catch (error) {
        console.warn(`Failed to load FAQs for section ${section.id}`, error)
        return normalizeSectionItem(section, fallbackFaqs)
      }
    }))

    return [category.id, normalizedSections]
  } catch (error) {
    console.warn(`Failed to load FAQ sections for category ${category.id}`, error)
    return [category.id, []]
  }
}

function selectFirstQuestion() {
  const firstCategory = categoryTree.value[0]
  const firstSection = firstCategory?.sections[0]
  const firstQuestion = firstSection?.faqs[0]

  if (firstCategory && !expandedCategoryIds.value.length) expandedCategoryIds.value = [firstCategory.id]
  if (firstSection && !expandedSectionIds.value.length) expandedSectionIds.value = [firstSection.id]
  if (!activeQuestionId.value || !questions.value.some((question) => question.id === activeQuestionId.value)) {
    activeQuestionId.value = firstQuestion?.id ?? ''
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
