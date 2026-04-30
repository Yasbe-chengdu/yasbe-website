<template>
  <section id="institutional-otc" class="features">
    <div class="features__container">
      <h2 v-reveal class="features__title">{{ $t('features.title') }}</h2>

      <div v-reveal="{ delay: 80, distance: 28 }" class="features__content">
        <div class="features__track" :style="trackStyle">
          <div v-for="slide in featureSlides" :key="slide.key" class="features__slide">
            <div class="features__visual features__visual--dark">
              <template v-if="slide.type === 'exchange'">
                <div class="exchange-card">
                  <div class="exchange-card__users exchange-card__users--top">
                    <div class="exchange-card__user"></div>
                    <div class="exchange-card__user"></div>
                    <div class="exchange-card__user"></div>
                  </div>
                  <div class="exchange-card__arrow exchange-card__arrow--up">
                    <img src="../assets/images/decor-arrow-up.svg" alt="" />
                  </div>
                  <div class="exchange-card__main">
                    <img src="../assets/images/glow-exchange.png" alt="" class="exchange-card__glow motion-glow" />
                    <div class="exchange-card__content">
                      <p class="exchange-card__update">{{ $t('features.slide1.update') }}</p>
                      <div class="exchange-card__inputs">
                        <div class="exchange-input">
                          <span class="exchange-input__label">{{ $t('features.slide1.from') }}</span>
                          <div class="exchange-input__row">
                            <div class="exchange-input__currency">
                              <img src="../assets/images/icon-btc.svg" alt="BTC" />
                              <span>BTC</span>
                              <img src="../assets/images/icon-chevron-down.svg" alt="Dropdown" />
                            </div>
                            <span class="exchange-input__value">1</span>
                          </div>
                        </div>
                        <div class="exchange-input">
                          <span class="exchange-input__label">{{ $t('features.slide1.to') }}</span>
                          <div class="exchange-input__row">
                            <div class="exchange-input__currency">
                              <img src="../assets/images/icon-usd.svg" alt="USD" />
                              <span>USD</span>
                              <img src="../assets/images/icon-chevron-down.svg" alt="Dropdown" />
                            </div>
                            <span class="exchange-input__value">$70544.91</span>
                          </div>
                        </div>
                      </div>
                      <div class="exchange-card__rate">
                        <span>{{ $t('features.slide1.rateLabel') }}</span>
                        <span>1BTC = $70544.91</span>
                      </div>
                      <button type="button" class="exchange-card__btn">{{ $t('features.slide1.exchangeButton') }}</button>
                    </div>
                  </div>
                  <div class="exchange-card__arrow exchange-card__arrow--down">
                    <img src="../assets/images/decor-arrow-down.svg" alt="" />
                  </div>
                  <div class="exchange-card__users exchange-card__users--bottom">
                    <div class="exchange-card__user"></div>
                    <div class="exchange-card__user"></div>
                    <div class="exchange-card__user"></div>
                  </div>
                </div>
              </template>
              <img v-else :src="slide.image" :alt="slide.imageAlt" />
            </div>

            <div class="features__info">
              <div class="features__text">
                <h3
                  v-if="slide.titleHtml"
                  class="features__subtitle"
                  v-html="$t(`features.${slide.key}.title`)"
                ></h3>
                <h3 v-else class="features__subtitle">{{ $t(`features.${slide.key}.title`) }}</h3>
                <p class="features__description">{{ $t(`features.${slide.key}.description`) }}</p>

                <div v-if="slide.hasList" class="features__list">
                  <p class="features__list-title">{{ $t(`features.${slide.key}.listTitle`) }}</p>
                  <p class="features__list-items" v-html="$t(`features.${slide.key}.listItems`)"></p>
                </div>

                <button v-if="slide.hasCta" type="button" class="features__cta">
                  <span>{{ $t(`features.${slide.key}.cta`) }}</span>
                  <div class="features__cta-icon">
                    <img src="../assets/images/icon-arrow-right-dark.svg" alt="Arrow" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <FeatureNav
          class="features__nav-overlay"
          :current-slide="currentSlide"
          :total-slides="totalSlides"
          @prev="prevSlide"
          @next="nextSlide"
          @go-to-slide="goToSlide"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import img2 from '../assets/images/img2.png'
import img3 from '../assets/images/img3.png'
import img4 from '../assets/images/img4.png'
import FeatureNav from './FeatureNav.vue'

const featureSlides = [
  {
    key: 'slide1',
    type: 'exchange',
    titleHtml: true,
    hasCta: true,
  },
  {
    key: 'slide2',
    image: img2,
    imageAlt: '',
  },
  {
    key: 'slide3',
    image: img3,
    imageAlt: '',
    hasList: true,
    hasCta: true,
  },
  {
    key: 'slide4',
    image: img4,
    imageAlt: '',
    hasList: true,
    hasCta: true,
  },
]

const currentSlide = ref(0)
const totalSlides = featureSlides.length

const trackStyle = computed(() => ({
  transform: `translateX(-${currentSlide.value * 100}%)`,
}))

const nextSlide = () => {
  currentSlide.value = Math.min(currentSlide.value + 1, totalSlides - 1)
}

const prevSlide = () => {
  currentSlide.value = Math.max(currentSlide.value - 1, 0)
}

const goToSlide = (index) => {
  if (index === currentSlide.value) {
    return
  }

  currentSlide.value = Math.min(Math.max(index, 0), totalSlides - 1)
}
</script>

<style scoped src="../styles/components/FeaturesSection.css"></style>
