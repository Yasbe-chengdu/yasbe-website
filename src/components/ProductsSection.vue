<template>
    <section class="products">
        <div class="products__container">
            <h2 v-reveal class="products__title">{{ $t('products.title') }}</h2>

            <div v-reveal="{ delay: 80, distance: 40 }" class="products__slider">
                <div class="products__track" :style="trackStyle">
                    <!-- Product 1: Global Payment -->
                    <div class="products__slide">
                        <div class="products__card products__card--dark">
                            <div class="products__content">
                                <h3 class="products__card-title">{{ $t('products.slide1.title') }}</h3>
                                <p class="products__card-text">{{ $t('products.slide1.text') }}</p>
                            </div>
                            <div class="products__device">
                                <div class="macbook motion-float-medium">
                                    <div class="macbook__lid">
                                        <div class="macbook__screen">
                                            <img src="../assets/images/dashboard.png" alt="Dashboard" />
                                        </div>
                                        <span class="macbook__label">Macbook Air</span>
                                    </div>
                                    <img src="../assets/images/macbook-base-1.svg" alt="" class="macbook__bottom" />
                                </div>
                                <div class="macbook__shadow"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 2: Traditional & Crypto -->
                    <div class="products__slide">
                        <div class="products__card products__card--light">
                            <div class="products__content">
                                <h3 class="products__card-title">{{ $t('products.slide2.title') }}</h3>
                                <p class="products__card-text">{{ $t('products.slide2.text') }}</p>
                            </div>
                            <div class="products__device">
                                <div class="macbook motion-float-medium">
                                    <div class="macbook__lid">
                                        <div class="macbook__screen">
                                            <img src="../assets/images/dashboard.png" alt="Dashboard" />
                                        </div>
                                        <span class="macbook__label">Macbook Air</span>
                                    </div>
                                    <img src="../assets/images/macbook-base-2.svg" alt="" class="macbook__bottom" />
                                </div>
                                <div class="macbook__shadow"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 3: Investment -->
                    <div class="products__slide">
                        <div class="products__card products__card--light">
                            <div class="products__content">
                                <h3 class="products__card-title">{{ $t('products.slide3.title') }}</h3>
                                <p class="products__card-text">{{ $t('products.slide3.text') }}</p>
                            </div>
                            <div class="products__device">
                                <div class="macbook motion-float-medium">
                                    <div class="macbook__lid">
                                        <div class="macbook__screen">
                                            <img src="../assets/images/dashboard.png" alt="Dashboard" />
                                        </div>
                                        <span class="macbook__label">Macbook Air</span>
                                    </div>
                                    <img src="../assets/images/macbook-base-3.svg" alt="" class="macbook__bottom" />
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

const currentSlide = ref(0)
const totalSlides = 3

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
