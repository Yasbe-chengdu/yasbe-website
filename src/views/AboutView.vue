<template>
  <section class="page">
    <span class="eyebrow">{{ $t('about.eyebrow') }}</span>
    <h1>{{ $t('about.title') }}</h1>
    <p>
      {{ $t('about.descriptionPrefix') }}
      <code>createWebHistory()</code>
      {{ $t('about.descriptionMiddle') }}
      <code>src/router/index.js</code>{{ $t('about.descriptionSuffix') }}
    </p>
  </section>
</template>

<style scoped src="../styles/views/AboutView.css"></style>
