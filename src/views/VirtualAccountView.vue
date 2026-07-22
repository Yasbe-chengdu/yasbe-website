<template>
  <div class="virtual-account-page">
    <Navbar />

    <main>
      <section class="va-hero">
        <div class="va-hero__pattern" aria-hidden="true"></div>
        <div class="va-hero__inner">
          <div class="va-hero__copy">
            <h1 v-reveal class="va-hero__title">
              <span>{{ t('virtualAccount.hero.titleLine1') }}</span>
              <strong>{{ t('virtualAccount.hero.titleLine2') }}</strong>
            </h1>
            <p v-reveal="{ delay: 80, distance: 24 }" class="va-hero__subtitle">
              {{ t('virtualAccount.hero.subtitle') }}
            </p>
            <a v-reveal="{ delay: 140, distance: 20 }" :href="customerBaseUrl" target="_blank" rel="noopener noreferrer" class="va-cta">
              <span>{{ t('virtualAccount.cta.tryForFree') }}</span>
              <img :src="arrowCircleIcon" alt="" aria-hidden="true" />
            </a>
          </div>

          <div class="va-hero__visual" aria-hidden="true">
            <img
              v-reveal="{ delay: 180, distance: 42, scale: 0.98 }"
              :src="heroDeviceImage"
              alt=""
              class="va-hero__device"
              fetchpriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section id="virtual-account-global" class="va-global">
        <div class="va-global__inner">
          <div v-reveal class="va-section-header va-section-header--dark">
            <h2>{{ t('virtualAccount.global.title') }}</h2>
            <p>
              {{ t('virtualAccount.global.subtitle') }}
            </p>
          </div>

          <div class="va-network-grid">
            <img
              v-for="item in networkCards"
              :key="item.alt"
              v-reveal="{ delay: item.delay, distance: 32 }"
              :src="item.image"
              :alt="item.alt"
              class="va-network-card"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section class="va-branded">
        <div class="va-branded__inner">
          <div v-reveal class="va-section-header">
            <h2>{{ t('virtualAccount.branded.title') }}</h2>
            <p>
              {{ t('virtualAccount.branded.subtitle') }}
            </p>
          </div>

          <img
            v-reveal="{ delay: 80, distance: 34, scale: 0.99 }"
            :src="flowDiagramImage"
            :alt="t('virtualAccount.branded.flowAlt')"
            class="va-branded__diagram"
            loading="lazy"
            decoding="async"
          />

          <div class="va-flow-cards">
            <article v-reveal="{ delay: 100, origin: 'left', distance: 32 }" class="va-flow-card va-flow-card--light">
              {{ t('virtualAccount.branded.payin') }}
            </article>
            <img :src="flowArrowIcon" alt="" class="va-flow-cards__arrow" aria-hidden="true" loading="lazy" />
            <article v-reveal="{ delay: 160, origin: 'right', distance: 32 }" class="va-flow-card va-flow-card--dark">
              {{ t('virtualAccount.branded.payout') }}
            </article>
          </div>
        </div>
      </section>

      <section class="va-dashboard">
        <div class="va-dashboard__inner">
          <h2 v-reveal class="va-heading">{{ t('virtualAccount.dashboard.title') }}</h2>
          <img
            v-reveal="{ delay: 80, distance: 36, scale: 0.99 }"
            :src="dashboardImage"
            :alt="t('virtualAccount.dashboard.alt')"
            class="va-dashboard__image"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section class="va-benefits">
        <div class="va-benefits__inner">
          <div v-reveal class="va-benefits__top">
            <h2 class="va-heading">{{ t('virtualAccount.benefits.title') }}</h2>
            <a href="https://customer.beeznis.com/" target="_blank" rel="noopener noreferrer" class="va-cta va-cta--compact">
              <span>{{ t('virtualAccount.cta.findOutMore') }}</span>
              <img :src="arrowCircleIcon" alt="" aria-hidden="true" />
            </a>
          </div>

          <div class="va-benefit-grid">
            <article
              v-for="benefit in benefitCards"
              :key="benefit.key"
              v-reveal="{ delay: benefit.delay, distance: 28 }"
              class="va-benefit-card"
            >
              <img :src="benefit.icon" alt="" class="va-benefit-card__icon" aria-hidden="true" loading="lazy" />
              <div>
                <h3>{{ benefit.title }}</h3>
                <p>{{ benefit.text }}</p>
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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import heroDeviceImage from '../assets/images/virtual-account/va-hero-device@2x.png?v=1'
import heroCardImage from '../assets/images/virtual-account/va-hero-card@2x.png'
import gbpNetworkImage from '../assets/images/virtual-account/va-network-gbp@2x.png'
import usdNetworkImage from '../assets/images/virtual-account/va-network-usd@2x.png'
import eurNetworkImage from '../assets/images/virtual-account/va-network-eur@2x.png'
import flowDiagramImage from '../assets/images/virtual-account/va-flow-diagram@2x.png'
import dashboardImage from '../assets/images/virtual-account/va-dashboard@2x.png'
import arrowCircleIcon from '../assets/images/virtual-account/va-arrow-circle@4x.png?no-inline'
import flowArrowIcon from '../assets/images/virtual-account/va-flow-arrow@4x.png?no-inline'
import efficiencyIcon from '../assets/images/virtual-account/va-benefit-efficiency@4x.png?no-inline'
import controlIcon from '../assets/images/virtual-account/va-benefit-control@4x.png?no-inline'
import riskIcon from '../assets/images/virtual-account/va-benefit-risk@4x.png?no-inline'
import cashflowIcon from '../assets/images/virtual-account/va-benefit-cashflow@4x.png?no-inline'

const customerBaseUrl = import.meta.env.VITE_CUSTOMER_BASE_URL ?? 'https://customer.beeznis.com/'
const { t } = useI18n()

const networkCards = computed(() => [
  {
    image: gbpNetworkImage,
    alt: t('virtualAccount.network.gbpAlt'),
    delay: 40,
  },
  {
    image: usdNetworkImage,
    alt: t('virtualAccount.network.usdAlt'),
    delay: 100,
  },
  {
    image: eurNetworkImage,
    alt: t('virtualAccount.network.eurAlt'),
    delay: 160,
  },
])

const benefitCards = computed(() => [
  {
    key: 'efficiency',
    icon: efficiencyIcon,
    title: t('virtualAccount.benefits.efficiency.title'),
    text: t('virtualAccount.benefits.efficiency.text'),
    delay: 40,
  },
  {
    key: 'control',
    icon: controlIcon,
    title: t('virtualAccount.benefits.control.title'),
    text: t('virtualAccount.benefits.control.text'),
    delay: 100,
  },
  {
    key: 'risk',
    icon: riskIcon,
    title: t('virtualAccount.benefits.risk.title'),
    text: t('virtualAccount.benefits.risk.text'),
    delay: 160,
  },
  {
    key: 'cashflow',
    icon: cashflowIcon,
    title: t('virtualAccount.benefits.cashflow.title'),
    text: t('virtualAccount.benefits.cashflow.text'),
    delay: 220,
  },
])
</script>

<style scoped src="../styles/views/VirtualAccountView.css"></style>
