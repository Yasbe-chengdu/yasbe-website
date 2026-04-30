<template>
    <section class="products">
        <div class="products__container">
            <h2 v-reveal class="products__title">{{ $t('products.title') }}</h2>

            <div v-reveal="{ delay: 80, distance: 40 }" class="products__slider">
                <div class="products__track" :style="trackStyle">
                    <div v-for="slide in productSlides" :key="slide.key" class="products__slide">
                        <div :class="['products__card', slide.cardClass]">
                            <div class="products__content">
                                <h3 class="products__card-title">{{ $t(`products.${slide.key}.title`) }}</h3>
                                <p class="products__card-text">{{ $t(`products.${slide.key}.text`) }}</p>
                            </div>
                            <div class="products__device">
                                <div class="macbook motion-float-medium">
                                    <div class="macbook__lid">
                                        <div class="macbook__screen">
                                            <img :src="dashboardImage" alt="Dashboard" />
                                        </div>
                                        <span class="macbook__label">Macbook Air</span>
                                    </div>
                                    <img :src="slide.baseImage" alt="" class="macbook__bottom" />
                                </div>
                                <div class="macbook__shadow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-reveal="{ delay: 160, distance: 24 }" class="products__nav">
                <div class="products__arrows">
                    <button type="button" class="products__arrow products__arrow--prev" @click="prevSlide">
                        <img src="../assets/images/arrow-right-small.svg" alt="Prev" />
                    </button>
                    <button type="button" class="products__arrow products__arrow--next" @click="nextSlide">
                        <img src="../assets/images/arrow-right-small.svg" alt="Next" />
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import dashboardImage from '../assets/images/dashboard.png'
import macbookBase1 from '../assets/images/macbook-base-1.svg'
import macbookBase2 from '../assets/images/macbook-base-2.svg'
import macbookBase3 from '../assets/images/macbook-base-3.svg'

const productSlides = [
    {
        key: 'slide1',
        cardClass: 'products__card--dark',
        baseImage: macbookBase1,
    },
    {
        key: 'slide2',
        cardClass: 'products__card--light',
        baseImage: macbookBase2,
    },
    {
        key: 'slide3',
        cardClass: 'products__card--light',
        baseImage: macbookBase3,
    },
]

const currentSlide = ref(0)
const totalSlides = productSlides.length

const trackStyle = computed(() => ({
    transform: `translateX(-${currentSlide.value * 100}%)`,
}))

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % totalSlides
}

const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides
}
</script>

<style scoped src="../styles/components/ProductsSection.css"></style>
