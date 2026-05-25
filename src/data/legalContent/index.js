// Legal content lazy-loader (mirrors i18n/index.js pattern)
import { i18n } from '../../i18n/index.js'
import { legalContent as enContent } from './en.js'

const STORAGE_KEY = 'yasbe-locale'

const defaultLocale = 'en'
const loadedLocales = new Set([defaultLocale])

const contentLoaders = {
  en: () => Promise.resolve(enContent),
  'zh-CN': () => import('./zh-CN.js').then((m) => m.legalContent),
  'zh-TW': () => import('./zh-TW.js').then((m) => m.legalContent),
  ja: () => import('./ja.js').then((m) => m.legalContent),
  ko: () => import('./ko.js').then((m) => m.legalContent),
  es: () => import('./es.js').then((m) => m.legalContent),
  fr: () => import('./fr.js').then((m) => m.legalContent),
}

const supportedLocales = new Set(Object.keys(contentLoaders))

/** Pre-cached content map: locale → { tabKey: Block[] } */
const contentCache = new Map()
contentCache.set(defaultLocale, enContent)

/**
 * Load legal content for a specific locale (code-split chunk).
 * Silently falls back to 'en' when the locale is unsupported.
 */
export async function loadLegalContent(locale) {
  const target = supportedLocales.has(locale) ? locale : defaultLocale

  if (loadedLocales.has(target)) return

  const content = await contentLoaders[target]()
  contentCache.set(target, content)
  loadedLocales.add(target)
}

/**
 * Get legal content for the current active locale.
 * Returns English content if the locale hasn't been loaded yet.
 */
export function getLegalContent() {
  const locale = i18n.global.locale.value
  return contentCache.get(locale) ?? contentCache.get(defaultLocale) ?? enContent
}

/**
 * Pre-load legal content for the initial locale.
 * Call once during app startup.
 */
let initPromise = null
export function setupLegalContent() {
  if (!initPromise) {
    initPromise = (async () => {
      const savedLocale =
        typeof window !== 'undefined'
          ? window.localStorage.getItem(STORAGE_KEY)
          : null

      const initialLocale =
        supportedLocales.has(savedLocale) ? savedLocale : defaultLocale

      await loadLegalContent(initialLocale)
    })()
  }
  return initPromise
}
