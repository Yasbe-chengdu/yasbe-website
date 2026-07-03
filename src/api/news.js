import { apiClient } from './http.js'

/**
 * 获取后端返回体中的 data，失败时抛错
 * @param {any} payload axios 响应体（res.data）
 * @returns {any}
 */
function unwrap(payload) {
  if (payload && payload.success !== false && payload.data != null) {
    return payload.data
  }
  throw new Error(payload?.message || 'Request failed')
}

/**
 * 获取新闻列表
 * @param {{ pageNum?: number, pageSize?: number, status?: string }} params
 * @returns {Promise<{ content: any[], totalPages: number, totalElements: number, number: number, size: number, first: boolean, last: boolean, empty: boolean }>}
 */
export async function getNewsList({ pageNum = 1, pageSize = 10, status = 'published' } = {}) {
  const res = await apiClient.post('/api/news/list', {
    params: { pageNum, pageSize, status },
  })
  return unwrap(res.data)
}

/**
 * 获取新闻详情
 * @param {number|string} id
 * @returns {Promise<any>}
 */
export async function getNewsDetail(id) {
  const res = await apiClient.get(`/api/news/detail/${id}`)
  return unwrap(res.data)
}
