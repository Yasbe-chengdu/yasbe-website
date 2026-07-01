<template>
  <section id="institutional-otc" class="features">
    <div class="features__container">
      <h2 v-reveal class="features__title">{{ $t('features.title') }}</h2>

      <!-- <div v-reveal="{ delay: 80, distance: 28 }" class="features__content">
        <div class="features__track" :style="trackStyle">
          <div v-for="slide in featureSlides" :key="slide.key" class="features__slide">
            <div class="features__visual features__visual--dark">
              <template v-if="slide.type === 'exchange'">
                <div class="exchange-card">
                  <div class="exchange-card__users exchange-card__users--top">
                    <div class="exchange-card__user"></div>
                    <div class="exchange-card__user"></div>
                    <div class="exchange-card__user"></div>
                  </div>
                  <div class="exchange-card__arrow exchange-card__arrow--up">
                    <img src="../assets/images/decor-arrow-up.svg" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div class="exchange-card__main">
                    <img
                      src="../assets/images/glow-exchange.png"
                      alt=""
                      class="exchange-card__glow motion-glow"
                      loading="lazy"
                      decoding="async"
                    />
                    <div class="exchange-card__content">
                      <p class="exchange-card__update">{{ $t('features.slide1.update') }}</p>
                      <div class="exchange-card__inputs">
                        <div class="exchange-input" :class="{ 'exchange-input--open': openPicker === 'from' }">
                          <span class="exchange-input__label">{{ $t('features.slide1.from') }}</span>
                          <div class="exchange-input__row">
                            <button
                              type="button"
                              class="exchange-input__currency"
                              :aria-expanded="openPicker === 'from'"
                              aria-label="Select source currency"
                              @click.stop="toggleCurrencyPicker('from')"
                            >
                              <img
                                v-if="currencyIcon(fromCurrency)"
                                :src="currencyIcon(fromCurrency)"
                                :alt="fromCurrency.code"
                              />
                              <span v-else class="exchange-input__flag">{{ currencyFlag(fromCurrency) }}</span>
                              <span>{{ fromCurrency.code }}</span>
                              <img :src="chevronIcon" alt="" class="exchange-input__chevron" />
                            </button>
                            <input
                              v-model="fromAmount"
                              class="exchange-input__value exchange-input__value-field"
                              type="text"
                              inputmode="decimal"
                              aria-label="Source amount"
                              @input="handleFromAmountInput"
                            />
                          </div>
                          <div
                            v-if="openPicker === 'from'"
                            class="exchange-input__dropdown"
                            @click.stop
                          >
                            <div class="exchange-input__search-wrap">
                              <input
                                v-model="currencySearchTerm"
                                class="exchange-input__search"
                                type="text"
                                placeholder="Search currencies..."
                                aria-label="Search currencies"
                                @keydown.esc="closeCurrencyPicker"
                              />
                              <button
                                v-if="currencySearchTerm"
                                type="button"
                                class="exchange-input__clear"
                                aria-label="Clear search"
                                @click="currencySearchTerm = ''"
                              >
                                x
                              </button>
                            </div>
                            <div class="exchange-input__options">
                              <button
                                v-for="curr in filteredCurrencies"
                                :key="curr.code"
                                type="button"
                                class="exchange-input__option"
                                :class="{ 'exchange-input__option--selected': curr.code === fromCurrency.code }"
                                @click="selectCurrency('from', curr)"
                              >
                                <img v-if="currencyIcon(curr)" :src="currencyIcon(curr)" :alt="curr.code" />
                                <span v-else class="exchange-input__flag">{{ currencyFlag(curr) }}</span>
                                <span class="exchange-input__option-text">
                                  <strong>{{ curr.code }}</strong>
                                  <small>{{ curr.name }}</small>
                                </span>
                              </button>
                              <p v-if="filteredCurrencies.length === 0" class="exchange-input__empty">
                                No currencies found
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="exchange-input" :class="{ 'exchange-input--open': openPicker === 'to' }">
                          <span class="exchange-input__label">{{ $t('features.slide1.to') }}</span>
                          <div class="exchange-input__row">
                            <button
                              type="button"
                              class="exchange-input__currency"
                              :aria-expanded="openPicker === 'to'"
                              aria-label="Select target currency"
                              @click.stop="toggleCurrencyPicker('to')"
                            >
                              <img
                                v-if="currencyIcon(toCurrency)"
                                :src="currencyIcon(toCurrency)"
                                :alt="toCurrency.code"
                              />
                              <span v-else class="exchange-input__flag">{{ currencyFlag(toCurrency) }}</span>
                              <span>{{ toCurrency.code }}</span>
                              <img :src="chevronIcon" alt="" class="exchange-input__chevron" />
                            </button>
                            <input
                              class="exchange-input__value exchange-input__value-field"
                              type="text"
                              :value="toAmount"
                              readonly
                              aria-label="Converted amount"
                            />
                          </div>
                          <div
                            v-if="openPicker === 'to'"
                            class="exchange-input__dropdown exchange-input__dropdown--above"
                            @click.stop
                          >
                            <div class="exchange-input__search-wrap">
                              <input
                                v-model="currencySearchTerm"
                                class="exchange-input__search"
                                type="text"
                                placeholder="Search currencies..."
                                aria-label="Search currencies"
                                @keydown.esc="closeCurrencyPicker"
                              />
                              <button
                                v-if="currencySearchTerm"
                                type="button"
                                class="exchange-input__clear"
                                aria-label="Clear search"
                                @click="currencySearchTerm = ''"
                              >
                                x
                              </button>
                            </div>
                            <div class="exchange-input__options">
                              <button
                                v-for="curr in filteredCurrencies"
                                :key="curr.code"
                                type="button"
                                class="exchange-input__option"
                                :class="{ 'exchange-input__option--selected': curr.code === toCurrency.code }"
                                @click="selectCurrency('to', curr)"
                              >
                                <img v-if="currencyIcon(curr)" :src="currencyIcon(curr)" :alt="curr.code" />
                                <span v-else class="exchange-input__flag">{{ currencyFlag(curr) }}</span>
                                <span class="exchange-input__option-text">
                                  <strong>{{ curr.code }}</strong>
                                  <small>{{ curr.name }}</small>
                                </span>
                              </button>
                              <p v-if="filteredCurrencies.length === 0" class="exchange-input__empty">
                                No currencies found
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="exchange-card__rate">
                        <span>{{ $t('features.slide1.rateLabel') }}</span>
                        <span>{{ exchangeRateText }}</span>
                      </div>
                      <button type="button" class="exchange-card__btn">{{ $t('features.slide1.exchangeButton') }}</button>
                    </div>
                  </div>
              
                  <div class="exchange-card__users exchange-card__users--bottom">
                    <div class="exchange-card__user"></div>
                    <div class="exchange-card__user"></div>
                    <div class="exchange-card__user"></div>
                  </div>
                </div>
              </template>
              <img v-else :src="slide.image" :alt="slide.imageAlt" loading="lazy" decoding="async" />
            </div>

            <div class="features__info">
              <div class="features__text">
                <h3
                  v-if="slide.titleHtml"
                  class="features__subtitle"
                  v-html="$t(`features.${slide.key}.title`)"
                ></h3>
                <h3 v-else class="features__subtitle">{{ $t(`features.${slide.key}.title`) }}</h3>
                <p class="features__description">{{ $t(`features.${slide.key}.description`) }}</p>

                <div v-if="slide.hasList" class="features__list">
                  <p class="features__list-title">{{ $t(`features.${slide.key}.listTitle`) }}</p>
                  <p class="features__list-items" v-html="$t(`features.${slide.key}.listItems`)"></p>
                </div>

                <a v-if="slide.hasCta" :href="customerBaseUrl" target="_blank" rel="noopener noreferrer" class="features__cta">
                  <span>{{ $t(`features.${slide.key}.cta`) }}</span>
                  <div class="features__cta-icon">
                    <img src="../assets/images/icon-arrow-right-dark.svg" alt="Arrow" loading="lazy" decoding="async" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <FeatureNav
          class="features__nav-overlay"
          :current-slide="currentSlide"
          :total-slides="totalSlides"
          @prev="prevSlide"
          @next="nextSlide"
          @go-to-slide="goToSlide"
        />
      </div> -->
    
      <div v-reveal="{ delay: 80, distance: 28 }" class="new-fetureas" @mouseleave="activeNewFeatureIndex = 0">
        <article
          v-for="(item, index) in newFeatureCards"
          :key="item.title"
          class="new-feature-card"
          :class="{ 'new-feature-card--active': activeNewFeatureIndex === index }"
          :style="newFeatureCardStyles[index]"
          tabindex="0"
          @mouseenter="activeNewFeatureIndex = index"
          @focusin="activeNewFeatureIndex = index"
        >
          <div class="new-feature-card__copy">
            <h3>{{ item.title }}</h3>
            <div class="new-feature-card__description">
              <p v-for="paragraph in item.description" :key="paragraph">{{ paragraph }}</p>
            </div>
          </div>
          <img
            :src="item.image"
            :alt="item.title"
            class="new-feature-card__image"
            loading="lazy"
            decoding="async"
          />
        </article>
      </div>
    
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import img2 from '../assets/images/img2.png'

