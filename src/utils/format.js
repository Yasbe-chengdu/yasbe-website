const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * 将 ISO 时间字符串格式化为 "06 Jun 2026" 形式
 * @param {string|number|Date} value
 * @returns {string}
 */
export function formatPostDate(value) {
  if (!value) return ''
  const d = new Date(value)
  if (isNaN(d.getTime())) return String(value)
  const day = String(d.getDate()).padStart(2, '0')
  return `${day} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

// 兼容别名：新闻模块沿用旧名 formatNewsDate
export const formatNewsDate = formatPostDate
