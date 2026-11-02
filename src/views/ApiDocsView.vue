<template>
  <div class="api-docs">
    <div class="api-docs__topbar">
      <RouterLink to="/" class="api-docs__wordmark">YASBe <span>{{ copy.documentation }}</span></RouterLink>
      <div ref="langMenuRef" class="api-docs__lang-switcher">
        <button type="button" class="api-docs__lang-btn" :aria-expanded="isLangMenuOpen" @click="isLangMenuOpen = !isLangMenuOpen">
          <span>{{ currentLangLabel }}</span>
          <span class="api-docs__lang-chevron" aria-hidden="true">⌄</span>
        </button>
        <div v-if="isLangMenuOpen" class="api-docs__lang-menu" role="menu">
          <button v-for="opt in localeOptions" :key="opt.code" type="button" role="menuitem" class="api-docs__lang-option" :class="{ 'api-docs__lang-option--active': locale === opt.code }" @click="selectLang(opt.code)">{{ opt.label }}</button>
        </div>
      </div>
    </div>

    <main class="api-docs__layout">
      <aside class="api-docs__sidebar" aria-label="API documentation navigation">
        <p class="api-docs__sidebar-label">{{ copy.products }}</p>
        <button type="button" class="api-docs__module-group" :aria-expanded="isFiatExpanded" @click="isFiatExpanded = !isFiatExpanded"><span class="api-docs__module-group-label"><img :src="fiatIcon" alt="" aria-hidden="true" />{{ fiatLabel }}</span><span class="api-docs__module-group-chevron" aria-hidden="true">⌄</span></button>
        <button v-if="isFiatExpanded" v-for="module in fiatModules" :key="module.id" type="button" class="api-docs__module api-docs__module--child" :class="{ active: selectedModule === module.id }" @click="selectModule(module.id)">
          <span class="api-docs__module-icon" aria-hidden="true">{{ module.icon }}</span>
          <span>{{ moduleCopy(module).name }}</span>
        </button>
        <button v-for="module in productModules" :key="module.id" type="button" class="api-docs__module" :class="{ active: selectedModule === module.id }" @click="selectModule(module.id)">
          <span class="api-docs__module-icon" aria-hidden="true">{{ module.icon }}</span>
          <span>{{ moduleCopy(module).name }}</span>
          <small v-if="!module.available">{{ copy.comingSoon }}</small>
        </button>
        <template v-if="isAvailableModule">
        <p class="api-docs__sidebar-label">{{ copy.gettingStarted }}</p>
        <a href="#overview" :class="{ active: activeSection === 'overview' }" @click="activeSection = 'overview'">{{ copy.overview }}</a>
        <a href="#authentication" :class="{ active: activeSection === 'authentication' }" @click="activeSection = 'authentication'">{{ copy.authentication }}</a>
        <a v-if="isFiatModule" href="#webhooks" @click="activeSection = 'webhooks'">{{ webhookGuide.title }}</a>
        <template v-for="group in endpointGroups" :key="group.label">
        <p class="api-docs__sidebar-label">{{ group.label }}</p>
        <button v-for="endpoint in group.items" :key="endpoint.id" type="button" :class="{ active: activeEndpoint.id === endpoint.id }" @click="selectEndpoint(endpoint)">
          <span :class="['api-docs__method', `api-docs__method--${endpoint.method.toLowerCase()}`]">{{ endpoint.method }}</span>
          <span>{{ endpointCopy(endpoint).label }}</span>
        </button>
        </template>
        </template>
      </aside>

      <article v-if="isAvailableModule" class="api-docs__content">
        <section id="overview">
          <p class="api-docs__eyebrow">YASBE PLATFORM API</p>
          <h1>{{ moduleOverview.heroTitle }}</h1>
          <p class="api-docs__intro">{{ moduleOverview.heroIntro }}</p>
          <label v-if="selectedModule === 'fiat'" class="api-docs__input-label">EUR / GBP
            <select v-model="eurGbpCurrency" @change="selectFiatCurrency"><option value="EUR">EUR</option><option value="GBP">GBP</option></select>
          </label>
          <p class="api-docs__currency-note">{{ currencyNotice }}</p>
          <div class="api-docs__notice"><strong>{{ copy.beforeStart }}</strong><span>{{ moduleOverview.beforeStartBody }}</span></div>
        </section>

        <section id="authentication" class="api-docs__section">
          <p class="api-docs__eyebrow">{{ copy.authentication }}</p>
          <h2>{{ moduleOverview.authTitle }}</h2>
          <p>{{ moduleOverview.authBody }}</p>
          <ol v-if="isFiatModule"><li v-for="step in fiatWorkflow" :key="step">{{ step }}</li></ol>
          <p v-if="isFiatModule">{{ nestedFieldNotice }}</p>
        </section>

        <section v-if="isFiatModule" id="webhooks" class="api-docs__section">
          <h2>{{ webhookGuide.title }}</h2>
          <ol><li v-for="step in webhookGuide.steps" :key="step">{{ step }}</li></ol>
        </section>

        <section :id="activeEndpoint.id" class="api-docs__endpoint">
          <div class="api-docs__endpoint-heading">
            <span :class="['api-docs__method', `api-docs__method--${activeEndpoint.method.toLowerCase()}`]">{{ activeEndpoint.method }}</span>
            <code>{{ activeEndpoint.path }}</code>
            <span v-if="activeEndpoint.contractOnly" class="api-docs__contract-badge">{{ contractLabel }}</span>
          </div>
          <h2>{{ endpointCopy(activeEndpoint).title }}</h2>
          <p>{{ endpointCopy(activeEndpoint).description }}</p>
          <p class="api-docs__endpoint-note">{{ endpointDetail(activeEndpoint) }}</p>
          <p v-if="isFiatModule && activeEndpoint.authType === 'member'" class="api-docs__notice">{{ securityRequirements }}</p>

          <h3>{{ copy.requestParameters }}</h3>
          <div class="api-docs__table-wrap">
            <table>
            <thead><tr><th>{{ copy.field }}</th><th>{{ copy.location }}</th><th>{{ fieldTypeLabel }}</th><th>{{ copy.required }}</th><th>{{ copy.description }}</th></tr></thead>
              <tbody>
                <tr v-for="field in activeEndpoint.fields" :key="field.name"><td><code>{{ field.name }}</code></td><td>{{ field.location ?? copy.body }}</td><td>{{ field.type ?? 'string' }}{{ field.format ? ` (${field.format})` : '' }}</td><td>{{ field.required ? copy.yes : copy.no }}</td><td>{{ fieldDescription(field) }}{{ field.enum ? ` (${field.enum.join(', ')})` : '' }}</td></tr>
              </tbody>
            </table>
          </div>

          <h3>{{ copy.responses }}</h3>
          <p>{{ activeEndpoint.successStatus === '403' ? (locale === 'en' ? 'This operation always returns' : '该操作固定返回') : copy.responseIntro }} <code>{{ activeEndpoint.successStatus }}</code>{{ moduleResponseEnd }}</p>
          <pre v-if="activeEndpoint.responseExample" class="api-docs__example"><code>{{ JSON.stringify(activeEndpoint.responseExample, null, 2) }}</code></pre>
          <div v-if="activeEndpoint.responseFields?.length" class="api-docs__table-wrap"><table>
            <thead><tr><th>{{ copy.field }}</th><th>{{ fieldTypeLabel }}</th><th>{{ copy.description }}</th></tr></thead>
            <tbody><tr v-for="field in activeEndpoint.responseFields" :key="field.name"><td><code>{{ field.name }}</code></td><td>{{ field.type }}{{ field.format ? ` (${field.format})` : '' }}</td><td>{{ field.description }}{{ field.enum ? ` (${field.enum.join(', ')})` : '' }}</td></tr></tbody>
          </table></div>

          <h3>{{ copy.errorCodes }}</h3>
          <div class="api-docs__table-wrap">
            <table>
              <thead><tr><th>{{ copy.code }}</th><th>{{ copy.httpStatus }}</th><th>{{ copy.description }}</th></tr></thead>
              <tbody>
                <tr v-for="error in activeEndpoint.errors" :key="`${error.status}-${error.code}`"><td><code>{{ error.code }}</code></td><td>{{ error.status }}</td><td>{{ errorDescription(error) }}</td></tr>
              </tbody>
            </table>
          </div>
          <p class="api-docs__error-note">{{ moduleErrorFormat }}</p>
          <pre class="api-docs__example"><code>{{ JSON.stringify(errorResponseExample, null, 2) }}</code></pre>
        </section>
      </article>

      <article v-else class="api-docs__content api-docs__coming-soon">
        <p class="api-docs__eyebrow">{{ moduleCopy(selectedModuleData).name }}</p>
        <h1>{{ copy.moduleComingTitle }}</h1>
        <p class="api-docs__intro">{{ copy.moduleComingBody.replace('{module}', moduleCopy(selectedModuleData).name) }}</p>
        <div class="api-docs__notice"><strong>{{ copy.moduleComingNotice.replace('{module}', moduleCopy(selectedModuleData).name) }}</strong><span>{{ copy.moduleComingNoticeBody }}</span></div>
      </article>

      <aside v-if="isAvailableModule" class="api-docs__console" aria-label="Interactive API request">
        <div class="api-docs__console-head">
          <span :class="['api-docs__method', `api-docs__method--${activeEndpoint.method.toLowerCase()}`]">{{ activeEndpoint.method }}</span>
          <code>{{ activeEndpoint.path }}</code>
        </div>
        <label v-if="activeEndpoint.requiresAuth" class="api-docs__input-label">{{ bearerTokenLabel }}<input v-model.trim="activeAccessToken" type="password" :placeholder="copy.tokenPlaceholder" autocomplete="off" /></label>
        <label v-if="activeEndpoint.id === 'crypto-withdraw'" class="api-docs__input-label">{{ twoFactorLabel }}<input v-model.trim="twoFactorToken" type="password" :placeholder="twoFactorPlaceholder" autocomplete="one-time-code" /></label>
        <label v-for="field in interactiveFields" :key="`${activeEndpoint.id}-${field.location}-${field.name}`" class="api-docs__input-label">
          {{ field.name }} ({{ field.location }})
          <input v-model.trim="parameterValues[field.name]" type="text" :placeholder="field.required ? copy.required : copy.no" autocomplete="off" />
        </label>
        <label v-if="activeEndpoint.multipart" class="api-docs__input-label">file (PDF / PNG / JPEG, ≤10MB)<input :key="activeEndpoint.id" ref="uploadInput" type="file" accept=".pdf,.png,.jpg,.jpeg" @change="uploadFile = $event.target.files?.[0] ?? null" /></label>
        <label v-if="hasRequestBody" class="api-docs__input-label">{{ copy.requestBody }}<textarea v-model="requestBody" rows="13" spellcheck="false" :aria-label="copy.requestBody"></textarea></label>
        <p v-if="requestError" class="api-docs__request-error">{{ requestError }}</p>
        <button type="button" class="api-docs__try-button" :disabled="isSending || activeEndpoint.tryEnabled === false" @click="sendRequest"><span>{{ tryButtonLabel }}</span><span aria-hidden="true">→</span></button>
        <div class="api-docs__response">
          <div><span>{{ copy.response }}</span><span v-if="responseStatus" :class="responseStatus < 400 ? 'success' : 'failure'">{{ responseStatus }}</span></div>
          <pre>{{ responseText || copy.responseHint }}</pre>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { localeOptions, setAppLocale } from '../i18n'
