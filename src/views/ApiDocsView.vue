<template>
  <div class="api-docs">
    <div class="api-docs__topbar">
      <RouterLink to="/" class="api-docs__wordmark">YASBe <span>{{ copy.documentation }}</span></RouterLink>
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
        <p class="api-docs__sidebar-label">{{ copy.apiReference }}</p>
        <button v-for="endpoint in endpoints" :key="endpoint.id" type="button" :class="{ active: activeEndpoint.id === endpoint.id }" @click="selectEndpoint(endpoint)">
          <span :class="['api-docs__method', `api-docs__method--${endpoint.method.toLowerCase()}`]">{{ endpoint.method }}</span>
          <span>{{ endpointCopy(endpoint).label }}</span>
        </button>
        </template>
      </aside>

      <article v-if="isAvailableModule" class="api-docs__content">
        <section id="overview">
          <p class="api-docs__eyebrow">YASBE PLATFORM API</p>
          <h1>{{ moduleOverview.heroTitle }}</h1>
          <p class="api-docs__intro">{{ moduleOverview.heroIntro }}</p>
          <p class="api-docs__currency-note">{{ currencyNotice }}</p>
          <div class="api-docs__notice"><strong>{{ copy.beforeStart }}</strong><span>{{ moduleOverview.beforeStartBody }}</span></div>
        </section>

        <section id="authentication" class="api-docs__section">
          <p class="api-docs__eyebrow">{{ copy.authentication }}</p>
          <h2>{{ moduleOverview.authTitle }}</h2>
          <p>{{ moduleOverview.authBody }}</p>
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

          <h3>{{ copy.requestParameters }}</h3>
          <div class="api-docs__table-wrap">
            <table>
            <thead><tr><th>{{ copy.field }}</th><th>{{ copy.location }}</th><th>{{ copy.required }}</th><th>{{ copy.description }}</th></tr></thead>
              <tbody>
                <tr v-for="field in activeEndpoint.fields" :key="field.name"><td><code>{{ field.name }}</code></td><td>{{ field.location ?? copy.body }}</td><td>{{ field.required ? copy.yes : copy.no }}</td><td>{{ fieldDescription(field) }}</td></tr>
              </tbody>
            </table>
          </div>

          <h3>{{ copy.responses }}</h3>
          <p>{{ copy.responseIntro }} <code>{{ activeEndpoint.successStatus }}</code>{{ moduleResponseEnd }}</p>
          <pre class="api-docs__example"><code>{{ JSON.stringify(activeEndpoint.responseExample, null, 2) }}</code></pre>

          <h3>{{ copy.errorCodes }}</h3>
          <div class="api-docs__table-wrap">
            <table>
              <thead><tr><th>{{ copy.code }}</th><th>{{ copy.httpStatus }}</th><th>{{ copy.description }}</th></tr></thead>
              <tbody>
                <tr v-for="error in activeEndpoint.errors" :key="error.code"><td><code>{{ error.code }}</code></td><td>{{ error.status }}</td><td>{{ errorDescription(error) }}</td></tr>
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
        <label v-if="activeEndpoint.requiresAuth" class="api-docs__input-label">{{ copy.bearerToken }}<input v-model.trim="accessToken" type="password" :placeholder="copy.tokenPlaceholder" autocomplete="off" /></label>
        <label v-if="activeEndpoint.id === 'crypto-withdraw'" class="api-docs__input-label">{{ twoFactorLabel }}<input v-model.trim="twoFactorToken" type="password" :placeholder="twoFactorPlaceholder" autocomplete="one-time-code" /></label>
        <label class="api-docs__input-label">{{ copy.requestBody }}<textarea v-model="requestBody" rows="13" spellcheck="false" :aria-label="copy.requestBody"></textarea></label>
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
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import fiatIcon from '../assets/images/api-fiat-icon.svg'
import { cardCopy, cardEndpoints } from '../data/apiDocsCards.js'
import { cryptoCopy, cryptoEndpoints } from '../data/apiDocsCrypto.js'

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
const isFiatExpanded = ref(true)
const selectedModuleData = computed(() => modules.find((module) => module.id === selectedModule.value) ?? modules[0])
const isAvailableModule = computed(() => selectedModuleData.value.available)
const apiCopy = {
  'zh-CN': {
    token: { label: '获取访问令牌', title: '获取访问令牌', description: '使用客户端凭据换取短期访问令牌。', fields: { clientId: '你的接入客户端标识。', clientSecret: '你的接入密钥；仅在创建时展示一次。' } },
    countries: { label: '查询国家', title: '查询支持的国家/地区', description: '返回允许开户的 ISO 3166-1 alpha-2 国家代码。', fields: {} },
    accounts: { label: '创建账户', title: '创建账户', description: '为个人或企业客户创建币种账户。', fields: { externalCustomerId: '接入方系统中的客户唯一标识。', currency: 'ISO 4217 币种，例如 EUR。', country: '允许开户的国家/地区。', customerType: 'INDIVIDUAL 或 COMPANY。', friendlyName: '账户展示名称。' } },
    beneficiaries: { label: '创建受益人', title: '创建外部账户', description: '在出金前登记受益人。EUR/SEPA 使用 IBAN；GBP/FPS 或 CHAPS 使用账号和 Sort Code。', fields: { externalCustomerId: '你的客户标识。', currency: '受益人账户币种。', paymentType: '支付网络，例如 SEPA。', beneficiaryType: '受益人类型，例如 RETAIL。', iban: 'EUR/SEPA 支付时必填。' } },
    'list-beneficiaries': { label: '查询受益人', title: '查询客户受益人', description: '返回指定客户已创建的全部外部银行账户，可按币种筛选。', fields: {} },
    payouts: { label: '发起出金', title: '发起出金', description: '向受益人发送资金。请提供 Idempotency-Key 请求头以安全重试。', fields: { externalCustomerId: '你的客户标识。', beneficiaryId: '创建受益人时返回的 ID。', currency: '出金币种。', amount: '出金金额。', reference: '付款附言。' } },
    'list-accounts': { label: '查询客户账户', title: '查询客户账户', description: '返回已认证接入方下该客户的所有账户。', fields: {} },
    'deposit-instructions': { label: '获取入金指引', title: '获取入金指引', description: '返回客户指定币种账户的收款资料。', fields: {} },
    transaction: { label: '查询交易', title: '查询交易状态', description: '返回本地记录的最新交易状态。', fields: {} },
    'cancel-payout': { label: '撤销出金', title: '撤销待处理出金', description: '对尚未进入终态的出金发起撤销请求。', fields: {} },
    'webhook-subscription': { label: '创建 Webhook 订阅', title: '创建或更新 Webhook 订阅', description: '登记安全回调地址以及接入方希望接收的事件。', fields: { callbackUrl: '接收事件推送的 HTTPS 地址。', eventTypes: '订阅事件类型的 JSON 数组。', encryptionPublicKey: '用于加密事件正文的 PEM 公钥。' } },
    'webhook-public-key': { label: '下载 Webhook 公钥', title: '下载平台 Webhook 验签公钥', description: '下载用于验证平台 Webhook 签名的 PEM 公钥。', fields: {} },
  },
  'zh-TW': {
    token: { label: '取得存取權杖', title: '取得存取權杖', description: '使用用戶端憑證換取短期存取權杖。', fields: { clientId: '你的串接用戶端識別碼。', clientSecret: '你的串接密鑰；僅在建立時顯示一次。' } },
    countries: { label: '查詢國家', title: '查詢支援的國家／地區', description: '回傳允許開戶的 ISO 3166-1 alpha-2 國家代碼。', fields: {} },
    accounts: { label: '建立帳戶', title: '建立帳戶', description: '為個人或企業客戶建立幣別帳戶。', fields: { externalCustomerId: '接入方系統中的客戶唯一識別碼。', currency: 'ISO 4217 幣別，例如 EUR。', country: '允許開戶的國家／地區。', customerType: 'INDIVIDUAL 或 COMPANY。', friendlyName: '帳戶顯示名稱。' } },
    beneficiaries: { label: '建立受益人', title: '建立外部帳戶', description: '在出金前登記受益人。EUR/SEPA 使用 IBAN；GBP/FPS 或 CHAPS 使用帳號和 Sort Code。', fields: { externalCustomerId: '你的客戶識別碼。', currency: '受益人帳戶幣別。', paymentType: '付款網路，例如 SEPA。', beneficiaryType: '受益人類型，例如 RETAIL。', iban: 'EUR/SEPA 付款時必填。' } },
    'list-beneficiaries': { label: '查詢受益人', title: '查詢客戶受益人', description: '回傳指定客戶已建立的全部外部銀行帳戶，可依幣別篩選。', fields: {} },
    payouts: { label: '發起出金', title: '發起出金', description: '向受益人發送資金。請提供 Idempotency-Key 請求標頭以安全重試。', fields: { externalCustomerId: '你的客戶識別碼。', beneficiaryId: '建立受益人時回傳的 ID。', currency: '出金幣別。', amount: '出金金額。', reference: '付款附言。' } },
    'list-accounts': { label: '查詢客戶帳戶', title: '查詢客戶帳戶', description: '回傳已驗證接入方下該客戶的所有帳戶。', fields: {} },
    'deposit-instructions': { label: '取得入金指引', title: '取得入金指引', description: '回傳客戶指定幣別帳戶的收款資料。', fields: {} },
    transaction: { label: '查詢交易', title: '查詢交易狀態', description: '回傳本地記錄的最新交易狀態。', fields: {} },
    'cancel-payout': { label: '撤銷出金', title: '撤銷待處理出金', description: '對尚未進入終態的出金發起撤銷請求。', fields: {} },
    'webhook-subscription': { label: '建立 Webhook 訂閱', title: '建立或更新 Webhook 訂閱', description: '登記安全回呼地址以及接入方希望接收的事件。', fields: { callbackUrl: '接收事件推送的 HTTPS 位址。', eventTypes: '訂閱事件類型的 JSON 陣列。', encryptionPublicKey: '用於加密事件內容的 PEM 公鑰。' } },
    'webhook-public-key': { label: '下載 Webhook 公鑰', title: '下載平台 Webhook 驗簽公鑰', description: '下載用於驗證平台 Webhook 簽名的 PEM 公鑰。', fields: {} },
  },
}

