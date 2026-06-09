<template>
  <div class="yasbe-card-page">
    <Navbar :logo-src="pageLogo" />

    <main>
      <section class="yasbe-card-hero">
        <div class="yasbe-card-hero__pattern" aria-hidden="true"></div>
        <div class="yasbe-card-hero__inner">
          <div class="yasbe-card-hero__copy">
            <h1 v-reveal class="yasbe-card-hero__title">
              <span>{{ $t('yasbeCard.hero.titleLine1') }}</span>
              <strong>{{ $t('yasbeCard.hero.titleLine2') }}</strong>
            </h1>
            <p v-reveal="{ delay: 80, distance: 24 }" class="yasbe-card-hero__subtitle">
              {{ $t('yasbeCard.hero.subtitle') }}
            </p>
            <a v-reveal="{ delay: 140, distance: 20 }" :href="customerBaseUrl" target="_blank" rel="noopener noreferrer" class="yasbe-card-cta">
              <span>{{ $t('yasbeCard.cta.tryForFree') }}</span>
              <span class="yasbe-card-cta__icon" aria-hidden="true">
                <img :src="arrowIcon" alt="" />
              </span>
            </a>
          </div>

          <div class="yasbe-card-hero__visual-anchor">
            <img
              v-reveal="{ delay: 180, distance: 40, scale: 0.98 }"
              :src="heroCardImage"
              :alt="$t('yasbeCard.media.heroAlt')"
              class="yasbe-card-hero__visual"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section id="yasbe-card-payments" class="yasbe-card-payments">
        <div class="yasbe-card-payments__inner">
          <div class="yasbe-card-section-header yasbe-card-section-header--dark">
            <h2 v-reveal>{{ $t('yasbeCard.payments.title') }}</h2>
            <p v-reveal="{ delay: 80, origin: 'right', distance: 28 }">
              {{ $t('yasbeCard.payments.subtitle') }}
            </p>
          </div>

          <div class="yasbe-card-payment-cards">
            <article
              v-for="item in paymentCards"
              :key="item.titleKey"
              v-reveal="{ delay: item.delay, distance: 30 }"
              class="yasbe-card-payment-card"
            >
              <img :src="item.icons" alt="" class="yasbe-card-payment-card__icons" aria-hidden="true" />
              <div>
                <h3>{{ $t(item.titleKey) }}</h3>
                <p>{{ $t(item.textKey) }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="yasbe-card-repayment">
        <div class="yasbe-card-repayment__inner">
          <h2 v-reveal class="yasbe-card-heading yasbe-card-heading--center">
            {{ $t('yasbeCard.repayment.title') }}
          </h2>

          <div class="yasbe-card-repayment__grid">
            <div v-reveal="{ origin: 'left', distance: 34 }" class="yasbe-card-repayment-panel">
              <div class="yasbe-card-bill">
                <h3>{{ $t('yasbeCard.repayment.makeTitle') }}</h3>
                <div class="yasbe-card-bill__box">
                  <div>
                    <span>{{ $t('yasbeCard.repayment.outstandingBalance') }}</span>
                    <strong>USD 5,264.59</strong>
                  </div>
                  <div>
                    <span>{{ $t('yasbeCard.repayment.minimumPayment') }}</span>
                    <strong>USD 500.00</strong>
                  </div>
                </div>
              </div>

              <div class="yasbe-card-methods">
                <h3>{{ $t('yasbeCard.repayment.methodTitle') }}</h3>
                <article
                  v-for="method in repaymentMethods"
                  :key="method.titleKey"
                  class="yasbe-card-method"
                  :class="{ 'yasbe-card-method--selected': method.selected }"
                  @click="selectMethod(method)"
                >
                  <div class="yasbe-card-method__top">
                    <span class="yasbe-card-method__name">
                      <img :src="method.icon" alt="" aria-hidden="true" />
                      <strong>{{ $t(method.titleKey) }}</strong>
                    </span>
                    <img :src="chevronIcon" alt="" class="yasbe-card-method__chevron" aria-hidden="true" />
                  </div>
                  <p>{{ $t(method.textKey) }}</p>
                </article>
              </div>
            </div>

            <div class="yasbe-card-benefits">
              <article
                v-for="item in repaymentBenefits"
                :key="item.titleKey"
                v-reveal="{ delay: item.delay, origin: 'right', distance: 34 }"
                class="yasbe-card-benefit"
              >
                <img :src="item.icon" alt="" class="yasbe-card-benefit__icon" aria-hidden="true" />
                <div>
                  <h3>{{ $t(item.titleKey) }}</h3>
                  <p>{{ $t(item.textKey) }}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="yasbe-card-teams">
        <div class="yasbe-card-teams__inner">
          <h2 v-reveal class="yasbe-card-heading yasbe-card-heading--center" style="font-size: 60px;">
            {{ $t('yasbeCard.teams.title') }}
          </h2>
          <div v-reveal="{ delay: 80, distance: 34 }" class="yasbe-card-teams__image-wrap">
            <img
              :src="teamPhoto"
              :alt="$t('yasbeCard.media.teamAlt')"
              class="yasbe-card-teams__image"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p v-reveal="{ delay: 120, distance: 24 }" class="yasbe-card-teams__text">
            {{ $t('yasbeCard.teams.text') }}
          </p>
        </div>
      </section>

      <section class="yasbe-card-why">
        <div class="yasbe-card-why__inner">
          <h2 v-reveal class="yasbe-card-heading">{{ $t('yasbeCard.why.title') }}</h2>
          <div class="yasbe-card-why__grid">
            <div v-reveal="{ origin: 'left', distance: 34 }" class="yasbe-card-security-visual">
              <img
                :src="securityPhoneImage"
                :alt="$t('yasbeCard.media.securityAlt')"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div class="yasbe-card-security-list">
              <article
                v-for="item in securityItems"
                :key="item.titleKey"
                v-reveal="{ delay: item.delay, origin: 'right', distance: 28 }"
                class="yasbe-card-security-item"
                :class="{ 'yasbe-card-security-item--featured': item.featured }"
                @click="toggleFeatured(item)"
              >
                <div class="yasbe-card-security-item__title">
                  <img :src="item.icon" alt="" aria-hidden="true" />
                  <h3>{{ $t(item.titleKey) }}</h3>
                </div>
                <p v-if="item.featured && item.textKey">{{ $t(item.textKey) }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import pageLogo from '../assets/images/yasbe-card-logo.png?no-inline'
import heroCardImage from '../assets/images/yasbe-card-hero-card.png'
import teamPhoto from '../assets/images/yasbe-card-team-photo.png'
import securityPhoneImage from '../assets/images/yasbe-card-security-phone.png'
import cryptoIcons from '../assets/images/yasbe-card-icons-crypto.png?no-inline'
import chainIcons from '../assets/images/yasbe-card-icons-chain.png?no-inline'
import bankIcon from '../assets/images/yasbe-card-icon-bank.png?no-inline'
import stablecoinIcon from '../assets/images/yasbe-card-icon-stablecoin.png?no-inline'
import flexibleIcon from '../assets/images/yasbe-card-icon-flexible.png?no-inline'
import settleIcon from '../assets/images/yasbe-card-icon-settle.png?no-inline'
import monitoringIcon from '../assets/images/yasbe-card-icon-monitoring.png?no-inline'
import fraudIcon from '../assets/images/yasbe-card-icon-fraud.png?no-inline'
import blockingIcon from '../assets/images/yasbe-card-icon-blocking.png?no-inline'
import freezeIcon from '../assets/images/yasbe-card-icon-freeze.png?no-inline'
import arrowIcon from '../assets/images/institutional-otc/otc-icon-arrow@4x.png'
import chevronIcon from '../assets/images/yasbe-card-icon-chevron.png?no-inline'

const customerBaseUrl = import.meta.env.VITE_CUSTOMER_BASE_URL ?? 'https://customer.beeznis.com/'

const paymentCards = [
  {
    icons: cryptoIcons,
    titleKey: 'yasbeCard.payments.crypto.title',
    textKey: 'yasbeCard.payments.crypto.text',
    delay: 40,
  },
  {
    icons: chainIcons,
    titleKey: 'yasbeCard.payments.chain.title',
    textKey: 'yasbeCard.payments.chain.text',
    delay: 100,
  },
]

const repaymentMethods = reactive([
  {
    icon: bankIcon,
    titleKey: 'yasbeCard.repayment.methods.bank.title',
    textKey: 'yasbeCard.repayment.methods.bank.text',
    selected: true,
  },
  {
    icon: stablecoinIcon,
    titleKey: 'yasbeCard.repayment.methods.stablecoin.title',
    textKey: 'yasbeCard.repayment.methods.stablecoin.text',
  },
])

function selectMethod(method) {
  repaymentMethods.forEach((m) => (m.selected = false))
  method.selected = true
}

const repaymentBenefits = [
  {
    icon: flexibleIcon,
    titleKey: 'yasbeCard.repayment.benefits.flexible.title',
    textKey: 'yasbeCard.repayment.benefits.flexible.text',
    delay: 80,
  },
  {
    icon: settleIcon,
    titleKey: 'yasbeCard.repayment.benefits.settle.title',
    textKey: 'yasbeCard.repayment.benefits.settle.text',
    delay: 140,
  },
]

const securityItems = reactive([
  {
    icon: monitoringIcon,
    titleKey: 'yasbeCard.why.monitoring.title',
    textKey: 'yasbeCard.why.monitoring.text',
    featured: true,
    delay: 80,
  },
  {
    icon: fraudIcon,
    titleKey: 'yasbeCard.why.fraud.title',
    textKey: 'yasbeCard.why.fraud.text',
    delay: 130,
  },
  {
    icon: blockingIcon,
    titleKey: 'yasbeCard.why.blocking.title',
    textKey: 'yasbeCard.why.blocking.text',
    delay: 180,
  },
  {
    icon: freezeIcon,
    titleKey: 'yasbeCard.why.freeze.title',
    textKey: 'yasbeCard.why.freeze.text',
    delay: 230,
  },
])

function toggleFeatured(item) {
  securityItems.forEach((i) => (i.featured = false))
  item.featured = true
}
</script>

<style scoped src="../styles/views/YasbeCardView.css"></style>