import fiatIcon from '../assets/images/api-fiat-icon.svg'
import { cardCopy, cardEndpoints } from '../data/apiDocsCards.js'
import { cryptoCopy, cryptoEndpoints } from '../data/apiDocsCrypto.js'
import { fiatWebhookGuide } from '../data/apiDocsFiatWebhooks.js'
import { fiatCopy, getFiatEndpoints } from '../data/apiDocsFiat.js'

const { locale } = useI18n()
const languageCopy = {
  en: { documentation: 'API documentation', products: 'PRODUCTS', fiat: 'FIAT', comingSoon: 'Soon', moduleComingTitle: 'Documentation is on its way.', moduleComingBody: '{module} API documentation is being prepared. Select EUR or GBP payments to explore the currently available API.', moduleComingNotice: 'Planning a {module} integration?', moduleComingNoticeBody: 'Contact our team to receive early integration guidance.', gettingStarted: 'GETTING STARTED', overview: 'Overview', authentication: 'Authentication', apiReference: 'API REFERENCE', heroTitle: 'Build payments that move with your business.', heroIntro: 'Create accounts, add beneficiaries and send payouts through one secure API. All requests use JSON and the ', heroSuffix: ' versioned API.', beforeStart: 'Before you begin', beforeStartBody: 'Use your client credentials to request an access token. The API gateway is configured by the deployment environment.', accessTokens: 'Access tokens', authIntro: 'Call', authMiddle: 'with your', and: 'and', authEnd: '. Include the returned token in every business request as Authorization: Bearer {accessToken}. Tokens expire after 3,600 seconds.', requestBody: 'Request body', requestParameters: 'Request parameters', field: 'Field', location: 'Location', body: 'Body', required: 'Required', description: 'Description', yes: 'Yes', no: 'No', responses: 'Responses', errorCodes: 'Error codes', code: 'Code', httpStatus: 'HTTP status', errorFormat: 'All API errors use this response format.', responseIntro: 'Successful requests return', responseEnd: '. Error responses include a stable code, a developer-facing message, and a traceId for support.', bearerToken: 'Bearer token', tokenPlaceholder: 'Paste access token', tryIt: 'Try it', sending: 'Sending…', response: 'RESPONSE', responseHint: 'Click Try it to send a live request.', gatewayRequired: 'The API gateway is not configured for this deployment.', invalidJson: 'Request body must be valid JSON.', sendFailed: 'Request could not be sent: {message}. Check the gateway URL and CORS configuration.' },
  'zh-CN': { documentation: 'API 文档', products: '产品模块', comingSoon: '即将推出', moduleComingTitle: '文档即将发布。', moduleComingBody: '{module} API 文档正在准备中。你可以选择“法币支付”查看目前已开放的 API。', moduleComingNotice: '计划接入 {module}？', moduleComingNoticeBody: '请联系我们的团队，获取提前接入指引。', gettingStarted: '快速开始', overview: '概览', authentication: '认证', apiReference: 'API 参考', heroTitle: '让支付随业务一起流动。', heroIntro: '通过一套安全 API 创建账户、添加受益人并发起出金。所有请求均使用 JSON 和 ', heroSuffix: ' 版本 API。', beforeStart: '开始之前', beforeStartBody: '使用客户端凭据获取访问令牌；API 网关地址由部署环境统一配置。', accessTokens: '访问令牌', authIntro: '使用', authMiddle: '提交你的', and: '和', authEnd: '。在所有业务请求中携带返回的 Authorization: Bearer {accessToken}。令牌有效期为 3,600 秒。', requestBody: '请求体', requestParameters: '请求参数', field: '字段', location: '位置', body: '请求体', required: '必填', description: '说明', yes: '是', no: '否', responses: '响应', errorCodes: '错误码', code: '错误码', httpStatus: 'HTTP 状态', errorFormat: '所有 API 错误均使用以下响应格式。', responseIntro: '成功请求会返回', responseEnd: '。错误响应包含稳定的 code、面向开发者的 message，以及用于支持排查的 traceId。', bearerToken: 'Bearer 令牌', tokenPlaceholder: '粘贴访问令牌', tryIt: '试运行', sending: '发送中…', response: '响应', responseHint: '点击“试运行”发送真实请求。', gatewayRequired: '当前部署环境尚未配置 API 网关。', invalidJson: '请求体必须是有效的 JSON。', sendFailed: '请求无法发送：{message}。请检查网关 URL 和 CORS 配置。' },
  'zh-TW': { documentation: 'API 文件', products: '產品模組', comingSoon: '即將推出', moduleComingTitle: '文件即將發佈。', moduleComingBody: '{module} API 文件正在準備中。你可以選擇「法幣支付」查看目前已開放的 API。', moduleComingNotice: '計畫串接 {module}？', moduleComingNoticeBody: '請聯絡我們的團隊，取得提前串接指引。', gettingStarted: '快速開始', overview: '總覽', authentication: '驗證', apiReference: 'API 參考', heroTitle: '讓支付隨業務一起流動。', heroIntro: '透過一套安全 API 建立帳戶、新增受益人並發起出金。所有請求均使用 JSON 和 ', heroSuffix: ' 版本 API。', beforeStart: '開始之前', beforeStartBody: '使用用戶端憑證取得存取權杖；API 網關位址由部署環境統一設定。', accessTokens: '存取權杖', authIntro: '使用', authMiddle: '提交你的', and: '和', authEnd: '。在所有業務請求中攜帶回傳的 Authorization: Bearer {accessToken}。權杖有效期為 3,600 秒。', requestBody: '請求內容', requestParameters: '請求參數', field: '欄位', location: '位置', body: '請求內容', required: '必填', description: '說明', yes: '是', no: '否', responses: '回應', errorCodes: '錯誤碼', code: '錯誤碼', httpStatus: 'HTTP 狀態', errorFormat: '所有 API 錯誤均使用以下回應格式。', responseIntro: '成功請求會回傳', responseEnd: '。錯誤回應包含穩定的 code、面向開發者的 message，以及用於支援排查的 traceId。', bearerToken: 'Bearer 權杖', tokenPlaceholder: '貼上存取權杖', tryIt: '試執行', sending: '傳送中…', response: '回應', responseHint: '點擊「試執行」發送真實請求。', gatewayRequired: '目前部署環境尚未設定 API 網關。', invalidJson: '請求內容必須是有效的 JSON。', sendFailed: '請求無法發送：{message}。請檢查網關 URL 和 CORS 設定。' },
}
const copy = computed(() => languageCopy[locale.value] ?? languageCopy.en)
const fiatLabel = computed(() => ({ en: 'FIAT', 'zh-CN': '法币', 'zh-TW': '法幣' }[locale.value] ?? 'FIAT'))
const modules = [
  { id: 'fiat', group: 'fiat', icon: '€', available: true, name: 'EUR & GBP' },
  { id: 'usd', group: 'fiat', icon: '$', available: true, name: 'USD' },
  { id: 'cards', icon: '▣', available: true, name: 'Cards' },
  { id: 'digital-assets', icon: '◇', available: true, name: 'Digital assets' },
]
const fiatModules = computed(() => modules.filter((module) => module.group === 'fiat'))
const productModules = computed(() => modules.filter((module) => module.group !== 'fiat'))
const moduleTranslations = {
  'zh-CN': { fiat: 'EUR & GBP', cards: '卡片', 'digital-assets': '数字资产' },
  'zh-TW': { fiat: 'EUR & GBP', cards: '卡片', 'digital-assets': '數位資產' },
}
const selectedModule = ref('fiat')
const eurGbpCurrency = ref('EUR')
const isFiatModule = computed(() => ['fiat', 'usd'].includes(selectedModule.value))
const selectedFiatCurrency = computed(() => selectedModule.value === 'usd' ? 'USD' : eurGbpCurrency.value)
const isFiatExpanded = ref(true)
const selectedModuleData = computed(() => modules.find((module) => module.id === selectedModule.value) ?? modules[0])
const isAvailableModule = computed(() => selectedModuleData.value.available)
const endpoints = computed(() => isFiatModule.value ? getFiatEndpoints(selectedFiatCurrency.value)
  : ({ cards: cardEndpoints, 'digital-assets': cryptoEndpoints }[selectedModule.value] ?? []))