const endpointDetails = {
  en: {
    token: 'Use this first. Store the access token securely on your server and request a new one after it expires.',
    countries: 'Use this list to validate the country sent when opening an account; do not offer countries outside the returned list.',
    accounts: 'An account is unique per customer and currency. This fiat module currently supports EUR and GBP accounts only.',
    beneficiaries: 'Create the beneficiary once, then retain the returned local ID. The account currency and payment rail must match the payout.',
    'list-beneficiaries': 'Use this to load a customer’s saved beneficiaries before a payout. Filter by currency when the payment flow has already selected EUR or GBP.',
    payouts: 'Use a new Idempotency-Key for each intended payout. Reusing the same key safely returns the original result rather than creating a duplicate.',
    'list-accounts': 'Use this after onboarding or when refreshing a customer profile. Results are scoped to the authenticated API client.',
    'deposit-instructions': 'Show the returned account details and status to the customer before they make a bank transfer. This endpoint does not create a deposit.',
    transaction: 'Poll this endpoint or process webhook events to follow a payout from PENDING to its final state.',
    'cancel-payout': 'Cancellation is only available while the payout remains non-final. A successful request means cancellation was requested, not necessarily completed.',
    'webhook-subscription': 'Use an HTTPS endpoint you control. Keep the returned key ID and verify every incoming event using the platform public key.',
    'webhook-public-key': 'Download and cache this PEM key to verify webhook signatures. Refresh it when your webhook configuration or key ID changes.',
  },
  'zh-CN': {
    token: '请先调用此接口。访问令牌应仅安全地保存在服务端；过期后重新获取，不要暴露给浏览器或移动端。',
    countries: '开户前请用此列表校验 country；不要让最终用户选择未在响应中返回的国家或地区。',
    accounts: '同一客户和币种只能创建一个账户。当前法币模块仅支持 EUR 与 GBP 账户。',
    beneficiaries: '受益人只需创建一次，请保存返回的本地 ID。账户币种与支付网络必须和出金请求一致。',
    'list-beneficiaries': '在客户发起出金前可调用此接口获取已保存的受益人。若流程已选择 EUR 或 GBP，建议使用币种筛选。',
    payouts: '每笔计划出金都应使用新的 Idempotency-Key。重复使用同一键会安全返回首次结果，不会重复付款。',
    'list-accounts': '适用于开户后或刷新客户资料时查询。结果只会返回当前已认证 API 客户端所属的账户。',
    'deposit-instructions': '应向客户展示返回的收款信息和账户状态后再发起银行转账；本接口不会创建入金交易。',
    transaction: '可轮询此接口，或处理 Webhook 事件，追踪出金从 PENDING 到最终状态的变化。',
    'cancel-payout': '仅非终态出金可撤销。成功响应表示已提交撤销请求，并不代表渠道已经完成撤销。',
    'webhook-subscription': '请使用由你控制的 HTTPS 地址。保存返回的 key ID，并通过平台公钥校验每一条入站事件。',
    'webhook-public-key': '下载并缓存该 PEM 公钥以验证 Webhook 签名；更新回调配置或 key ID 后应重新获取。',
  },
  'zh-TW': {
    token: '請先呼叫此介面。存取權杖應僅安全地保存在伺服器端；過期後重新取得，不要暴露給瀏覽器或行動端。',
    countries: '開戶前請用此清單驗證 country；不要讓使用者選擇未在回應中回傳的國家或地區。',
    accounts: '同一客戶和幣別只能建立一個帳戶。目前法幣模組僅支援 EUR 與 GBP 帳戶。',
    beneficiaries: '受益人只需建立一次，請保存回傳的本地 ID。帳戶幣別與付款網路必須和出金請求一致。',
    'list-beneficiaries': '在客戶發起出金前可呼叫此介面取得已保存的受益人。若流程已選擇 EUR 或 GBP，建議使用幣別篩選。',
    payouts: '每筆預定出金都應使用新的 Idempotency-Key。重複使用同一鍵會安全回傳首次結果，不會重複付款。',
    'list-accounts': '適用於開戶後或重新整理客戶資料時查詢。結果只會回傳目前已驗證 API 用戶端所屬的帳戶。',
    'deposit-instructions': '應向客戶顯示回傳的收款資料和帳戶狀態後再進行銀行轉帳；本介面不會建立入金交易。',
    transaction: '可輪詢此介面，或處理 Webhook 事件，追蹤出金從 PENDING 到最終狀態的變化。',
    'cancel-payout': '僅非終態出金可撤銷。成功回應表示已提交撤銷請求，並不代表渠道已完成撤銷。',
    'webhook-subscription': '請使用由你控制的 HTTPS 位址。保存回傳的 key ID，並透過平台公鑰驗證每一條入站事件。',
    'webhook-public-key': '下載並快取該 PEM 公鑰以驗證 Webhook 簽名；更新回呼設定或 key ID 後應重新取得。',
  },
}

