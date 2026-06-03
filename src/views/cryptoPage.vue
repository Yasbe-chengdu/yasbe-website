<template>
    <div class="treasury-page">
        <Navbar />

        <main>
            <!-- Hero Section -->
            <section class="treasury-hero">
                <div class="treasury-hero__pattern" aria-hidden="true"></div>
                <div class="treasury-hero__content">
                    <h1 v-reveal="{ distance: 36 }" class="treasury-hero__title">
                        <span>{{ $t('cryptoPage.hero.titleLight') }}</span>
                        <strong>{{ $t('cryptoPage.hero.titleBold') }}</strong>
                    </h1>
                    <p v-reveal="{ delay: 80, distance: 28 }" class="treasury-hero__subtitle">
                        {{ $t('cryptoPage.hero.subtitle') }}
                    </p>
                    <a v-reveal="{ delay: 140, distance: 24 }" :href="customerBaseUrl" target="_blank" rel="noopener noreferrer" class="treasury-cta">
                        <span>{{ $t('cryptoPage.cta.tryForFree') }}</span>
                        <span class="treasury-cta__icon" aria-hidden="true">
                            <img :src="arrowIcon" alt="" />
                        </span>
                    </a>
                    <div v-reveal="{ delay: 200, distance: 56, scale: 0.98 }" class="treasury-hero__visual">
                        <!-- <img :src="heroBgImage" alt="" class="treasury-hero__visual-bg" aria-hidden="true" /> -->
                        <!-- <img :src="heroCardImage" alt="" class="treasury-hero__visual-card" aria-hidden="true" /> -->
                        <img :src="heroDeviceImage" :alt="$t('cryptoPage.hero.deviceAlt')" class="treasury-hero__visual-device" />
                    </div>
                </div>
            </section>

            <!-- Key Challenges Section -->
            <section class="treasury-challenges">
                <div class="treasury-challenges__content">
                    <div v-reveal class="treasury-section__header">
                        <h2 class="treasury-heading treasury-heading--white">{{ $t('cryptoPage.challenges.title') }}</h2>
                        <p class="treasury-section__subtitle treasury-section__subtitle--white">{{ $t('cryptoPage.challenges.subtitle') }}</p>
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
                    <h2 v-reveal class="treasury-heading">{{ $t('cryptoPage.solution.title') }}</h2>
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
                                    <ul v-if="item.bullets.length" class="treasury-accordion-item__bullets">
                                        <li v-for="bullet in item.bullets" :key="bullet">{{ $t(bullet) }}</li>
                                    </ul>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>


            <!-- From Goal to Outcome Section -->
            <section class="treasury-goals">
                <div class="treasury-section__inner">
                    <h2 v-reveal class="treasury-heading">{{ $t('cryptoPage.goals.title') }}</h2>
                    <div v-reveal="{ delay: 80 }" class="treasury-goals__comparison">
                        <article class="treasury-goals-card treasury-goals-card--light">
                            <h3>{{ $t('cryptoPage.goals.goalColumn') }}</h3>
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
                            <h3>{{ $t('cryptoPage.goals.deliversColumn') }}</h3>
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

            <!-- Crypto Treasury Use Case Section -->
            <section class="crypto-usecase">
                <div class="treasury-section__inner">
                    <h2 v-reveal class="treasury-heading crypto-usecase__heading">{{ $t('cryptoPage.useCase.title') }}</h2>
                    <div v-reveal="{ delay: 80, distance: 24 }" class="crypto-usecase__flow">
                        <article class="crypto-usecase-card crypto-usecase-card--light">
                            <h3>{{ $t('cryptoPage.useCase.clientTitle') }}</h3>
                            <p>{{ $t('cryptoPage.useCase.clientText') }}</p>
                        </article>
                        <div class="crypto-usecase__connector" aria-hidden="true">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="32" cy="32" r="32" fill="white"/>
                                <circle cx="32" cy="32" r="28" fill="#FFCA00"/>
                                <path d="M30.4167 17H33.5833V40.9167L44.25 30.25L46.5 32.5L32 47L17.5 32.5L19.75 30.25L30.4167 40.9167V17Z" fill="#1D1D1F"/>
                            </svg>
                        </div>
                        <article class="crypto-usecase-card crypto-usecase-card--dark">
                            <h3>{{ $t('cryptoPage.useCase.solutionTitle') }}</h3>
                            <ul class="treasury-goals__list">
                                <li v-for="item in cryptoUseCase.solutionBullets" :key="item">
                                    <span class="treasury-goals__check" aria-hidden="true"></span>
                                    <span>{{ $t(item) }}</span>
                                </li>
                            </ul>
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
import heroDeviceImage from '../assets/images/hero-hero-device.png'
import traditionalBankingIcon from '../assets/images/crypto/challenge-icons/traditional-banking-infrastructure.png'
import fragmentedTreasuryIcon from '../assets/images/crypto/challenge-icons/fragmented-treasury-piggy.png'
import onOffRampIcon from '../assets/images/crypto/challenge-icons/on-off-ramp-arrows.png'
import complianceRiskIcon from '../assets/images/crypto/challenge-icons/compliance-risk-shield.png'

const activeAccordion = ref(0)

