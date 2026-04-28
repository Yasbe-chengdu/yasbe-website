<script setup>
import heroPoster from '../assets/images/hero-bg.png'
</script>

<template>
    <section class="hero">
        <div class="hero__container">
            <div class="hero__visual hero__visual--intro">
                <div class="hero-container motion-float-slow">
                    <video
                        autoplay
                        muted
                        loop
                        playsinline
                        preload="auto"
                        :poster="heroPoster"
                        class="hero-video"
                    >
                        <source src="../assets/images/hero-video.webm" type="video/webm" />
                    </video>
                </div>
            </div>

            <div class="hero__content">
                <div class="hero__text">
                    <h1 class="hero__title">
                        <span class="hero__title-light hero__line hero__line--one">{{ $t('hero.titleLight') }}</span>
                        <span class="hero__title-bold hero__line hero__line--two">{{ $t('hero.titleBold') }}</span>
                    </h1>
                    <p class="hero__subtitle hero__copy">
                        {{ $t('hero.subtitle') }}
                    </p>
                </div>
                <button type="button" class="hero__cta hero__cta--intro">
                    <span>{{ $t('hero.cta') }}</span>
                    <div class="hero__cta-icon">
                        <img src="../assets/images/icon-arrow-right-white.svg" alt="Arrow" />
                    </div>
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped src="../styles/components/HeroSection.css"></style>