const fiatBaseUrl = typeof window !== 'undefined' && (window.location.hostname === 'beeznis.com' || window.location.hostname.endsWith('.beeznis.com'))
  ? 'https://api.beeznis.com'
  : (import.meta.env.VITE_PLATFORM_API_BASE_URL || import.meta.env.VITE_PARTNER_API_BASE_URL || import.meta.env.VITE_API_BASE_URL || '')
const baseUrl = computed(() => isFiatModule.value ? fiatBaseUrl : (import.meta.env.VITE_PLATFORM_API_BASE_URL ?? ''))
const activeEndpoint = ref(endpoints.value[0])
const activeSection = ref('overview')
const accessToken = ref('')
const fiatAccessToken = ref('')
const memberAccessToken = ref('')
// 成员安全管理Token和API Key业务Token分别保存在内存，避免交叉发送。
const activeAccessToken = computed({
  get: () => isFiatModule.value ? (activeEndpoint.value.authType === 'member' ? memberAccessToken.value : fiatAccessToken.value) : accessToken.value,
  set: value => {
    const token = value.trim().replace(/^Bearer\s+/i, '')
    if (!isFiatModule.value) accessToken.value = token
    else if (activeEndpoint.value.authType === 'member') memberAccessToken.value = token
    else fiatAccessToken.value = token
  },
})
const bearerTokenLabel = computed(() => !isFiatModule.value ? copy.value.bearerToken
  : activeEndpoint.value.authType === 'member'
    ? ({ en: 'Member token (TENANT_ADMIN / TENANT_DEVELOPER)', 'zh-CN': '成员 Token（管理员／开发者）', 'zh-TW': '成員Token（管理員／開發者）' }[locale.value] ?? 'Member token')
    : ({ en: 'API Key access token', 'zh-CN': 'API Key 访问 Token', 'zh-TW': 'API Key 存取Token' }[locale.value] ?? 'API Key access token'))
