<template>
  <div class="bridging-page">
    <Navbar />

    <main>
      <section class="bridging-hero">
        <div class="bridging-hero__pattern" aria-hidden="true"></div>
        <div class="bridging-hero__inner">
          <div class="bridging-hero__copy">
            <h1 v-reveal class="bridging-hero__title">
              <span>Empowering Businesses</span>
              <strong>Bridging Economies</strong>
            </h1>
            <p v-reveal="{ delay: 80, distance: 24 }" class="bridging-hero__subtitle">
              Helping SMBs grow through global financial solutions.
            </p>
            <a v-reveal="{ delay: 140, distance: 20 }" :href="customerBaseUrl" target="_blank" rel="noopener noreferrer" class="bridging-cta">
              <span>Try For Free</span>
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
            <h2>Our Story &amp; Purpose</h2>
            <p>Connect small and medium businesses (SMBs) with the world economy</p>
          </div>

          <div class="bridging-story__lead">
            <div v-reveal="{ distance: 30 }" class="bridging-story__copy">
              <p>
                Since March 2023, many SMBs and startup companies have been left unserved due to the collapse of Silvergate, Silicon Valley Bank, and Signature Bank.
              </p>
              <p>
                When banks collapse, deposits might be recovered, but critical banking relationships, payment rails, and growth plans can disappear overnight.
              </p>
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
              :key="card.title"
              v-reveal="{ delay: card.delay, distance: 28 }"
              class="bridging-story-card"
            >
              <img :src="card.icon" alt="" class="bridging-story-card__icon" aria-hidden="true" loading="lazy" decoding="async" />
              <h3>{{ card.title }}</h3>
              <p>{{ card.text }}</p>
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
            <h2 v-reveal>United by a Shared Vision</h2>
            <p v-reveal="{ delay: 70, distance: 22 }" class="bridging-team__intro">
              We're a team of experts in banking, tech, and entrepreneurship, united by one goal: to give SMBs the financial access they need to scale globally.
            </p>

            <div class="bridging-feature-list">
              <article
                v-for="feature in teamFeatures"
                :key="feature.title"
                v-reveal="{ delay: feature.delay, distance: 26 }"
                class="bridging-feature"
              >
                <img :src="feature.icon" alt="" class="bridging-feature__icon" aria-hidden="true" loading="lazy" decoding="async" />
                <div>
                  <h3>{{ feature.title }}</h3>
                  <p>{{ feature.text }}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="bridging-vision">
        <div class="bridging-vision__inner">
          <div v-reveal class="bridging-section-header">
            <h2>The Vision &amp; Mission</h2>
            <p>Building financial infrastructure for businesses grounded in the real economy.</p>
          </div>

          <div class="bridging-vision__grid">
            <div class="bridging-vision__cards">
              <article
                v-for="(card, index) in visionCards"
                :key="card.title"
                v-reveal="{ delay: index * 80, distance: 28 }"
                class="bridging-vision-card"
                :class="{ 'bridging-vision-card--dark': card.dark }"
              >
                <h3>{{ card.title }}</h3>
                <p>{{ card.text }}</p>
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
    icon: bankingIcon,
    title: 'Essential Banking Needs',
    text: 'SMBs need reliable access to accounts, payments, and currency tools before they can grow across borders.',
    delay: 40,
  },
  {
    icon: supportIcon,
    title: 'Broken Bank Support',
    text: 'Traditional financial partners often leave smaller businesses with slow onboarding and limited global coverage.',
    delay: 100,
  },
  {
    icon: smbIcon,
    title: 'Purpose-Built for SMBs',
    text: 'YASBe brings modern payment, treasury, and stablecoin infrastructure into one accessible platform.',
    delay: 160,
  },
]

const teamFeatures = [
  {
    icon: visionIcon,
    title: 'United by a Shared Vision',
    text: 'Our team combines banking, compliance, technology, and entrepreneurship experience to solve practical financial barriers.',
    delay: 120,
  },
  {
    icon: modernSmbIcon,
    title: 'Built for Modern SMBs',
    text: 'Frustrated by outdated banking systems, we built YASBe to help ambitious companies move faster and operate globally.',
    delay: 190,
  },
]

const visionCards = [
  {
    title: 'Grounded in the Real Economy',
    text: 'We actively invest in real-world sectors and help businesses connect capital, settlement, and growth opportunities across markets.',
    dark: false,
  },
  {
    title: 'Bridging Markets, Unlocking Value',
    text: 'With deep roots in digital asset trading and traditional financial services, we bridge markets so businesses can unlock global value.',
    dark: true,
  },
]
</script>

<style scoped src="../styles/views/BridgingEconomiesView.css"></style>
