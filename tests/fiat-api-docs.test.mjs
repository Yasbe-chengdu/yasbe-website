import test from 'node:test'
import assert from 'node:assert/strict'
import { getFiatEndpoints } from '../src/data/apiDocsFiat.js'

const find = (currency, id) => getFiatEndpoints(currency).find(endpoint => endpoint.id === id)
test('all fiat currencies share business routes and security configuration', () => {
  const contracts = currency => getFiatEndpoints(currency).map(e => `${e.method} ${e.path}`)
  assert.deepEqual(contracts('EUR'), contracts('GBP'))
  assert.deepEqual(contracts('EUR'), contracts('USD'))
  assert.equal(new Set(contracts('EUR')).size, contracts('EUR').length)
  assert.ok(contracts('USD').every(route => !route.includes('/api/bridge/') && !route.includes('/v1/auth/token')))
})
test('payment and bank examples match the selected currency without mutating other tabs', () => {
  assert.equal(find('EUR', 'fiat-create-withdrawal').example.paymentType, 'SEPA_INSTANT')
  assert.equal(find('GBP', 'fiat-create-withdrawal').example.paymentType, 'FASTER_PAYMENTS')
  assert.equal(find('USD', 'fiat-create-withdrawal').example.paymentType, 'SWIFT')
  assert.equal(find('USD', 'fiat-create-external-account').example.bankAccountCountry, 'US')
  assert.equal(find('USD', 'fiat-create-va').example.ibanCountry, undefined)
  assert.ok(find('EUR', 'fiat-create-external-account').example.iban)
})
test('security settings require member tokens and business requests retain API Key authentication', () => {
  for (const endpoint of getFiatEndpoints('EUR')) {
    assert.equal(endpoint.authType === 'member', endpoint.path.startsWith('/apiTenant/') && endpoint.requiresAuth)
    if (endpoint.authType === 'member') assert.equal(endpoint.requiresAuth, true)
  }
  assert.equal(find('EUR', 'fiat-token').requiresAuth, false)
  assert.equal(find('EUR', 'fiat-token').path, '/partner-api/v1/oauth/token')
})
test('IP list replacement uses a comma-separated string while webhook creation uses an array', () => {
  const endpoints = getFiatEndpoints('EUR')
  const replace = endpoints.find(e => e.method === 'PUT' && e.path.endsWith('/ip-allowlist'))
  assert.equal(typeof replace.example.allowedIps, 'string')
  assert.equal(replace.fields.find(f => f.name === 'allowedIps').type, 'string')
  const create = endpoints.find(e => e.method === 'POST' && e.path === '/apiTenant/developer/webhooks')
  assert.ok(Array.isArray(create.example.allowedIps))
  assert.equal(create.responseExample.data.signatureAlgorithm, 'RSA-SHA256')
  assert.equal(create.responseExample.data.hmacAlgorithm, 'HMAC-SHA256')
})
test('document storage keys remain unchanged by the product-name consolidation', () => {
  for (const currency of ['EUR', 'GBP', 'USD']) {
    const request = find(currency, 'fiat-create-va').example.openingInformation
    for (const field of ['passportDocumentPath', 'kycAddressProofDocumentPath', 'kycBackgroundProofOfFundsDocumentPath']) {
      assert.ok(request[field].startsWith('white-label/opening/'))
    }
  }
})

test('security examples never silently disable encryption or preselect a customer endpoint', () => {
  const security = getFiatEndpoints('EUR').filter(e => e.path.startsWith('/apiTenant/developer/'))
  const encryption = security.find(e => e.path.endsWith('/payload-encryption'))
  assert.equal(encryption.example.enabled, true)
  assert.ok(encryption.example.publicKeyPem)
  for (const endpoint of security) {
    assert.ok(!endpoint.fields.some(f => /privatekey/i.test(f.name)))
    const id = endpoint.fields.find(f => f.name === 'id')
    if (id) assert.equal(id.defaultValue, '')
  }
})

test('current client account, opening and payment flows are documented with the correct credentials', () => {
  const endpoints = getFiatEndpoints('EUR')
  const route = (method, path) => endpoints.find(e => e.method === method && e.path === path)
  const login = route('POST', '/apiTenant/auth/account/login')
  assert.equal(login.requiresAuth, false)
  for (const name of ['email', 'password', 'totpCode']) assert.ok(login.fields.find(f => f.name === name).required)
  assert.equal(login.fields.find(f => f.name === 'tenantCode'), undefined)
  assert.ok(route('POST', '/apiTenant/auth/account/select-tenant').fields.find(f => f.name === 'accountToken').required)
  const switchTenant = route('POST', '/apiTenant/account/switch-tenant')
  assert.equal(switchTenant.authType, 'member')
  assert.deepEqual(switchTenant.fields.filter(f => f.location === 'Body').map(f => f.name), ['tenantCode'])
  for (const path of ['/apiTenant/account/tenants', '/apiTenant/virtual-account-applications', '/apiTenant/account/security/preferences']) assert.ok(route('GET', path))
  for (const path of ['/apiTenant/virtual-accounts', '/apiTenant/withdrawals', '/apiTenant/deposits/instructions', '/apiTenant/transfers']) {
    const e = route('POST', path)
    assert.equal(e.authType, 'member')
    if (path !== '/apiTenant/virtual-accounts') assert.ok(e.example.totpCode)
  }
  const opening = route('POST', '/apiTenant/virtual-accounts')
  assert.ok(opening.example.openingInformation.passportDocumentPath.startsWith('white-label/opening/'))
  for (const name of ['kycAddressProofDocumentPath', 'kycBackgroundProofOfFundsDocumentPath']) assert.ok(opening.fields.find(f => f.name === `openingInformation.${name}`).required)
  const disable = route('POST', '/apiTenant/account/security/totp/disable')
  assert.equal(disable.tryEnabled, false)
  assert.equal(disable.responseExample.code, 'LOGIN_2FA_MANDATORY')
})

test('field types and complete response structures are sourced from the backend', () => {
  for (const e of getFiatEndpoints('EUR')) {
    assert.ok(e.fields.every(f => f.type), `${e.method} ${e.path}: field type`)
    assert.ok(e.responseFields, `${e.path}: response fields`)
  }
  const e = find('EUR', 'fiat-create-withdrawal')
  assert.equal(e.fields.find(f => f.name === 'amountMinor').type, 'integer')
  for (const name of ['data.failureCode', 'data.returnStatus', 'data.counterpartyName']) assert.ok(e.responseFields.some(f => f.name === name))
})