const fieldTypeLabel = computed(() => locale.value === 'en' ? 'Type' : '类型')
const nestedFieldNotice = computed(() => locale.value === 'en' ? 'Nested required fields apply when their parent object is present. Conditional requirements and role checks also apply; follow the field descriptions. Samples contain placeholders and do not guarantee bank approval.' : '嵌套字段的必填标记指父对象存在时的要求，还须满足字段说明中的条件必填及角色授权。示例中的客户、文件key和密钥须替换为真实值；示例不代表通道已审批通过。')
const webhookGuide = computed(() => fiatWebhookGuide[locale.value] ?? fiatWebhookGuide['zh-CN'])
const fiatWorkflow = computed(() => locale.value === 'en' ? [
  'Create a TEST or LIVE API Key in the tenant console and exchange apiKey + apiSecret for an access token. Send Authorization: Bearer {accessToken} with business requests. TEST and LIVE credentials are isolated.',
  'Create customer → upload identity files, address proof and bank statement → apply for an account → add a same-name external bank account → get offline deposit instructions, submit a withdrawal or transfer.',
  'Use the same Idempotency-Key when retrying the same account application or payment. Query transactions or consume webhooks for final status.',
  'Configure webhook endpoints, callback IP allowlists and credentials in the tenant console or through Security Management APIs using a separate member token. Download the one-time secret and public verification key there; keep your own payload decryption private key downstream.',
  'Invoices describe billing between the authenticated tenant and YASBe and require invoices:read. They are not the end-customer billing API.',
] : [
  '在租户业务台创建 TEST 或 LIVE API Key，使用 apiKey 与 apiSecret 换取访问 Token；业务请求携带 Authorization: Bearer {accessToken}。测试与生产凭证分开使用。',
  '业务顺序：创建客户 → 上传证件、地址证明、银行流水 → 申请开户 → 添加同名外部账户 → 获取线下打款指引，或发起出金、账户划转。',
  '同一开户申请或付款重试使用相同 Idempotency-Key；最终结果通过交易查询或 Webhook 获取。',
  'Webhook 地址、回调 IP 白名单与密钥可在租户业务台配置，或使用成员Token调用安全管理API；在那里获取仅展示一次的 Secret 和验签公钥。用于内容解密的下游私钥自行保管。',
  '账单描述当前租户与 YASBe 的结算费用，要求 invoices:read 权限，不是终端客户的账单接口。',
])
const endpointGroups = computed(() => isFiatModule.value ? [
  { label: locale.value === 'en' ? 'BUSINESS API' : '法币业务 API', items: endpoints.value.filter(e => e.authType !== 'member') },
  { label: locale.value === 'en' ? 'SECURITY MANAGEMENT' : '安全管理 API', items: endpoints.value.filter(e => e.authType === 'member') },
] : [{ label: copy.value.apiReference, items: endpoints.value }])
const securityRequirements = computed(() => locale.value === 'en'
  ? 'Security management requires a member login token with TENANT_ADMIN or TENANT_DEVELOPER role, not an API Key token. LIVE API Key creation, rotation and revocation require account TOTP; TEST API Key and webhook changes follow member security preferences. Secrets appear once. Download public keys only; signing private keys remain server-side. Configure a callback IP allowlist before delivery.'
  : '安全管理接口使用业务台的成员登录Token，仅TENANT_ADMIN管理员或TENANT_DEVELOPER开发者可操作，不能使用API Key业务Token。LIVE API Key创建、轮换、吊销强制账户2FA；TEST API Key及Webhook变更按成员安全偏好校验totpCode。Secret仅展示一次，只提供公钥下载，签名私钥保留在服务端。回调前必须配置目标IP白名单。')
