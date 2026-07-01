<template>
  <div class="gcp-page">
    <Navbar />

    <main>
      <section class="gcp-hero">
        <div class="gcp-hero__pattern" aria-hidden="true"></div>
        <div class="gcp-hero__inner">
          <div class="gcp-hero__copy">
            <h1 v-reveal class="gcp-hero__title">
              <span>{{ t('globalCollectionPayout.hero.titleLine1') }}</span>
              <strong>{{ t('globalCollectionPayout.hero.titleLine2') }}</strong>
            </h1>
            <p v-reveal="{ delay: 80, distance: 24 }" class="gcp-hero__subtitle">
              {{ t('globalCollectionPayout.hero.subtitle') }}
            </p>
            <a v-reveal="{ delay: 140, distance: 20 }" :href="customerBaseUrl" target="_blank" rel="noopener noreferrer" class="gcp-cta">
              <span>{{ t('globalCollectionPayout.cta.tryForFree') }}</span>
              <img :src="arrowCircleIcon" alt="" aria-hidden="true" />
            </a>
          </div>

          <div class="gcp-hero__visual" aria-hidden="true">
          
            <img
              v-reveal="{ delay: 240, distance: 42, scale: 0.98 }"
              :src="heroMainImage"
              alt=""
              class="gcp-hero__main"
              fetchpriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section id="global-collection-coverage" class="gcp-coverage">
        <div class="gcp-coverage__inner">
          <div v-reveal class="gcp-section-header">
            <h2>{{ t('globalCollectionPayout.coverage.title') }}</h2>
          
          </div>

          <div v-reveal="{ delay: 120, distance: 34, scale: 0.99 }" class="gcp-coverage__visual">
            <video
              v-if="shouldLoadVideo"
              ref="videoRef"
              muted
              loop
              playsinline
              preload="metadata"
              :poster="heroPoster"
              class="gcp-coverage__video"
            >
              <source src="../assets/images/hero-bg2.webm" type="video/webm" />
            </video>
            <img v-else :src="heroPoster" alt="" class="gcp-coverage__poster" />
          </div>
        </div>
      </section>

      <section class="gcp-dashboard">
        <div class="gcp-dashboard__inner">
          <h2 v-reveal class="gcp-heading">{{ t('globalCollectionPayout.dashboard.title') }}</h2>
          <div v-reveal="{ delay: 80, distance: 36, scale: 0.99 }" class="gcp-dashboard__frame">
            <img
              :src="dashboardImage"
              :alt="t('globalCollectionPayout.dashboard.alt')"
              class="gcp-dashboard__image"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div v-reveal="{ delay: 120, distance: 28 }" class="gcp-dashboard__caption">
            <h3>{{ t('globalCollectionPayout.caption.title') }}</h3>
            <p>
              {{ t('globalCollectionPayout.caption.text') }}
            </p>
          </div>
        </div>
      </section>

      <section class="gcp-business">
        <div class="gcp-business__inner">
          <article
            v-for="card in businessCards"
            :key="card.title"
            v-reveal="{ delay: card.delay, distance: 32 }"
            class="gcp-business-card"
            :class="card.shadow ? 'gcp-business-card--shadow' : ''"
          >
            <div class="gcp-business-card__copy">
              <h2>{{ card.title }}</h2>
              <p>{{ card.text }}</p>
            </div>
            <img :src="card.image" alt="" class="gcp-business-card__image" loading="lazy" decoding="async" />
          </article>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import heroMainImage from '../assets/images/global-collection-payout/gcp-hero-main@2x.png'
import dashboardImage from '../assets/images/global-collection-payout/gcp-dashboard@2x.png'
import motionImage from '../assets/images/global-collection-payout/gcp-card-motion@2x.png'
import climbImage from '../assets/images/global-collection-payout/gcp-card-climb@2x.png'
import arrowCircleIcon from '../assets/images/global-collection-payout/gcp-arrow-circle@4x.png?no-inline'
import heroPoster from '../assets/images/hero-bg.png'

const customerBaseUrl = import.meta.env.VITE_CUSTOMER_BASE_URL ?? 'https://customer.yasbe.com/'
const { t } = useI18n()

const videoRef = ref(null)
const shouldLoadVideo = ref(false)

let observer = null

const prefersReducedPlayback = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(prefers-reduced-data: reduce)').matches
  )
}

const playVideo = () => {
  if (document.hidden || prefersReducedPlayback()) return
  videoRef.value?.play().catch(() => {})
}

const pauseVideo = () => {
  videoRef.value?.pause()
}

const loadAndPlayVideo = async () => {
  if (prefersReducedPlayback()) return
  if (!shouldLoadVideo.value) {
    shouldLoadVideo.value = true
    await nextTick()
  }
  playVideo()
}

const isCoverageNearViewport = () => {
  const el = document.querySelector('.gcp-coverage__visual')
  if (!el) return false
  const rect = el.getBoundingClientRect()
  return rect.bottom >= -180 && rect.top <= window.innerHeight + 180
}

const handleVisibilityChange = () => {
  if (document.hidden) {
    pauseVideo()
    return
  }
  if (shouldLoadVideo.value && isCoverageNearViewport()) {
    playVideo()
  }
}

onMounted(() => {
  if (prefersReducedPlayback()) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        loadAndPlayVideo()
        return
      }
      pauseVideo()
    },
    {
      rootMargin: '180px 0px',
      threshold: 0.1,
    },
  )

  const visualEl = document.querySelector('.gcp-coverage__visual')
  if (visualEl) {
    observer.observe(visualEl)
  }

  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  pauseVideo()
})

const businessCards = computed(() => [
  {
    title: t('globalCollectionPayout.businessCards.card1.title'),
    text: t('globalCollectionPayout.businessCards.card1.text'),
    image: motionImage,
    delay: 40,
    shadow: false,
  },
  {
    title: t('globalCollectionPayout.businessCards.card2.title'),
    text: t('globalCollectionPayout.businessCards.card2.text'),
    image: climbImage,
    delay: 120,
    shadow: true,
  },
])
</script>

<style scoped src="../styles/views/GlobalCollectionPayoutView.css"></style>
