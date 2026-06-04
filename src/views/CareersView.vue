<template>
  <div class="careers-page">
    <Navbar />

    <main>
      <section class="careers-hero">
        <div class="careers-hero__pattern" aria-hidden="true"></div>
        <div class="careers-hero__inner">
          <div class="careers-hero__copy">
            <h1 v-reveal class="careers-hero__title">
              <span>{{ $t('careersPage.hero.titleLight') }}</span>
              <strong>{{ $t('careersPage.hero.titleBold') }}</strong>
            </h1>
            <p v-reveal="{ delay: 80, distance: 24 }" class="careers-hero__subtitle">
              {{ $t('careersPage.hero.subtitle') }}
            </p>
            <a v-reveal="{ delay: 140, distance: 20 }" :href="customerBaseUrl" target="_blank" rel="noopener noreferrer" class="careers-cta">
              <span>{{ $t('careersPage.cta.tryForFree') }}</span>
              <img :src="ctaArrowIcon" alt="" aria-hidden="true" />
            </a>
          </div>

          <img
            v-reveal="{ delay: 220, distance: 44, scale: 0.98 }"
            :src="heroImage"
            :alt="$t('careersPage.media.heroAlt')"
            class="careers-hero__image"
            fetchpriority="high"
            decoding="async"
          />
        </div>
      </section>

      <section class="careers-values">
        <div class="careers-values__inner">
          <article v-for="(card, index) in valueCards" :key="card.text" v-reveal="{ delay: index * 80, distance: 28 }" class="careers-value-card">
            <img :src="card.icon" alt="" aria-hidden="true" class="careers-value-card__icon" loading="lazy" decoding="async" />
            <p>{{ card.text }}</p>
          </article>
        </div>
      </section>

      <section class="careers-questions">
        <div class="careers-questions__inner">
          <header v-reveal class="careers-section-header">
            <h2>{{ $t('careersPage.questions.title') }}</h2>
            <p>{{ $t('careersPage.questions.subtitle') }}</p>
          </header>

          <div class="careers-accordion">
            <article
              v-for="(role, index) in questions"
              :key="role.title"
              v-reveal="{ delay: Math.min(index * 35, 220), distance: 18 }"
              class="careers-role"
              :class="{ 'careers-role--open': activeIndex === index }"
            >
              <button class="careers-role__summary" type="button" :aria-expanded="activeIndex === index" @click="toggleRole(index)">
                <span>
                  <strong>{{ role.title }}</strong>
                  <em>{{ role.meta }}</em>
                </span>
                <img :src="accordionChevronIcon" alt="" aria-hidden="true" />
              </button>

              <div v-if="activeIndex === index" class="careers-role__body">
                <section class="careers-role__section">
                  <h3>{{ $t('careersPage.questions.about') }}</h3>
                  <p>{{ role.about }}</p>
                </section>

                <section class="careers-role__section">
                  <h3>{{ $t('careersPage.questions.responsibilities') }}</h3>
                  <ul>
                    <li v-for="item in role.responsibilities" :key="item">{{ item }}</li>
                  </ul>
                </section>

                <section class="careers-role__section">
                  <h3>{{ $t('careersPage.questions.requirements') }}</h3>
                  <ul>
                    <li v-for="item in role.requirements" :key="item">{{ item }}</li>
                  </ul>
                </section>

                <section v-if="role.niceToHave?.length" class="careers-role__section">
                  <h3>{{ $t('careersPage.questions.niceToHave') }}</h3>
                  <ul>
                    <li v-for="item in role.niceToHave" :key="item">{{ item }}</li>
                  </ul>
                </section>

                <section class="careers-role__section">
                  <h3>{{ $t('careersPage.questions.workingWithUs') }}</h3>
                  <ul>
                    <li v-for="item in role.benefits" :key="item">{{ item }}</li>
                  </ul>
                </section>

                <a class="careers-role__apply" href="mailto:careers@yasbe.com">
                  <span>{{ $t('careersPage.questions.apply') }}</span>
                  <strong>careers@yasbe.com</strong>
                </a>
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
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { getCareersQuestions } from '../data/careersContent.js'
import heroImage from '../assets/images/careers/careers-hero-image@2x.png'
import ctaArrowIcon from '../assets/images/careers/careers-cta-arrow@4x.png?no-inline'
import valueIconOne from '../assets/images/careers/careers-value-icon-1@4x.png?no-inline'
import valueIconTwo from '../assets/images/careers/careers-value-icon-2@4x.png?no-inline'
import valueIconThree from '../assets/images/careers/careers-value-icon-3@4x.png?no-inline'
import accordionChevronIcon from '../assets/images/careers/careers-accordion-chevron@4x.png?no-inline'

const { locale, tm } = useI18n()
const customerBaseUrl = import.meta.env.VITE_CUSTOMER_BASE_URL ?? 'https://customer.yasbe.com/'
const activeIndex = ref(0)

const questions = computed(() => getCareersQuestions(locale.value))
const valueCards = computed(() => {
  const values = tm('careersPage.values.cards')
  return [valueIconOne, valueIconTwo, valueIconThree].map((icon, index) => ({
    icon,
    text: values[index],
  }))
})

function toggleRole(index) {
  activeIndex.value = activeIndex.value === index ? -1 : index
}
</script>

<style scoped src="../styles/views/CareersView.css"></style>
