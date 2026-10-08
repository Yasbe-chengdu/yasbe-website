<template>
    <div class="ecosystem-page">
        <Navbar />

        <main class="ecosystem-page__body">
            <!-- Hero -->
            <section class="ecosystem-hero">
                <div class="ecosystem-hero__content">
                    <h1 v-reveal="{ distance: 36 }" class="ecosystem-hero__title">
                        {{ $t('ecosystem.hero.title') }}
                    </h1>
                    <p v-reveal="{ delay: 80, distance: 28 }" class="ecosystem-hero__tagline">
                        {{ $t('ecosystem.hero.tagline') }}
                    </p>
                    <div v-reveal="{ delay: 140, distance: 24 }" class="ecosystem-hero__intro">
                        <p>{{ $t('ecosystem.hero.intro1') }}</p>
                        <p>{{ $t('ecosystem.hero.intro2') }}</p>
                        <p>{{ $t('ecosystem.hero.intro3') }}</p>
                    </div>
                </div>
            </section>

            <!-- One Ecosystem. More Possibilities. -->
            <section class="ecosystem-section">
                <div class="ecosystem-section__inner">
                    <h2 v-reveal class="ecosystem-section__heading">{{ $t('ecosystem.oneEcosystem.heading') }}</h2>
                    <p v-reveal="{ delay: 60 }" class="ecosystem-section__paragraph">
                        {{ $t('ecosystem.oneEcosystem.text') }}
                    </p>
                </div>
            </section>

            <!-- YASBe Platform -->
            <section class="ecosystem-section">
                <div class="ecosystem-section__inner">
                    <h2 v-reveal class="ecosystem-section__heading">{{ $t('ecosystem.platform.heading') }}</h2>
                    <p v-reveal="{ delay: 60 }" class="ecosystem-section__paragraph">
                        {{ $t('ecosystem.platform.intro') }}
                    </p>
                    <ul v-reveal="{ delay: 100 }" class="ecosystem-list ecosystem-list--cols">
                        <li v-for="item in platformItems" :key="item" class="ecosystem-list__item">
                            {{ $t(item) }}
                        </li>
                    </ul>
                    <p v-reveal="{ delay: 140 }" class="ecosystem-section__note">
                        {{ $t('ecosystem.platform.note') }}
                    </p>
                </div>
            </section>

            <!-- Rewards & Benefits -->
            <section class="ecosystem-section">
                <div class="ecosystem-section__inner">
                    <h2 v-reveal class="ecosystem-section__heading">{{ $t('ecosystem.rewards.heading') }}</h2>
                    <p v-reveal="{ delay: 60 }" class="ecosystem-section__paragraph">
                        {{ $t('ecosystem.rewards.intro') }}
                    </p>
                    <ul v-reveal="{ delay: 100 }" class="ecosystem-list ecosystem-list--cols">
                        <li v-for="item in rewardItems" :key="item" class="ecosystem-list__item">
                            {{ $t(item) }}
                        </li>
                    </ul>
                    <p v-reveal="{ delay: 140 }" class="ecosystem-section__note">
                        {{ $t('ecosystem.rewards.note') }}
                    </p>
                </div>
            </section>

            <!-- Partner Offers -->
            <section class="ecosystem-section">
                <div class="ecosystem-section__inner">
                    <h2 v-reveal class="ecosystem-section__heading">{{ $t('ecosystem.partnerOffers.heading') }}</h2>
                    <p v-reveal="{ delay: 60 }" class="ecosystem-section__paragraph">
                        {{ $t('ecosystem.partnerOffers.text1') }}
                    </p>
                    <p v-reveal="{ delay: 80 }" class="ecosystem-section__paragraph">
                        {{ $t('ecosystem.partnerOffers.intro') }}
                    </p>
                    <ul v-reveal="{ delay: 100 }" class="ecosystem-list ecosystem-list--cols">
                        <li v-for="item in partnerOfferItems" :key="item" class="ecosystem-list__item">
                            {{ $t(item) }}
                        </li>
                    </ul>
                    <p v-reveal="{ delay: 140 }" class="ecosystem-section__note">
                        {{ $t('ecosystem.partnerOffers.note') }}
                    </p>
                </div>
            </section>

            <!-- Participate -->
            <section class="ecosystem-section ecosystem-section--gray">
                <div class="ecosystem-section__inner">
                    <h2 v-reveal class="ecosystem-section__heading">{{ $t('ecosystem.participate.heading') }}</h2>
                    <p v-reveal="{ delay: 60 }" class="ecosystem-section__paragraph">
                        {{ $t('ecosystem.participate.intro') }}
                    </p>

                    <div class="ecosystem-cards">
                        <article v-reveal="{ delay: 0, distance: 28 }" class="ecosystem-card">
                            <h3 class="ecosystem-card__title">{{ $t('ecosystem.participate.customer.heading') }}</h3>
                            <p class="ecosystem-card__lead">{{ $t('ecosystem.participate.customer.lead') }}</p>
                            <p class="ecosystem-card__text">{{ $t('ecosystem.participate.customer.text1') }}</p>
                            <p class="ecosystem-card__text">{{ $t('ecosystem.participate.customer.text2') }}</p>
                        </article>

                        <article v-reveal="{ delay: 60, distance: 28 }" class="ecosystem-card">
                            <h3 class="ecosystem-card__title">{{ $t('ecosystem.participate.referral.heading') }}</h3>
                            <p class="ecosystem-card__text">{{ $t('ecosystem.participate.referral.text1') }}</p>
                            <p class="ecosystem-card__text">{{ $t('ecosystem.participate.referral.text2') }}</p>
                            <ol class="ecosystem-list ecosystem-list--ordered">
                                <li v-for="step in referralSteps" :key="step" class="ecosystem-list__item">
                                    {{ $t(step) }}
                                </li>
                            </ol>
                            <p class="ecosystem-card__text">{{ $t('ecosystem.participate.referral.text3') }}</p>
                            <p class="ecosystem-card__text">{{ $t('ecosystem.participate.referral.text4') }}</p>
                            <ul class="ecosystem-list">
                                <li v-for="item in referralRewardItems" :key="item" class="ecosystem-list__item">
                                    {{ $t(item) }}
                                </li>
                            </ul>
                            <p class="ecosystem-card__note">{{ $t('ecosystem.participate.referral.note') }}</p>
                        </article>

                        <article v-reveal="{ delay: 120, distance: 28 }" class="ecosystem-card">
                            <h3 class="ecosystem-card__title">{{ $t('ecosystem.participate.partner.heading') }}</h3>
                            <p class="ecosystem-card__text">{{ $t('ecosystem.participate.partner.text1') }}</p>
                            <p class="ecosystem-card__text">{{ $t('ecosystem.participate.partner.text2') }}</p>
                            <div class="ecosystem-chips">
                                <span v-for="partner in partnerTypes" :key="partner" class="ecosystem-chips__item">
                                    {{ $t(partner) }}
                                </span>
                            </div>
                            <p class="ecosystem-card__text">{{ $t('ecosystem.participate.partner.text3') }}</p>
                        </article>
                    </div>
                </div>
            </section>

            <!-- Why Join -->
            <section class="ecosystem-section">
                <div class="ecosystem-section__inner">
                    <h2 v-reveal class="ecosystem-section__heading">{{ $t('ecosystem.why.heading') }}</h2>

                    <div class="ecosystem-cards ecosystem-cards--three">
                        <article v-reveal="{ delay: 0, distance: 28 }" class="ecosystem-card ecosystem-card--bordered">
                            <h3 class="ecosystem-card__title">{{ $t('ecosystem.why.customers.heading') }}</h3>
                            <p class="ecosystem-card__lead">{{ $t('ecosystem.why.customers.lead') }}</p>
                            <p class="ecosystem-card__text">{{ $t('ecosystem.why.customers.text') }}</p>
                        </article>

                        <article v-reveal="{ delay: 60, distance: 28 }" class="ecosystem-card ecosystem-card--bordered">
                            <h3 class="ecosystem-card__title">{{ $t('ecosystem.why.referral.heading') }}</h3>
                            <p class="ecosystem-card__lead">{{ $t('ecosystem.why.referral.lead') }}</p>
                            <p class="ecosystem-card__text">{{ $t('ecosystem.why.referral.text') }}</p>
                        </article>

                        <article v-reveal="{ delay: 120, distance: 28 }"
                            class="ecosystem-card ecosystem-card--bordered">
                            <h3 class="ecosystem-card__title">{{ $t('ecosystem.why.partners.heading') }}</h3>
                            <p class="ecosystem-card__lead">{{ $t('ecosystem.why.partners.lead') }}</p>
                            <p class="ecosystem-card__text">{{ $t('ecosystem.why.partners.text') }}</p>
                        </article>
                    </div>
                </div>
            </section>

            <!-- Grow With YASBe -->
            <section class="ecosystem-section">
                <div class="ecosystem-section__inner">
                    <h2 v-reveal class="ecosystem-section__heading">{{ $t('ecosystem.grow.heading') }}</h2>
                    <p v-reveal="{ delay: 60 }" class="ecosystem-section__paragraph">
                        {{ $t('ecosystem.grow.text1') }}
                    </p>
                    <p v-reveal="{ delay: 80 }" class="ecosystem-section__paragraph">
                        {{ $t('ecosystem.grow.text2') }}
                    </p>
                </div>
            </section>

            <!-- CTA -->
            <section class="ecosystem-cta">
                <div class="ecosystem-cta__inner">
                    <h2 v-reveal class="ecosystem-cta__heading">{{ $t('ecosystem.cta.heading') }}</h2>
                    <p v-reveal="{ delay: 60 }" class="ecosystem-cta__subtitle">
                        {{ $t('ecosystem.cta.subtitle') }}
                    </p>
                    <div v-reveal="{ delay: 120 }" class="ecosystem-cta__actions">
                        <a :href="customerRegisterUrl" target="_blank" rel="noopener noreferrer"
                            class="ecosystem-cta__button">
                            {{ $t('ecosystem.cta.customerButton') }}
                        </a>
                        <a :href="customerRegisterUrl" target="_blank" rel="noopener noreferrer"
                            class="ecosystem-cta__button ecosystem-cta__button--outline">
                            {{ $t('ecosystem.cta.referralButton') }}
                        </a>
                        <a href="mailto:marketing@yasbe.com" class="ecosystem-cta__link">
                            {{ $t('ecosystem.cta.partnerLabel') }} marketing@yasbe.com
                        </a>
                    </div>
                </div>
            </section>

            <!-- Disclaimer -->
            <section class="ecosystem-disclaimer">
                <div class="ecosystem-disclaimer__inner">
                    <p>{{ $t('ecosystem.disclaimer') }}</p>
                </div>
            </section>
        </main>

        <Footer />
    </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const customerRegisterUrl = 'https://customer.yasbe.com/register'

