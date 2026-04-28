<template>
  <section class="stats">
    <div class="stats__container">
      <p v-reveal class="stats__description">{{ $t('stats.description') }}</p>
      <div class="stats__grid">
        <div v-reveal="{ delay: 40 }" class="stats__item">
          <span class="stats__number">10</span>
          <span class="stats__label">{{ $t('stats.labels.supportedChains') }}</span>
        </div>
        <div v-reveal="{ delay: 100 }" class="stats__item">
          <span class="stats__number">153</span>
          <span class="stats__label">{{ $t('stats.labels.integratedProjects') }}</span>
        </div>
        <div v-reveal="{ delay: 160 }" class="stats__item">
          <span class="stats__number">80%</span>
          <span class="stats__label">{{ $t('stats.labels.marketShare') }}</span>
        </div>
        <div v-reveal="{ delay: 220 }" class="stats__item">
          <span class="stats__number">$2.74B</span>
          <span class="stats__label">{{ $t('stats.labels.tvl') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="../styles/components/StatsSection.css"></style>
