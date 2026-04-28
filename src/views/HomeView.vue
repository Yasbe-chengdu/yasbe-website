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
import Navbar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'
import StatsSection from '../components/StatsSection.vue'
import GlobalPaymentsSection from '../components/GlobalPaymentsSection.vue'
import WorldMapSection from '../components/WorldMapSection.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import ProductsSection from '../components/ProductsSection.vue'
import Footer from '../components/Footer.vue'
</script>

<style scoped src="../styles/views/HomeView.css"></style>
