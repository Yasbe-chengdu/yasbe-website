<template>
  <footer id="contact" class="footer">
    <div class="footer__container">
      <div class="footer__main">
        <div v-reveal class="footer__brand">
          <img src="../assets/images/logo-footer.png" alt="YASBe Logo" class="footer__logo" />
          <div class="footer__socials">
            <a href="#" class="footer__social">
              <img src="../assets/images/social-twitter.svg" alt="Twitter" />
            </a>
            <a href="#" class="footer__social">
              <img src="../assets/images/social-linkedin.svg" alt="LinkedIn" />
            </a>
            <a href="#" class="footer__social">
              <img src="../assets/images/social-discord.svg" alt="Discord" />
            </a>
            <a href="#" class="footer__social">
              <img src="../assets/images/social-telegram.svg" alt="Telegram" />
            </a>
          </div>
          <p class="footer__copyright">{{ $t('footer.copyright') }}</p>
        </div>

        <div class="footer__links">
          <div v-reveal="{ delay: 60 }" class="footer__column">
            <h4 class="footer__heading">{{ $t('footer.company.heading') }}</h4>
            <a href="#" class="footer__link">{{ $t('footer.company.about') }}</a>
            <a href="#" class="footer__link">{{ $t('footer.company.careers') }}</a>
            <a href="#" class="footer__link">{{ $t('footer.company.contact') }}</a>
          </div>

          <div v-reveal="{ delay: 120 }" class="footer__column">
            <h4 class="footer__heading">{{ $t('footer.products.heading') }}</h4>
            <a href="#" class="footer__link">{{ $t('footer.products.virtualAccounts') }}</a>
            <a href="#" class="footer__link">{{ $t('footer.products.globalCollection') }}</a>
            <a href="#" class="footer__link">{{ $t('footer.products.stablecoinCheckout') }}</a>
            <a href="#" class="footer__link">{{ $t('footer.products.otc') }}</a>
            <a href="#" class="footer__link">{{ $t('footer.products.investment') }}</a>
            <a href="#" class="footer__link">{{ $t('footer.products.card') }}</a>
          </div>

          <div v-reveal="{ delay: 180 }" class="footer__column">
            <h4 class="footer__heading">{{ $t('footer.useCases.heading') }}</h4>
            <a href="#" class="footer__link">{{ $t('footer.useCases.treasury') }}</a>
            <a href="#" class="footer__link">{{ $t('footer.useCases.importExport') }}</a>
            <a href="#" class="footer__link">{{ $t('footer.useCases.services') }}</a>
            <a href="#" class="footer__link">{{ $t('footer.useCases.vc') }}</a>
            <a href="#" class="footer__link">{{ $t('footer.useCases.crypto') }}</a>
          </div>

          <div v-reveal="{ delay: 240 }" class="footer__column">
            <h4 class="footer__heading">{{ $t('footer.resources.heading') }}</h4>
            <a href="#" class="footer__link">{{ $t('footer.resources.legal') }}</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped src="../styles/components/Footer.css"></style>
