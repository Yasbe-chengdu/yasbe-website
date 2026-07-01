<template>
  <div class="home">
    <Navbar />
    <main>
      <HeroSection />
      <StatsSection />
      <GlobalPaymentsSection />
      <WorldMapSection />
      <div class="home__section" aria-label="Trusted technology partners">
        <p class="homefont333">Partners</p>
        <div v-reveal="{ distance: 18 }" class="home__partners-viewport">
          <div class="home__partners-track">
            <div
              v-for="copyIndex in 2"
              :key="copyIndex"
              class="home__partners-set"
              :aria-hidden="copyIndex === 2"
            >
              <div
                v-for="partner in partnerLogos"
                :key="`${copyIndex}-${partner.name}`"
                class="home__partner-logo"
                :style="{ '--partner-logo-width': `${partner.width}px` }"
              >
                <img
                  :src="partner.src"
                  :alt="copyIndex === 1 ? partner.name : ''"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

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
import circleLogo from '../assets/images/partners/maq1.png'
import cloudflareLogo from '../assets/images/partners/maq2.png'
import complyAdvantageLogo from '../assets/images/partners/maq3.png'
import merkleScienceLogo from '../assets/images/partners/maq4.png'
import safeheronLogo from '../assets/images/partners/maq5.png'
import sumsubLogo from '../assets/images/partners/maq6.png'

const StatsSection = defineAsyncComponent(() => import('../components/StatsSection.vue'))
const GlobalPaymentsSection = defineAsyncComponent(() => import('../components/GlobalPaymentsSection.vue'))
const WorldMapSection = defineAsyncComponent(() => import('../components/WorldMapSection.vue'))
const FeaturesSection = defineAsyncComponent(() => import('../components/FeaturesSection.vue'))
const ProductsSection = defineAsyncComponent(() => import('../components/ProductsSection.vue'))
const Footer = defineAsyncComponent(() => import('../components/Footer.vue'))

const partnerLogos = [
  { name: 'Merkle Science', src: merkleScienceLogo, width: 192 },
  { name: 'Circle', src: circleLogo, width: 202 },
  { name: 'Safeheron', src: safeheronLogo, width: 188 },
  { name: 'Comply Advantage', src: complyAdvantageLogo, width: 140 },
  { name: 'Cloudflare', src: cloudflareLogo, width: 209 },
  { name: 'Sumsub', src: sumsubLogo, width: 182 },
]
</script>

<style scoped src="../styles/views/HomeView.css"></style>
