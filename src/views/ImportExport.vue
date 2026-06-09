<template>
    <div class="treasury-page">
        <Navbar />

        <main>
            <!-- Hero Section -->
            <section class="treasury-hero">
                <div class="treasury-hero__pattern" aria-hidden="true"></div>
                <div class="treasury-hero__content">
                    <h1 v-reveal="{ distance: 36 }" class="treasury-hero__title">
                        <span>{{ $t('importExport.hero.titleLight') }}</span>
                        <strong>{{ $t('importExport.hero.titleBold') }}</strong>
                    </h1>
                    <p v-reveal="{ delay: 80, distance: 28 }" class="treasury-hero__subtitle">
                        {{ $t('importExport.hero.subtitle') }}
                    </p>
                    <a v-reveal="{ delay: 140, distance: 24 }" :href="customerBaseUrl" target="_blank" rel="noopener noreferrer" class="treasury-cta">
                        <span>{{ $t('importExport.cta.tryForFree') }}</span>
                        <span class="treasury-cta__icon" aria-hidden="true">
                            <img :src="arrowIcon" alt="" />
                        </span>
                    </a>
                    <div v-reveal="{ delay: 200, distance: 56, scale: 0.98 }" class="treasury-hero__visual">
                        <!-- <img :src="heroBgImage" alt="" class="treasury-hero__visual-bg" aria-hidden="true" /> -->
                        <!-- <img :src="heroCardImage" alt="" class="treasury-hero__visual-card" aria-hidden="true" /> -->
                        <img :src="heroDeviceImage" :alt="$t('importExport.hero.deviceAlt')" class="treasury-hero__visual-device" />
                    </div>
                </div>
            </section>

            <!-- Key Challenges Section -->
            <section class="treasury-challenges">
                <div class="treasury-challenges__content">
                    <div v-reveal class="treasury-section__header">
                        <h2 class="treasury-heading treasury-heading--white">{{ $t('importExport.challenges.title') }}</h2>
                        <p class="treasury-section__subtitle treasury-section__subtitle--white">{{ $t('importExport.challenges.subtitle') }}</p>
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
                    <h2 v-reveal class="treasury-heading">{{ $t('importExport.solution.title') }}</h2>
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


            <!-- From Goal to Outcome Section -->
            <section class="treasury-goals">
                <div class="treasury-section__inner">
                    <h2 v-reveal class="treasury-heading">{{ $t('importExport.goals.title') }}</h2>
                    <div v-reveal="{ delay: 80 }" class="treasury-goals__comparison">
                        <article class="treasury-goals-card treasury-goals-card--light">
                            <h3>{{ $t('importExport.goals.goalColumn') }}</h3>
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
                            <h3>{{ $t('importExport.goals.deliversColumn') }}</h3>
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
                        <h2 class="treasury-heading">{{ $t('importExport.cases.title') }}</h2>
                        <p class="treasury-section__subtitle">{{ $t('importExport.cases.subtitle') }}</p>
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
import heroDeviceImage from '../assets/images/import-hero-device.png'
import paymentCardPlusIcon from '../assets/images/import-export/challenge-icons/payment-card-plus.png'
import hourglassIcon from '../assets/images/import-export/challenge-icons/hourglass.png'
import waveRiskIcon from '../assets/images/import-export/challenge-icons/wave-risk.png'
import puzzleIcon from '../assets/images/import-export/challenge-icons/puzzle.png'

const activeAccordion = ref(0)

const toggleAccordion = (index) => {
  activeAccordion.value = activeAccordion.value === index ? -1 : index
}

const challenges = [
    { key: 'crossBorderPayments', icon: paymentCardPlusIcon, titleKey: 'importExport.challenges.items.crossBorderPayments.title', textKey: 'importExport.challenges.items.crossBorderPayments.text' },
    { key: 'cashFlowInefficiencies', icon: hourglassIcon, titleKey: 'importExport.challenges.items.cashFlowInefficiencies.title', textKey: 'importExport.challenges.items.cashFlowInefficiencies.text' },
    { key: 'currencyRisks', icon: waveRiskIcon, titleKey: 'importExport.challenges.items.currencyRisks.title', textKey: 'importExport.challenges.items.currencyRisks.text' },
    { key: 'reconciliationIssues', icon: puzzleIcon, titleKey: 'importExport.challenges.items.reconciliationIssues.title', textKey: 'importExport.challenges.items.reconciliationIssues.text' },
]

const solutionItems = [
    {
        number: '01',
        titleKey: 'importExport.solution.items.virtualAccounts.title',
        introKey: 'importExport.solution.items.virtualAccounts.intro',
        bullets: [
            'importExport.solution.items.virtualAccounts.bullet1',
            'importExport.solution.items.virtualAccounts.bullet2',
            'importExport.solution.items.virtualAccounts.bullet3',
            'importExport.solution.items.virtualAccounts.bullet4',
        ],
    },
    {
        number: '02',
        titleKey: 'importExport.solution.items.globalCollection.title',
        introKey: 'importExport.solution.items.globalCollection.intro',
        bullets: [
            'importExport.solution.items.globalCollection.bullet1',
            'importExport.solution.items.globalCollection.bullet2',
            'importExport.solution.items.globalCollection.bullet3',
            'importExport.solution.items.globalCollection.bullet4',
        ],
    },
    {
        number: '03',
        titleKey: 'importExport.solution.items.stablecoin.title',
        introKey: 'importExport.solution.items.stablecoin.intro',
        bullets: [
            'importExport.solution.items.stablecoin.bullet1',
            'importExport.solution.items.stablecoin.bullet2',
            'importExport.solution.items.stablecoin.bullet3',
            'importExport.solution.items.stablecoin.bullet4',
        ],
    },
]

const goalRows = [
    { goalKey: 'importExport.goals.rows.simplifyPayments', deliverKey: 'importExport.goals.delivers.simplifyPayments' },
    { goalKey: 'importExport.goals.rows.improveCashFlow', deliverKey: 'importExport.goals.delivers.improveCashFlow' },
    { goalKey: 'importExport.goals.rows.reduceCurrencyRisk', deliverKey: 'importExport.goals.delivers.reduceCurrencyRisk' },
    { goalKey: 'importExport.goals.rows.streamlineReconciliation', deliverKey: 'importExport.goals.delivers.streamlineReconciliation' },
    { goalKey: 'importExport.goals.rows.expandGlobalOps', deliverKey: 'importExport.goals.delivers.expandGlobalOps' },
]

const useCases = [
    { key: 'importCompany', titleKey: 'importExport.cases.items.importCompany.title', textKey: 'importExport.cases.items.importCompany.text' },
    { key: 'electronicsExporter', titleKey: 'importExport.cases.items.electronicsExporter.title', textKey: 'importExport.cases.items.electronicsExporter.text' },
    { key: 'ecommerceCompany', titleKey: 'importExport.cases.items.ecommerceCompany.title', textKey: 'importExport.cases.items.ecommerceCompany.text' },
]

const customerBaseUrl = import.meta.env.VITE_CUSTOMER_BASE_URL ?? 'https://customer.beeznis.com/'
</script>

<style scoped src="../styles/views/ImportExport.css"></style>
