import axios from 'axios'

const defaultApiBaseUrl = import.meta.env.MODE === 'production' ? 'https://api.yasbe.com' : 'https://api.beeznis.com'


export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})
