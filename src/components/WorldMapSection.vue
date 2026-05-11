<template>
    <section ref="sectionRef" class="world-map">
        <div class="world-map__container">
            <div class="world-map__content">
                <h2 v-reveal="{ origin: 'left', distance: 40 }" class="world-map__title" v-html="$t('worldMap.title')">
                </h2>
                <div v-reveal="{ delay: 100, origin: 'right', distance: 32 }" class="world-map__right">
                    <p class="world-map__description">{{ $t('worldMap.description') }}</p>
                    <button type="button" class="world-map__cta">
                        <span>{{ $t('worldMap.cta') }}</span>
                        <div class="world-map__cta-icon">
                            <img src="../assets/images/icon-arrow-right-white.svg" alt="Arrow" />
                        </div>
                    </button>
                </div>
            </div>
            <div v-reveal="{ distance: 44 }" class="world-map__visual">
                <video
                    v-if="shouldLoadVideo"
                    ref="videoRef"
                    muted
                    loop
                    playsinline
                    preload="metadata"
                    :poster="heroPoster"
                    class="hero-video"
                >
                    <source src="../assets/images/hero-bg2.webm" type="video/webm" />
                </video>
                <img v-else :src="heroPoster" alt="" class="world-map__poster" />
            </div>
        </div>
    </section>
</template>
<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import heroPoster from '../assets/images/hero-bg.png'

const sectionRef = ref(null)
const videoRef = ref(null)
const shouldLoadVideo = ref(false)

let observer = null

const prefersReducedPlayback = () => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return false
    }

    return (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(prefers-reduced-data: reduce)').matches
    )
}

const isSectionNearViewport = () => {
    const section = sectionRef.value

    if (!section) {
        return false
    }

    const rect = section.getBoundingClientRect()
    return rect.bottom >= -180 && rect.top <= window.innerHeight + 180
}

const playVideo = () => {
    if (document.hidden || prefersReducedPlayback()) {
        return
    }

    videoRef.value?.play().catch(() => {})
}

const pauseVideo = () => {
    videoRef.value?.pause()
}

const loadAndPlayVideo = async () => {
    if (prefersReducedPlayback()) {
        return
    }

    if (!shouldLoadVideo.value) {
        shouldLoadVideo.value = true
        await nextTick()
    }

    playVideo()
}

const handleVisibilityChange = () => {
    if (document.hidden) {
        pauseVideo()
        return
    }

    if (shouldLoadVideo.value && isSectionNearViewport()) {
        playVideo()
    }
}

onMounted(() => {
    if (prefersReducedPlayback()) {
        return
    }

    observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                loadAndPlayVideo()
                return
            }

            pauseVideo()
        },
        {
            rootMargin: '180px 0px',
            threshold: 0.1,
        },
    )

    if (sectionRef.value) {
        observer.observe(sectionRef.value)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
})

onBeforeUnmount(() => {
    observer?.disconnect()
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    pauseVideo()
})
</script>

<style scoped src="../styles/components/WorldMapSection.css"></style>
