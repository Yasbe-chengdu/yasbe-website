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
test('public catalog includes business and developer security routes but excludes account and page operations', () => {
  for (const currency of ['EUR', 'GBP', 'USD']) {
    const endpoints = getFiatEndpoints(currency)
    assert.equal(endpoints.length, 48)
    assert.equal(endpoints.filter(e => e.authType === 'member').length, 22)
    for (const endpoint of endpoints) {
      assert.ok(endpoint.path.startsWith('/partner-api/v1/') || endpoint.path.startsWith('/apiTenant/developer/'))
      assert.equal(endpoint.authType === 'member', endpoint.path.startsWith('/apiTenant/developer/'))
      assert.ok(!endpoint.fields.some(f => ['accountToken', 'password'].includes(f.name)))
      if (endpoint.authType !== 'member') assert.ok(!endpoint.fields.some(f => f.name === 'totpCode'))
      else assert.equal(endpoint.requiresAuth, true)
    }
  }
  assert.equal(find('EUR', 'fiat-token').requiresAuth, false)
  assert.equal(find('EUR', 'fiat-token').path, '/partner-api/v1/oauth/token')
})
test('document storage keys remain unchanged by the product-name consolidation', () => {
  for (const currency of ['EUR', 'GBP', 'USD']) {
    const request = find(currency, 'fiat-create-va').example.openingInformation
    for (const field of ['passportDocumentPath', 'kycAddressProofDocumentPath', 'kycBackgroundProofOfFundsDocumentPath']) {
      assert.ok(request[field].startsWith('white-label/opening/'))
    }
  }
})

test('field types and complete response structures are sourced from the backend', () => {
  for (const e of getFiatEndpoints('EUR')) {
    assert.ok(e.fields.every(f => f.type), `${e.method} ${e.path}: field type`)
    assert.ok(e.responseFields, `${e.path}: response fields`)
  }
  const e = find('EUR', 'fiat-create-withdrawal')
  assert.equal(e.fields.find(f => f.name === 'amountMinor').type, 'integer')
  for (const name of ['data.failureCode', 'data.returnStatus', 'data.counterpartyName']) assert.ok(e.responseFields.some(f => f.name === name))
  const detail = find('EUR', 'fiat-transaction-detail')
  assert.equal(detail.responseFields.find(f => f.name === 'data.payerIban').type, 'string')
  assert.ok(detail.responseExample.data.payerIban)
  assert.equal(find('USD', 'fiat-transaction-detail').responseExample.data.payerIban, null)
  assert.ok(!find('EUR', 'fiat-transactions').responseFields.some(f => f.name.endsWith('.payerIban')))
})

// 打包模块和界面源码也不能依赖客户端契约，避免只隐藏菜单而仍公开内部操作。
test('public view and contract snapshot exclude client credentials and routes', async () => {
  const { readFileSync } = await import('node:fs')
  for (const file of ['../src/data/apiDocsFiatClient.js', '../src/views/ApiDocsView.vue', '../src/data/apiDocsFiat.js']) {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8')
    assert.ok(!/\/apiTenant\/(?!developer\/)/.test(source), file)
    assert.ok(!source.includes('/apiAdmin/'), file)
    assert.ok(!source.includes('accountAccessToken'), file)
  }
  const { fiatWebhookGuide } = await import('../src/data/apiDocsFiatWebhooks.js')
  assert.ok(fiatWebhookGuide['zh-CN'].steps.join(' ').includes('X-YASBe-RSA-Signature'))
  assert.ok(fiatWebhookGuide.en.steps.join(' ').includes('raw HTTP request body'))
})

test('security examples preserve IP replacement, one-time secrets and safe encryption settings', () => {
  const endpoints = getFiatEndpoints()
  const route = (method, path) => endpoints.find(e => e.method === method && e.path === path)
  const replacement = route('PUT', '/apiTenant/developer/webhooks/{id}/ip-allowlist')
  assert.equal(typeof replacement.example.allowedIps, 'string')
  assert.equal(replacement.fields.find(f => f.name === 'allowedIps').type, 'string')
  assert.ok(route('GET', '/apiTenant/developer/webhooks/{id}/ip-allowlist'))
  const create = route('POST', '/apiTenant/developer/webhooks')
  assert.ok(Array.isArray(create.example.allowedIps))
  assert.equal(create.responseExample.data.signatureAlgorithm, 'RSA-SHA256')
  assert.equal(create.responseExample.data.hmacAlgorithm, 'HMAC-SHA256')
  const encryption = route('PUT', '/apiTenant/developer/webhooks/{id}/payload-encryption')
  assert.equal(encryption.example.enabled, true)
  assert.ok(encryption.example.publicKeyPem)
  for (const e of endpoints.filter(e => e.authType === 'member')) {
    assert.ok(!e.fields.some(f => /privatekey/i.test(f.name)))
    const auth = e.fields.find(f => f.name === 'Authorization')
    assert.ok(auth.description.includes('成员'))
    const id = e.fields.find(f => f.name === 'id')
    if (id) assert.equal(id.defaultValue, '')
  }
})

