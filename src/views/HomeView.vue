<template>
  <div class="home">
    <Navbar />
    <main>
      <HeroSection />
      <StatsSection />
      <GlobalPaymentsSection />
      <WorldMapSection />
      <FeaturesSection />
      <ProductsSection />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import Navbar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'

const StatsSection = defineAsyncComponent(() => import('../components/StatsSection.vue'))
const GlobalPaymentsSection = defineAsyncComponent(() => import('../components/GlobalPaymentsSection.vue'))
const WorldMapSection = defineAsyncComponent(() => import('../components/WorldMapSection.vue'))
const FeaturesSection = defineAsyncComponent(() => import('../components/FeaturesSection.vue'))
const ProductsSection = defineAsyncComponent(() => import('../components/ProductsSection.vue'))
const Footer = defineAsyncComponent(() => import('../components/Footer.vue'))
</script>

<style scoped src="../styles/views/HomeView.css"></style>
