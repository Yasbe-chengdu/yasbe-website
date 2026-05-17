<template>
  <div class="institutional-otc-page">
    <Navbar />

    <main>
      <section class="otc-hero">
        <div class="otc-hero__pattern" aria-hidden="true"></div>
        <div class="otc-hero__content">
          <h1 class="otc-hero__title">
            <span>{{ $t('institutionalOtc.hero.titleLight') }}</span>
            <strong>{{ $t('institutionalOtc.hero.titleBold') }}</strong>
          </h1>
          <p class="otc-hero__subtitle">{{ $t('institutionalOtc.hero.subtitle') }}</p>
          <a href="https://customer.beeznis.com/" target="_blank" rel="noopener noreferrer" class="otc-cta">
            <span>{{ $t('institutionalOtc.hero.cta') }}</span>
            <span class="otc-cta__icon" aria-hidden="true">
              <img :src="arrowIcon" alt="" />
            </span>
          </a>
        </div>
        <div class="otc-hero__visual" aria-hidden="true">
          <img :src="heroCoins" alt="" class="otc-hero__coins" fetchpriority="high" />
          <img :src="heroStack" alt="" class="otc-hero__stack" fetchpriority="high" />
        </div>
      </section>

      <section class="otc-benefits">
        <div class="otc-benefits__grid">
          <article v-for="item in benefits" :key="item.textKey" class="otc-benefit-card">
            <img :src="item.icon" alt="" class="otc-benefit-card__icon" loading="lazy" decoding="async" />
            <p>{{ $t(item.textKey) }}</p>
          </article>
        </div>
      </section>

      <section class="otc-trade">
        <div class="otc-section-heading otc-section-heading--center">
          <h2>{{ $t('institutionalOtc.trade.title') }}</h2>
          <p>{{ $t('institutionalOtc.trade.description') }}</p>
        </div>

        <div class="otc-trade__grid">
          <article class="otc-process-card otc-process-card--light">
            <img :src="onboardingIcon" alt="" class="otc-process-card__icon" loading="lazy" decoding="async" />
            <div>
              <h3>{{ $t('institutionalOtc.trade.onboarding.title') }}</h3>
              <p>{{ $t('institutionalOtc.trade.onboarding.text') }}</p>
            </div>
          </article>

          <div class="otc-trade__stack">
            <article class="otc-process-card otc-process-card--dark">
              <img :src="tradeIcon" alt="" class="otc-process-card__watermark otc-process-card__watermark--trade" loading="lazy" decoding="async" />
              <div>
                <h3>{{ $t('institutionalOtc.trade.tradeStep.title') }}</h3>
                <p>{{ $t('institutionalOtc.trade.tradeStep.text') }}</p>
              </div>
            </article>
            <article class="otc-process-card otc-process-card--dark">
              <img :src="executionIcon" alt="" class="otc-process-card__watermark otc-process-card__watermark--execution" loading="lazy" decoding="async" />
              <div>
                <h3>{{ $t('institutionalOtc.trade.execution.title') }}</h3>
                <p>{{ $t('institutionalOtc.trade.execution.text') }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="otc-liquidity">
        <div class="otc-liquidity__card">
          <div class="otc-liquidity__copy">
            <h2>{{ $t('institutionalOtc.liquidity.title') }}</h2>
          </div>
          <img :src="liquidityCoins" alt="" class="otc-liquidity__image" loading="lazy" decoding="async" />
        </div>
      </section>

      <section class="otc-locations">
        <h2>{{ $t('institutionalOtc.locations.title') }}</h2>
        <div class="otc-locations__grid">
          <article v-for="location in locations" :key="location.tz" class="otc-location-card">
            <div class="otc-location-card__clock-wrap">
              <div class="otc-clock">
                <div class="otc-clock__face">
                  <span
                    v-for="n in [1,2,4,5,7,8,10,11]"
                    :key="'t'+n"
                    class="otc-clock__tick"
                    :style="{ '--i': n }"
                  ></span>
                  <span class="otc-clock__number otc-clock__number--12">12</span>
                  <span class="otc-clock__number otc-clock__number--3">3</span>
                  <span class="otc-clock__number otc-clock__number--6">6</span>
                  <span class="otc-clock__number otc-clock__number--9">9</span>
                </div>
                <div
                  class="otc-clock__hand otc-clock__hand--hour"
                  :style="{ '--deg': getClockDegrees(location.tz, 'hour') }"
                ></div>
                <div
                  class="otc-clock__hand otc-clock__hand--minute"
                  :style="{ '--deg': getClockDegrees(location.tz, 'minute') }"
                ></div>
                <div
                  class="otc-clock__hand otc-clock__hand--second"
                  :style="{ '--deg': getClockDegrees(location.tz, 'second') }"
                ></div>
                <div class="otc-clock__center"></div>
              </div>
            </div>
            <h3>{{ $t(location.labelKey) }}</h3>
          </article>
        </div>
      </section>

      <section class="otc-faq">
        <div class="otc-section-heading otc-section-heading--center">
          <h2>{{ $t('institutionalOtc.faq.title') }}</h2>
          <p>{{ $t('institutionalOtc.faq.subtitle') }}</p>
        </div>

        <div class="otc-faq__list">
          <article
            v-for="(item, index) in faqItems"
            :key="item.questionKey"
            class="otc-faq-item"
            :class="{ 'otc-faq-item--open': openFaqIndex === index }"
          >
            <button
              type="button"
              class="otc-faq-item__header"
              :aria-expanded="openFaqIndex === index"
              :aria-controls="`otc-faq-panel-${index}`"
              @click="toggleFaq(index)"
            >
              <span>{{ $t(item.questionKey) }}</span>
              <img :src="chevronIcon" alt="" aria-hidden="true" />
            </button>
            <div :id="`otc-faq-panel-${index}`" class="otc-faq-item__body">
              <div class="otc-faq-item__content">
                <p v-for="(paragraph, pIdx) in item.answers" :key="pIdx">
                  <strong v-if="paragraph.strongKey">{{ $t(paragraph.strongKey) }}</strong>{{ $t(paragraph.textKey) }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="otc-notices">
        <div class="otc-section-heading">
          <h2>{{ $t('institutionalOtc.notices.title') }}</h2>
          <p>{{ $t('institutionalOtc.notices.subtitle') }}</p>
        </div>

        <div class="otc-notices__grid">
          <article v-for="notice in notices" :key="notice.titleKey" class="otc-notice-card">
            <img :src="notice.icon" alt="" class="otc-notice-card__icon" loading="lazy" decoding="async" />
            <div>
              <h3>{{ $t(notice.titleKey) }}</h3>
              <p>{{ $t(notice.textKey) }}</p>
            </div>
          </article>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
import arrowIcon from '../assets/images/institutional-otc/otc-icon-arrow@4x.png'
import benefitComplianceIcon from '../assets/images/institutional-otc/otc-icon-compliance@4x.png'
import benefitPricingIcon from '../assets/images/institutional-otc/otc-icon-pricing@4x.png'
import benefitSupportIcon from '../assets/images/institutional-otc/otc-icon-support@4x.png'
import chevronIcon from '../assets/images/institutional-otc/otc-icon-chevron@4x.png'
import complianceRequiredIcon from '../assets/images/institutional-otc/otc-icon-compliance-required@4x.png'
import custodyIcon from '../assets/images/institutional-otc/otc-icon-custody@4x.png'
import executionIcon from '../assets/images/institutional-otc/otc-icon-execution@4x.png'
import heroCoins from '../assets/images/institutional-otc/otc-hero-coins@2x.png'
import heroStack from '../assets/images/institutional-otc/otc-hero-stack@2x.png'
import liquidityCoins from '../assets/images/institutional-otc/otc-liquidity-coins@2x.png'
import onboardingIcon from '../assets/images/institutional-otc/otc-icon-onboarding@4x.png'
import prefundingIcon from '../assets/images/institutional-otc/otc-icon-prefunding@4x.png'
import tradeIcon from '../assets/images/institutional-otc/otc-icon-trade@4x.png'

const benefits = [
  {
    icon: benefitSupportIcon,
    textKey: 'institutionalOtc.benefits.support',
  },
  {
    icon: benefitPricingIcon,
    textKey: 'institutionalOtc.benefits.pricing',
  },
  {
    icon: benefitComplianceIcon,
    textKey: 'institutionalOtc.benefits.ecosystem',
  },
]

const locations = [
  {
    tz: 'Europe/London',
    labelKey: 'institutionalOtc.locations.london',
  },
  {
    tz: 'Asia/Singapore',
    labelKey: 'institutionalOtc.locations.singapore',
  },
  {
    tz: 'America/New_York',
    labelKey: 'institutionalOtc.locations.newYork',
  },
]

const now = ref(new Date())
let clockTimer = null

onMounted(() => {
  clockTimer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer)
})

function getTimeInTZ(tz) {
  const parts = {}
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  })
  for (const p of fmt.formatToParts(now.value)) {
    parts[p.type] = parseInt(p.value, 10)
  }
  return {
    h: parts.hour === 24 ? 0 : parts.hour,
    m: parts.minute,
    s: parts.second,
  }
}