test('opening countries expose versioned residence policy and keep role administration private', () => {
  const endpoint = find('EUR', 'fiat-opening-countries')
  assert.equal(endpoint.path, '/partner-api/v1/opening/countries')
  assert.equal(endpoint.responseExample.data.purpose, 'RESIDENCE')
  assert.equal(endpoint.responseExample.data.listSource, 'OPENPAYD_CAP_2_3_PERMITTED_JURISDICTIONS')
  assert.ok(endpoint.responseFields.some(f => f.name === 'data.countries[].countryCode' && f.type === 'string'))
  assert.ok(endpoint.responseFields.some(f => f.name === 'data.policyVersion'))
  assert.ok(!getFiatEndpoints().some(e => e.path.includes('/account/roles')))
})

// 新开户契约只收集身份和文件资料，官网不得再要求已取消的背景表单。
test('opening contract only requests identity, country, address and proof documents', () => {
  const removed = ['requiredProducts', 'employmentCurrentEmployer', 'employmentDesignation', 'employmentIndustry', 'employmentOccupationDescription', 'politicalIsPep', 'politicalPepCategory', 'annualIncomeRange', 'sourceOfFunds', 'expectedMonthlyPaymentAmount', 'expectedMonthlyReceivedAmount', 'kycBackgroundExpectedMonthlyTransactionCount', 'kycBackgroundFundsSourceSameAsWealth', 'kycBackgroundWealthSources']
  for (const currency of ['EUR', 'GBP', 'USD']) {
    const e = find(currency, 'fiat-create-va')
    for (const name of removed) {
      assert.ok(!e.fields.some(f => f.name === `openingInformation.${name}`), name)
      assert.equal(e.example.openingInformation[name], undefined, name)
    }
    for (const name of ['firstName', 'lastName', 'residenceCountry', 'documentType', 'passportNumber', 'kycAddressProofDocumentPath', 'kycBackgroundProofOfFundsDocumentPath']) {
      assert.equal(e.fields.find(f => f.name === `openingInformation.${name}`).required, true, name)
    }
  }
})

// 两种国家含义不同，前端不能用国籍代填居住国家，也不再展示历史国家参数。
test('opening country inputs only contain nationality and residence', () => {
  for (const currency of ['EUR', 'GBP', 'USD']) {
    const e = find(currency, 'fiat-create-va')
    for (const name of ['openingInformation.nationality', 'openingInformation.residenceCountry']) {
      assert.equal(e.fields.find(f => f.name === name)?.required, true, name)
    }
    for (const name of ['openingInformation.countryOfBirth', 'openingInformation.taxResidency', 'ibanCountry']) {
      assert.ok(!e.fields.some(f => f.name === name), name)
    }
    assert.equal(e.example.ibanCountry, undefined)
    assert.equal(e.example.openingInformation.countryOfBirth, undefined)
    assert.equal(e.example.openingInformation.taxResidency, undefined)
  }
})

test('supported opening countries use a direct array and never claim bank-country support', () => {
  const e = find('EUR', 'fiat-supported-opening-countries')
  assert.equal(e.path, '/partner-api/v1/opening/supported-countries')
  assert.ok(Array.isArray(e.responseExample.data))
  assert.ok(e.responseFields.some(f => f.name === 'data[].countryCode'))
  assert.ok(e.description.includes('CAP'))
  assert.ok(e.detail.includes('external bank account countries'))
  assert.equal(find('EUR', 'fiat-create-va').example.openingInformation.residenceCountry, 'GB')
})

test('virtual-account closure documents the test environment and lifecycle callbacks for every fiat currency', () => {
  for (const currency of ['EUR', 'GBP', 'USD']) {
    const endpoint = find(currency, 'fiat-close-va')
    assert.equal(endpoint.method, 'POST')
    assert.equal(endpoint.path, '/partner-api/v1/virtual-accounts/{vaNo}/close')
    assert.equal(endpoint.responseExample.data.currency, currency)
    assert.deepEqual(endpoint.example, {})
    for (const value of ['virtual_accounts:close', 'https://api.beeznis.com']) assert.ok(endpoint.description.includes(value))
    for (const event of ['virtual_account.closing', 'virtual_account.closed']) assert.ok(endpoint.detail.includes(event))
  }
})
