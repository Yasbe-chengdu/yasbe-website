<template>
  <section id="institutional-otc" class="features">
    <div class="features__container">
      <h2 v-reveal class="features__title">{{ $t('features.title') }}</h2>
      
      <div class="features__content">
        <div v-if="currentSlide === 0" class="features__slide">
          <div v-reveal="{ origin: 'left', distance: 40 }" class="features__visual features__visual--dark">
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
          <div v-reveal="{ delay: 120, origin: 'right', distance: 36 }" class="features__info">
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
            <FeatureNav
              :current-slide="currentSlide"
              :total-slides="totalSlides"
              @prev="prevSlide"
              @next="nextSlide"
              @go-to-slide="goToSlide"
            />
          </div>
        </div>

        <div v-if="currentSlide === 1" class="features__slide">
          <div v-reveal="{ origin: 'left', distance: 40 }" class="features__visual features__visual--dark">
            <div class="security-visual">
              <div class="security-visual__grid">
                <div class="security-visual__glow"></div>
                <div class="security-visual__card">
                  <div class="security-visual__card-inner">
                    <img src="../assets/images/glow-security.png" alt="" class="security-visual__glow-img" />
                    <div class="security-visual__card-content">
                      <div class="security-visual__lines">
                        <div class="security-visual__line"></div>
                        <div class="security-visual__line"></div>
                        <div class="security-visual__line"></div>
                      </div>
                    </div>
                    <div class="security-visual__header">
                      <span>YASBe</span>
                      <div class="security-visual__status">
                        <div class="security-visual__status-dot"></div>
                        <div class="security-visual__status-ring"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <img src="../assets/images/icon-lock.svg" alt="Lock" class="security-visual__lock" />
              </div>
              <div class="security-visual__button">
                <div class="security-visual__button-glow"></div>
                <button type="button" class="security-visual__button-inner">{{ $t('features.slide2.visualButton') }}</button>
              </div>
            </div>
          </div>
          <div v-reveal="{ delay: 120, origin: 'right', distance: 36 }" class="features__info">
            <div class="features__text">
              <h3 class="features__subtitle">{{ $t('features.slide2.title') }}</h3>
              <p class="features__description">{{ $t('features.slide2.description') }}</p>
            </div>
            <FeatureNav
              :current-slide="currentSlide"
              :total-slides="totalSlides"
              @prev="prevSlide"
              @next="nextSlide"
              @go-to-slide="goToSlide"
            />
          </div>
        </div>

        <div v-if="currentSlide === 2" class="features__slide">
          <div v-reveal="{ origin: 'left', distance: 40 }" class="features__visual features__visual--dark">
            <div class="otc-visual">
              <div class="otc-visual__center">
                <div class="otc-visual__glow motion-glow"></div>
                <div class="otc-visual__card">
                  <img src="../assets/images/glow-otc.png" alt="" class="otc-visual__glow-img" />
                  <div class="otc-visual__logo">
                    <img src="../assets/images/logo-hero.png" alt="YASBe" />
                  </div>
                </div>
              </div>
              <div class="otc-visual__connections">
                <div class="otc-visual__connection otc-visual__connection--left">
                  <div class="otc-visual__node">
                    <img src="../assets/images/node-icon-1.svg" alt="" />
                  </div>
                  <div class="otc-visual__node">
                    <img src="../assets/images/node-icon-2.svg" alt="" />
                  </div>
                  <div class="otc-visual__node">
                    <img src="../assets/images/node-icon-3.svg" alt="" />
                  </div>
                </div>
                <div class="otc-visual__connection otc-visual__connection--right">
                  <div class="otc-visual__node">
                    <img src="../assets/images/node-icon-3.svg" alt="" />
                  </div>
                  <div class="otc-visual__node">
                    <img src="../assets/images/node-icon-4.svg" alt="" />
                  </div>
                  <div class="otc-visual__node">
                    <img src="../assets/images/node-icon-2.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-reveal="{ delay: 120, origin: 'right', distance: 36 }" class="features__info">
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
            <FeatureNav
              :current-slide="currentSlide"
              :total-slides="totalSlides"
              @prev="prevSlide"
              @next="nextSlide"
              @go-to-slide="goToSlide"
            />
          </div>
        </div>

        <div v-if="currentSlide === 3" class="features__slide">
          <div v-reveal="{ origin: 'left', distance: 40 }" class="features__visual features__visual--dark">
            <div class="diversify-visual">
              <div class="diversify-visual__grid">
                <div class="diversify-visual__decor"></div>
                <div class="diversify-visual__card">
                  <img src="../assets/images/glow-diversify.png" alt="" class="diversify-visual__glow motion-glow" />
                  <div class="diversify-visual__card-inner">
                    <div class="diversify-visual__logo">
                      <img src="../assets/images/logo-diversify.png" alt="YASBe" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-reveal="{ delay: 120, origin: 'right', distance: 36 }" class="features__info">
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
            <FeatureNav
              :current-slide="currentSlide"
              :total-slides="totalSlides"
              @prev="prevSlide"
              @next="nextSlide"
              @go-to-slide="goToSlide"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import FeatureNav from './FeatureNav.vue'

const currentSlide = ref(0)
const totalSlides = 4

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides
}

const goToSlide = (index) => {
  currentSlide.value = index
}
</script>

<style scoped src="../styles/components/FeaturesSection.css"></style>