function getClockDegrees(tz, hand) {
  const { h, m, s } = getTimeInTZ(tz)
  if (hand === 'hour') return `${(h % 12) * 30 + m * 0.5}deg`
  if (hand === 'minute') return `${m * 6 + s * 0.1}deg`
  return `${s * 6}deg`
}

const faqItems = [
  {
    questionKey: 'institutionalOtc.faq.q1.question',
    answers: [
      {
        strongKey: 'institutionalOtc.faq.q1.a1Strong',
        textKey: 'institutionalOtc.faq.q1.a1Text',
      },
      {
        textKey: 'institutionalOtc.faq.q1.a2Text',
      },
    ],
  },
  {
    questionKey: 'institutionalOtc.faq.q2.question',
    answers: [
      {
        textKey: 'institutionalOtc.faq.q2.a1Text',
      },
    ],
  },
  {
    questionKey: 'institutionalOtc.faq.q3.question',
    answers: [
      {
        textKey: 'institutionalOtc.faq.q3.a1Text',
      },
    ],
  },
  {
    questionKey: 'institutionalOtc.faq.q4.question',
    answers: [
      {
        textKey: 'institutionalOtc.faq.q4.a1Text',
      },
    ],
  },
]

const openFaqIndex = ref(0)

const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}

const notices = [
  {
    icon: complianceRequiredIcon,
    titleKey: 'institutionalOtc.notices.compliance.title',
    textKey: 'institutionalOtc.notices.compliance.text',
  },
  {
    icon: prefundingIcon,
    titleKey: 'institutionalOtc.notices.prefunding.title',
    textKey: 'institutionalOtc.notices.prefunding.text',
  },
  {
    icon: custodyIcon,
    titleKey: 'institutionalOtc.notices.custody.title',
    textKey: 'institutionalOtc.notices.custody.text',
  },
]
</script>

<style scoped src="../styles/views/InstitutionalOtcView.css"></style>
