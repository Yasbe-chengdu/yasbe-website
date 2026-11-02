// 仅在当前文档页内存中保存三类凭证，账户Token永不当作业务Bearer发送。
export function updateFiatDocsSession(current, endpoint, response) {
  if (response.success !== true) return current
  const next = { ...current }, data = response.data
  if (endpoint.path === '/partner-api/v1/oauth/token' && data?.accessToken) next.apiToken = data.accessToken
  else if (endpoint.path.startsWith('/apiTenant/')) {
    if (data?.accountToken) next.accountToken = data.accountToken
    if (data?.accessToken) next.memberToken = data.accessToken
    if (['/apiTenant/account/logout', '/apiTenant/auth/account/logout', '/apiTenant/account/security/password', '/apiTenant/auth/password-reset', '/apiTenant/auth/login/totp/confirm', '/apiTenant/account/security/totp/confirm'].includes(endpoint.path)) {
      next.accountToken = ''
      next.memberToken = ''
    }
  }
  return next
}
export function memberRequestExample(endpoint, accountToken) {
  const body = structuredClone(endpoint.example)
  if (body && Object.hasOwn(body, 'accountToken') && accountToken) body.accountToken = accountToken
  return body
}
