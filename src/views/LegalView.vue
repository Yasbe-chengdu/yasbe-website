<template>
  <div class="legal-page">
    <Navbar />

    <!-- 侧边栏 + 内容区 -->
    <div class="legal-page__body">
      <aside class="legal-page__sidebar">
        <nav class="legal-sidebar">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            class="legal-sidebar__item"
            :class="{ 'legal-sidebar__item--active': activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            {{ $t(tab.labelKey) }}
          </button>
        </nav>
      </aside>

      <main class="legal-page__content">
        <h1 class="legal-content__title">{{ $t(currentTabTitleKey) }}</h1>
        <div class="legal-content__body">
          <template v-for="(block, index) in currentContent" :key="index">
            <h2 v-if="block.type === 'heading'" class="legal-content__heading">{{ block.text }}</h2>
            <p v-else-if="block.type === 'paragraph'" class="legal-content__paragraph">{{ block.text }}</p>
            <div v-else-if="block.type === 'listItem'" class="legal-content__list-item">{{ block.text }}</div>
          </template>
        </div>
      </main>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { getLegalContent, loadLegalContent } from '../data/legalContent/index.js'

const { locale } = useI18n()
const activeTab = ref('termsAndConditions')

// Load legal content when locale changes (e.g. user switches language)
watch(
  locale,
  (newLocale) => {
    loadLegalContent(newLocale)
  },
  { immediate: true },
)

const tabs = [
  { key: 'termsAndConditions', labelKey: 'legalPage.sidebar.termsAndConditions', titleKey: 'legalPage.content.termsAndConditions.title' },
  { key: 'websiteTermsOfUse', labelKey: 'legalPage.sidebar.websiteTermsOfUse', titleKey: 'legalPage.content.websiteTermsOfUse.title' },
  { key: 'privacyPolicy', labelKey: 'legalPage.sidebar.privacyPolicy', titleKey: 'legalPage.content.privacyPolicy.title' },
  { key: 'cookiesPolicy', labelKey: 'legalPage.sidebar.cookiesPolicy', titleKey: 'legalPage.content.cookiesPolicy.title' },
  { key: 'requestForInformation', labelKey: 'legalPage.sidebar.requestForInformation', titleKey: 'legalPage.content.requestForInformation.title' },
  { key: 'prohibitedBusinesses', labelKey: 'legalPage.sidebar.prohibitedBusinesses', titleKey: 'legalPage.content.prohibitedBusinesses.title' },
  { key: 'restrictedJurisdiction', labelKey: 'legalPage.sidebar.restrictedJurisdiction', titleKey: 'legalPage.content.restrictedJurisdiction.title' },
]

const currentTabTitleKey = computed(() => {
  const tab = tabs.find((t) => t.key === activeTab.value)
  return tab ? tab.titleKey : 'legalPage.content.termsAndConditions.title'
})

const currentContent = computed(() => {
  // locale.value creates reactive dependency so content re-computes on language switch
  void locale.value
  const content = getLegalContent()
  return content[activeTab.value] || content.termsAndConditions || []
})
</script>

<style scoped src="../styles/views/LegalView.css"></style>
