<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled, 'navbar--menu-open': isMenuOpen, 'navbar--home': isHome }">
    <div class="navbar__container">
      <RouterLink to="/" class="navbar__brand">
        <img :src="logoSrc" alt="YASBe Logo" class="navbar__logo" />
      </RouterLink>

      <div class="navbar__menu" :class="{ 'navbar__menu--open': isMenuOpen }">
        <div class="navbar__links">
          <div
            ref="globalPaymentMenuRef"
            class="navbar__item navbar__item--has-submenu"
            :class="{ 'navbar__item--submenu-open': isGlobalPaymentMenuOpen }"
          >
            <button
              type="button"
              class="navbar__link navbar__link--submenu"
              :aria-expanded="isGlobalPaymentMenuOpen"
              aria-controls="global-payment-subnav"
              @click="toggleGlobalPaymentMenu"
            >
              <span>{{ $t('nav.links.globalPayment') }}</span>
              <span class="navbar__chevron" aria-hidden="true"></span>
            </button>

            <div
              id="global-payment-subnav"
              class="navbar__submenu"
              :class="{ 'navbar__submenu--open': isGlobalPaymentMenuOpen }"
            >
              <RouterLink
                v-for="item in globalPaymentSubnav"
                :key="item.labelKey"
                :to="item.to ?? item.href"
                class="navbar__submenu-link"
                @click="closeMenu"
              >
                {{ $t(item.labelKey) }}
              </RouterLink>
            </div>
          </div>
          <RouterLink to="/institutional-otc" class="navbar__link" @click="closeMenu">
            {{ $t('nav.links.otc') }}
          </RouterLink>
          <RouterLink to="/contact" class="navbar__link" @click="closeMenu">{{ $t('nav.links.contact') }}</RouterLink>
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
            <a href="https://customer.beeznis.com/register" target="_blank" rel="noopener noreferrer" class="navbar__btn navbar__btn--text">{{ $t('nav.auth.signUp') }}</a>
            <a href="https://customer.beeznis.com/" target="_blank" rel="noopener noreferrer" class="navbar__btn navbar__btn--primary">{{ $t('nav.auth.login') }}</a>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="navbar__toggle"
        :aria-expanded="isMenuOpen"
        aria-label="Toggle navigation"
        @click="toggleMenu"
      >
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
import { useRoute } from 'vue-router'

import defaultLogoSrc from '../assets/images/logo.svg'
import { localeOptions, setAppLocale } from '../i18n'

defineProps({
  logoSrc: {
    type: String,
    default: defaultLogoSrc,
  },
})

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const isLanguageMenuOpen = ref(false)
const isGlobalPaymentMenuOpen = ref(false)
const languageMenuRef = ref(null)
const globalPaymentMenuRef = ref(null)
const { locale } = useI18n()
const route = useRoute()
const isHome = computed(() => route.path === '/')

const globalPaymentSubnav = [
  {
    labelKey: 'nav.globalPaymentSubnav.virtualAccount',
    to: '/virtual-account',
  },
  {
    labelKey: 'nav.globalPaymentSubnav.globalCollectionPayout',
    to: '/global-collection-payout',
  },
  {
    labelKey: 'nav.globalPaymentSubnav.yasbeCard',
    to: '/yasbe-card',
  },
  {
    labelKey: 'nav.globalPaymentSubnav.stablecoinCheckout',
    to: '/stablecoin-checkout',
  },
  
]

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

  if (!globalPaymentMenuRef.value?.contains(event.target)) {
    isGlobalPaymentMenuOpen.value = false
  }
}

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    isLanguageMenuOpen.value = false
    isGlobalPaymentMenuOpen.value = false
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''

  if (isMenuOpen.value) {
    isGlobalPaymentMenuOpen.value = true
  } else {
    isGlobalPaymentMenuOpen.value = false
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  isGlobalPaymentMenuOpen.value = false
  isLanguageMenuOpen.value = false
  document.body.style.overflow = ''
}

const toggleGlobalPaymentMenu = () => {
  isGlobalPaymentMenuOpen.value = !isGlobalPaymentMenuOpen.value
}

const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value
}

const selectLanguage = async (languageCode) => {
  await setAppLocale(languageCode)
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
