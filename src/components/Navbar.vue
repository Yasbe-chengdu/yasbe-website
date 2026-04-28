<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled, 'navbar--menu-open': isMenuOpen }">
    <div class="navbar__container">
      <div class="navbar__brand">
        <img src="../assets/images/logo.png" alt="YASBe Logo" class="navbar__logo" />
        <span class="navbar__name">YASBe</span>
      </div>

      <div class="navbar__menu" :class="{ 'navbar__menu--open': isMenuOpen }">
        <div class="navbar__links">
          <a href="#global-payment" class="navbar__link">{{ $t('nav.links.globalPayment') }}</a>
          <a href="#institutional-otc" class="navbar__link">{{ $t('nav.links.otc') }}</a>
          <a href="#contact" class="navbar__link">{{ $t('nav.links.contact') }}</a>
        </div>

        <div class="navbar__actions">
          <div ref="languageMenuRef" class="navbar__language">
            <button
              type="button"
              class="navbar__icon-btn navbar__icon-btn--language"
              :class="{ 'navbar__icon-btn--active': isLanguageMenuOpen }"
              :aria-expanded="isLanguageMenuOpen"
              :aria-label="$t('nav.language.ariaLabel')"
              @click="toggleLanguageMenu"
            >
              <img src="../assets/images/icon-search.svg" alt="" aria-hidden="true" />
              <span class="navbar__language-code">{{ currentLocaleLabel }}</span>
            </button>

            <div v-if="isLanguageMenuOpen" class="navbar__language-menu">
              <button
                v-for="option in localeOptions"
                :key="option.code"
                type="button"
                class="navbar__language-option"
                :class="{ 'navbar__language-option--active': locale === option.code }"
                @click="selectLanguage(option.code)"
              >
                {{ option.label }}
              </button>
            </div>
          </div>

          <div class="navbar__auth">
            <button type="button" class="navbar__btn navbar__btn--text">{{ $t('nav.auth.signUp') }}</button>
            <button type="button" class="navbar__btn navbar__btn--primary">{{ $t('nav.auth.login') }}</button>
          </div>
        </div>
      </div>

      <button type="button" class="navbar__toggle" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { localeOptions, setAppLocale } from '../i18n'

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const isLanguageMenuOpen = ref(false)
const languageMenuRef = ref(null)
const { locale } = useI18n()

const currentLocaleLabel = computed(
  () => localeOptions.find((option) => option.code === locale.value)?.shortLabel ?? 'EN',
)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleDocumentClick = (event) => {
  if (!languageMenuRef.value?.contains(event.target)) {
    isLanguageMenuOpen.value = false
  }
}

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    isLanguageMenuOpen.value = false
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value
}

const selectLanguage = (languageCode) => {
  setAppLocale(languageCode)
  isLanguageMenuOpen.value = false
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<style scoped src="../styles/components/Navbar.css"></style>
