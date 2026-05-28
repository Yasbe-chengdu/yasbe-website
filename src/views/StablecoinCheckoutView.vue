<template>
    <div class="stablecoin-page">
        <Navbar />

        <main>
            <section class="stablecoin-hero">
                <div class="stablecoin-hero__pattern" aria-hidden="true"></div>
                <div class="stablecoin-hero__content">
                    <h1 v-reveal="{ distance: 36 }" class="stablecoin-hero__title">
                        <span>{{ $t('stablecoinCheckout.hero.title') }}</span>
                        <strong>{{ $t('stablecoinCheckout.hero.titleStrong') }}</strong>
                    </h1>
                    <p v-reveal="{ delay: 80, distance: 28 }" class="stablecoin-hero__subtitle">
                        {{ $t('stablecoinCheckout.hero.subtitle') }}
                    </p>
                    <a v-reveal="{ delay: 140, distance: 24 }" :href="customerBaseUrl" target="_blank" rel="noopener noreferrer" class="stablecoin-cta">
                        <span>{{ $t('stablecoinCheckout.cta.tryForFree') }}</span>
                        <span class="stablecoin-cta__icon" aria-hidden="true">
                            <img :src="arrowIcon" alt="" />
                        </span>
                    </a>
                    <div class="stablecoin-hero__device-anchor">
                        <img v-reveal="{ delay: 220, distance: 56, scale: 0.98 }" :src="heroTerminalImage"
                            :alt="$t('stablecoinCheckout.media.heroAlt')" class="stablecoin-hero__device"
                            fetchpriority="high" decoding="async" />
                    </div>
                </div>
            </section>

            <section class="stablecoin-legacy">
                <div class="stablecoin-legacy__content">
                    <div class="stablecoin-legacy__copy">
                        <article v-reveal="{ origin: 'left', distance: 36 }" class="stablecoin-legacy__item">
                            <img :src="legacyBankingIcon" alt="" class="stablecoin-icon" aria-hidden="true"
                                loading="lazy" decoding="async" />
                            <h2>{{ $t('stablecoinCheckout.legacy.banking.title') }}</h2>
                            <p>
                                {{ $t('stablecoinCheckout.legacy.banking.text') }}
                            </p>
                        </article>
                        <article v-reveal="{ delay: 100, origin: 'left', distance: 36 }" class="stablecoin-legacy__item">
                            <img :src="legacyValueIcon" alt="" class="stablecoin-icon" aria-hidden="true"
                                loading="lazy" decoding="async" />
                            <h2>{{ $t('stablecoinCheckout.legacy.stableValue.title') }}</h2>
                            <p>
                                {{ $t('stablecoinCheckout.legacy.stableValue.text') }}
                            </p>
                        </article>
                    </div>
                    <img v-reveal="{ delay: 120, origin: 'right', distance: 40 }" :src="paymentPhoto"
                        :alt="$t('stablecoinCheckout.media.paymentAlt')" class="stablecoin-legacy__image"
                        loading="lazy" decoding="async" />
                </div>
            </section>

            <section id="stablecoin-benefits" class="stablecoin-section stablecoin-section--white">
                <div class="stablecoin-section__inner">
                    <h2 v-reveal class="stablecoin-heading">
                        {{ $t('stablecoinCheckout.impact.titleLine1') }}<br />{{
                            $t('stablecoinCheckout.impact.titleLine2') }}
                    </h2>
                    <div class="stablecoin-impact">
                        <div v-reveal="{ delay: 60, origin: 'left', distance: 36 }"
                            class="stablecoin-impact__card stablecoin-impact__card--light">
                            {{ $t('stablecoinCheckout.impact.business') }}
                        </div>
                        <div v-reveal="{ delay: 120, origin: 'right', distance: 36 }"
                            class="stablecoin-impact__card stablecoin-impact__card--dark">
                            {{ $t('stablecoinCheckout.impact.buyers') }}
                        </div>
                    </div>
                </div>
            </section>

            <section class="stablecoin-section stablecoin-section--gray">
                <div class="stablecoin-section__inner">
                    <div v-reveal class="stablecoin-section__header">
                        <h2 class="stablecoin-heading">{{ $t('stablecoinCheckout.global.title') }}</h2>
                        <p>
                            {{ $t('stablecoinCheckout.global.subtitle') }}
                        </p>
                    </div>
                    <div class="stablecoin-feature-grid stablecoin-feature-grid--three">
                        <article v-for="feature in globalFeatures" :key="feature.titleKey"
                            v-reveal="{ delay: feature.delay, distance: 32 }"
                            class="stablecoin-feature-card stablecoin-feature-card--tall">
                            <img :src="feature.icon" alt="" class="stablecoin-feature-card__icon" aria-hidden="true"
                                loading="lazy" decoding="async" />
                            <h3>{{ $t(feature.titleKey) }}</h3>
                        </article>
                    </div>
                </div>
            </section>

            <section class="stablecoin-section stablecoin-section--white">
                <div class="stablecoin-section__inner">
                    <h2 v-reveal class="stablecoin-heading">{{ $t('stablecoinCheckout.solution.title') }}</h2>
                    <div class="stablecoin-solution">
                        <article v-reveal="{ delay: 60, origin: 'left', distance: 36 }"
                            class="stablecoin-solution__panel stablecoin-solution__panel--light">
                            <h3>{{ $t('stablecoinCheckout.solution.legacyTitle') }}</h3>
                            <p>
                                {{ $t('stablecoinCheckout.solution.legacyText') }}
                            </p>
                        </article>
                        <div class="stablecoin-solution__arrow" aria-hidden="true">
                            <img :src="solutionArrowIcon" alt="" class="stablecoin-solution__arrow-icon" />
                        </div>
                        <article v-reveal="{ delay: 120, origin: 'right', distance: 36 }"
                            class="stablecoin-solution__panel stablecoin-solution__panel--dark">
                            <h3>{{ $t('stablecoinCheckout.solution.yasbeTitle') }}</h3>
                            <p>
                                {{ $t('stablecoinCheckout.solution.yasbeText') }}
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="stablecoin-section stablecoin-section--gray">
                <div class="stablecoin-section__inner">
                    <div v-reveal class="stablecoin-why__top">
                        <h2 class="stablecoin-heading">
                            {{ $t('stablecoinCheckout.why.titleLine1') }}<br />{{
                                $t('stablecoinCheckout.why.titleLine2') }}
                        </h2>
                        <a href="https://customer.beeznis.com/" target="_blank" rel="noopener noreferrer" class="stablecoin-cta stablecoin-cta--compact">
                            <span>{{ $t('stablecoinCheckout.cta.findOutMore') }}</span>
                            <span class="stablecoin-cta__icon" aria-hidden="true">
                                <img :src="arrowIcon" alt="" />
                            </span>
                        </a>
                    </div>
                    <div class="stablecoin-feature-grid stablecoin-feature-grid--two">
                        <article v-for="item in whyFeatures" :key="item.titleKey"
                            v-reveal="{ delay: item.delay, distance: 32 }" class="stablecoin-feature-card">
                            <img :src="item.icon" alt="" class="stablecoin-feature-card__icon" aria-hidden="true"
                                loading="lazy" decoding="async" />
                            <div>
                                <h3>{{ $t(item.titleKey) }}</h3>
                                <p>{{ $t(item.textKey) }}</p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>

        <Footer />
    </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import heroTerminalImage from '../assets/images/stablecoin-hero-terminal.png'
