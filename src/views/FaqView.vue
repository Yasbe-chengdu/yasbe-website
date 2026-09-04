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
                    ref="answerBodyRef"
                    class="faq-answer-card__body"
                    :class="{ 'faq-answer-card__body--loading': activeQuestion.isDetailLoading }"
                    v-html="activeQuestion.answerHtml"
                    @click="handleAnswerMediaClick"
                    @keydown="handleAnswerMediaKeydown"
                  ></div>
                  <p v-else-if="activeQuestion.isDetailLoading" class="faq-answer-card__lead">
                    {{ t('faqPage.loadingAnswer') }}
                  </p>
                  <p v-else class="faq-answer-card__lead">{{ activeQuestion.lead }}</p>
                  <ol v-if="!activeQuestion.answerHtml && activeQuestion.steps?.length">
                    <li v-for="step in activeQuestion.steps" :key="step">{{ step }}</li>
                  </ol>
                  <p v-if="!activeQuestion.answerHtml && activeQuestion.summary" class="faq-answer-card__summary">
                    {{ activeQuestion.summary }}
                  </p>
                </div>

                <!-- 反馈区固定在内容卡片底部，不随长篇富文本一起滚走。 -->
                <div class="faq-feedback" aria-live="polite">
                  <div class="faq-feedback__row">
                    <p>{{ t('faqPage.feedback.prompt') }}</p>
                    <button
                      type="button"
                      class="faq-feedback__button"
                      :class="{ 'faq-feedback__button--active': activeFeedback?.resolved === true }"
                      :disabled="activeFeedback?.submitting"
                      @click="sendFeedback(true)"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10v11H3V10h4Zm4.2 11H9V10.2l3.1-6.8c.3-.7 1.1-1 1.8-.7.8.3 1.2 1.2.9 2l-1.1 3.1H19c1.6 0 2.7 1.5 2.2 3l-2.1 7.7A3.4 3.4 0 0 1 15.8 21h-4.6Z" /></svg>
                      <span>{{ t('faqPage.feedback.resolved') }}</span>
                    </button>
                    <button
                      type="button"
                      class="faq-feedback__button"
                      :class="{ 'faq-feedback__button--active': activeFeedback?.resolved === false }"
                      :disabled="activeFeedback?.submitting"
                      @click="sendFeedback(false)"
                    >
                      <svg class="is-dislike" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v11H3V3h4Zm4.2 0h4.6a3.4 3.4 0 0 1 3.3 2.5l2.1 7.7c.5 1.5-.6 3-2.2 3h-5.3l1.1 3.1c.3.8-.1 1.7-.9 2-.7.3-1.5 0-1.8-.7L9 13.8V3h2.2Z" /></svg>
                      <span>{{ t('faqPage.feedback.unresolved') }}</span>
                    </button>
                  </div>

                  <Transition name="faq-feedback-message">
                    <p v-if="activeFeedback?.status === 'success'" class="faq-feedback__message faq-feedback__message--success">
                      <span aria-hidden="true">✓</span>{{ t('faqPage.feedback.success') }}
                    </p>
                    <p v-else-if="activeFeedback?.status === 'error'" class="faq-feedback__message faq-feedback__message--error">
                      {{ t('faqPage.feedback.error') }}
                    </p>
                  </Transition>
                </div>
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

    <!-- 图片查看器挂载到 body，避免被 FAQ 卡片的 overflow 裁切。 -->
    <Teleport to="body">
      <Transition name="faq-lightbox">
        <div
          v-if="previewImage"
          class="faq-lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="t('faqPage.feedback.imagePreview')"
          @click.self="closeImagePreview"
        >
          <button ref="lightboxCloseRef" type="button" class="faq-lightbox__close" :aria-label="t('faqPage.feedback.closePreview')" @click="closeImagePreview">
            <span aria-hidden="true"></span>
          </button>
          <img :src="previewImage.src" :alt="previewImage.alt" />
          <p v-if="previewImage.alt">{{ previewImage.alt }}</p>
        </div>
      </Transition>
    </Teleport>

    <Footer />
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { getFaqCategoryList, getFaqDetail, getFaqList, getFaqSectionList, submitFaqFeedback } from '../api/faq.js'
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
const feedbackByQuestionId = ref({})
const answerBodyRef = ref(null)
const lightboxCloseRef = ref(null)
const previewImage = ref(null)
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

// 每篇 FAQ 独立记录反馈结果，切换文章后仍能恢复按钮选中状态。
const activeFeedback = computed(() => {
  const questionId = activeQuestion.value?.id
  return questionId ? feedbackByQuestionId.value[questionId] : null
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

watch(() => activeQuestion.value?.answerHtml, async () => {
  // v-html 渲染完成后补充键盘访问属性，点击仍由父容器统一代理。
  await nextTick()
  answerBodyRef.value?.querySelectorAll('img').forEach((image) => {
    image.tabIndex = 0
    image.setAttribute('role', 'button')
    image.setAttribute('aria-label', image.alt || t('faqPage.feedback.imagePreview'))
  })
})

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
  document.addEventListener('keydown', handleGlobalKeydown)
})

onBeforeUnmount(() => {
  clearTimeout(searchTimer)
  document.removeEventListener('keydown', handleGlobalKeydown)
  document.body.classList.remove('faq-lightbox-open')
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
    lead: '',
    steps: [],
    summary: '',
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

/**
 * 提交当前文章反馈；接口成功后才更新选中态，失败时保留重新提交能力。
 * @param {boolean} resolved 是否已解决问题
 */
async function sendFeedback(resolved) {
  const question = activeQuestion.value
  const faqId = Number(question?.rawId ?? question?.id)
  if (!question || !Number.isFinite(faqId) || activeFeedback.value?.submitting) return

  feedbackByQuestionId.value = {
    ...feedbackByQuestionId.value,
    [question.id]: { ...activeFeedback.value, submitting: true, status: '' },
  }

  try {
    await submitFaqFeedback(faqId, resolved)
    feedbackByQuestionId.value = {
      ...feedbackByQuestionId.value,
      [question.id]: { resolved, submitting: false, status: 'success' },
    }
  } catch (error) {
    console.warn('Failed to submit FAQ feedback', error)
    feedbackByQuestionId.value = {
      ...feedbackByQuestionId.value,
      [question.id]: { ...activeFeedback.value, submitting: false, status: 'error' },
    }
  }
}

// 富文本使用事件代理处理未知数量的图片，后台新增图片无需修改前端模板。
function getImageFromEvent(event) {
  const target = event.target
  return target instanceof HTMLImageElement && answerBodyRef.value?.contains(target) ? target : null
}

function handleAnswerMediaClick(event) {
  const image = getImageFromEvent(event)
  if (image) openImagePreview(image)
}

function handleAnswerMediaKeydown(event) {
  if (event.key !== 'Enter' && event.key !== ' ') return
  const image = getImageFromEvent(event)
  if (!image) return
  event.preventDefault()
  openImagePreview(image)
}

async function openImagePreview(image) {
  previewImage.value = {
    src: image.currentSrc || image.src,
    alt: image.alt || '',
  }
  document.body.classList.add('faq-lightbox-open')
  await nextTick()
  lightboxCloseRef.value?.focus()
}

function closeImagePreview() {
  previewImage.value = null
  document.body.classList.remove('faq-lightbox-open')
}

function handleGlobalKeydown(event) {
  if (event.key === 'Escape' && previewImage.value) closeImagePreview()
}
</script>

<style scoped src="../styles/views/FaqView.css"></style>
