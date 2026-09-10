import axios from 'axios'
import { i18n } from '../i18n'

const defaultApiBaseUrl = import.meta.env.MODE === 'production' ? 'https://api.yasbe.com' : 'https://api.beeznis.com'


export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 每次请求动态带上当前多语言类型，切换语言后立即生效
apiClient.interceptors.request.use((config) => {
  config.headers.lang = i18n.global.locale.value
  return config
})