import paymentPhoto from '../assets/images/stablecoin-payment-photo.png'
import legacyBankingIcon from '../assets/images/stablecoin-icon-legacy-banking.png?no-inline'
import legacyValueIcon from '../assets/images/stablecoin-icon-legacy-value.png?no-inline'
import globalSupportIcon from '../assets/images/stablecoin-icon-global-support.png?no-inline'
import globalPricingIcon from '../assets/images/stablecoin-icon-global-pricing.png?no-inline'
import globalEcosystemIcon from '../assets/images/stablecoin-icon-global-ecosystem.png?no-inline'
import offrampIcon from '../assets/images/stablecoin-icon-offramp.png?no-inline'
import secureIcon from '../assets/images/stablecoin-icon-secure.png?no-inline'
import bordersIcon from '../assets/images/stablecoin-icon-borders.png?no-inline'
import confidenceIcon from '../assets/images/stablecoin-icon-confidence.png?no-inline'
import arrowIcon from '../assets/images/stablecoin-icon-arrow.png?no-inline'
import solutionArrowIcon from '../assets/images/stablecoin-icon-solution-arrow.png?no-inline'

const customerBaseUrl = import.meta.env.VITE_CUSTOMER_BASE_URL ?? 'https://customer.yasbe.com/'

const globalFeatures = [
    {
        icon: globalSupportIcon,
        titleKey: 'stablecoinCheckout.global.features.support',
        delay: 40,
    },
    {
        icon: globalPricingIcon,
        titleKey: 'stablecoinCheckout.global.features.pricing',
        delay: 100,
    },
    {
        icon: globalEcosystemIcon,
        titleKey: 'stablecoinCheckout.global.features.ecosystem',
        delay: 160,
    },
]

const whyFeatures = [
    {
        icon: offrampIcon,
        titleKey: 'stablecoinCheckout.why.features.offRamps.title',
        textKey: 'stablecoinCheckout.why.features.offRamps.text',
        delay: 40,
    },
    {
        icon: secureIcon,
        titleKey: 'stablecoinCheckout.why.features.secure.title',
        textKey: 'stablecoinCheckout.why.features.secure.text',
        delay: 100,
    },
    {
        icon: bordersIcon,
        titleKey: 'stablecoinCheckout.why.features.borders.title',
        textKey: 'stablecoinCheckout.why.features.borders.text',
        delay: 160,
    },
    {
        icon: confidenceIcon,
        titleKey: 'stablecoinCheckout.why.features.confidence.title',
        textKey: 'stablecoinCheckout.why.features.confidence.text',
        delay: 220,
    },
]
</script>

<style scoped src="../styles/views/StablecoinCheckoutView.css"></style>
