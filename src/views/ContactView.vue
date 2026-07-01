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
            <!-- <p v-reveal="{ delay: 80, distance: 24 }" class="contact-hero__subtitle">
              {{ $t('contactPage.hero.subtitle') }}
            </p> -->
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

          <form v-reveal="{ delay: 120, distance: 32 }" class="contact-form" @submit.prevent="submitEnquiry">
            <div class="contact-field contact-field--full contact-field--required">
              <label for="contact-full-name">{{ $t('contactPage.form.fields.fullName.label') }}</label>
              <input
                id="contact-full-name"
                v-model.trim="form.fullName"
                type="text"
                required
                :disabled="isSubmitting"
                :placeholder="$t('contactPage.form.fields.fullName.placeholder')"
              />
            </div>

            <div class="contact-form__grid">
              <div class="contact-field">
                <label for="contact-company-name">{{ $t('contactPage.form.fields.companyName.label') }}</label>
                <input
                  id="contact-company-name"
                  v-model.trim="form.companyName"
                  type="text"
                  :disabled="isSubmitting"
                  :placeholder="$t('contactPage.form.fields.companyName.placeholder')"
                />
              </div>

              <div class="contact-field">
                <label for="contact-company-website">{{ $t('contactPage.form.fields.companyWebsite.label') }}</label>
                <input
                  id="contact-company-website"
                  v-model.trim="form.website"
                  type="url"
                  :disabled="isSubmitting"
                  :placeholder="$t('contactPage.form.fields.companyWebsite.placeholder')"
                />
              </div>

              <div class="contact-field contact-field--required">
                <label for="contact-business-email">{{ $t('contactPage.form.fields.businessEmail.label') }}</label>
                <input
                  id="contact-business-email"
                  v-model.trim="form.email"
                  type="email"
                  required
                  :disabled="isSubmitting"
                  :placeholder="$t('contactPage.form.fields.businessEmail.placeholder')"
                />
              </div>

              <div class="contact-field">
                <label for="contact-messenger">{{ $t('contactPage.form.fields.messenger.label') }}</label>
                <input
                  id="contact-messenger"
                  v-model.trim="form.telegramWhatsApp"
                  type="text"
                  :disabled="isSubmitting"
                  :placeholder="$t('contactPage.form.fields.messenger.placeholder')"
                />
              </div>
            </div>

            <div class="contact-field contact-field--message contact-field--required">
              <label for="contact-message">{{ $t('contactPage.form.fields.message.label') }}</label>
              <textarea
                id="contact-message"
                v-model.trim="form.message"
                required
                :disabled="isSubmitting"
                :placeholder="$t('contactPage.form.fields.message.placeholder')"
              ></textarea>
            </div>

            <p v-if="submitMessage" class="contact-form__message" :class="`contact-form__message--${submitState}`" role="status">
              {{ submitMessage }}
            </p>

            <button type="submit" class="contact-form__submit" :disabled="isSubmitting">
              {{ isSubmitting ? $t('contactPage.form.submitting') : $t('contactPage.form.submit') }}
            </button>
          </form>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { apiClient } from '../api/http'
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

const { t } = useI18n()

const initialForm = {
  fullName: '',
  companyName: '',
  email: '',
  website: '',
  telegramWhatsApp: '',
  message: '',
}

const form = reactive({ ...initialForm })
const isSubmitting = ref(false)
const submitState = ref('')
const submitMessage = computed(() => {
  if (!submitState.value) return ''
  return t(`contactPage.form.${submitState.value}`)
})

function resetForm() {
  Object.assign(form, initialForm)
}

function isSuccessResponse(payload) {
  if (!payload || typeof payload !== 'object') return true
  if (payload.success === false) return false
  if (payload.code == null && payload.errorcode == null) return true

  const code = String(payload.code ?? payload.errorcode)
  return ['0', '200', '000000', 'SUCCESS'].includes(code)
}

async function submitEnquiry() {
  if (isSubmitting.value) return

  isSubmitting.value = true
  submitState.value = ''

  try {
    const { data } = await apiClient.post('/api/mail/customer-enquiry', {
      fullName: form.fullName,
      companyName: form.companyName,
      email: form.email,
      website: form.website,
      telegramWhatsApp: form.telegramWhatsApp,
      message: form.message,
    })

    if (!isSuccessResponse(data)) {
      throw new Error(data?.message || data?.errmsg || 'Customer enquiry failed')
    }

    submitState.value = 'success'
    resetForm()
  } catch (error) {
    console.error(error)
    submitState.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped src="../styles/views/ContactView.css"></style>
