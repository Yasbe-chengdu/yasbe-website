<template>
    <section ref="sectionRef" class="world-map">
        <div class="world-map__container">
            <div class="world-map__content">
                <h2 v-reveal="{ origin: 'left', distance: 40 }" class="world-map__title" v-html="$t('worldMap.title')">
                </h2>
                <div v-reveal="{ delay: 100, origin: 'right', distance: 32 }" class="world-map__right">
                    <p class="world-map__description">{{ $t('worldMap.description') }}</p>
                    <a :href="customerBaseUrl" target="_blank" rel="noopener noreferrer" class="world-map__cta">
                        <span>{{ $t('worldMap.cta') }}</span>
                        <div class="world-map__cta-icon">
                            <img src="../assets/images/icon-arrow-right-white.svg" alt="Arrow" />
                        </div>
                    </a>
                </div>
            </div>
            <div v-reveal="{ distance: 44 }" class="world-map__visual">
                <video
                    v-if="shouldLoadVideo"
                    ref="videoRef"
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
                    @canplay="replayVideo"
                >
                    <source src="../assets/images/hero-bg2.webm" type="video/webm" />
                    <source src="../assets/images/hero-bg2.mp4" type="video/mp4" />
                </video>
                <img v-else :src="heroPoster" alt="" class="world-map__poster" />
            </div>
        </div>
    </section>
</template>
<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import heroPoster from '../assets/images/hero-bg.png'
import { registerViewportPlaybackReplay, registerWeixinBridgeReplay } from '../utils/wechatVideoPlayback'

const customerBaseUrl = import.meta.env.VITE_CUSTOMER_BASE_URL ?? 'https://customer.yasbe.com/'

const sectionRef = ref(null)
const videoRef = ref(null)
const shouldLoadVideo = ref(false)

let observer = null
let stopPlaybackUnlock = null
let stopWeixinBridgeReplay = null
let playbackRetryIds = []

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

    prepareVideo()?.play().catch(() => {})
}

const pauseVideo = () => {
    videoRef.value?.pause()
}

const prepareVideo = () => {
    const video = videoRef.value

    if (!video) {
        return null
    }

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    if (video.readyState === 0) {
        video.load()
    }

    return video
}

const replayVideo = () => {
    playVideo()
    playbackRetryIds.forEach((retryId) => window.clearTimeout(retryId))
    playbackRetryIds = [120, 600].map((delay) => window.setTimeout(playVideo, delay))
}

const loadAndPlayVideo = async () => {
    if (prefersReducedPlayback()) {
        return
    }

    if (!shouldLoadVideo.value) {
        shouldLoadVideo.value = true
        await nextTick()
    }

    replayVideo()
}

const handleVisibilityChange = () => {
    if (document.hidden) {
        pauseVideo()
        return
    }

    if (shouldLoadVideo.value && isSectionNearViewport()) {
        replayVideo()
    }
}

const registerPlaybackUnlock = () => {
    return registerViewportPlaybackReplay({
        replay: loadAndPlayVideo,
        canReplay: isSectionNearViewport,
    })
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
    stopWeixinBridgeReplay = registerWeixinBridgeReplay(() => {
        if (isSectionNearViewport()) {
            loadAndPlayVideo()
        }
    })
    stopPlaybackUnlock = registerPlaybackUnlock()
})

onBeforeUnmount(() => {
    observer?.disconnect()
    playbackRetryIds.forEach((retryId) => window.clearTimeout(retryId))
    stopPlaybackUnlock?.()
    stopWeixinBridgeReplay?.()
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    pauseVideo()
})
</script>

<style scoped src="../styles/components/WorldMapSection.css"></style>