const customerBaseUrl = import.meta.env.VITE_CUSTOMER_BASE_URL ?? 'https://customer.yasbe.com/'
import img3 from '../assets/images/img3.png'
import img4 from '../assets/images/img4.png'
import featureApiIntegration from '../assets/images/features/api-integration.png'
import featureMultiChainAsset from '../assets/images/features/multi-chain-asset.png'
import featurePaymentAi from '../assets/images/features/payment-ai.png'
import featureRegulatoryCompliance from '../assets/images/features/regulatory-compliance.png'
import btcIcon from '../assets/images/icon-btc.svg'
import usdIcon from '../assets/images/icon-usd.svg'
import chevronIcon from '../assets/images/icon-chevron-down.svg'
import FeatureNav from './FeatureNav.vue'
import rawCurrencies from '../data/currencies.json'

const defaultCryptoQuotes = [
  {
    code: 'BTC',
    name: 'Bitcoin',
    price: 81425.21038826655,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
  },
  {
    code: 'ETH',
    name: 'Ethereum',
    price: 2372.2704701107477,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  {
    code: 'USDT',
    name: 'Tether USDt',
    price: 0.9998224091539161,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
  },
  {
    code: 'XRP',
    name: 'XRP',
    price: 1.4331813575972154,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
  },
  {
    code: 'BNB',
    name: 'BNB',
    price: 639.4796334020433,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  },
  {
    code: 'USDC',
    name: 'USDC',
    price: 0.9998232869887596,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
  },
  {
    code: 'SOL',
    name: 'Solana',
    price: 87.77638652684105,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
  },
  {
    code: 'TRX',
    name: 'TRON',
    price: 0.34295492041093595,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png',
  },
  {
    code: 'DOGE',
    name: 'Dogecoin',
    price: 0.11593934992953861,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
  },
  {
    code: 'HYPE',
    name: 'Hyperliquid',
    price: 44.34456178929289,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/32196.png',
  },
]

const specialCurrencyIcons = {
  BTC: btcIcon,
  USD: usdIcon,
}

const buildInitialCurrencies = () => {
  const fiatCurrencies = rawCurrencies.filter((currency) => !currency.logo)
  const cryptoCurrencies = defaultCryptoQuotes.map((currency) => ({
    ...(rawCurrencies.find((item) => item.code === currency.code) || {}),
    ...currency,
  }))

  return [...cryptoCurrencies, ...fiatCurrencies]
}

const featureSlides = [
  {
    key: 'slide1',
    type: 'exchange',
    titleHtml: true,
    hasCta: true,
  },
  {
    key: 'slide2',
    image: img2,
    imageAlt: '',
  },
  {
    key: 'slide3',
    image: img3,
    imageAlt: '',
    hasList: true,
    hasCta: true,
  },
  {
    key: 'slide4',
    image: img4,
    imageAlt: '',
    hasList: true,
    hasCta: true,
  },
]

const currentSlide = ref(0)
const activeNewFeatureIndex = ref(0)
const totalSlides = featureSlides.length
const allCurrencies = ref(buildInitialCurrencies())
const fromCurrencyCode = ref('BTC')
const toCurrencyCode = ref('USD')
const fromAmount = ref('1')
const exchangeRate = ref(1)
const isRateLoading = ref(false)
const openPicker = ref(null)
const currencySearchTerm = ref('')
let rateRequestId = 0

const newFeatureCards = [
  {
    title: 'Multi-Chain, Multi-Asset Support',
    image: featureMultiChainAsset,
    description: [
      'A unified PayFi infrastructure connecting fiat and digital asset ecosystems, enabling seamless value movement across banking networks, card schemes, and blockchains.',
    ],
  },
  {
    title: 'Regulatory Compliance',
    image: featureRegulatoryCompliance,
    description: [
      'Built-in KYC/KYB, AML monitoring, Sanctions Screening, transaction monitoring across all payment rails, and KYT on-chain screening, ensuring continuous verification, monitoring, and global regulatory compliance.',
    ],
  },
  {
    title: 'Payment AI',
    image: featurePaymentAi,
    description: [
      'Intelligent payment infrastructure designed to optimize routing, FX execution, and global money movement in real time.',
      'Ensures payments are processed through the most efficient pathways across fiat and digital rails, enabling continuous, always-on financial operations where money never sleeps.',
    ],
  },
  {
    title: 'API Integration',
    image: featureApiIntegration,
    description: [
      'Developer-first infrastructure designed for seamless embedding of financial services.',
      'Our API-driven platform enables businesses to integrate banking, payments, and digital asset capabilities directly into their own products through a fully supported Developer Portal.',
    ],
  },
]

const newFeatureCardStyles = computed(() => {
  const compactWidth = 248
  const activeWidth = 408
  const gap = 16

  return newFeatureCards.map((_, index) => {
    const x = newFeatureCards.slice(0, index).reduce((offset, __, previousIndex) => {
      const width = activeNewFeatureIndex.value === previousIndex ? activeWidth : compactWidth
      return offset + width + gap
    }, 0)

    return {
      '--new-feature-x': `${x}px`,
      '--new-feature-width': `${activeNewFeatureIndex.value === index ? activeWidth : compactWidth}px`,
    }
  })
})

const format2digits = (value) => {
  if (!Number.isFinite(value) || value === 0) {
    return '0'
  }

  const absoluteValue = Math.abs(value)

  if (absoluteValue >= 1) {
    return value
      .toFixed(2)
      .replace(/\.0+$/, '')
      .replace(/\.$/, '')
  }

  const exponent = Math.floor(Math.log10(absoluteValue))
  const decimals = Math.max(0, 1 - exponent)

  return value
    .toFixed(decimals)
    .replace(/0+$/, '')
    .replace(/\.$/, '')
}

const fromCurrency = computed(
  () => allCurrencies.value.find((currency) => currency.code === fromCurrencyCode.value) || allCurrencies.value[0],
)

const toCurrency = computed(
  () => allCurrencies.value.find((currency) => currency.code === toCurrencyCode.value) || allCurrencies.value[1],
)

const filteredCurrencies = computed(() => {
  const normalizedSearchTerm = currencySearchTerm.value.trim().toLowerCase()

  if (!normalizedSearchTerm) {
    return allCurrencies.value
  }

  return allCurrencies.value.filter((currency) => {
    const code = currency.code || ''
    const name = currency.name || ''

    return (
      code.toLowerCase().includes(normalizedSearchTerm) ||
      name.toLowerCase().includes(normalizedSearchTerm)
    )
  })
})

const toAmount = computed(() => {
  const amount = Number.parseFloat(fromAmount.value)

  if (!Number.isFinite(amount)) {
    return '0'
  }

  return format2digits(amount * exchangeRate.value)
})

const exchangeRateText = computed(() => {
  if (isRateLoading.value) {
    return 'Loading...'
  }

  return `1 ${fromCurrency.value.code} = ${format2digits(exchangeRate.value)} ${toCurrency.value.code}`
})

const trackStyle = computed(() => ({
  transform: `translateX(-${currentSlide.value * 100}%)`,
}))

const nextSlide = () => {
  currentSlide.value = Math.min(currentSlide.value + 1, totalSlides - 1)
}

const prevSlide = () => {
  currentSlide.value = Math.max(currentSlide.value - 1, 0)
}

const goToSlide = (index) => {
  if (index === currentSlide.value) {
    return
  }

  currentSlide.value = Math.min(Math.max(index, 0), totalSlides - 1)
}

const handleFromAmountInput = (event) => {
  const sanitizedValue = event.target.value
    .replace(/[^\d.]/g, '')
    .replace(/(\..*)\./g, '$1')

  fromAmount.value = sanitizedValue
}

const toggleCurrencyPicker = (side) => {
  openPicker.value = openPicker.value === side ? null : side
  currencySearchTerm.value = ''
}

const closeCurrencyPicker = () => {
  openPicker.value = null
  currencySearchTerm.value = ''
}

const selectCurrency = (side, currency) => {
  if (side === 'from') {
    fromCurrencyCode.value = currency.code
  } else {
    toCurrencyCode.value = currency.code
  }

  closeCurrencyPicker()
}

const currencyIcon = (currency) => {
  if (!currency) {
    return ''
  }

  return specialCurrencyIcons[currency.code] || currency.logo || ''
}

const currencyFlag = (currency) => {
  const symbol = currency?.symbol

  if (!symbol || !/^[a-z]{2}$/i.test(symbol)) {
    return currency?.code?.slice(0, 2) || ''
  }

  return symbol
    .toUpperCase()
    .split('')
    .map((character) => String.fromCodePoint(127397 + character.charCodeAt(0)))
    .join('')
}

const isCryptoCurrency = (currency) => (
  Number.isFinite(Number(currency?.price)) &&
  Number(currency?.price) > 0 &&
  Boolean(currency?.logo)
)

const mergeCryptoQuotes = (quotes) => {
  const nextCurrencies = [...allCurrencies.value]

  quotes.filter(isCryptoCurrency).forEach((quote) => {
    const index = nextCurrencies.findIndex((currency) => currency.code === quote.code)

    if (index >= 0) {
      nextCurrencies[index] = {
        ...nextCurrencies[index],
        ...quote,
      }
    } else {
      nextCurrencies.unshift(quote)
    }
  })

  allCurrencies.value = nextCurrencies
}

const fetchCryptoQuotes = async () => {
  try {
    const response = await fetch('/api/crypto')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (!Array.isArray(result)) {
      throw new Error('Invalid crypto quotes response')
    }

    mergeCryptoQuotes(result)
  } catch (error) {
    mergeCryptoQuotes(defaultCryptoQuotes)
    console.error('Error fetching crypto quotes:', error)
  }
}

const getExchangeRateHistory = async (base = 'USD', term = 'CAD', period = 'day') => {
  const response = await fetch('https://api.rates-history-service.prd.aws.ofx.com/rate-history/api/1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      method: 'spotRateHistory',
      data: { base, term, period },
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result = await response.json()
  const rate = result?.data?.CurrentInterbankRate

  if (!Number.isFinite(Number(rate))) {
    throw new Error(`Missing exchange rate for ${base}/${term}`)
  }

  return Number(rate)
}

const getFiatRate = async (base, term) => {
  if (base === term) {
    return 1
  }

  if (base === 'USD' && term === 'USD') {
    return 1
  }

  return getExchangeRateHistory(base, term, 'day')
}

const getFiatToUsdRate = async (currencyCode) => {
  if (currencyCode === 'USD') {
    return 1
  }

  try {
    return await getFiatRate(currencyCode, 'USD')
  } catch (error) {
    const usdToCurrencyRate = await getFiatRate('USD', currencyCode)
    return 1 / usdToCurrencyRate
  }
}

const resolveExchangeRate = async (from, to) => {
  if (!from || !to || from.code === to.code) {
    return 1
  }

  const fromIsCrypto = isCryptoCurrency(from)
  const toIsCrypto = isCryptoCurrency(to)

  if (fromIsCrypto && toIsCrypto) {
    return Number(from.price) / Number(to.price)
  }

  if (fromIsCrypto) {
    const usdToTermRate = await getFiatRate('USD', to.code)
    return Number(from.price) * usdToTermRate
  }

  if (toIsCrypto) {
    const fromToUsdRate = await getFiatToUsdRate(from.code)
    return fromToUsdRate / Number(to.price)
  }

  return getFiatRate(from.code, to.code)
}

const refreshExchangeRate = async () => {
  const requestId = ++rateRequestId
  isRateLoading.value = true

  try {
    const rate = await resolveExchangeRate(fromCurrency.value, toCurrency.value)

    if (requestId === rateRequestId) {
      exchangeRate.value = rate
    }
  } catch (error) {
    if (requestId === rateRequestId) {
      exchangeRate.value = 1
    }

    console.error('Error fetching exchange rate:', error)
  } finally {
    if (requestId === rateRequestId) {
      isRateLoading.value = false
    }
  }
}

const handleDocumentPointerDown = (event) => {
  if (!(event.target instanceof Element) || !event.target.closest('.exchange-card__inputs')) {
    closeCurrencyPicker()
  }
}

watch([fromCurrencyCode, toCurrencyCode], refreshExchangeRate, { immediate: true })

onMounted(() => {
  document.addEventListener('mousedown', handleDocumentPointerDown)
  fetchCryptoQuotes().then(refreshExchangeRate)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleDocumentPointerDown)
})
</script>

<style scoped src="../styles/components/FeaturesSection.css"></style>
