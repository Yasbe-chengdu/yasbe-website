<template>
  <footer id="contact" class="footer">
    <div class="footer__container">
      <div class="footer__main">
        <div v-reveal class="footer__brand">
          <img src="../assets/images/logo-footer.png" alt="YASBe Logo" class="footer__logo" loading="lazy" decoding="async" />
          <div class="footer__socials">
            <a href="javascript:void(0);" class="footer__social" @click="toPage('https://www.youtube.com/@YASBe-u9j')">
              <img src="../assets/images/social-twitter.svg" alt="Twitter" loading="lazy" decoding="async" />
            </a>
            <a href="javascript:void(0);" class="footer__social" @click="toPage('https://x.com/YASBeGlobal')">
              <img src="../assets/images/social-linkedin.svg" alt="LinkedIn" loading="lazy" decoding="async" />
            </a>
            <a href="javascript:void(0);" class="footer__social" @click="toPage('https://www.linkedin.cn/incareer/company/yasbe/')">
              <img src="../assets/images/social-discord.svg" alt="Discord" loading="lazy" decoding="async" />
            </a>
            <a href="javascript:void(0);" class="footer__social" @click="toPage('https://www.instagram.com/yasbe_global/')">
              <img src="../assets/images/social-telegram.svg" alt="Telegram" loading="lazy" decoding="async" />
            </a>
          </div>
          <p class="footer__copyright">{{ $t('footer.copyright') }}</p>
        </div>

        <div class="footer__links">
          <div v-reveal="{ delay: 60 }" class="footer__column">
            <h4 class="footer__heading">{{ $t('footer.company.heading') }}</h4>
            <span class="footer__link">{{ $t('footer.company.about') }}</span>
            <span class="footer__link">{{ $t('footer.company.careers') }}</span>
            <RouterLink :to="footerLinks.company.contact.to" class="footer__link">{{ $t('footer.company.contact') }}</RouterLink>
          </div>

          <div v-reveal="{ delay: 120 }" class="footer__column">
            <h4 class="footer__heading">{{ $t('footer.products.heading') }}</h4>
            <RouterLink :to="footerLinks.products.virtualAccounts.to" class="footer__link">{{ $t('footer.products.virtualAccounts') }}</RouterLink>
            <RouterLink :to="footerLinks.products.globalCollection.to" class="footer__link">{{ $t('footer.products.globalCollection') }}</RouterLink>
            <RouterLink :to="footerLinks.products.stablecoinCheckout.to" class="footer__link">{{ $t('footer.products.stablecoinCheckout') }}</RouterLink>
            <RouterLink :to="footerLinks.products.otc.to" class="footer__link">{{ $t('footer.products.otc') }}</RouterLink>
            <span class="footer__link">{{ $t('footer.products.investment') }}</span>
            <RouterLink :to="footerLinks.products.card.to" class="footer__link">{{ $t('footer.products.card') }}</RouterLink>
          </div>

          <div v-reveal="{ delay: 180 }" class="footer__column">
            <h4 class="footer__heading">{{ $t('footer.useCases.heading') }}</h4>
            <span class="footer__link">{{ $t('footer.useCases.treasury') }}</span>
            <span class="footer__link">{{ $t('footer.useCases.importExport') }}</span>
            <span class="footer__link">{{ $t('footer.useCases.services') }}</span>
            <span class="footer__link">{{ $t('footer.useCases.vc') }}</span>
            <span class="footer__link">{{ $t('footer.useCases.crypto') }}</span>
          </div>

          <div v-reveal="{ delay: 240 }" class="footer__column">
            <h4 class="footer__heading">{{ $t('footer.resources.heading') }}</h4>
            <span class="footer__link">{{ $t('footer.resources.legal') }}</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const footerLinks = {
  company: {
    about: { to: '/about' },
    contact: { to: '/contact' },
  },
  products: {
    virtualAccounts: { to: '/virtual-account' },
    globalCollection: { to: '/global-collection-payout' },
    stablecoinCheckout: { to: '/stablecoin-checkout' },
    otc: { to: '/institutional-otc' },
    card: { to: '/yasbe-card' },
  },
}

const toPage = (url) => {
  window.open(url, '_blank')
}
</script>

<style scoped src="../styles/components/Footer.css"></style>
