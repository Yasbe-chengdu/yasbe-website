<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import heroPoster from '../assets/images/hero-bg.png'

const heroRef = ref(null)
const heroVideoRef = ref(null)
const heroMinHeight = ref(null)

let resizeObserver
let visibilityObserver
let stopPlaybackUnlock
let rafId = 0
let settlePasses = 0

const pauseHeroVideo = () => {
    heroVideoRef.value?.pause()
}

const playHeroVideo = () => {
    if (document.hidden) {
        return
    }

    heroVideoRef.value?.play().catch(() => {})
}

const handleVisibilityChange = () => {
    if (document.hidden) {
        pauseHeroVideo()
        return
    }

    playHeroVideo()
}

const registerPlaybackUnlock = () => {
    const replay = () => {
        playHeroVideo()
    }

    document.addEventListener('WeixinJSBridgeReady', replay, false)
    document.addEventListener('touchstart', replay, { once: true, passive: true })
    window.addEventListener('pageshow', replay)

    return () => {
        document.removeEventListener('WeixinJSBridgeReady', replay, false)
        document.removeEventListener('touchstart', replay)
        window.removeEventListener('pageshow', replay)
    }
}

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
    visibilityObserver = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                playHeroVideo()
                return
            }

            pauseHeroVideo()
        },
        {
            rootMargin: '80px 0px',
            threshold: 0.05,
        },
    )

    if (heroRef.value) {
        resizeObserver.observe(heroRef.value)
        visibilityObserver.observe(heroRef.value)
    }

    if (heroVideoRef.value) {
        resizeObserver.observe(heroVideoRef.value)
    }

    window.addEventListener('resize', scheduleHeroHeightUpdate)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    stopPlaybackUnlock = registerPlaybackUnlock()
    scheduleHeroHeightUpdate()
    playHeroVideo()
})

onBeforeUnmount(() => {
    if (rafId) {
        window.cancelAnimationFrame(rafId)
    }

    resizeObserver?.disconnect()
    visibilityObserver?.disconnect()
    stopPlaybackUnlock?.()
    window.removeEventListener('resize', scheduleHeroHeightUpdate)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
    <section ref="heroRef" class="hero" :style="heroMinHeight ? { minHeight: heroMinHeight } : null">
        <div class="hero__container">
            <div class="hero__visual hero__visual--intro">
                <div class="hero-container">
                    <video
                        ref="heroVideoRef"
                        autoplay
                        muted
                        loop
                        playsinline
                        webkit-playsinline
                        x5-playsinline
                        x5-video-player-type="h5"
                        x5-video-player-fullscreen="false"
                        preload="metadata"
                        :poster="heroPoster"
                        class="hero-video"
                        @loadedmetadata="scheduleHeroHeightUpdate"
                        @canplay="playHeroVideo"
                    >
                        <source src="../assets/images/hero-video.webm" type="video/webm" />
                        <source src="../assets/images/hero-video.mp4" type="video/mp4" />
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
                <a href="https://customer.beeznis.com/" target="_blank" rel="noopener noreferrer" class="hero__cta hero__cta--intro">
                    <span>{{ $t('hero.cta') }}</span>
                    <div class="hero__cta-icon">
                        <img src="../assets/images/icon-arrow-right-white.svg" alt="Arrow" />
                    </div>
                </a>
            </div>
        </div>
    </section>
</template>

<style scoped src="../styles/components/HeroSection.css"></style>