const twoFactorToken = ref('')
const uploadFile = ref(null)
const uploadInput = ref(null)
const requestBody = ref(JSON.stringify(activeEndpoint.value.example, null, 2))
const parameterValues = ref(buildParameterValues(activeEndpoint.value))
const responseText = ref('')
const responseStatus = ref(null)
const requestError = ref('')
const isSending = ref(false)
const interactiveFields = computed(() => activeEndpoint.value.fields.filter((field) =>
  ['Path', 'Query', 'Header'].includes(field.location) && field.name !== 'Authorization'))
const hasRequestBody = computed(() => activeEndpoint.value.fields.some((field) => !field.location || field.location === 'Body'))
const twoFactorLabel = computed(() => ({ en: 'X-2FA-Token (when enabled)', 'zh-CN': 'X-2FA-Token（已启用 2FA 时）', 'zh-TW': 'X-2FA-Token（已啟用 2FA 時）' }[locale.value] ?? 'X-2FA-Token'))
const twoFactorPlaceholder = computed(() => ({ en: 'Paste the short-lived 2FA token', 'zh-CN': '粘贴短期 2FA Token', 'zh-TW': '貼上短期 2FA Token' }[locale.value] ?? 'Paste 2FA token'))
const contractLabel = computed(() => ({ en: 'CONTRACT', 'zh-CN': '接口契约', 'zh-TW': '介面契約' }[locale.value] ?? 'CONTRACT'))
const isUserApiModule = computed(() => isFiatModule.value || selectedModule.value === 'digital-assets' || selectedModule.value === 'cards')
const tryButtonLabel = computed(() => {
  if (isSending.value) return copy.value.sending
  if (activeEndpoint.value.tryEnabled === false) {
    if (activeEndpoint.value.contractOnly) return ({ en: 'Backend implementation required', 'zh-CN': '等待后端实现', 'zh-TW': '等待後端實作' }[locale.value] ?? 'Backend implementation required')
    if (activeEndpoint.value.id === 'card-kyc-documents') return ({ en: 'Multipart only', 'zh-CN': '仅支持 Multipart', 'zh-TW': '僅支援 Multipart' }[locale.value] ?? 'Multipart only')
    return ({ en: 'Live execution disabled', 'zh-CN': '已禁用在线执行', 'zh-TW': '已停用線上執行' }[locale.value] ?? 'Live execution disabled')
  }
  return copy.value.tryIt
})
const moduleResponseEnd = computed(() => isUserApiModule.value
  ? ({ en: '. Responses use the standard success, code, message, and data envelope.', 'zh-CN': '。响应统一包含 success、code、message 和 data。', 'zh-TW': '。回應統一包含 success、code、message 和 data。' }[locale.value] ?? '.')
  : copy.value.responseEnd)
const moduleErrorFormat = computed(() => isUserApiModule.value
  ? ({ en: 'These API errors use the same response envelope with success set to false and data set to null.', 'zh-CN': '这些 API 错误使用相同响应结构，其中 success 为 false、data 为 null。', 'zh-TW': '這些 API 錯誤使用相同回應結構，其中 success 為 false、data 為 null。' }[locale.value] ?? copy.value.errorFormat)
  : copy.value.errorFormat)
const errorResponseExample = computed(() => isUserApiModule.value
  ? { success: false, code: activeEndpoint.value.errors[0]?.code ?? 500, message: 'Human-readable error message', data: null }
  : { code: activeEndpoint.value.errors[0]?.code ?? 'INTERNAL_ERROR', message: 'Human-readable error message', traceId: 'trc_01J…' })

function endpointCopy(endpoint) {
  const localized = fiatCopy[locale.value]?.[endpoint.id] ?? cardCopy[locale.value]?.[endpoint.id] ?? cryptoCopy[locale.value]?.[endpoint.id]
  return localized ? { ...endpoint, ...localized } : endpoint
}

const currencyNotice = computed(() => {
  const notices = {
    fiat: { en: 'EUR and GBP use the same fiat API, API Key authentication, and webhook security. The selected currency changes the examples; availability depends on your enabled currencies and payment corridors.', 'zh-CN': 'EUR、GBP 共用同一套法币 API、API Key 鉴权及回调安全规则；切换币种会同步更新示例，实际可用范围以账户授权和通道能力为准。', 'zh-TW': 'EUR、GBP共用同一套法幣API、API Key驗證及回調安全規則；切換幣種會更新範例，可用範圍以帳戶授權和通道能力為準。' },
    usd: { en: 'USD uses the same fiat API and security as EUR and GBP. USD examples use SWIFT where applicable; availability depends on your enabled currency and payment corridor.', 'zh-CN': 'USD 与 EUR、GBP 共用同一套法币 API 和安全配置；USD 出金示例使用 SWIFT，实际可用范围以账户币种授权和通道能力为准。', 'zh-TW': 'USD與EUR、GBP共用同一套法幣API及安全設定；USD出金範例使用SWIFT，可用範圍以帳戶授權和通道能力為準。' },
    'digital-assets': { en: 'Wallet creation is idempotent: an existing Safeheron account is reused and only missing asset/network addresses are provisioned. Supported assets and networks come from API configuration.', 'zh-CN': '钱包创建采用幂等设计：复用已有 Safeheron 账户，只补建缺失的币种/网络地址；支持的币种和网络以 API 配置为准。', 'zh-TW': '錢包建立採用冪等設計：重用既有 Safeheron 帳戶，只補建缺失的幣種／網路地址；支援的幣種和網路以 API 設定為準。' },
    cards: { en: 'Card availability, fees, funding assets, and wallet support vary by product. Always use the latest values returned by the available-card endpoint.', 'zh-CN': '卡片可用性、费用、充值资产及钱包支持因产品而异，请始终以可开卡片接口返回的最新值为准。', 'zh-TW': '卡片可用性、費用、儲值資產及錢包支援因產品而異，請始終以可開卡片介面回傳的最新值為準。' },
  }
  return notices[selectedModule.value]?.[locale.value] ?? notices[selectedModule.value]?.en ?? ''
})

