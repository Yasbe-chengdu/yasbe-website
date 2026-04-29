<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const statsDescriptionParts = computed(() => t('stats.description').split(/\n\s*\n/))
const statsDescriptionLead = computed(() => statsDescriptionParts.value[0] || '')
const statsDescriptionBody = computed(() => statsDescriptionParts.value.slice(1).join('\n\n'))

const statsRef = ref(null)
const isVisible = ref(false)

const counters = ref([
  { target: 30, suffix: '+', current: 0 },
  { target: 10, suffix: '+', current: 0 },
  { target: 50, suffix: '+', current: 0 },
  { target: 24, suffix: '/7', current: 0 },
])

let observer = null
let animationFrame = null

function animateCounters() {
  const duration = 2500
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)

    counters.value.forEach((counter) => {
      counter.current = Math.round(eased * counter.target)
    })

    if (progress < 1) {
      animationFrame = requestAnimationFrame(update)
    } else {
      counters.value.forEach((counter) => {
        counter.current = counter.target
      })
    }
  }

  animationFrame = requestAnimationFrame(update)
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible.value) {
          isVisible.value = true
          animateCounters()
          observer?.disconnect()
        }
      })
    },
    { threshold: 0.2 },
  )

  if (statsRef.value) {
    observer.observe(statsRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <section class="stats">
    <div class="stats__container">
      <p v-reveal class="stats__description">
        <span class="stats__description-lead">{{ statsDescriptionLead }}</span>
        <span v-if="statsDescriptionBody" class="stats__description-body">{{ statsDescriptionBody }}</span>
      </p>
      <div ref="statsRef" class="stats__grid">
        <div v-reveal="{ delay: 40 }" class="stats__item">
          <span class="stats__number">{{ counters[0].current }}{{ counters[0].suffix }}</span>
          <span class="stats__label">{{ $t('stats.labels.supportedChains') }}</span>
        </div>
        <div v-reveal="{ delay: 100 }" class="stats__item">
          <span class="stats__number">{{ counters[1].current }}{{ counters[1].suffix }}</span>
          <span class="stats__label">{{ $t('stats.labels.integratedProjects') }}</span>
        </div>
        <div v-reveal="{ delay: 160 }" class="stats__item">
          <span class="stats__number">{{ counters[2].current }}{{ counters[2].suffix }}</span>
          <span class="stats__label">{{ $t('stats.labels.marketShare') }}</span>
        </div>
        <div v-reveal="{ delay: 220 }" class="stats__item">
          <span class="stats__number">{{ counters[3].current }}{{ counters[3].suffix }}</span>
          <span class="stats__label">{{ $t('stats.labels.tvl') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="../styles/components/StatsSection.css"></style>
