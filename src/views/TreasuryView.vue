<template>
    <div class="treasury-page">
        <Navbar />

        <main>
            <!-- Hero Section -->
            <section class="treasury-hero">
                <div class="treasury-hero__pattern" aria-hidden="true"></div>
                <div class="treasury-hero__content">
                    <h1 v-reveal="{ distance: 36 }" class="treasury-hero__title">
                        <span>{{ $t('treasury.hero.titleLight') }}</span>
                        <strong>{{ $t('treasury.hero.titleBold') }}</strong>
                    </h1>
                    <p v-reveal="{ delay: 80, distance: 28 }" class="treasury-hero__subtitle">
                        {{ $t('treasury.hero.subtitle') }}
                    </p>
                    <a v-reveal="{ delay: 140, distance: 24 }" :href="customerBaseUrl" target="_blank" rel="noopener noreferrer" class="treasury-cta">
                        <span>{{ $t('treasury.cta.tryForFree') }}</span>
                        <span class="treasury-cta__icon" aria-hidden="true">
                            <img :src="arrowIcon" alt="" />
                        </span>
                    </a>
                    <div v-reveal="{ delay: 200, distance: 56, scale: 0.98 }" class="treasury-hero__visual">
                        <img :src="heroBgImage" alt="" class="treasury-hero__visual-bg" aria-hidden="true" />
                        <!-- <img :src="heroCardImage" alt="" class="treasury-hero__visual-card" aria-hidden="true" /> -->
                        <img :src="heroDeviceImage" :alt="$t('treasury.hero.deviceAlt')" class="treasury-hero__visual-device" />
                    </div>
                </div>
            </section>

            <!-- Key Challenges Section -->
            <section class="treasury-challenges">
                <div class="treasury-challenges__content">
                    <div v-reveal class="treasury-section__header">
                        <h2 class="treasury-heading treasury-heading--white">{{ $t('treasury.challenges.title') }}</h2>
                        <p class="treasury-section__subtitle treasury-section__subtitle--white">{{ $t('treasury.challenges.subtitle') }}</p>
                    </div>
                    <div class="treasury-challenges__grid">
                        <article v-for="(challenge, index) in challenges" :key="challenge.key"
                            v-reveal="{ delay: index * 60, distance: 28 }"
                            class="treasury-challenge-card">
                            <img :src="challenge.icon" alt="" class="treasury-challenge-card__icon" aria-hidden="true" loading="lazy" decoding="async" />
                            <h3>{{ $t(challenge.titleKey) }}</h3>
                            <p>{{ $t(challenge.textKey) }}</p>
                        </article>
                    </div>
                </div>
            </section>

            <!-- YASBe Solution Section (Accordion) -->
            <section class="treasury-solution">
                <div class="treasury-section__inner">
                    <h2 v-reveal class="treasury-heading">{{ $t('treasury.solution.title') }}</h2>
                    <div class="treasury-solution__accordion">
                        <article v-for="(item, index) in solutionItems" :key="item.number"
                            v-reveal="{ delay: index * 60, distance: 24 }"
                            class="treasury-accordion-item"
                            :class="{ 'treasury-accordion-item--active': activeAccordion === index }"
                            role="button"
                            tabindex="0"
                            :aria-expanded="activeAccordion === index"
                            @click="toggleAccordion(index)"
                            @keydown.enter.prevent="toggleAccordion(index)"
                            @keydown.space.prevent="toggleAccordion(index)">
                            <div class="treasury-accordion-item__header">
                                <span class="treasury-accordion-item__number">{{ item.number }}</span>
                                <h3>{{ $t(item.titleKey) }}</h3>
                                <span class="treasury-accordion-item__arrow" aria-hidden="true">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                            <div class="treasury-accordion-item__content">
                                <div class="treasury-accordion-item__content-inner">
                                    <p class="treasury-accordion-item__intro">{{ $t(item.introKey) }}</p>
                                    <ul class="treasury-accordion-item__bullets">
                                        <li v-for="bullet in item.bullets" :key="bullet">{{ $t(bullet) }}</li>
                                    </ul>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <!-- Stablecoin Checkout Benefits Section -->
            <section class="treasury-benefits">
                <div class="treasury-section__inner">
                    <h2 v-reveal class="treasury-heading">{{ $t('treasury.benefits.title') }}</h2>
                    <div class="treasury-benefits__grid">
                        <article v-for="(benefit, index) in benefits" :key="benefit.key"
                            v-reveal="{ delay: index * 60, distance: 32 }"
                            class="treasury-benefit-card">
                            <img :src="benefit.icon" alt="" class="treasury-benefit-card__icon" aria-hidden="true" loading="lazy" decoding="async" />
                            <h3>{{ $t(benefit.titleKey) }}</h3>
                            <p>{{ $t(benefit.textKey) }}</p>
                        </article>
                    </div>
                </div>
            </section>

            <!-- From Goal to Outcome Section -->
            <section class="treasury-goals">
                <div class="treasury-section__inner">
                    <h2 v-reveal class="treasury-heading">{{ $t('treasury.goals.title') }}</h2>
                    <div v-reveal="{ delay: 80 }" class="treasury-goals__comparison">
                        <article class="treasury-goals-card treasury-goals-card--light">
                            <h3>{{ $t('treasury.goals.goalColumn') }}</h3>
                            <ul class="treasury-goals__list">
                                <li v-for="row in goalRows" :key="row.goalKey">
                                    <span class="treasury-goals__check" aria-hidden="true"></span>
                                    <span>{{ $t(row.goalKey) }}</span>
                                </li>
                            </ul>
                        </article>
                        <div class="treasury-goals__connector" aria-hidden="true">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="32" cy="32" r="32" fill="white"/>
                                <circle cx="32" cy="32" r="28" fill="#FFCA00"/>
                                <path d="M30.8806 40.3828L33.1194 42.6216L43.7388 32.0022L33.1194 21.3828L30.8806 23.6216L37.6778 30.4189H22.5V33.5856H37.6778L30.8806 40.3828Z" fill="#1D1D1F"/>
                            </svg>
                        </div>
                        <article class="treasury-goals-card treasury-goals-card--dark">
                            <h3>{{ $t('treasury.goals.deliversColumn') }}</h3>
                            <ul class="treasury-goals__list">
                                <li v-for="row in goalRows" :key="row.deliverKey">
                                    <span class="treasury-goals__check" aria-hidden="true"></span>
                                    <span>{{ $t(row.deliverKey) }}</span>
                                </li>
                            </ul>
                        </article>
                    </div>
                </div>
            </section>

            <!-- Use Cases Section -->
            <section class="treasury-cases">
                <div class="treasury-section__inner">
                    <div v-reveal class="treasury-cases__header">
                        <h2 class="treasury-heading">{{ $t('treasury.cases.title') }}</h2>
                        <p class="treasury-section__subtitle">{{ $t('treasury.cases.subtitle') }}</p>
                    </div>
                    <div class="treasury-cases__list">
                        <article v-for="(item, index) in useCases" :key="item.key"
                            v-reveal="{ delay: index * 80, distance: 28 }"
                            class="treasury-case-row">
                            <h3>{{ $t(item.titleKey) }}</h3>
                            <p>{{ $t(item.textKey) }}</p>
                        </article>
                    </div>
                </div>
            </section>
        </main>

        <Footer />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import arrowIcon from '../assets/images/stablecoin-icon-arrow.png?no-inline'