const moduleOverview = computed(() => {
  if (isFiatModule.value) {
    const descriptions = {
      en: { heroTitle: `${selectedFiatCurrency.value} accounts and payments.`, heroIntro: 'One fiat API for account opening, deposits, payouts, transfers, transactions and billing, with API Key and webhook security in the same documentation.', beforeStartBody: 'Create a TEST or LIVE API Key in your console and exchange apiKey + apiSecret for a business token. Configure keys and callback settings in the tenant console.', authTitle: 'API Key authentication', authBody: 'Business requests use POST /partner-api/v1/oauth/token, then Authorization: Bearer {accessToken}. Manage keys and webhook settings in the tenant console. TEST and LIVE credentials remain isolated.' },
      'zh-CN': { heroTitle: `${selectedFiatCurrency.value} 法币账户与支付。`, heroIntro: '开户、入金指引、出金、账户划转、交易和账单共用一套法币 API，通过 API Key 接入，并通过 Webhook 接收业务结果。', beforeStartBody: '在业务台创建 TEST 或 LIVE API Key，用 apiKey 与 apiSecret 换取业务访问 Token。密钥与回调配置在租户业务台操作。', authTitle: 'API Key 鉴权', authBody: '业务接口先调用 POST /partner-api/v1/oauth/token，再携带 Authorization: Bearer {accessToken}。密钥和 Webhook 在租户业务台配置；TEST、LIVE 密钥与令牌按环境隔离。' },
      'zh-TW': { heroTitle: `${selectedFiatCurrency.value} 法幣帳戶與支付。`, heroIntro: '開戶、入金指引、出金、帳戶劃轉、交易及帳單共用一套法幣API，API Key與回調安全統一對接。', beforeStartBody: '在業務台建立TEST或LIVE API Key，使用apiKey及apiSecret換取業務Token；密鑰及回調設定在租戶業務台操作。', authTitle: 'API Key驗證', authBody: '業務接口先呼叫POST /partner-api/v1/oauth/token，再攜帶Bearer Token；密鑰及Webhook在租戶業務台設定，TEST及LIVE按環境隔離。' },
    }
    return descriptions[locale.value] ?? descriptions.en
  }
  const overviews = {
    'digital-assets': {
      en: { heroTitle: 'Create and move digital assets with confidence.', heroIntro: 'Discover supported assets and networks, provision wallets and deposit addresses, read balances and pricing, review transactions, and create withdrawals.', beforeStartBody: 'Sign in to YASBe and copy the returned JWT. The gateway is configured by the deployment environment. Endpoints marked Contract require the matching backend controller implementation.', authTitle: 'Bearer JWT', authBody: 'Crypto endpoints use the JWT returned by the YASBe sign-in flow. Send it with every request as Authorization: Bearer {token}. Never expose the token in public client code.' },
      'zh-CN': { heroTitle: '安全创建和流转数字资产。', heroIntro: '查询支持的币种和网络、创建钱包和充值地址，并完成余额、价格、交易与提现管理。', beforeStartBody: '请先登录 YASBe 获取 JWT；网关地址由部署环境统一配置。标记为“接口契约”的接口仍需后端提供对应 Controller 实现。', authTitle: 'Bearer JWT', authBody: '数币接口使用 YASBe 登录流程返回的 JWT。每次请求都需要携带 Authorization: Bearer {token}，请勿在公开的客户端代码中暴露令牌。' },
      'zh-TW': { heroTitle: '安全建立和流轉數位資產。', heroIntro: '查詢支援的幣種和網路、建立錢包和充值地址，並完成餘額、價格、交易與提現管理。', beforeStartBody: '請先登入 YASBe 取得 JWT；網關位址由部署環境統一設定。標記為「介面契約」的介面仍需後端提供對應 Controller 實作。', authTitle: 'Bearer JWT', authBody: '數位資產介面使用 YASBe 登入流程回傳的 JWT。每次請求都需要攜帶 Authorization: Bearer {token}，請勿在公開的用戶端程式碼中暴露權杖。' },
    },
    cards: {
      en: { heroTitle: 'Issue and manage cards through one API.', heroIntro: 'Onboard cardholders, apply for virtual and physical cards, fund balances, manage card status, and review transactions.', beforeStartBody: 'Sign in to YASBe and copy the returned JWT. The gateway is configured by the deployment environment. Complete KYC before applying for a card.', authTitle: 'Bearer JWT', authBody: 'Card endpoints use the JWT returned by the YASBe sign-in flow. Send it as Authorization: Bearer {token}. Card data, PAN, CVV, identity documents, and PINs require strict handling.' },
      'zh-CN': { heroTitle: '通过一套 API 发行和管理卡片。', heroIntro: '完成持卡人认证、申请虚拟卡和实体卡、充值余额、管理卡片状态并查询交易。', beforeStartBody: '请先登录 YASBe 获取 JWT；网关地址由部署环境统一配置。申请卡片前需要完成 KYC。', authTitle: 'Bearer JWT', authBody: '卡片接口使用 YASBe 登录流程返回的 JWT，并通过 Authorization: Bearer {token} 携带。卡号、CVV、身份文件和 PIN 均须按敏感数据严格处理。' },
      'zh-TW': { heroTitle: '透過一套 API 發行和管理卡片。', heroIntro: '完成持卡人驗證、申請虛擬卡和實體卡、儲值餘額、管理卡片狀態並查詢交易。', beforeStartBody: '請先登入 YASBe 取得 JWT；網關位址由部署環境統一設定。申請卡片前需要完成 KYC。', authTitle: 'Bearer JWT', authBody: '卡片介面使用 YASBe 登入流程回傳的 JWT，並透過 Authorization: Bearer {token} 攜帶。卡號、CVV、身分檔案和 PIN 均須按敏感資料嚴格處理。' },
    },
  }
  return overviews[selectedModule.value]?.[locale.value] ?? overviews[selectedModule.value]?.en ?? {}
})

