<template>
  <section id="institutional-otc" class="features">
    <div class="features__container">
      <h2 v-reveal class="features__title">{{ $t('features.title') }}</h2>
      
      <div v-reveal="{ delay: 80, distance: 28 }" class="features__content">
        <div class="features__track" :style="trackStyle">
          <div class="features__slide">
            <div class="features__visual features__visual--dark">
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
            </div>
            <div class="features__info">
              <div class="features__text">
                <h3 class="features__subtitle" v-html="$t('features.slide1.title')"></h3>
                <p class="features__description">{{ $t('features.slide1.description') }}</p>
                <button type="button" class="features__cta">
                  <span>{{ $t('features.slide1.cta') }}</span>
                  <div class="features__cta-icon">
                    <img src="../assets/images/icon-arrow-right-dark.svg" alt="Arrow" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="features__slide">
            <div class="features__visual features__visual--dark">
              <img src="../assets/images/img2.png" alt="">
            </div>
            <div class="features__info">
              <div class="features__text">
                <h3 class="features__subtitle">{{ $t('features.slide2.title') }}</h3>
                <p class="features__description">{{ $t('features.slide2.description') }}</p>
              </div>
            </div>
          </div>

          <div class="features__slide">
            <div class="features__visual features__visual--dark">
              <img src="../assets/images/img3.png" alt="">
            </div>
            <div class="features__info">
              <div class="features__text">
                <h3 class="features__subtitle">{{ $t('features.slide3.title') }}</h3>
                <p class="features__description">{{ $t('features.slide3.description') }}</p>
                <div class="features__list">
                  <p class="features__list-title">{{ $t('features.slide3.listTitle') }}</p>
                  <p class="features__list-items" v-html="$t('features.slide3.listItems')"></p>
                </div>
                <button type="button" class="features__cta">
                  <span>{{ $t('features.slide3.cta') }}</span>
                  <div class="features__cta-icon">
                    <img src="../assets/images/icon-arrow-right-dark.svg" alt="Arrow" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="features__slide">
            <div class="features__visual features__visual--dark">
              <img src="../assets/images/img4.png" alt="">
            </div>
            <div class="features__info">
              <div class="features__text">
                <h3 class="features__subtitle">{{ $t('features.slide4.title') }}</h3>
                <p class="features__description">{{ $t('features.slide4.description') }}</p>
                <div class="features__list">
                  <p class="features__list-title">{{ $t('features.slide4.listTitle') }}</p>
                  <p class="features__list-items" v-html="$t('features.slide4.listItems')"></p>
                </div>
                <button type="button" class="features__cta">
                  <span>{{ $t('features.slide4.cta') }}</span>
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
import FeatureNav from './FeatureNav.vue'

const currentSlide = ref(0)
const totalSlides = 4

const trackStyle = computed(() => ({
  transform: `translateX(-${currentSlide.value * 100}%)`,
}))

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides
}

const goToSlide = (index) => {
  if (index === currentSlide.value) {
    return
  }

  currentSlide.value = index
}
</script>

<style scoped src="../styles/components/FeaturesSection.css"></style>