const platformItems = [
    'ecosystem.platform.items.namedAccounts',
    'ecosystem.platform.items.globalCollectionPayout',
    'ecosystem.platform.items.globalPaymentRails',
    'ecosystem.platform.items.stablecoinOnOffRamp',
    'ecosystem.platform.items.digitalAssetTradingOtc',
    'ecosystem.platform.items.card',
    'ecosystem.platform.items.digitalWallet',
    'ecosystem.platform.items.apisEmbedded',
]

const rewardItems = [
    'ecosystem.rewards.items.preferentialPricing',
    'ecosystem.rewards.items.rewardsPoints',
    'ecosystem.rewards.items.campaignsOffers',
    'ecosystem.rewards.items.giftVouchers',
    'ecosystem.rewards.items.merchantDiscounts',
    'ecosystem.rewards.items.travelLifestyle',
]

const partnerOfferItems = [
    'ecosystem.partnerOffers.items.shoppingVouchers',
    'ecosystem.partnerOffers.items.diningOffers',
    'ecosystem.partnerOffers.items.airlineTravel',
    'ecosystem.partnerOffers.items.hotelResort',
    'ecosystem.partnerOffers.items.businessServices',
    'ecosystem.partnerOffers.items.promotions',
]

const referralSteps = [
    'ecosystem.participate.referral.step1',
    'ecosystem.participate.referral.step2',
    'ecosystem.participate.referral.step3',
]

const referralRewardItems = [
    'ecosystem.participate.referral.items.commissions',
    'ecosystem.participate.referral.items.transactionIncentives',
    'ecosystem.participate.referral.items.promotionalRewards',
    'ecosystem.participate.referral.items.preferentialPricing',
    'ecosystem.participate.referral.items.campaignsOpportunities',
]

const partnerTypes = [
    'ecosystem.participate.partner.types.merchants',
    'ecosystem.participate.partner.types.airlines',
    'ecosystem.participate.partner.types.hotelsResorts',
    'ecosystem.participate.partner.types.travelProviders',
    'ecosystem.participate.partner.types.technology',
    'ecosystem.participate.partner.types.professionalServices',
    'ecosystem.participate.partner.types.financialInstitutions',
    'ecosystem.participate.partner.types.payments',
    'ecosystem.participate.partner.types.lifestyle',
]
</script>

<style scoped src="../styles/views/EcosystemView.css"></style>