const fiatEndpoints = [
  { id: 'token', label: 'Get access token', method: 'POST', path: '/v1/auth/token', title: 'Get an access token', description: 'Exchange your client credentials for a short-lived access token.', requiresAuth: false, successStatus: '200', fields: [{ name: 'clientId', required: true, description: 'Your integration client identifier.' }, { name: 'clientSecret', required: true, description: 'Your integration secret. Displayed only once when created.' }], example: { clientId: 'your-client-id', clientSecret: 'your-client-secret' }, responseExample: { accessToken: 'eyJ…', tokenType: 'Bearer', expiresIn: 3600 }, errors: [{ code: 'AUTH_INVALID_CLIENT_CREDENTIALS', status: 401, description: 'Client ID or secret is invalid.' }, { code: 'CLIENT_DISABLED', status: 403, description: 'The API client is disabled.' }, { code: 'INTERNAL_ERROR', status: 500, description: 'Internal service error.' }] },
  { id: 'countries', label: 'List countries', method: 'GET', path: '/v1/countries', title: 'List supported countries', description: 'Return ISO 3166-1 alpha-2 country codes eligible for account opening.', requiresAuth: true, successStatus: '200', fields: [{ name: 'Authorization', location: 'Header', required: true, description: 'Bearer access token.' }], example: {}, responseExample: { data: ['GB', 'MT', 'DE'] }, errors: [{ code: 'AUTH_MISSING_TOKEN', status: 401, description: 'Bearer token is missing.' }, { code: 'AUTH_INVALID_TOKEN', status: 401, description: 'Token is invalid or expired.' }, { code: 'INTERNAL_ERROR', status: 500, description: 'Internal service error.' }] },
  { id: 'accounts', label: 'Create account', method: 'POST', path: '/v1/accounts', title: 'Create an account', description: 'Create a currency account for an individual or company customer.', requiresAuth: true, successStatus: '200', fields: [{ name: 'Authorization', location: 'Header', required: true, description: 'Bearer access token.' }, { name: 'externalCustomerId', required: true, description: 'Unique customer ID in your system.' }, { name: 'currency', required: true, description: 'ISO 4217 currency, for example EUR.' }, { name: 'country', required: true, description: 'Supported account-opening country.' }, { name: 'customerType', required: true, description: 'INDIVIDUAL or BUSINESS.' }, { name: 'friendlyName', required: true, description: 'Account display name.' }, { name: 'individual', required: false, description: 'Required object when customerType is INDIVIDUAL; contains customer identity and address data.' }, { name: 'company', required: false, description: 'Required object when customerType is BUSINESS; contains company and registered-address data.' }], example: { externalCustomerId: 'customer-001', currency: 'EUR', country: 'MT', customerType: 'INDIVIDUAL', friendlyName: 'John Smith', individual: { email: 'john@example.com', firstName: 'John', lastName: 'Smith', address: { addressLine1: '1 London Street', city: 'London', country: 'GB' } } }, responseExample: { data: { externalCustomerId: 'customer-001', accountId: 'acc_01J…', status: 'PENDING', currency: 'EUR' } }, errors: [{ code: 'UNSUPPORTED_COUNTRY', status: 422, description: 'The account-opening country is not supported.' }, { code: 'ACCOUNT_ALREADY_EXISTS', status: 409, description: 'An account for this customer and currency already exists.' }, { code: 'REQUEST_VALIDATION_FAILED', status: 400, description: 'Required data is missing or customerType is invalid.' }, { code: 'PLATFORM_VALIDATION_FAILED', status: 422, description: 'The platform rejected the request.' }, { code: 'PLATFORM_UNAVAILABLE', status: 502, description: 'The platform did not return an account-holder ID or is unavailable.' }] },
  { id: 'beneficiaries', label: 'Create beneficiary', method: 'POST', path: '/v1/beneficiaries', title: 'Create an external account', description: 'Register a beneficiary before sending a payout. EUR/SEPA uses an IBAN; GBP/FPS or CHAPS uses account number and sort code.', requiresAuth: true, successStatus: '200', fields: [{ name: 'externalCustomerId', required: true, description: 'Your customer identifier.' }, { name: 'currency', required: true, description: 'Beneficiary account currency.' }, { name: 'paymentType', required: true, description: 'Payment rail, for example SEPA.' }, { name: 'beneficiaryType', required: true, description: 'Beneficiary type, for example RETAIL.' }, { name: 'iban', required: false, description: 'Required for EUR/SEPA payments.' }], example: { externalCustomerId: 'customer-001', currency: 'EUR', paymentType: 'SEPA', beneficiaryType: 'RETAIL', bankAccountHolderName: 'Jane Doe', beneficiaryCountry: 'GB', beneficiaryAddressLine: '1 London Street', beneficiaryCity: 'London', beneficiaryPostalCode: 'SW1A 1AA', bankAccountCountry: 'GB', iban: 'GB84SEOU00994400026127' }, responseExample: { data: { id: 10, providerBeneficiaryId: 'ben_01J…', status: 'CREATED' } }, errors: [{ code: 'ACCOUNT_NOT_FOUND', status: 404, description: 'The customer account was not found.' }, { code: 'BENEFICIARY_ACCOUNT_INVALID', status: 400, description: 'IBAN, account number, or sort code is invalid.' }, { code: 'UNSUPPORTED_CURRENCY', status: 422, description: 'Only EUR and GBP are currently supported.' }, { code: 'REQUEST_VALIDATION_FAILED', status: 400, description: 'A required beneficiary field is missing.' }, { code: 'PLATFORM_VALIDATION_FAILED', status: 422, description: 'The platform rejected the beneficiary.' }] },
  { id: 'list-beneficiaries', label: 'List beneficiaries', method: 'GET', path: '/v1/beneficiaries/{customerId}?currency={currency}', title: 'List customer beneficiaries', description: 'Return every beneficiary created for a customer. Optionally filter the list by EUR or GBP.', requiresAuth: true, successStatus: '200', fields: [{ name: 'customerId', location: 'Path', required: true, description: 'External customer ID.' }, { name: 'currency', location: 'Query', required: false, description: 'Optional ISO 4217 filter: EUR or GBP.' }, { name: 'Authorization', location: 'Header', required: true, description: 'Bearer access token.' }], example: {}, responseExample: { data: [{ id: 10, providerBeneficiaryId: 'ben_01J…', currency: 'EUR', name: 'Jane Doe', iban: 'GB84SEOU00994400026127', accountNumber: null, sortCode: null, verificationStatus: 'CREATED', createdAt: '2026-09-16T10:00:00Z' }] }, errors: [{ code: 'AUTH_MISSING_TOKEN', status: 401, description: 'Bearer token is missing.' }, { code: 'AUTH_INVALID_TOKEN', status: 401, description: 'Token is invalid or expired.' }, { code: 'INTERNAL_ERROR', status: 500, description: 'Internal service error.' }] },
  { id: 'payouts', label: 'Create payout', method: 'POST', path: '/v1/payouts', title: 'Create a payout', description: 'Send funds to a beneficiary. Supply an Idempotency-Key request header for safe retries.', requiresAuth: true, successStatus: '200', fields: [{ name: 'Authorization', location: 'Header', required: true, description: 'Bearer access token.' }, { name: 'Idempotency-Key', location: 'Header', required: true, description: 'Unique key used to safely retry this payout.' }, { name: 'externalCustomerId', required: true, description: 'Your customer identifier.' }, { name: 'beneficiaryId', required: true, description: 'Beneficiary ID returned when created.' }, { name: 'currency', required: true, description: 'Payout currency.' }, { name: 'amount', required: true, description: 'Payout amount; must be greater than zero.' }, { name: 'reference', required: true, description: 'Payment reference.' }, { name: 'paymentType', required: true, description: 'Payment rail, for example SEPA.' }], example: { externalCustomerId: 'customer-001', beneficiaryId: 10, currency: 'EUR', amount: 10, reference: 'Customer withdrawal', paymentType: 'SEPA' }, responseExample: { data: { transactionId: 'txn_01J…', status: 'PENDING', idempotentReplay: false } }, errors: [{ code: 'IDEMPOTENCY_KEY_REQUIRED', status: 400, description: 'Idempotency-Key request header is required.' }, { code: 'ACCOUNT_NOT_FOUND', status: 404, description: 'The customer account was not found.' }, { code: 'BENEFICIARY_NOT_FOUND', status: 404, description: 'The beneficiary does not exist or does not belong to the customer.' }, { code: 'REQUEST_VALIDATION_FAILED', status: 400, description: 'Amount must be greater than zero or a required field is missing.' }, { code: 'SWEEP_SOURCE_ACCOUNT_NOT_CONFIGURED', status: 500, description: 'No payout source account is configured for this currency.' }, { code: 'PLATFORM_UNAVAILABLE', status: 502, description: 'The platform is unavailable or did not return a transaction ID.' }] },
  { id: 'list-accounts', label: 'List customer accounts', method: 'GET', path: '/v1/accounts/{customerId}', title: 'List customer accounts', description: 'Return every account belonging to a customer under the authenticated API client.', requiresAuth: true, successStatus: '200', fields: [{ name: 'customerId', location: 'Path', required: true, description: 'External customer ID to query.' }, { name: 'Authorization', location: 'Header', required: true, description: 'Bearer access token.' }], example: {}, responseExample: { data: [{ externalCustomerId: 'customer-001', currency: 'EUR', country: 'MT', status: 'ACTIVE', iban: 'MT84…', bic: '...', internalAccountId: 'int_01J…' }] }, errors: [{ code: 'AUTH_MISSING_TOKEN', status: 401, description: 'Bearer token is missing.' }, { code: 'AUTH_INVALID_TOKEN', status: 401, description: 'Token is invalid or expired.' }, { code: 'INTERNAL_ERROR', status: 500, description: 'Internal service error.' }] },
  { id: 'deposit-instructions', label: 'Get deposit instructions', method: 'GET', path: '/v1/accounts/{customerId}/{currency}/deposit-instructions', title: 'Get deposit instructions', description: 'Return the receiving details for a customer account and currency.', requiresAuth: true, successStatus: '200', fields: [{ name: 'customerId', location: 'Path', required: true, description: 'External customer ID.' }, { name: 'currency', location: 'Path', required: true, description: 'Currency code, for example EUR.' }, { name: 'Authorization', location: 'Header', required: true, description: 'Bearer access token.' }], example: {}, responseExample: { data: { iban: 'MT84…', bic: '...', internalAccountId: 'int_01J…', status: 'ACTIVE' } }, errors: [{ code: 'ACCOUNT_NOT_FOUND', status: 404, description: 'The customer account was not found.' }, { code: 'AUTH_MISSING_TOKEN', status: 401, description: 'Bearer token is missing.' }, { code: 'AUTH_INVALID_TOKEN', status: 401, description: 'Token is invalid or expired.' }] },
  { id: 'transaction', label: 'Get transaction', method: 'GET', path: '/v1/transactions/{transactionId}', title: 'Get transaction status', description: 'Return the latest locally recorded transaction status.', requiresAuth: true, successStatus: '200', fields: [{ name: 'transactionId', location: 'Path', required: true, description: 'Platform transaction ID.' }, { name: 'Authorization', location: 'Header', required: true, description: 'Bearer access token.' }], example: {}, responseExample: { data: { transactionId: 'txn_01J…', direction: 'PAYOUT', currency: 'EUR', amount: 10, status: 'PENDING', createdAt: '2026-09-15T10:00:00Z', updatedAt: '2026-09-15T10:01:00Z' } }, errors: [{ code: 'TRANSACTION_NOT_FOUND', status: 404, description: 'The transaction does not exist or is not owned by the client.' }, { code: 'AUTH_MISSING_TOKEN', status: 401, description: 'Bearer token is missing.' }, { code: 'AUTH_INVALID_TOKEN', status: 401, description: 'Token is invalid or expired.' }] },
  { id: 'cancel-payout', label: 'Cancel payout', method: 'POST', path: '/v1/transactions/{transactionId}/cancel', title: 'Cancel a pending payout', description: 'Request cancellation for a payout that has not reached a final state.', requiresAuth: true, successStatus: '200', fields: [{ name: 'transactionId', location: 'Path', required: true, description: 'Platform transaction ID.' }, { name: 'Authorization', location: 'Header', required: true, description: 'Bearer access token.' }], example: {}, responseExample: { data: { transactionId: 'txn_01J…', status: 'CANCEL_REQUESTED' } }, errors: [{ code: 'TRANSACTION_NOT_FOUND', status: 404, description: 'The transaction does not exist or is not owned by the client.' }, { code: 'TRANSACTION_NOT_CANCELLABLE', status: 409, description: 'The transaction is completed, failed, cancelled, or not a payout.' }, { code: 'PLATFORM_VALIDATION_FAILED', status: 422, description: 'The platform rejected the cancellation request.' }, { code: 'PLATFORM_UNAVAILABLE', status: 502, description: 'The platform is unavailable.' }] },
  { id: 'webhook-subscription', label: 'Create webhook subscription', method: 'POST', path: '/v1/webhooks/subscription', title: 'Create or update a webhook subscription', description: 'Register a secure callback URL and the events your integration wants to receive.', requiresAuth: true, successStatus: '200', fields: [{ name: 'callbackUrl', required: true, description: 'HTTPS endpoint that receives event deliveries.' }, { name: 'eventTypes', required: true, description: 'JSON array of subscribed event types.' }, { name: 'encryptionPublicKey', required: false, description: 'PEM public key used to encrypt event payloads.' }], example: { callbackUrl: 'https://example.com/webhooks/yasbe', eventTypes: ['payout.updated', 'account.updated'], encryptionPublicKey: '-----BEGIN PUBLIC KEY-----…' }, responseExample: { keyId: 'key_01J…', platformPublicKeyUrl: '/v1/webhooks/platform-public-key' }, errors: [{ code: 'REQUEST_VALIDATION_FAILED', status: 400, description: 'callbackUrl must use HTTPS and eventTypes is required.' }, { code: 'AUTH_MISSING_TOKEN', status: 401, description: 'Bearer token is missing.' }, { code: 'AUTH_INVALID_TOKEN', status: 401, description: 'Token is invalid or expired.' }] },
  { id: 'webhook-public-key', label: 'Download webhook public key', method: 'GET', path: '/v1/webhooks/platform-public-key', title: 'Download the platform webhook public key', description: 'Download the PEM public key used to verify platform webhook signatures.', requiresAuth: false, successStatus: '200', fields: [], example: {}, responseExample: '-----BEGIN PUBLIC KEY-----\\n…\\n-----END PUBLIC KEY-----', errors: [{ code: 'WEBHOOK_KEY_UNAVAILABLE', status: 500, description: 'The platform public key cannot be loaded.' }] },
]

