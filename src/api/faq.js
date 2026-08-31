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
 * 获取 FAQ 列表
 * @param {{ pageNum?: number, pageSize?: number, sectionId?: number|string, search?: string, category?: string }} params
 * @returns {Promise<{ content: any[], totalPages?: number, totalElements?: number, total?: number }>}
 */
export async function getFaqList({ pageNum = 1, pageSize = 100, sectionId = '', search = '', category = '' } = {}) {
  const payload = {
    pageNum,
    pageSize,
    search,
  }
  const categoryName = String(category || '').trim()
  const normalizedSectionId = String(sectionId || '').trim()

  if (categoryName) {
    payload.category = categoryName
  }

  if (normalizedSectionId) {
    payload.sectionId = sectionId
  }

  const res = await apiClient.post('/api/faq/list', payload)
  return unwrap(res.data)
}

/**
 * 获取 FAQ 分类列表
 * @param {{ pageNum?: number, pageSize?: number, category?: string }} params
 * @returns {Promise<{ content: any[], totalPages?: number, totalElements?: number, total?: number }>}
 */
export async function getFaqCategoryList({ pageNum = 1, pageSize = 10, category = '' } = {}) {
  const payload = {
    pageNum,
    pageSize,
  }
  const categoryName = String(category || '').trim()

  if (categoryName) {
    payload.category = categoryName
  }

  const res = await apiClient.post('/api/faq/category/list', payload)
  return unwrap(res.data)
}

/**
 * 获取一级分类下的二级主题。
 * @param {number|string} categoryId
 * @returns {Promise<any[]>}
 */
export async function getFaqSectionList(categoryId) {
  const res = await apiClient.get(`/api/faq/section/category/${categoryId}`)
  return unwrap(res.data)
}

/**
 * 获取 FAQ 详情
 * @param {number|string} id
 * @returns {Promise<any>}
 */
export async function getFaqDetail(id) {
  const res = await apiClient.get(`/api/faq/detail/${id}`)
  return unwrap(res.data)
}
