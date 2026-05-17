<template>
  <div class="contact-page">
    <Navbar />

    <main>
      <section class="contact-hero">
        <div class="contact-hero__pattern" aria-hidden="true"></div>
        <div class="contact-hero__inner">
          <div class="contact-hero__copy">
            <h1 v-reveal class="contact-hero__title">
              <span>{{ $t('contactPage.hero.titleLine1') }}</span>
              <strong>{{ $t('contactPage.hero.titleLine2') }}</strong>
            </h1>
            <p v-reveal="{ delay: 80, distance: 24 }" class="contact-hero__subtitle">
              {{ $t('contactPage.hero.subtitle') }}
            </p>
          </div>

          <div class="contact-overview">
            <article
              v-for="item in overviewItems"
              :key="item.titleKey"
              v-reveal="{ delay: item.delay, distance: 32 }"
              class="contact-overview__card"
            >
              <img :src="item.icon" alt="" class="contact-overview__icon" aria-hidden="true" />
              <div>
                <h2>{{ $t(item.titleKey) }}</h2>
                <p>{{ $t(item.textKey) }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="contact-form-section">
        <div class="contact-form-section__inner">
          <div class="contact-form-section__header">
            <h2 v-reveal class="contact-form-section__title">
              {{ $t('contactPage.form.titleLine1') }}<br />
              {{ $t('contactPage.form.titleLine2') }}
            </h2>
            <p v-reveal="{ delay: 80, origin: 'right', distance: 32 }">
              {{ $t('contactPage.form.subtitle') }}
            </p>
          </div>

          <form v-reveal="{ delay: 120, distance: 32 }" class="contact-form" @submit.prevent>
            <div class="contact-field contact-field--full">
              <label for="contact-full-name">{{ $t('contactPage.form.fields.fullName.label') }}</label>
              <input
                id="contact-full-name"
                type="text"
                required
                :placeholder="$t('contactPage.form.fields.fullName.placeholder')"
              />
            </div>

            <div class="contact-form__grid">
              <div class="contact-field">
                <label for="contact-company-name">{{ $t('contactPage.form.fields.companyName.label') }}</label>
                <input
                  id="contact-company-name"
                  type="text"
                  required
                  :placeholder="$t('contactPage.form.fields.companyName.placeholder')"
                />
              </div>

              <div class="contact-field">
                <label for="contact-company-website">{{ $t('contactPage.form.fields.companyWebsite.label') }}</label>
                <input
                  id="contact-company-website"
                  type="url"
                  required
                  :placeholder="$t('contactPage.form.fields.companyWebsite.placeholder')"
                />
              </div>

              <div class="contact-field">
                <label for="contact-business-email">{{ $t('contactPage.form.fields.businessEmail.label') }}</label>
                <input
                  id="contact-business-email"
                  type="email"
                  required
                  :placeholder="$t('contactPage.form.fields.businessEmail.placeholder')"
                />
              </div>

              <div class="contact-field">
                <label for="contact-messenger">{{ $t('contactPage.form.fields.messenger.label') }}</label>
                <input
                  id="contact-messenger"
                  type="text"
                  required
                  :placeholder="$t('contactPage.form.fields.messenger.placeholder')"
                />
              </div>
            </div>

            <div class="contact-field contact-field--message">
              <label for="contact-message">{{ $t('contactPage.form.fields.message.label') }}</label>
              <textarea
                id="contact-message"
                required
                :placeholder="$t('contactPage.form.fields.message.placeholder')"
              ></textarea>
            </div>

            <button type="submit" class="contact-form__submit">
              {{ $t('contactPage.form.submit') }}
            </button>
          </form>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import solutionIcon from '../assets/images/contact-icon-solution.png?no-inline'
import qaIcon from '../assets/images/contact-icon-qa.png?no-inline'
import consultationIcon from '../assets/images/contact-icon-consultation.png?no-inline'

const overviewItems = [
  {
    icon: solutionIcon,
    titleKey: 'contactPage.overview.solution.title',
    textKey: 'contactPage.overview.solution.text',
    delay: 40,
  },
  {
    icon: qaIcon,
    titleKey: 'contactPage.overview.qa.title',
    textKey: 'contactPage.overview.qa.text',
    delay: 100,
  },
  {
    icon: consultationIcon,
    titleKey: 'contactPage.overview.consultation.title',
    textKey: 'contactPage.overview.consultation.text',
    delay: 160,
  },
]
</script>

<style scoped src="../styles/views/ContactView.css"></style>
