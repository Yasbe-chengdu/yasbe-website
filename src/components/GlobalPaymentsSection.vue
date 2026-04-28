<template>
  <section id="global-payment" class="global-payments">
    <div class="global-payments__container">
      <div v-reveal class="global-payments__header">
        <h2 class="global-payments__title">{{ $t('globalPayments.title') }}</h2>
        <p class="global-payments__subtitle">{{ $t('globalPayments.subtitle') }}</p>
      </div>
      <div class="global-payments__cards">
        <div v-reveal="{ delay: 60, origin: 'left', distance: 36 }" class="global-payments__card global-payments__card--blue">
          <img src="../assets/images/icon-trust.svg" alt="Trust" class="global-payments__icon" />
          <h3 class="global-payments__card-title">{{ $t('globalPayments.cards.trust.title') }}</h3>
          <p class="global-payments__card-text">{{ $t('globalPayments.cards.trust.text') }}</p>
        </div>
        <div v-reveal="{ delay: 140, origin: 'right', distance: 36 }" class="global-payments__card global-payments__card--green">
          <img src="../assets/images/icon-stablecoin.svg" alt="Stablecoin" class="global-payments__icon" />
          <h3 class="global-payments__card-title">{{ $t('globalPayments.cards.stablecoin.title') }}</h3>
          <p class="global-payments__card-text">{{ $t('globalPayments.cards.stablecoin.text') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="../styles/components/GlobalPaymentsSection.css"></style>
