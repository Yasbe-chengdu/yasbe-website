<template>
    <section class="world-map">
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
                <video autoplay muted loop playsinline preload="auto" :poster="heroPoster" class="hero-video">
                    <source src="../assets/images/hero-bg2.webm" type="video/webm" />
                </video>
            </div>
        </div>
    </section>
</template>
<script setup>
import heroPoster from '../assets/images/hero-bg.png'
</script>

<style scoped src="../styles/components/WorldMapSection.css"></style>
