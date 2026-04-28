<template>
  <div class="features__nav">
    <div class="features__nav-content">
      <span class="features__counter">{{ currentSlide + 1 }}/{{ totalSlides }}</span>
      <div class="features__indicators">
        <button
          v-for="index in totalSlides"
          :key="index"
          type="button"
          class="features__indicator"
          :class="{ 'features__indicator--active': currentSlide === index - 1 }"
          :aria-label="`Go to feature ${index}`"
          @click="$emit('go-to-slide', index - 1)"
        />
      </div>
      <div class="features__arrows">
        <button
          type="button"
          class="features__arrow"
          :class="{ 'features__arrow--disabled': currentSlide === 0 }"
          :aria-disabled="currentSlide === 0"
          aria-label="Previous feature"
          @click="$emit('prev')"
        >
          <img src="../assets/images/arrow-right.svg" alt="" class="features__arrow-icon--prev" />
        </button>
        <button
          type="button"
          class="features__arrow"
          :class="{ 'features__arrow--disabled': currentSlide === totalSlides - 1 }"
          :aria-disabled="currentSlide === totalSlides - 1"
          aria-label="Next feature"
          @click="$emit('next')"
        >
          <img src="../assets/images/arrow-right.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentSlide: {
    type: Number,
    required: true,
  },
  totalSlides: {
    type: Number,
    required: true,
  },
})

defineEmits(['prev', 'next', 'go-to-slide'])
</script>

<style src="../styles/components/FeatureNav.css"></style>
