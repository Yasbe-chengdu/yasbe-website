// Legal content lazy-loader (mirrors i18n/index.js pattern)
import { i18n } from '../../i18n/index.js'
import { legalContent as enContent } from './en.js'

const STORAGE_KEY = 'yasbe-locale'

const defaultLocale = 'en'
const loadedLocales = new Set([defaultLocale])
const localeLoadPromises = new Map()

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

  if (loadedLocales.has(target)) return contentCache.get(target)

  // 法律内容也是异步 chunk。频繁切换时复用同语言加载 promise，避免重复 import。
  if (!localeLoadPromises.has(target)) {
    const loadPromise = contentLoaders[target]()
      .then((content) => {
        contentCache.set(target, content)
        loadedLocales.add(target)
        return content
      })
      .finally(() => {
        localeLoadPromises.delete(target)
      })
    localeLoadPromises.set(target, loadPromise)
  }

  return localeLoadPromises.get(target)
}

/**
 * Get legal content for the current active locale.
 * Returns English content if the locale hasn't been loaded yet.
 */
export function getLegalContent(locale = i18n.global.locale.value) {
  const target = supportedLocales.has(locale) ? locale : defaultLocale
  return contentCache.get(target) ?? contentCache.get(defaultLocale) ?? enContent
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