const endpoints = computed(() => ({ cards: cardEndpoints, 'digital-assets': cryptoEndpoints }[selectedModule.value] ?? fiatEndpoints))

const baseUrl = ref(import.meta.env.VITE_PLATFORM_API_BASE_URL ?? '')
const activeEndpoint = ref(fiatEndpoints[0])
const activeSection = ref('overview')
const accessToken = ref('')
const twoFactorToken = ref('')
const requestBody = ref(JSON.stringify(activeEndpoint.value.example, null, 2))
const responseText = ref('')
const responseStatus = ref(null)
const requestError = ref('')
const isSending = ref(false)
const twoFactorLabel = computed(() => ({ en: 'X-2FA-Token (when enabled)', 'zh-CN': 'X-2FA-Token（已启用 2FA 时）', 'zh-TW': 'X-2FA-Token（已啟用 2FA 時）' }[locale.value] ?? 'X-2FA-Token'))
const twoFactorPlaceholder = computed(() => ({ en: 'Paste the short-lived 2FA token', 'zh-CN': '粘贴短期 2FA Token', 'zh-TW': '貼上短期 2FA Token' }[locale.value] ?? 'Paste 2FA token'))
const contractLabel = computed(() => ({ en: 'CONTRACT', 'zh-CN': '接口契约', 'zh-TW': '介面契約' }[locale.value] ?? 'CONTRACT'))
const isUserApiModule = computed(() => selectedModule.value === 'digital-assets' || selectedModule.value === 'cards')
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
  const localized = cardCopy[locale.value]?.[endpoint.id] ?? cryptoCopy[locale.value]?.[endpoint.id] ?? apiCopy[locale.value]?.[endpoint.id]
  return localized ? { ...endpoint, ...localized } : endpoint
}

