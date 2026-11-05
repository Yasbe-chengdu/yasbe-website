// 从后端OpenAPI导出安全配置文档；保留真实路由和字段，不另外发明一套白标接口。
import { readFileSync, writeFileSync } from 'node:fs'
const input = process.argv[2]
if (!input) throw new Error('Usage: node scripts/sync-fiat-security-docs.mjs <tenant-openapi.json>')
const document = JSON.parse(readFileSync(input, 'utf8'))
function schema(value = {}) {
  if (value.$ref) return schema(value.$ref.split('/').slice(1).reduce((obj, key) => obj[key], document))
  if (value.allOf) return value.allOf.map(schema).reduce((result, item) => ({ ...result, ...item, properties: { ...result.properties, ...item.properties }, required: [...(result.required ?? []), ...(item.required ?? [])] }), { ...value, allOf: undefined })
  return value
}
const samples = { signatureAlgorithm: 'RSA-SHA256', hmacAlgorithm: 'HMAC-SHA256', algorithm: 'RSA-SHA256', encryptionAlgorithm: null, encryptionKeyFingerprint: null, externalCustomerId: null, environment: 'TEST', id: 123, keyId: 'wl_test_key_example', apiKey: 'yasbe_test_example', apiSecret: '[ONE_TIME_SECRET]', signingSecret: '[ONE_TIME_SECRET]', webhookSecret: '[ONE_TIME_SECRET]', totpCode: '123456', keyLast4: 'ABCD', status: 'ACTIVE', allowedIps: '1.1.1.1,8.8.8.8', url: 'https://hooks.example.com/events', subscribedEvents: ['transaction.updated'], scopes: ['customers:read', 'virtual_accounts:read'], publicKeyPem: '-----BEGIN PUBLIC KEY-----\nYOUR_PUBLIC_KEY\n-----END PUBLIC KEY-----', encryptionPublicKeyPem: '-----BEGIN PUBLIC KEY-----\nYOUR_PUBLIC_KEY\n-----END PUBLIC KEY-----', success: true, code: 'OK', message: 'success', traceId: 'example-trace-id' }
function example(raw, name = '', depth = 0) {
  const value = schema(raw)
  if (value.example !== undefined) return value.example
  if (value.nullable && value.enum?.includes(null)) return null
  if (value.enum?.length) return value.enum[0]
  if (value.type === 'array') return name === 'allowedIps' ? ['1.1.1.1', '8.8.8.8'] : Array.isArray(samples[name]) ? samples[name] : [example(value.items, '', depth + 1)]
  if (samples[name] !== undefined && value.type !== 'object') return samples[name]
  if (depth > 6) return null
  if (value.properties) return Object.fromEntries(Object.entries(value.properties).map(([key, item]) => [key, example(item, key, depth + 1)]))
  if (value.type === 'boolean') return false
  if (['integer', 'number'].includes(value.type)) return 1
  if (value.format === 'date-time') return '2026-11-02T10:00:00'
  if (value.format === 'date') return '2026-11-02'
  return 'example'
}
const englishTitles = {
  'get:api-keys': 'List API Keys', 'post:api-keys': 'Create API Key',
  'post:api-keys/{id}/rotate': 'Rotate API Key', 'post:api-keys/{id}/revoke': 'Revoke API Key',
  'get:webhooks': 'List webhooks', 'post:webhooks': 'Create webhook',
  'post:webhooks/download': 'Create webhook and download credentials', 'put:webhooks/{id}': 'Update webhook',
  'patch:webhooks/{id}/status': 'Pause or enable webhook', 'post:webhooks/{id}/verify': 'Verify webhook endpoint',
  'post:webhooks/{id}/rotate-secret': 'Rotate webhook secret', 'put:webhooks/{id}/payload-encryption': 'Configure callback encryption',
  'get:webhook-deliveries': 'List webhook deliveries', 'get:webhook-deliveries/{id}/attempts': 'List delivery attempts',
  'post:webhook-deliveries/{id}/retry': 'Retry webhook delivery',
  'get:public-keys/{environment}': 'Get webhook public key', 'get:public-keys/{environment}/history': 'List historical public keys',
  'get:public-keys/{environment}/by-id/{keyId}': 'Get public key by ID', 'post:public-keys/{environment}/rotate': 'Rotate signing key',
  'get:public-keys/{environment}/download': 'Download public key PEM',
  'get:webhooks/{id}/ip-allowlist': 'Get callback IP allowlist', 'put:webhooks/{id}/ip-allowlist': 'Replace callback IP allowlist',
}
const englishFields = {
  Authorization: 'Bearer member session token from the console login, not an API Key business token.',
  name: 'Display name for this credential or endpoint.', environment: 'TEST or LIVE; must match the current deployment.',
  scopes: 'Business API permission scopes granted to this API Key.', expiresAt: 'Optional credential expiration time.',
  totpCode: 'Current six-digit account authenticator code when required by policy.', id: 'Record ID returned by the list or create endpoint.',
  keyLast4: 'Last four characters of the API Key, used to confirm the sensitive operation.',
  url: 'A public HTTPS endpoint you control.', externalCustomerId: 'Optional customer-specific callback binding; omit for the default endpoint.',
  subscribedEvents: 'Subscribed event names such as transaction.updated.', payloadEncryptionEnabled: 'Whether to encrypt callback contents.',
  encryptionPublicKeyPem: 'Downstream RSA public key only. Never upload a private key.',
  format: 'Credential attachment format: json or txt.', status: 'ACTIVE or PAUSED; activation requires endpoint verification.',
  enabled: 'Whether callback payload encryption is enabled.', publicKeyPem: 'Downstream RSA public key in PEM format.',
  pageNum: 'Page number starting at 1.', pageSize: 'Records per page, from 1 to 100.', keyId: 'Public signing key identifier.',
}
const entries = []
const localized = {}