const toggleAccordion = (index) => {
  activeAccordion.value = activeAccordion.value === index ? -1 : index
}

const challenges = [
    { key: 'bankingInfrastructure', icon: traditionalBankingIcon, titleKey: 'cryptoPage.challenges.items.bankingInfrastructure.title', textKey: 'cryptoPage.challenges.items.bankingInfrastructure.text' },
    { key: 'fragmentedTreasury', icon: fragmentedTreasuryIcon, titleKey: 'cryptoPage.challenges.items.fragmentedTreasury.title', textKey: 'cryptoPage.challenges.items.fragmentedTreasury.text' },
    { key: 'offRampConstraints', icon: onOffRampIcon, titleKey: 'cryptoPage.challenges.items.offRampConstraints.title', textKey: 'cryptoPage.challenges.items.offRampConstraints.text' },
    { key: 'complianceRisk', icon: complianceRiskIcon, titleKey: 'cryptoPage.challenges.items.complianceRisk.title', textKey: 'cryptoPage.challenges.items.complianceRisk.text' },
]

const solutionItems = [
    {
        number: '01',
        titleKey: 'cryptoPage.solution.items.virtualAccounts.title',
        introKey: 'cryptoPage.solution.items.virtualAccounts.intro',
        bullets: [
            'cryptoPage.solution.items.virtualAccounts.bullet1',
            'cryptoPage.solution.items.virtualAccounts.bullet2',
            'cryptoPage.solution.items.virtualAccounts.bullet3',
        ],
    },
    {
        number: '02',
        titleKey: 'cryptoPage.solution.items.globalCollection.title',
        introKey: 'cryptoPage.solution.items.globalCollection.intro',
        bullets: [
            'cryptoPage.solution.items.globalCollection.bullet1',
            'cryptoPage.solution.items.globalCollection.bullet2',
            'cryptoPage.solution.items.globalCollection.bullet3',
        ],
    },
    {
        number: '03',
        titleKey: 'cryptoPage.solution.items.stablecoinAcceptance.title',
        introKey: 'cryptoPage.solution.items.stablecoinAcceptance.intro',
        bullets: [
            'cryptoPage.solution.items.stablecoinAcceptance.bullet1',
            'cryptoPage.solution.items.stablecoinAcceptance.bullet2',
            'cryptoPage.solution.items.stablecoinAcceptance.bullet3',
        ],
    },
    {
        number: '04',
        titleKey: 'cryptoPage.solution.items.cryptoOffRamps.title',
        introKey: 'cryptoPage.solution.items.cryptoOffRamps.intro',
        bullets: [
            'cryptoPage.solution.items.cryptoOffRamps.bullet1',
            'cryptoPage.solution.items.cryptoOffRamps.bullet2',
            'cryptoPage.solution.items.cryptoOffRamps.bullet3',
        ],
    },
    {
        number: '05',
        titleKey: 'cryptoPage.solution.items.treasuryDiversification.title',
        introKey: 'cryptoPage.solution.items.treasuryDiversification.intro',
        bullets: [
            'cryptoPage.solution.items.treasuryDiversification.bullet1',
            'cryptoPage.solution.items.treasuryDiversification.bullet2',
            'cryptoPage.solution.items.treasuryDiversification.bullet3',
        ],
    },
    {
        number: '06',
        titleKey: 'cryptoPage.solution.items.complianceControls.title',
        introKey: 'cryptoPage.solution.items.complianceControls.intro',
        bullets: [
            'cryptoPage.solution.items.complianceControls.bullet1',
            'cryptoPage.solution.items.complianceControls.bullet2',
            'cryptoPage.solution.items.complianceControls.bullet3',
        ],
    },
]

const goalRows = [
    { goalKey: 'cryptoPage.goals.rows.noFiatAccounts', deliverKey: 'cryptoPage.goals.delivers.noFiatAccounts' },
    { goalKey: 'cryptoPage.goals.rows.paymentFragmentation', deliverKey: 'cryptoPage.goals.delivers.paymentFragmentation' },
    { goalKey: 'cryptoPage.goals.rows.onOffRampIssues', deliverKey: 'cryptoPage.goals.delivers.onOffRampIssues' },
    { goalKey: 'cryptoPage.goals.rows.treasuryInefficiency', deliverKey: 'cryptoPage.goals.delivers.treasuryInefficiency' },
    { goalKey: 'cryptoPage.goals.rows.crossBorderFriction', deliverKey: 'cryptoPage.goals.delivers.crossBorderFriction' },
]

const cryptoUseCase = {
    titleKey: 'cryptoPage.useCase.title',
    clientTitleKey: 'cryptoPage.useCase.clientTitle',
    clientTextKey: 'cryptoPage.useCase.clientText',
    solutionTitleKey: 'cryptoPage.useCase.solutionTitle',
    solutionBullets: [
        'cryptoPage.useCase.solutionBullet1',
        'cryptoPage.useCase.solutionBullet2',
        'cryptoPage.useCase.solutionBullet3',
        'cryptoPage.useCase.solutionBullet4',
    ],
}

const customerBaseUrl = import.meta.env.VITE_CUSTOMER_BASE_URL ?? 'https://customer.yasbe.com/'
</script>

<style scoped src="../styles/views/cryptoPage.css"></style>
