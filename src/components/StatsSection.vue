<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const statsDescriptionParts = computed(() => t('stats.description').split(/\n\s*\n/))
const statsDescriptionLead = computed(() => statsDescriptionParts.value[0] || '')
const statsDescriptionBody = computed(() => statsDescriptionParts.value.slice(1).join('\n\n'))
</script>

<template>
  <section class="stats">
    <div class="stats__container">
      <p v-reveal class="stats__description">
        <span class="stats__description-lead">{{ statsDescriptionLead }}</span>
        <span v-if="statsDescriptionBody" class="stats__description-body">{{ statsDescriptionBody }}</span>
      </p>
      <div class="stats__grid">
        <div v-reveal="{ delay: 40 }" class="stats__item">
          <span class="stats__number">30+</span>
          <span class="stats__label">{{ $t('stats.labels.supportedChains') }}</span>
        </div>
        <div v-reveal="{ delay: 100 }" class="stats__item">
          <span class="stats__number">10+</span>
          <span class="stats__label">{{ $t('stats.labels.integratedProjects') }}</span>
        </div>
        <div v-reveal="{ delay: 160 }" class="stats__item">
          <span class="stats__number">50+</span>
          <span class="stats__label">{{ $t('stats.labels.marketShare') }}</span>
        </div>
        <div v-reveal="{ delay: 220 }" class="stats__item">
          <span class="stats__number">24/7</span>
          <span class="stats__label">{{ $t('stats.labels.tvl') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="../styles/components/StatsSection.css"></style>
