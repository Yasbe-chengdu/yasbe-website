import test from 'node:test'
import assert from 'node:assert/strict'
import { updateFiatDocsSession, memberRequestExample } from '../src/utils/fiatDocsSession.js'
const base = { apiToken: 'api-old', accountToken: '', memberToken: '' }
test('account selection and in-app switching update only member credentials', () => {
  let state = updateFiatDocsSession(base, { path: '/apiTenant/auth/account/login' }, { success: true, data: { accountToken: 'account' } })
  assert.equal(state.memberToken, '')
  assert.equal(state.apiToken, 'api-old')
  const endpoint = { example: { accountToken: 'PLACEHOLDER', tenantCode: 'TNT-000001' } }
  assert.equal(memberRequestExample(endpoint, state.accountToken).accountToken, 'account')
  assert.equal(endpoint.example.accountToken, 'PLACEHOLDER')
  state = updateFiatDocsSession(state, { path: '/apiTenant/auth/account/select-tenant' }, { success: true, data: { accessToken: 'tenant-a' } })
  state = updateFiatDocsSession(state, { path: '/apiTenant/account/switch-tenant' }, { success: true, data: { accessToken: 'tenant-b' } })
  assert.equal(state.memberToken, 'tenant-b')
  assert.equal(state.apiToken, 'api-old')
  assert.equal(state.accountToken, 'account')
  assert.equal(updateFiatDocsSession(state, { path: '/apiTenant/account/switch-tenant' }, { success: false }), state)
})
test('password changes and account logout clear member and account sessions but preserve API credentials', () => {
  for (const path of ['/apiTenant/account/security/password', '/apiTenant/auth/password-reset', '/apiTenant/auth/account/logout', '/apiTenant/account/logout']) {
    assert.deepEqual(updateFiatDocsSession({ ...base, accountToken: 'account', memberToken: 'member' }, { path }, { success: true, data: null }), base)
  }
})