import heroBgImage from '../assets/images/treasury/treasury-hero-bg.png'
import heroCardImage from '../assets/images/treasury/treasury-hero-card.png'
import heroDeviceImage from '../assets/images/treasury/treasury-hero-device.png'

const activeAccordion = ref(0)

const toggleAccordion = (index) => {
  activeAccordion.value = activeAccordion.value === index ? -1 : index
}

// Simple inline SVG icons as data URIs
const createIcon = (name) => {
    const icons = {
        fragmentation: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 42C39.3137 42 42 39.3137 42 36C42 32.6863 39.3137 30 36 30C32.6863 30 30 32.6863 30 36C30 39.3137 32.6863 42 36 42Z" stroke="#1D1D1F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="#1D1D1F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 42V18C12 22.7739 13.8964 27.3523 17.2721 30.7279C20.6477 34.1036 25.2261 36 30 36" stroke="#1D1D1F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        payment: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#1D1D1F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 12V24L32 28" stroke="#1D1D1F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        reconciliation: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.6875 26.4844C29.3062 26.4844 27.375 28.4156 27.375 30.7969C27.375 33.1781 29.3062 35.1094 31.6875 35.1094C34.0688 35.1094 36 33.1781 36 30.7969C36 28.4156 34.0688 26.4844 31.6875 26.4844ZM31.6875 32.3906C30.8062 32.3906 30.0938 31.6781 30.0938 30.7969C30.0938 29.9156 30.8062 29.2031 31.6875 29.2031C32.5688 29.2031 33.2812 29.9156 33.2812 30.7969C33.2812 31.6781 32.5688 32.3906 31.6875 32.3906ZM41.25 7.875H31.3125C31.3125 6.42656 30.1359 5.25 28.6875 5.25H24.9375C23.4891 5.25 22.3125 6.42656 22.3125 7.875H12.375C11.5453 7.875 10.875 8.54531 10.875 9.375V18.75H6.75C5.92031 18.75 5.25 19.4203 5.25 20.25V41.25C5.25 42.0797 5.92031 42.75 6.75 42.75H22.5C23.3297 42.75 24 42.0797 24 41.25V40.5H41.25C42.0797 40.5 42.75 39.8297 42.75 39V9.375C42.75 8.54531 42.0797 7.875 41.25 7.875ZM21.9375 10.875H25.3125V8.25H28.3125V10.875H31.6875V13.125H21.9375V10.875ZM21 39.75H8.25V28.875H21V39.75ZM21 25.875H8.25V21.75H21V25.875ZM39.375 37.125H24V20.25C24 19.4203 23.3297 18.75 22.5 18.75H14.25V11.25H18.9375V16.125H34.6875V11.25H39.375V37.125ZM33 19.125V23.625C33 23.8312 33.1688 24 33.375 24H35.625C35.8312 24 36 23.8312 36 23.625V19.125C36 18.9187 35.8312 18.75 35.625 18.75H33.375C33.1688 18.75 33 18.9187 33 19.125ZM27.75 24H30C30.2062 24 30.375 23.8312 30.375 23.625V21C30.375 20.7937 30.2062 20.625 30 20.625H27.75C27.5438 20.625 27.375 20.7937 27.375 21V23.625C27.375 23.8312 27.5438 24 27.75 24Z" fill="#1D1D1F"/></svg>`,
        access: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M38 22H10C7.79086 22 6 23.7909 6 26V40C6 42.2091 7.79086 44 10 44H38C40.2091 44 42 42.2091 42 40V26C42 23.7909 40.2091 22 38 22Z" stroke="#1D1D1F" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 22V14C14 11.3478 15.0536 8.8043 16.9289 6.92893C18.8043 5.05357 21.3478 4 24 4C26.6522 4 29.1957 5.05357 31.0711 6.92893C32.9464 8.8043 34 11.3478 34 14V22" stroke="#1D1D1F" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        offramp: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M38 14V8C38 7.46957 37.7893 6.96086 37.4142 6.58579C37.0391 6.21071 36.5304 6 36 6H10C8.93913 6 7.92172 6.42143 7.17157 7.17157C6.42143 7.92172 6 8.93913 6 10C6 11.0609 6.42143 12.0783 7.17157 12.8284C7.92172 13.5786 8.93913 14 10 14H40C40.5304 14 41.0391 14.2107 41.4142 14.5858C41.7893 14.9609 42 15.4696 42 16V24M42 24H36C34.9391 24 33.9217 24.4214 33.1716 25.1716C32.4214 25.9217 32 26.9391 32 28C32 29.0609 32.4214 30.0783 33.1716 30.8284C33.9217 31.5786 34.9391 32 36 32H42C42.5304 32 43.0391 31.7893 43.4142 31.4142C43.7893 31.0391 44 30.5304 44 30V26C44 25.4696 43.7893 24.9609 43.4142 24.5858C43.0391 24.2107 42.5304 24 42 24Z" stroke="#1D1D1F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10V38C6 39.0609 6.42143 40.0783 7.17157 40.8284C7.92172 41.5786 8.93913 42 10 42H40C40.5304 42 41.0391 41.7893 41.4142 41.4142C41.7893 41.0391 42 40.5304 42 40V32" stroke="#1D1D1F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        security: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 26.0009C40 36.0009 33 41.0009 24.68 43.9009C24.2443 44.0485 23.7711 44.0415 23.34 43.8809C15 41.0009 8 36.0009 8 26.0009V12.0009C8 11.4705 8.21071 10.9618 8.58579 10.5867C8.96086 10.2116 9.46957 10.0009 10 10.0009C14 10.0009 19 7.6009 22.48 4.5609C22.9037 4.1989 23.4427 4 24 4C24.5573 4 25.0963 4.1989 25.52 4.5609C29.02 7.6209 34 10.0009 38 10.0009C38.5304 10.0009 39.0391 10.2116 39.4142 10.5867C39.7893 10.9618 40 11.4705 40 12.0009V26.0009Z" stroke="#1D1D1D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        globe: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#1D1D1D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 24C16 16.5535 18.8645 9.39231 24 4C29.1355 9.39231 32 16.5535 32 24C32 31.4465 29.1355 38.6077 24 44C18.8645 38.6077 16 31.4465 16 24Z" stroke="#1D1D1D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 24H44" stroke="#1D1D1D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        stable: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#1D1D1D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 24L22 28L30 20" stroke="#1D1D1D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        logistics: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="10" width="32" height="20" rx="4" stroke="#1D1D1F" stroke-width="2.5" opacity="0.3"/><circle cx="12" cy="30" r="4" stroke="#1D1D1F" stroke-width="2.5" opacity="0.5"/><circle cx="28" cy="30" r="4" stroke="#1D1D1F" stroke-width="2.5" opacity="0.5"/></svg>`,
        saas: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="32" height="24" rx="4" stroke="#1D1D1F" stroke-width="2.5" opacity="0.3"/><rect x="10" y="10" width="20" height="12" rx="2" stroke="#1D1D1F" stroke-width="2" opacity="0.5"/><path d="M14 34h12" stroke="#1D1D1F" stroke-width="2.5" stroke-linecap="round" opacity="0.3"/><path d="M20 28v6" stroke="#1D1D1F" stroke-width="2.5" stroke-linecap="round" opacity="0.3"/></svg>`,
        consulting: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 36H6V16L20 4L34 16v20H26" stroke="#1D1D1F" stroke-width="2.5" opacity="0.3"/><path d="M16 28h8M16 22h8" stroke="#1D1D1F" stroke-width="2" stroke-linecap="round" opacity="0.5"/><rect x="20" y="26" width="8" height="10" rx="2" stroke="#1D1D1F" stroke-width="2.5" opacity="0.5"/></svg>`,
    }
    return 'data:image/svg+xml,' + encodeURIComponent(icons[name] || icons.fragmentation)
}

