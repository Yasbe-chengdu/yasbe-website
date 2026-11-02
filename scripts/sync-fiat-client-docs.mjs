// 以当前客户端OpenAPI同步契约，官网与客户端复用真实路由和字段。
import { readFileSync, writeFileSync } from 'node:fs'
import { fiatBusinessEndpoints } from '../src/data/apiDocsFiat.js'
const input = process.argv[2]
if (!input) throw new Error('Usage: node scripts/sync-fiat-client-docs.mjs <tenant-openapi.json>')
const doc = JSON.parse(readFileSync(input, 'utf8'))
const resolve = (raw = {}) => {
  if (raw.$ref) return resolve(raw.$ref.split('/').slice(1).reduce((obj, key) => obj[key], doc))
  if (raw.allOf) return raw.allOf.map(resolve).reduce((a, b) => ({ ...a, ...b, properties: { ...a.properties, ...b.properties }, required: [...(a.required ?? []), ...(b.required ?? [])] }), { ...raw, allOf: undefined })
  return raw
}
function fields(raw, prefix = '', location = 'Body', depth = 0) {
  const s = resolve(raw)
  if (depth > 8) return []
  return Object.entries(s.properties ?? {}).flatMap(([key, rawValue]) => {
    const v = resolve(rawValue), name = prefix + key
    const type = v.type ?? (v.properties ? 'object' : v.nullable ? 'null' : 'any')
    return [{ name, location, type: type === 'array' ? `array<${resolve(v.items).type ?? 'object'}>` : type,
      ...(v.format ? { format: v.format } : {}), required: s.required?.includes(key) ?? false,
      description: v.description ?? key, ...(v.enum ? { enum: v.enum } : {}) },
    ...fields(type === 'array' ? v.items : v, name + (type === 'array' ? '[].' : '.'), location, depth + 1)]
  })
}
const samples = { email: 'member@example.com', password: 'YourStrongPassword123!', currentPassword: 'YourStrongPassword123!', newPassword: 'NewStrongPassword123!', confirmPassword: 'NewStrongPassword123!', totpCode: '123456', code: '123456', emailCode: '123456', tenantCode: 'TNT-000001', invitationToken: 'REPLACE_WITH_INVITATION_TOKEN', accountToken: 'REPLACE_WITH_ACCOUNT_TOKEN', loginTotpEnabled: true, role: 'TENANT_DEVELOPER', status: 'ACTIVE', externalCustomerId: 'cus_001', name: 'Example', displayName: 'Alex Chen', customerType: 'INDIVIDUAL', environment: 'TEST' }
function example(raw, name = '', depth = 0) {
  const s = resolve(raw)
  if (s.example !== undefined) return s.example
  if (s.enum?.length) return s.enum[0]
  if (samples[name] !== undefined) return samples[name]
  if (s.properties && depth < 8) return Object.fromEntries(Object.entries(s.properties).filter(([key]) => s.required?.includes(key)).map(([key, v]) => [key, example(v, key, depth + 1)]))
  if (s.type === 'array') return [example(s.items, '', depth + 1)]
  if (s.type === 'boolean') return false
  if (['integer', 'number'].includes(s.type)) return Math.max(1, s.minimum ?? 1)
  return 'REPLACE_WITH_' + name.toUpperCase()
}
const contracts = {}, client = []
for (const [path, methods] of Object.entries(doc.paths)) for (const [method, op] of Object.entries(methods)) {
  if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) continue
  const content = op.requestBody?.content ?? {}, body = content['application/json'], multipart = content['multipart/form-data']
  const secured = (op.security ?? doc.security ?? []).length > 0
  const requestFields = secured ? [{ name: 'Authorization', location: 'Header', type: 'string', required: true, description: path.startsWith('/apiTenant/') ? '成员登录并选定租户后返回的 accessToken，格式 Bearer <accessToken>；不能使用 accountToken 或 API Key Token。' : 'API Key 换取的访问令牌，格式 Bearer <accessToken>。' }] : []
  for (const p of op.parameters ?? []) requestFields.push({ name: p.name, location: { path: 'Path', header: 'Header', query: 'Query' }[p.in], type: resolve(p.schema).type ?? 'string', required: !!p.required, description: p.description ?? resolve(p.schema).description ?? p.name, defaultValue: resolve(p.schema).default ?? '' })
  requestFields.push(...fields(body?.schema ?? multipart?.schema, '', multipart ? 'Form' : 'Body'))
  const responseContent = op.responses?.['200']?.content ?? {}, response = responseContent['application/json']
  const contract = { fields: requestFields, responseFields: fields(response?.schema, '', 'Response'),  }
  if (!path.startsWith('/apiTenant/') || path.startsWith('/apiTenant/developer/')) contracts[`${method.toUpperCase()} ${path}`] = contract
  if (!path.startsWith('/apiTenant/') || path.startsWith('/apiTenant/developer/') || path.endsWith('/health')) continue
  const isBusiness = !path.startsWith('/apiTenant/auth/') && !path.startsWith('/apiTenant/account/')
  const counterpart = fiatBusinessEndpoints.find(e => e.method === method.toUpperCase() && e.path.split('?')[0] === path.replace('/apiTenant/', '/partner-api/v1/'))
  const jsonExample = body?.example ?? (body ? example(body.schema) : {})
  const requestExample = counterpart ? { ...jsonExample, ...structuredClone(counterpart.example) } : jsonExample
  // 客户端与服务端API共用业务资料；页面操作额外按个人偏好传TOTP。
  if (isBusiness && body && resolve(body.schema).properties?.totpCode) requestExample.totpCode = '123456'
  if (path === '/apiTenant/account/security/preferences' && method === 'put') requestExample.loginTotpEnabled = true
  const forbidden = path.endsWith('/security/totp/disable')
  const roleNote = isBusiness ? (path.endsWith('/dashboard') ? '工作台按当前角色收窄数据。' : (path.endsWith('/opening-documents') || (['post', 'put'].includes(method) && (/\/customers(?:\/|$)/.test(path) || path.endsWith('/virtual-accounts')))) ? '仅TENANT_ADMIN租户管理员可操作。' : '允许TENANT_ADMIN租户管理员或TENANT_FINANCE财务。') : path.startsWith('/apiTenant/account/members') ? '成员管理仅TENANT_ADMIN可操作。' : ''
  client.push({ id: `fiat-client-${method}-${path.slice('/apiTenant/'.length).replace(/[{}]/g, '').replaceAll('/', '-')}`, label: op.summary, title: op.summary,
    method: method.toUpperCase(), path, description: op.description ?? op.summary,
    detail: roleNote + (isBusiness ? '客户端页面使用成员accessToken，按当前租户角色和能力授权。出入金及划转的totpCode要求取决于成员安全偏好；API Key调用使用法币业务API对应路由。金额为最小货币单位；开户须先上传证件、地址证明与银行流水。' : '同邮箱共用一套账户密码和2FA。accountToken只用于账户会话接口，选择租户返回的accessToken才用于页面业务与安全设置。密码修改、找回和平台重置2FA会撤销账户会话，须重新登录。'),
    authType: secured ? 'member' : 'none', category: isBusiness ? 'console' : 'account', requiresAuth: secured, successStatus: forbidden ? '403' : '200',
    ...contract, example: requestExample, responseExample: forbidden ? { success: false, code: 'LOGIN_2FA_MANDATORY', message: '登录2FA不能关闭', data: null } : response?.example ?? counterpart?.responseExample ?? null,
    ...(multipart ? { multipart: true } : {}), ...(!response && Object.keys(responseContent).length ? { responseType: 'file' } : {}),
    ...(forbidden ? { tryEnabled: false } : {}),
    errors: Object.entries(op.responses ?? {}).filter(([code]) => /^\d+$/.test(code) && +code >= 400).map(([code, value]) => ({ code: '见响应 code', status: +code, description: value.description })) })
}
const outputPath = new URL('../src/data/apiDocsFiatClient.js', import.meta.url)
const output = '// Generated by scripts/sync-fiat-client-docs.mjs from the current tenant OpenAPI.\nexport const fiatContracts = ' + JSON.stringify(contracts, null, 2) + '\nexport const fiatClientEndpoints = ' + JSON.stringify(client, null, 2) + '\n'
if (process.argv.includes('--check')) {
  if (readFileSync(outputPath, 'utf8') !== output) throw new Error('Client contract snapshot is out of date; run synchronization again')
} else writeFileSync(outputPath, output)
console.log(`Synced ${Object.keys(contracts).length} shared contracts and ${client.length} client operations`)