const currencyNotice = computed(() => {
  const notices = {
    fiat: { en: 'This module supports EUR and GBP payments. Use IBAN for EUR/SEPA beneficiaries; use account number and sort code for GBP payments.', 'zh-CN': '该模块同时支持 EUR 和 GBP 支付。EUR/SEPA 受益人使用 IBAN；GBP 支付使用账号和 Sort Code。', 'zh-TW': '此模組同時支援 EUR 和 GBP 支付。EUR/SEPA 受益人使用 IBAN；GBP 支付使用帳號和 Sort Code。' },
    'digital-assets': { en: 'Wallet creation is idempotent: an existing Safeheron account is reused and only missing asset/network addresses are provisioned. Supported assets and networks come from API configuration.', 'zh-CN': '钱包创建采用幂等设计：复用已有 Safeheron 账户，只补建缺失的币种/网络地址；支持的币种和网络以 API 配置为准。', 'zh-TW': '錢包建立採用冪等設計：重用既有 Safeheron 帳戶，只補建缺失的幣種／網路地址；支援的幣種和網路以 API 設定為準。' },
    cards: { en: 'Card availability, fees, funding assets, and wallet support vary by product. Always use the latest values returned by the available-card endpoint.', 'zh-CN': '卡片可用性、费用、充值资产及钱包支持因产品而异，请始终以可开卡片接口返回的最新值为准。', 'zh-TW': '卡片可用性、費用、儲值資產及錢包支援因產品而異，請始終以可開卡片介面回傳的最新值為準。' },
  }
  return notices[selectedModule.value]?.[locale.value] ?? notices[selectedModule.value]?.en ?? ''
})