const challenges = [
    { key: 'fragmentation', icon: createIcon('fragmentation'), titleKey: 'treasury.challenges.items.fragmentation.title', textKey: 'treasury.challenges.items.fragmentation.text' },
    { key: 'payment', icon: createIcon('payment'), titleKey: 'treasury.challenges.items.delays.title', textKey: 'treasury.challenges.items.delays.text' },
    { key: 'reconciliation', icon: createIcon('reconciliation'), titleKey: 'treasury.challenges.items.reconciliation.title', textKey: 'treasury.challenges.items.reconciliation.text' },
    { key: 'access', icon: createIcon('access'), titleKey: 'treasury.challenges.items.access.title', textKey: 'treasury.challenges.items.access.text' },
]

const solutionItems = [
    {
        number: '01',
        titleKey: 'treasury.solution.items.virtualAccounts.title',
        introKey: 'treasury.solution.items.virtualAccounts.intro',
        bullets: [
            'treasury.solution.items.virtualAccounts.bullet1',
            'treasury.solution.items.virtualAccounts.bullet2',
            'treasury.solution.items.virtualAccounts.bullet3',
            'treasury.solution.items.virtualAccounts.bullet4',
            'treasury.solution.items.virtualAccounts.bullet5',
        ],
    },
    {
        number: '02',
        titleKey: 'treasury.solution.items.collectionPayout.title',
        introKey: 'treasury.solution.items.collectionPayout.intro',
        bullets: [
            'treasury.solution.items.collectionPayout.bullet1',
            'treasury.solution.items.collectionPayout.bullet2',
            'treasury.solution.items.collectionPayout.bullet3',
            'treasury.solution.items.collectionPayout.bullet4',
        ],
    },
    {
        number: '03',
        titleKey: 'treasury.solution.items.stablecoin.title',
        introKey: 'treasury.solution.items.stablecoin.intro',
        bullets: [
            'treasury.solution.items.stablecoin.bullet1',
            'treasury.solution.items.stablecoin.bullet2',
            'treasury.solution.items.stablecoin.bullet3',
            'treasury.solution.items.stablecoin.bullet4',
        ],
    },
]

