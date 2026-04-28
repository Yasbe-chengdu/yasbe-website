import { createI18n } from 'vue-i18n'
import { messages } from './message'

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
    messages,
})

applyDocumentLanguage(i18n.global.locale.value)

export function setAppLocale(locale) {
    if (!supportedLocaleCodes.has(locale)) {
        return
    }

    i18n.global.locale.value = locale
    applyDocumentLanguage(locale)

    if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, locale)
    }
}