const moduleOverview = computed(() => {
  if (selectedModule.value === 'fiat') {
    return {
      heroTitle: copy.value.heroTitle,
      heroIntro: `${copy.value.heroIntro}/v1${copy.value.heroSuffix}`,
      beforeStartBody: copy.value.beforeStartBody,
      authTitle: copy.value.accessTokens,
      authBody: `${copy.value.authIntro} POST /v1/auth/token ${copy.value.authMiddle} clientId ${copy.value.and} clientSecret${copy.value.authEnd}`,
    }
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
  return endpointDetails[locale.value]?.[endpoint.id] ?? endpointDetails.en[endpoint.id] ?? endpoint.detail
}

function fieldDescription(field) {
  return cardCopy[locale.value]?.[activeEndpoint.value.id]?.fields[field.name] ?? cryptoCopy[locale.value]?.[activeEndpoint.value.id]?.fields[field.name] ?? apiCopy[locale.value]?.[activeEndpoint.value.id]?.fields[field.name] ?? field.description
}

const errorTranslations = {
  'zh-CN': { AUTH_MISSING_TOKEN: '缺少 Bearer Token。', AUTH_INVALID_TOKEN: 'Token 无效或已过期。', AUTH_INVALID_CLIENT_CREDENTIALS: '客户端 ID 或密钥不正确。', CLIENT_DISABLED: 'API 客户端已停用。', INTERNAL_ERROR: '服务内部错误。', UNSUPPORTED_COUNTRY: '开户国家/地区不受支持。', ACCOUNT_ALREADY_EXISTS: '该客户和币种的账户已存在。', REQUEST_VALIDATION_FAILED: '请求缺少必填字段或字段值不符合要求。', PLATFORM_VALIDATION_FAILED: '平台拒绝了该请求，请查看返回信息。', PLATFORM_UNAVAILABLE: '平台不可用或未返回所需结果。', ACCOUNT_NOT_FOUND: '未找到客户账户。', BENEFICIARY_ACCOUNT_INVALID: 'IBAN、账号或 Sort Code 无效。', UNSUPPORTED_CURRENCY: '当前仅支持 EUR 和 GBP。', IDEMPOTENCY_KEY_REQUIRED: '必须提供 Idempotency-Key 请求头。', BENEFICIARY_NOT_FOUND: '未找到受益人，或其不属于该客户。', SWEEP_SOURCE_ACCOUNT_NOT_CONFIGURED: '未配置该币种的出金来源账户。', TRANSACTION_NOT_FOUND: '交易不存在或不属于当前客户端。', TRANSACTION_NOT_CANCELLABLE: '交易已完成、失败、取消或不是出金，无法撤销。', WEBHOOK_KEY_UNAVAILABLE: '平台 Webhook 公钥不可用。' },
  'zh-TW': { AUTH_MISSING_TOKEN: '缺少 Bearer 權杖。', AUTH_INVALID_TOKEN: '權杖無效或已過期。', AUTH_INVALID_CLIENT_CREDENTIALS: '用戶端 ID 或密鑰不正確。', CLIENT_DISABLED: 'API 用戶端已停用。', INTERNAL_ERROR: '服務內部錯誤。', UNSUPPORTED_COUNTRY: '開戶國家／地區不受支援。', ACCOUNT_ALREADY_EXISTS: '該客戶和幣別的帳戶已存在。', REQUEST_VALIDATION_FAILED: '請求缺少必填欄位或欄位值不符合要求。', PLATFORM_VALIDATION_FAILED: '平台拒絕了此請求，請查看回傳資訊。', PLATFORM_UNAVAILABLE: '平台不可用或未回傳所需結果。', ACCOUNT_NOT_FOUND: '未找到客戶帳戶。', BENEFICIARY_ACCOUNT_INVALID: 'IBAN、帳號或 Sort Code 無效。', UNSUPPORTED_CURRENCY: '目前僅支援 EUR 和 GBP。', IDEMPOTENCY_KEY_REQUIRED: '必須提供 Idempotency-Key 請求標頭。', BENEFICIARY_NOT_FOUND: '未找到受益人，或其不屬於該客戶。', SWEEP_SOURCE_ACCOUNT_NOT_CONFIGURED: '未設定該幣別的出金來源帳戶。', TRANSACTION_NOT_FOUND: '交易不存在或不屬於目前用戶端。', TRANSACTION_NOT_CANCELLABLE: '交易已完成、失敗、取消或不是出金，無法撤銷。', WEBHOOK_KEY_UNAVAILABLE: '平台 Webhook 公鑰不可用。' },
}

function errorDescription(error) {
  return errorTranslations[locale.value]?.[error.code] ?? error.description
}

function moduleCopy(module) {
  return { ...module, name: moduleTranslations[locale.value]?.[module.id] ?? module.name }
}

function selectModule(moduleId) {
  selectedModule.value = moduleId
  if (!selectedModuleData.value.available) return
  activeEndpoint.value = endpoints.value[0]
  activeSection.value = 'overview'
  requestBody.value = JSON.stringify(currencyExample(activeEndpoint.value.example, 'EUR'), null, 2)
  responseText.value = ''
  responseStatus.value = null
  requestError.value = ''
}

function selectEndpoint(endpoint) {
  activeEndpoint.value = endpoint
  activeSection.value = endpoint.id
  requestBody.value = JSON.stringify(currencyExample(endpoint.example, 'EUR'), null, 2)
  responseText.value = ''
  responseStatus.value = null
  requestError.value = ''
}

function currencyExample(example, currency) {
  const value = JSON.parse(JSON.stringify(example))
  if (!value || typeof value !== 'object') return value
  if ('currency' in value) value.currency = currency
  if (currency === 'GBP' && value.iban) {
    delete value.iban
    value.accountNumber = '12345678'
    value.sortCode = '123456'
  }
  if (currency === 'EUR' && value.accountNumber) {
    delete value.accountNumber
    delete value.sortCode
    value.iban = 'GB84SEOU00994400026127'
  }
  return value
}

async function sendRequest() {
  requestError.value = ''
  responseText.value = ''
  responseStatus.value = null
  if (activeEndpoint.value.tryEnabled === false) return
  if (!baseUrl.value) { requestError.value = copy.value.gatewayRequired; return }
  let payload
  try { payload = activeEndpoint.value.method === 'GET' ? undefined : JSON.parse(requestBody.value) } catch { requestError.value = copy.value.invalidJson; return }
  const headers = { Accept: 'application/json' }
  if (payload) headers['Content-Type'] = 'application/json'
  if (activeEndpoint.value.requiresAuth && accessToken.value) headers.Authorization = `Bearer ${accessToken.value}`
  if (activeEndpoint.value.id === 'payouts') headers['Idempotency-Key'] = crypto.randomUUID()
  if (activeEndpoint.value.id === 'crypto-withdraw' && twoFactorToken.value) headers['X-2FA-Token'] = twoFactorToken.value
  if (isUserApiModule.value) headers.Lang = locale.value
  isSending.value = true
  try {
    const requestPath = activeEndpoint.value.tryPath ?? activeEndpoint.value.path
    const response = await fetch(`${baseUrl.value.replace(/\/$/, '')}${requestPath}`, { method: activeEndpoint.value.method, headers, body: payload ? JSON.stringify(payload) : undefined })
    responseStatus.value = response.status
    const text = await response.text()
    try { responseText.value = JSON.stringify(JSON.parse(text), null, 2) } catch { responseText.value = text || `${response.status} ${response.statusText}` }
  } catch (error) {
    requestError.value = copy.value.sendFailed.replace('{message}', error.message)
  } finally { isSending.value = false }
}
</script>

<style scoped src="../styles/views/ApiDocsView.css"></style>
