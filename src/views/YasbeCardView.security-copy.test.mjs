import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import en from '../i18n/locales/en.js'

const currentDir = dirname(fileURLToPath(import.meta.url))
const viewSource = readFileSync(resolve(currentDir, 'YasbeCardView.vue'), 'utf8')

const expectedKeys = ['fraud', 'blocking', 'freeze']

for (const key of expectedKeys) {
  assert.match(
    viewSource,
    new RegExp(`titleKey: 'yasbeCard\\.why\\.${key}\\.title',[\\s\\S]*?textKey: 'yasbeCard\\.why\\.${key}\\.text'`),
    `${key} security item should include its description textKey`,
  )
}

assert.equal(en.yasbeCard.why.fraud.title, 'Advanced Fraud Prevention & Security Controls')
assert.equal(
  en.yasbeCard.why.fraud.text,
  'Built with enterprise-grade fraud prevention and real-time risk monitoring to help protect users and businesses from unauthorized transactions, suspicious activity, and payment fraud.',
)

assert.equal(en.yasbeCard.why.blocking.title, 'Smart Transaction Blocking & Risk Controls')
assert.equal(
  en.yasbeCard.why.blocking.text,
  'Includes intelligent transaction blocking capabilities designed to help prevent unauthorized, suspicious, or high-risk activities in real time.',
)

assert.equal(en.yasbeCard.why.freeze.title, 'Instant Card Freeze & Unfreeze Controls')
assert.equal(
  en.yasbeCard.why.freeze.text,
  'Allows users to instantly freeze or unfreeze their card at any time for enhanced security and spending control.',
)
