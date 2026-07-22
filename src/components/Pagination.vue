<template>
  <nav v-if="totalPages > 1" class="pagination" :aria-label="ariaLabel">
    <button
      type="button"
      :aria-label="prevLabel"
      class="pagination__arrow"
      :disabled="currentPage <= 1"
      @click="goTo(currentPage - 1)"
    ></button>

    <template v-for="(page, index) in pageNumbers" :key="`${page}-${index}`">
      <span v-if="page === '...'" class="pagination__ellipsis">...</span>
      <button
        v-else
        type="button"
        class="pagination__item"
        :class="{ 'pagination__item--active': page === currentPage }"
        :aria-label="`${pageLabel} ${page}`"
        :aria-current="page === currentPage ? 'page' : undefined"
        @click="goTo(page)"
      >{{ page }}</button>
    </template>

    <button
      type="button"
      :aria-label="nextLabel"
      class="pagination__arrow pagination__arrow--next"
      :disabled="currentPage >= totalPages"
      @click="goTo(currentPage + 1)"
    ></button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  ariaLabel: { type: String, default: 'Pagination' },
  prevLabel: { type: String, default: 'Previous page' },
  nextLabel: { type: String, default: 'Next page' },
  pageLabel: { type: String, default: 'Go to page' },
})

const emit = defineEmits(['update:currentPage'])

function goTo(page) {
  if (page < 1 || page > props.totalPages || page === props.currentPage) return
  emit('update:currentPage', page)
}

const pageNumbers = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const pages = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)
  if (current > 4) pages.push('...')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (current < total - 3) pages.push('...')
  pages.push(total)

  return pages
})
</script>

<style scoped src="../styles/components/Pagination.css"></style>
