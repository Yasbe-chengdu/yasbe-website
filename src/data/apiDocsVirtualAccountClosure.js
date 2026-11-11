export const virtualAccountClosureTestBaseUrl = 'https://api.beeznis.com'

export const virtualAccountClosureEndpoint = {
  id: 'fiat-close-va',
  label: 'Close virtual account',
  method: 'POST',
  path: '/partner-api/v1/virtual-accounts/{vaNo}/close',
  title: 'Permanently close a virtual account',
  description: 'Available in TEST at https://api.beeznis.com. Requires the virtual_accounts:close scope, zero balances, and no pending transactions or returns.',
  detail: 'Send an empty request body. Repeated requests return the current closure status. Subscribe to virtual_account.closing when YASBe accepts the request and virtual_account.closed when the provider confirms closure. Each event identifies the owning customer through externalCustomerId and includes data.vaNo, data.currency, and data.status.',
  requiresAuth: true,
  successStatus: '200',
  fields: [
    { name: 'Authorization', location: 'Header', type: 'string', required: true, description: 'Bearer TEST access token with virtual_accounts:close.' },
    { name: 'vaNo', location: 'Path', type: 'string', required: true, defaultValue: 'VA-EXAMPLE-001', description: 'Virtual account number returned by the list or detail endpoint.' },
  ],
  example: {},
  responseExample: {
    success: true,
    code: 'OK',
    message: 'success',
    data: { vaNo: 'VA-EXAMPLE-001', externalCustomerId: 'cus_001', currency: 'EUR', status: 'CLOSING' },
    traceId: 'example-trace-id',
  },
  responseFields: [
    { name: 'success', type: 'boolean', description: '请求是否成功受理' },
    { name: 'code', type: 'string', description: '业务响应码' },
    { name: 'message', type: 'string', description: '响应说明' },
    { name: 'data.vaNo', type: 'string', description: '虚拟账户编号' },
    { name: 'data.externalCustomerId', type: 'string', description: '账户所属的终端客户标识' },
    { name: 'data.currency', type: 'string', description: '三位币种代码' },
    { name: 'data.status', type: 'string', description: 'CLOSING 关户处理中，CLOSED 已永久关闭' },
    { name: 'traceId', type: 'string', description: '请求追踪标识' },
  ],
  errors: [
    { code: 'UNAUTHENTICATED', status: 401, description: 'The access token is missing.' },
    { code: 'INVALID_TOKEN', status: 401, description: 'The access token is invalid or expired.' },
    { code: 'SCOPE_FORBIDDEN', status: 403, description: 'The access token lacks virtual_accounts:close.' },
    { code: 'ENVIRONMENT_MISMATCH', status: 403, description: 'The token belongs to another environment.' },
    { code: 'VIRTUAL_ACCOUNT_NOT_FOUND', status: 404, description: 'The account does not exist in this tenant.' },
    { code: 'VA_CLOSE_NOT_ALLOWED', status: 409, description: 'The account is ineligible for closure.' },
    { code: 'VA_CLOSE_BALANCE_NONZERO', status: 409, description: 'The balance or frozen balance is nonzero.' },
    { code: 'VA_CLOSE_TRANSACTION_PENDING', status: 409, description: 'The account has a pending transaction or return.' },
    { code: 'VA_CLOSE_PROVIDER_BALANCE_UNCONFIRMED', status: 409, description: 'The provider has not confirmed a zero balance.' },
    { code: 'VA_CLOSE_PROVIDER_ACCOUNT_UNCONFIRMED', status: 409, description: 'The provider account status could not be confirmed.' },
  ],
}

export const virtualAccountClosureCopy = {
  'zh-CN': {
    label: '虚拟账户关户',
    title: '永久关闭虚拟账户',
    description: '当前仅在测试环境开放，基地址为 https://api.beeznis.com。需要 virtual_accounts:close 权限，账户余额和冻结金额须清零，且无在途交易或待退回款项。',
    detail: '请求体留空。重复提交返回当前关户状态。订阅 virtual_account.closing 接收关户受理，订阅 virtual_account.closed 接收渠道确认。Webhook 外层的 externalCustomerId 标识账户所属客户，data 含 vaNo、currency 和 status。',
    fields: { Authorization: '具备 virtual_accounts:close 的 TEST Bearer Token。', vaNo: '账户列表或详情返回的虚拟账户编号。' },
  },
  'zh-TW': {
    label: '虛擬帳戶關戶',
    title: '永久關閉虛擬帳戶',
    description: '目前僅在測試環境開放，基底網址為 https://api.beeznis.com。需要 virtual_accounts:close 權限，帳戶餘額及凍結金額須歸零，且無在途交易或待退回款項。',
    detail: '請求本文留空。重複提交回傳目前關戶狀態。訂閱 virtual_account.closing 接收關戶受理，訂閱 virtual_account.closed 接收通道確認。Webhook 外層的 externalCustomerId 識別帳戶所屬客戶，data 包含 vaNo、currency 和 status。',
    fields: { Authorization: '具備 virtual_accounts:close 的 TEST Bearer Token。', vaNo: '帳戶清單或詳情回傳的虛擬帳戶編號。' },
  },
}