function endpointDetail(endpoint) {
  return fiatCopy[locale.value]?.[endpoint.id]?.detail ?? endpoint.detail
}

function fieldDescription(field) {
  return fiatCopy[locale.value]?.[activeEndpoint.value.id]?.fields?.[field.name] ?? cardCopy[locale.value]?.[activeEndpoint.value.id]?.fields?.[field.name] ?? cryptoCopy[locale.value]?.[activeEndpoint.value.id]?.fields?.[field.name] ?? field.description
}

const errorTranslations = {
  'zh-CN': { AUTH_MISSING_TOKEN: '缺少 Bearer Token。', AUTH_INVALID_TOKEN: 'Token 无效或已过期。', AUTH_INVALID_CLIENT_CREDENTIALS: '客户端 ID 或密钥不正确。', CLIENT_DISABLED: 'API 客户端已停用。', INTERNAL_ERROR: '服务内部错误。', SYSTEM_ERROR: '服务内部错误。', UNSUPPORTED_COUNTRY: '开户国家/地区不受支持。', ACCOUNT_ALREADY_EXISTS: '该客户和币种的账户已存在。', REQUEST_VALIDATION_FAILED: '请求缺少必填字段或字段值不符合要求。', PLATFORM_VALIDATION_FAILED: '平台拒绝了该请求，请查看返回信息。', PLATFORM_UNAVAILABLE: '平台不可用或未返回所需结果。', ACCOUNT_NOT_FOUND: '未找到客户账户。', BENEFICIARY_ACCOUNT_INVALID: 'IBAN、账号或 Sort Code 无效。', UNSUPPORTED_CURRENCY: '当前仅支持 EUR 和 GBP。', IDEMPOTENCY_KEY_REQUIRED: '必须提供 Idempotency-Key 请求头。', BENEFICIARY_NOT_FOUND: '未找到受益人，或其不属于该客户。', SWEEP_SOURCE_ACCOUNT_NOT_CONFIGURED: '未配置该币种的出金来源账户。', TRANSACTION_NOT_FOUND: '交易不存在或不属于当前客户端。', TRANSACTION_NOT_CANCELLABLE: '交易已完成、失败、取消或不是出金，无法撤销。', WEBHOOK_KEY_UNAVAILABLE: '平台 Webhook 公钥不可用。', BRIDGE_SERVICE_ERROR: 'Bridge 服务返回错误或暂时不可用。', KYC_NOT_ACTIVE: 'KYC 尚未完成或 base 背书尚未批准。', CUSTOMER_NOT_FOUND: '该用户尚未创建 Bridge 账户。', FILE_INVALID: '文件缺失、不是图片或超出 5 MB 限制。', BRIDGE_FIELDS_MISSING: '请求体缺少必填字段。', BRIDGE_VALIDATION_ERROR: '字段验证失败，例如该邮箱已注册。' },
  'zh-TW': { AUTH_MISSING_TOKEN: '缺少 Bearer 權杖。', AUTH_INVALID_TOKEN: '權杖無效或已過期。', AUTH_INVALID_CLIENT_CREDENTIALS: '用戶端 ID 或密鑰不正確。', CLIENT_DISABLED: 'API 用戶端已停用。', INTERNAL_ERROR: '服務內部錯誤。', SYSTEM_ERROR: '服務內部錯誤。', UNSUPPORTED_COUNTRY: '開戶國家／地區不受支援。', ACCOUNT_ALREADY_EXISTS: '該客戶和幣別的帳戶已存在。', REQUEST_VALIDATION_FAILED: '請求缺少必填欄位或欄位值不符合要求。', PLATFORM_VALIDATION_FAILED: '平台拒絕了此請求，請查看回傳資訊。', PLATFORM_UNAVAILABLE: '平台不可用或未回傳所需結果。', ACCOUNT_NOT_FOUND: '未找到客戶帳戶。', BENEFICIARY_ACCOUNT_INVALID: 'IBAN、帳號或 Sort Code 無效。', UNSUPPORTED_CURRENCY: '目前僅支援 EUR 和 GBP。', IDEMPOTENCY_KEY_REQUIRED: '必須提供 Idempotency-Key 請求標頭。', BENEFICIARY_NOT_FOUND: '未找到受益人，或其不屬於該客戶。', SWEEP_SOURCE_ACCOUNT_NOT_CONFIGURED: '未設定該幣別的出金來源帳戶。', TRANSACTION_NOT_FOUND: '交易不存在或不屬於目前用戶端。', TRANSACTION_NOT_CANCELLABLE: '交易已完成、失敗、取消或不是出金，無法撤銷。', WEBHOOK_KEY_UNAVAILABLE: '平台 Webhook 公鑰不可用。', BRIDGE_SERVICE_ERROR: 'Bridge 服務回傳錯誤或暫時不可用。', KYC_NOT_ACTIVE: 'KYC 尚未完成或 base 背書尚未批准。', CUSTOMER_NOT_FOUND: '該用戶尚未建立 Bridge 帳戶。', FILE_INVALID: '檔案缺失、不是圖片或超出 5 MB 限制。', BRIDGE_FIELDS_MISSING: '請求內容缺少必填欄位。', BRIDGE_VALIDATION_ERROR: '欄位驗證失敗，例如該電子郵件已注冊。' },
}

function errorDescription(error) {
  return errorTranslations[locale.value]?.[error.code] ?? error.description
}

function moduleCopy(module) {
  return { ...module, name: moduleTranslations[locale.value]?.[module.id] ?? module.name }
}

