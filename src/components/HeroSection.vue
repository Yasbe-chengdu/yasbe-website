<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import heroPoster from '../assets/images/hero-bg.png'

const heroRef = ref(null)
const heroVideoRef = ref(null)
const heroMinHeight = ref(null)

let resizeObserver
let rafId = 0
let settlePasses = 0

const scheduleHeroHeightUpdate = (resetSettlePasses = true) => {
    if (resetSettlePasses) {
        settlePasses = 0
    }

    if (rafId) {
        return
    }

    rafId = window.requestAnimationFrame(updateHeroHeight)
}

const updateHeroHeight = () => {
    rafId = 0

    const hero = heroRef.value
    const video = heroVideoRef.value

    if (!hero || !video) {
        return
    }

    const heroRect = hero.getBoundingClientRect()
    const videoRect = video.getBoundingClientRect()
    const videoBottom = Math.ceil(videoRect.bottom - heroRect.top)

    if (videoBottom <= 0) {
        return
    }

    const currentMinHeight = Number.parseFloat(heroMinHeight.value) || 0

    if (Math.abs(videoBottom - currentMinHeight) <= 1) {
        settlePasses = 0
        return
    }

    heroMinHeight.value = `${videoBottom}px`

    if (settlePasses < 8) {
        settlePasses += 1
        scheduleHeroHeightUpdate(false)
    } else {
        settlePasses = 0
    }
}

onMounted(async () => {
    await nextTick()

    resizeObserver = new ResizeObserver(() => scheduleHeroHeightUpdate())

    if (heroRef.value) {
        resizeObserver.observe(heroRef.value)
    }

    if (heroVideoRef.value) {
        resizeObserver.observe(heroVideoRef.value)
    }

    window.addEventListener('resize', scheduleHeroHeightUpdate)
    scheduleHeroHeightUpdate()
})

onBeforeUnmount(() => {
    if (rafId) {
        window.cancelAnimationFrame(rafId)
    }

    resizeObserver?.disconnect()
    window.removeEventListener('resize', scheduleHeroHeightUpdate)
})
</script>

<template>
    <section ref="heroRef" class="hero" :style="heroMinHeight ? { minHeight: heroMinHeight } : null">
        <div class="hero__container">
            <div class="hero__visual hero__visual--intro">
                <div class="hero-container motion-float-slow">
                    <video
                        ref="heroVideoRef"
                        autoplay
                        muted
                        loop
                        playsinline
                        preload="auto"
                        :poster="heroPoster"
                        class="hero-video"
                        @loadedmetadata="scheduleHeroHeightUpdate"
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
