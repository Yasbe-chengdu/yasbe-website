import { createI18n } from 'vue-i18n'
import enMessages from './locales/en.js'

const STORAGE_KEY = 'yasbe-locale'

export const localeOptions = [
    { code: 'en', label: 'English', shortLabel: 'EN' },
    { code: 'zh-CN', label: '简体中文', shortLabel: '简' },
    { code: 'zh-TW', label: '繁體中文', shortLabel: '繁' },
    { code: 'ja', label: '日本語', shortLabel: '日' },
    { code: 'ko', label: '한국어', shortLabel: '한' },
    { code: 'es', label: 'Español', shortLabel: 'ES' },
    { code: 'fr', label: 'Français', shortLabel: 'FR' },
]

const supportedLocaleCodes = new Set(localeOptions.map((option) => option.code))

const defaultLocale = 'en'
const loadedLocaleCodes = new Set([defaultLocale])
const localeLoadPromises = new Map()
let localeSwitchRequestId = 0
const localeLoaders = {
    en: () => Promise.resolve({ default: enMessages }),
    'zh-CN': () => import('./locales/zh-CN.js'),
    'zh-TW': () => import('./locales/zh-TW.js'),
    ja: () => import('./locales/ja.js'),
    ko: () => import('./locales/ko.js'),
    es: () => import('./locales/es.js'),
    fr: () => import('./locales/fr.js'),
}

function getInitialLocale() {
    if (typeof window === 'undefined') {
        return defaultLocale
    }

    const savedLocale = window.localStorage.getItem(STORAGE_KEY)

    return supportedLocaleCodes.has(savedLocale) ? savedLocale : defaultLocale
}

function applyDocumentLanguage(locale) {
    if (typeof document !== 'undefined') {
        document.documentElement.lang = locale
    }
}

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: getInitialLocale(),
    fallbackLocale: defaultLocale,
    messages: {
        [defaultLocale]: enMessages,
    },
})

export async function loadLocaleMessages(locale) {
    if (!supportedLocaleCodes.has(locale) || loadedLocaleCodes.has(locale)) {
        return
    }

    // 多次快速切到同一个语言时复用同一个 import promise，避免重复加载同一 chunk。
    if (!localeLoadPromises.has(locale)) {
        const loadPromise = localeLoaders[locale]()
            .then((module) => {
                i18n.global.setLocaleMessage(locale, module.default)
                loadedLocaleCodes.add(locale)
            })
            .finally(() => {
                localeLoadPromises.delete(locale)
            })
        localeLoadPromises.set(locale, loadPromise)
    }

    return localeLoadPromises.get(locale)
}

export async function setupI18n() {
    const locale = getInitialLocale()
    await loadLocaleMessages(locale)
    i18n.global.locale.value = locale
    applyDocumentLanguage(locale)
}

export async function setAppLocale(locale) {
    if (!supportedLocaleCodes.has(locale)) {
        return
    }

    // 语言包是异步 chunk。快速反复切换时，只允许最后一次选择真正更新全局 locale。
    const requestId = ++localeSwitchRequestId
    await loadLocaleMessages(locale)
    if (requestId !== localeSwitchRequestId) {
        return
    }
    i18n.global.locale.value = locale
    applyDocumentLanguage(locale)

    if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, locale)
    }
}
