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
 * 获取博客列表
 * @param {{ pageNum?: number, pageSize?: number, search?: string, status?: string }} params
 * @returns {Promise<{ content: any[], totalPages: number, totalElements: number, first: boolean, last: boolean, empty: boolean }>}
 */
export async function getBlogList({ pageNum = 1, pageSize = 9, search, status = 'published' } = {}) {
  const res = await apiClient.post('/api/blog/list', {
    pageNum,
    pageSize,
    search: search || undefined,
    status,
  })
  return unwrap(res.data)
}

/**
 * 获取博客详情
 * @param {number|string} id
 * @returns {Promise<any>}
 */
export async function getBlogDetail(id) {
  const res = await apiClient.get(`/api/blog/detail/${id}`)
  return unwrap(res.data)
}