for (const [path, methods] of Object.entries(document.paths)) {
  if (!path.startsWith('/apiTenant/developer/')) continue
  for (const [method, operation] of Object.entries(methods)) {
    if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) continue
    const body = operation.requestBody?.content?.['application/json']
    const shape = schema(body?.schema)
    const fields = [{ name: 'Authorization', location: 'Header', required: true, description: '租户成员登录后的 Bearer Token；不能使用 API Key 换取的业务 Token。' }]
    for (const parameter of operation.parameters ?? []) fields.push({ name: parameter.name, location: parameter.in === 'path' ? 'Path' : 'Query', required: !!parameter.required, defaultValue: parameter.schema?.default ?? (parameter.name === 'environment' ? 'TEST' : ''), description: parameter.description ?? schema(parameter.schema).description })
    for (const [name, item] of Object.entries(shape.properties ?? {})) fields.push({ name, required: shape.required?.includes(name) ?? false, description: item.description, type: schema(item).type })
    const response = operation.responses?.['200']?.content ?? {}
    const json = response['application/json']
    const file = !json && Object.keys(response).length > 0
    const requestExample = body?.example ?? (body ? Object.fromEntries((shape.required ?? []).map(name => [name, example(shape.properties[name], name)])) : {})
    if (path.endsWith('/payload-encryption')) Object.assign(requestExample, { enabled: true, publicKeyPem: samples.publicKeyPem })
    if (path.endsWith('/status') && method === 'patch') requestExample.status = 'PAUSED'
    if (path.endsWith('/ip-allowlist') && method === 'put') requestExample.allowedIps = samples.allowedIps
    const responseExample = json?.example ?? (json ? example(json.schema) : 'Attachment download')
    const normalizeResponse = value => {
      if (Array.isArray(value)) return value.forEach(normalizeResponse)
      if (!value || typeof value !== 'object') return
      if ('status' in value) value.status = path.includes('webhook-deliveries') ? 'SUCCESS' : path.includes('/webhooks') ? 'PENDING_VERIFICATION' : 'ACTIVE'
      if ('allowedIps' in value) value.allowedIps = ['1.1.1.1', '8.8.8.8']
      Object.values(value).forEach(normalizeResponse)
    }
    normalizeResponse(responseExample)
    const id = `fiat-security-${method}-${path.split('/developer/')[1].replace(/[{}]/g, '').replaceAll('/', '-')}`
    localized[id] = { label: operation.summary, title: operation.summary, description: operation.description ?? operation.summary,
      detail: '安全配置使用成员登录Token，不能使用API Key业务Token；Secret只展示一次，私钥不下发。回调IP须替换成自己的服务器公网IP。',
      fields: Object.fromEntries(fields.map(field => [field.name, field.description])) }
    for (const field of fields) field.description = field.name === 'allowedIps'
      ? (field.type === 'array' ? 'Public IP array; replace the example values with your callback server IPs.' : 'Comma-separated public IPs; every update replaces the entire previous allowlist.')
      : englishFields[field.name] ?? field.description
    const label = englishTitles[`${method}:${path.split('/developer/')[1]}`]
    if (!label) throw new Error(`Missing English title: ${method} ${path}`)
    entries.push({ id, label, title: label, method: method.toUpperCase(), path, description: label, detail: 'Use a member session token for security settings. API and webhook secrets are shown once; private keys are never downloadable. Replace callback IP examples with your own server addresses.', authType: 'member', requiresAuth: true, successStatus: '200', fields, example: requestExample, responseExample, ...(file ? { responseType: 'file' } : {}), errors: [{ code: 'UNAUTHENTICATED', status: 401, description: '缺少有效成员登录 Token。' }, { code: 'INVALID_TOKEN', status: 401, description: 'Token无效、过期，或使用了错误类型的Token。' }, { code: 'PERMISSION_FORBIDDEN', status: 403, description: '当前成员缺少此操作所需权限。' }, { code: 'INVALID_2FA_CODE', status: 401, description: '需要二次验证时动态码无效。' }] })
  }
}
writeFileSync(new URL('../src/data/apiDocsFiatSecurity.js', import.meta.url), '// Generated by scripts/sync-fiat-security-docs.mjs from backend OpenAPI.\nexport const fiatSecurityEndpoints = ' + JSON.stringify(entries, null, 2) + '\nexport const fiatSecurityCopy = ' + JSON.stringify({ 'zh-CN': localized }, null, 2) + '\n')
console.log(`Synced ${entries.length} security endpoints`)
