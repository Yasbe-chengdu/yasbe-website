<template>
  <div class="bridging-page">
    <Navbar />

    <main>
      <section class="bridging-hero">
        <div class="bridging-hero__pattern" aria-hidden="true"></div>
        <div class="bridging-hero__inner">
          <div class="bridging-hero__copy">
            <h1 v-reveal class="bridging-hero__title">
              <span>{{ $t('bridgingEconomies.hero.titleSpan') }}</span>
              <strong>{{ $t('bridgingEconomies.hero.titleStrong') }}</strong>
            </h1>
            <p v-reveal="{ delay: 80, distance: 24 }" class="bridging-hero__subtitle">
              {{ $t('bridgingEconomies.hero.subtitle') }}
            </p>
            <a v-reveal="{ delay: 140, distance: 20 }" :href="customerBaseUrl" target="_blank" rel="noopener noreferrer" class="bridging-cta">
              <span>{{ $t('bridgingEconomies.hero.ctaText') }}</span>
              <img :src="ctaArrowIcon" alt="" aria-hidden="true" />
            </a>
          </div>

          <img
            v-reveal="{ delay: 220, distance: 44, scale: 0.98 }"
            :src="heroVisualImage"
            alt=""
            class="bridging-hero__visual"
            fetchpriority="high"
            decoding="async"
            aria-hidden="true"
          />
        </div>
      </section>

      <section class="bridging-story">
        <div class="bridging-story__inner">
          <div v-reveal class="bridging-section-header bridging-section-header--dark">
            <h2>{{ $t('bridgingEconomies.story.headerTitle') }}</h2>
            <p>{{ $t('bridgingEconomies.story.headerSubtitle') }}</p>
          </div>

          <div class="bridging-story__lead">
            <div v-reveal="{ distance: 30 }" class="bridging-story__copy">
              <p>{{ $t('bridgingEconomies.story.paragraphs.collapse') }}</p>
              <p>{{ $t('bridgingEconomies.story.paragraphs.impact') }}</p>
            </div>
            <img
              v-reveal="{ delay: 100, distance: 34, scale: 0.99 }"
              :src="storyImage"
              alt=""
              class="bridging-story__image"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="bridging-story__cards">
            <article
              v-for="card in storyCards"
              :key="card.key"
              v-reveal="{ delay: card.delay, distance: 28 }"
              class="bridging-story-card"
            >
              <img :src="card.icon" alt="" class="bridging-story-card__icon" aria-hidden="true" loading="lazy" decoding="async" />
              <h3>{{ $t(card.titleKey) }}</h3>
              <p>{{ $t(card.textKey) }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="bridging-team">
        <div class="bridging-team__inner">
          <img
            v-reveal="{ origin: 'left', distance: 38, scale: 0.99 }"
            :src="teamPhoto"
            alt=""
            class="bridging-team__photo"
            loading="lazy"
            decoding="async"
          />

          <div class="bridging-team__content">
            <h2 v-reveal>{{ $t('bridgingEconomies.team.title') }}</h2>
            <p v-reveal="{ delay: 70, distance: 22 }" class="bridging-team__intro">
              {{ $t('bridgingEconomies.team.intro') }}
            </p>

            <div class="bridging-feature-list">
              <article
                v-for="feature in teamFeatures"
                :key="feature.key"
                v-reveal="{ delay: feature.delay, distance: 26 }"
                class="bridging-feature"
              >
                <img :src="feature.icon" alt="" class="bridging-feature__icon" aria-hidden="true" loading="lazy" decoding="async" />
                <div>
                  <h3>{{ $t(feature.titleKey) }}</h3>
                  <p>{{ $t(feature.textKey) }}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="bridging-vision">
        <div class="bridging-vision__inner">
          <div v-reveal class="bridging-section-header">
            <h2>{{ $t('bridgingEconomies.vision.headerTitle') }}</h2>
            <p>{{ $t('bridgingEconomies.vision.headerSubtitle') }}</p>
          </div>

          <div class="bridging-vision__grid">
            <div class="bridging-vision__cards">
              <article
                v-for="(card, index) in visionCards"
                :key="card.key"
                v-reveal="{ delay: index * 80, distance: 28 }"
                class="bridging-vision-card"
                :class="{ 'bridging-vision-card--dark': card.dark }"
              >
                <h3>{{ $t(card.titleKey) }}</h3>
                <p>{{ $t(card.textKey) }}</p>
              </article>
            </div>

            <img
              v-reveal="{ delay: 140, origin: 'right', distance: 34, scale: 0.99 }"
              :src="visionPhoto"
              alt=""
              class="bridging-vision__photo"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import heroVisualImage from '../assets/images/bridging-economies/be-hero-visual@2x.png'
import storyImage from '../assets/images/bridging-economies/be-story-image@2x.png'
import teamPhoto from '../assets/images/bridging-economies/be-team-photo@2x.png'
import visionPhoto from '../assets/images/bridging-economies/be-vision-photo@2x.png'
import ctaArrowIcon from '../assets/images/bridging-economies/be-cta-arrow@4x.png?no-inline'
import bankingIcon from '../assets/images/bridging-economies/be-story-icon-banking@4x.png?no-inline'
import supportIcon from '../assets/images/bridging-economies/be-story-icon-support@4x.png?no-inline'
import smbIcon from '../assets/images/bridging-economies/be-story-icon-smb@4x.png?no-inline'
import visionIcon from '../assets/images/bridging-economies/be-feature-icon-vision@4x.png?no-inline'
import modernSmbIcon from '../assets/images/bridging-economies/be-feature-icon-modern-smb@4x.png?no-inline'

const customerBaseUrl = import.meta.env.VITE_CUSTOMER_BASE_URL ?? 'https://customer.beeznis.com/'

const storyCards = [
  {
    key: 'banking',
    icon: bankingIcon,
    titleKey: 'bridgingEconomies.story.cards.banking.title',
    textKey: 'bridgingEconomies.story.cards.banking.text',
    delay: 40,
  },
  {
    key: 'support',
    icon: supportIcon,
    titleKey: 'bridgingEconomies.story.cards.support.title',
    textKey: 'bridgingEconomies.story.cards.support.text',
    delay: 100,
  },
  {
    key: 'smb',
    icon: smbIcon,
    titleKey: 'bridgingEconomies.story.cards.smb.title',
    textKey: 'bridgingEconomies.story.cards.smb.text',
    delay: 160,
  },
]

const teamFeatures = [
  {
    key: 'vision',
    icon: visionIcon,
    titleKey: 'bridgingEconomies.team.features.vision.title',
    textKey: 'bridgingEconomies.team.features.vision.text',
    delay: 120,
  },
  {
    key: 'modernSmb',
    icon: modernSmbIcon,
    titleKey: 'bridgingEconomies.team.features.modernSmb.title',
    textKey: 'bridgingEconomies.team.features.modernSmb.text',
    delay: 190,
  },
]

const visionCards = [
  {
    key: 'realEconomy',
    titleKey: 'bridgingEconomies.vision.cards.realEconomy.title',
    textKey: 'bridgingEconomies.vision.cards.realEconomy.text',
    dark: false,
  },
  {
    key: 'bridging',
    titleKey: 'bridgingEconomies.vision.cards.bridging.title',
    textKey: 'bridgingEconomies.vision.cards.bridging.text',
    dark: true,
  },
]
</script>

<style scoped src="../styles/views/BridgingEconomiesView.css"></style>