function buildParameterValues(endpoint) {
  return Object.fromEntries(endpoint.fields
    .filter((field) => ['Path', 'Query', 'Header'].includes(field.location) && field.name !== 'Authorization')
    .map((field) => [field.name, field.autoGenerate ? crypto.randomUUID() : (field.defaultValue ?? '')]))
}

// 切换接口时同时清理文件状态和原生控件，避免将前一次证件误传给其他客户。
function clearUpload() {
  uploadFile.value = null
  if (uploadInput.value) uploadInput.value.value = ''
}

function selectModule(moduleId) {
  clearUpload()
  selectedModule.value = moduleId
  if (!selectedModuleData.value.available) return
  activeEndpoint.value = endpoints.value[0]
  activeSection.value = 'overview'
  requestBody.value = JSON.stringify(activeEndpoint.value.example, null, 2)
  parameterValues.value = buildParameterValues(activeEndpoint.value)
  responseText.value = ''
  responseStatus.value = null
  requestError.value = ''
}

function selectEndpoint(endpoint) {
  clearUpload()
  activeEndpoint.value = endpoint
  activeSection.value = endpoint.id
  requestBody.value = JSON.stringify(endpoint.example, null, 2)
  parameterValues.value = buildParameterValues(endpoint)
  responseText.value = ''
  responseStatus.value = null
  requestError.value = ''
}

function selectFiatCurrency() {
  const endpoint = endpoints.value.find(item => item.id === activeEndpoint.value.id) ?? endpoints.value[0]
  selectEndpoint(endpoint)
}

const isLangMenuOpen = ref(false)
const langMenuRef = ref(null)
const currentLangLabel = computed(() => localeOptions.find((o) => o.code === locale.value)?.shortLabel ?? 'EN')

async function selectLang(code) {
  await setAppLocale(code)
  isLangMenuOpen.value = false
}

function handleLangOutsideClick(e) {
  if (!langMenuRef.value?.contains(e.target)) isLangMenuOpen.value = false
}

onMounted(() => document.addEventListener('click', handleLangOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleLangOutsideClick))

async function sendRequest() {
  const requestEndpoint = activeEndpoint.value
  requestError.value = ''
  responseText.value = ''
  responseStatus.value = null
  if (requestEndpoint.tryEnabled === false) return
  if (!baseUrl.value) { requestError.value = copy.value.gatewayRequired; return }
  let payload
  try { payload = hasRequestBody.value ? JSON.parse(requestBody.value) : undefined } catch { requestError.value = copy.value.invalidJson; return }
  const headers = { Accept: requestEndpoint.responseType === 'pdf' ? 'application/pdf' : 'application/json' }
  if (payload !== undefined && !requestEndpoint.multipart) headers['Content-Type'] = 'application/json'
  if (requestEndpoint.multipart) {
    if (!uploadFile.value || uploadFile.value.size === 0 || uploadFile.value.size > 10 * 1024 * 1024) { requestError.value = 'file: PDF / PNG / JPEG, 1 byte–10MB'; return }
    // 交给浏览器生成 multipart boundary，不能手动设置 Content-Type。
    payload = new FormData()
    payload.append('file', uploadFile.value)
  }
  if (requestEndpoint.requiresAuth && activeAccessToken.value) headers.Authorization = `Bearer ${activeAccessToken.value}`
  for (const field of interactiveFields.value.filter((item) => item.location === 'Header')) {
    let value = parameterValues.value[field.name]
    if (!value && field.name === 'Idempotency-Key') {
      value = crypto.randomUUID()
      parameterValues.value[field.name] = value
    }
    if (field.required && !value) { requestError.value = `${field.name}: ${copy.value.required}`; return }
    if (value) headers[field.name] = value
  }
  if (requestEndpoint.id === 'crypto-withdraw' && twoFactorToken.value) headers['X-2FA-Token'] = twoFactorToken.value
  if (isUserApiModule.value) headers.Lang = locale.value
  const [rawPath, rawQuery = ''] = (requestEndpoint.tryPath ?? requestEndpoint.path).split('?')
  let requestPath = rawPath
  const query = new URLSearchParams(rawQuery)
  for (const field of interactiveFields.value.filter((item) => item.location === 'Path' || item.location === 'Query')) {
    const value = parameterValues.value[field.name]
    if (field.required && !value) { requestError.value = `${field.name}: ${copy.value.required}`; return }
    if (field.location === 'Path') requestPath = requestPath.replaceAll(`{${field.name}}`, encodeURIComponent(value))
    else if (value) query.set(field.name, value)
    else query.delete(field.name)
  }
  const queryString = query.toString()
  if (queryString) requestPath += `?${queryString}`
  isSending.value = true
  try {
    const response = await fetch(`${baseUrl.value.replace(/\/$/, '')}${requestPath}`, { method: requestEndpoint.method, headers, body: requestEndpoint.multipart ? payload : (payload !== undefined ? JSON.stringify(payload) : undefined) })
    responseStatus.value = response.status
    const contentType = response.headers.get('content-type') ?? ''
    if (response.ok && requestEndpoint.responseType === 'file') {
      const blob = await response.blob()
      const href = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = href
      link.download = /filename="?([^";]+)"?/i.exec(response.headers.get('content-disposition') ?? '')?.[1] ?? 'security-download'
      link.click()
      setTimeout(() => URL.revokeObjectURL(href), 1000)
      responseText.value = `Attachment received (${blob.size} bytes)`
      return
    } else if (contentType.includes('application/pdf')) {
      const blob = await response.blob()
      responseText.value = `PDF received (${blob.size} bytes)`
      return
    }
    const text = await response.text()
    try {
      const json = JSON.parse(text)
      responseText.value = JSON.stringify(json, null, 2)
      if (isFiatModule.value && requestEndpoint.id === 'fiat-token' && response.ok && json.success === true && json.data?.accessToken) fiatAccessToken.value = json.data.accessToken
    } catch { responseText.value = text || `${response.status} ${response.statusText}` }
  } catch (error) {
    requestError.value = copy.value.sendFailed.replace('{message}', error.message)
  } finally { isSending.value = false }
}
</script>

<style scoped src="../styles/views/ApiDocsView.css"></style>