const benefits = [
    { key: 'offramp', icon: createIcon('offramp'), titleKey: 'treasury.benefits.items.offramp.title', textKey: 'treasury.benefits.items.offramp.text' },
    { key: 'security', icon: createIcon('security'), titleKey: 'treasury.benefits.items.security.title', textKey: 'treasury.benefits.items.security.text' },
    { key: 'globe', icon: createIcon('globe'), titleKey: 'treasury.benefits.items.globe.title', textKey: 'treasury.benefits.items.globe.text' },
    { key: 'stable', icon: createIcon('stable'), titleKey: 'treasury.benefits.items.stable.title', textKey: 'treasury.benefits.items.stable.text' },
]

const goalRows = [
    { goalKey: 'treasury.goals.rows.centralizedLiquidity', deliverKey: 'treasury.goals.delivers.centralizedLiquidity' },
    { goalKey: 'treasury.goals.rows.realTimeVisibility', deliverKey: 'treasury.goals.delivers.realTimeVisibility' },
    { goalKey: 'treasury.goals.rows.workingCapital', deliverKey: 'treasury.goals.delivers.workingCapital' },
    { goalKey: 'treasury.goals.rows.operationalEfficiency', deliverKey: 'treasury.goals.delivers.operationalEfficiency' },
    { goalKey: 'treasury.goals.rows.expansion', deliverKey: 'treasury.goals.delivers.expansion' },
]

const useCases = [
    { key: 'logistics', icon: createIcon('logistics'), titleKey: 'treasury.cases.items.logistics.title', textKey: 'treasury.cases.items.logistics.text' },
    { key: 'saas', icon: createIcon('saas'), titleKey: 'treasury.cases.items.saas.title', textKey: 'treasury.cases.items.saas.text' },
    { key: 'consulting', icon: createIcon('consulting'), titleKey: 'treasury.cases.items.consulting.title', textKey: 'treasury.cases.items.consulting.text' },
]

const customerBaseUrl = import.meta.env.VITE_CUSTOMER_BASE_URL ?? 'https://beeznis.com/'
</script>

<style scoped src="../styles/views/TreasuryView.css"></style>
