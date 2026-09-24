const auth = { name: 'Authorization', location: 'Header', required: true, description: 'Bearer JWT returned by the YASBe sign-in flow.' }
const lang = { name: 'Lang', location: 'Header', required: false, description: 'Response language: en, zh-CN, or zh-TW.' }
const commonErrors = [
  { code: 'AUTH_INVALID_TOKEN', status: 401, description: 'The Bearer JWT is missing, invalid, or expired.' },
  { code: 'CARD_SERVICE_ERROR', status: 500, description: 'The card service or upstream card provider could not complete the request.' },
]
const ok = (data = null) => ({ success: true, code: 200, message: 'success', data })
const actionErrors = [{ code: 'REQUEST_VALIDATION_FAILED', status: 400, description: 'A required value is missing or invalid.' }, ...commonErrors]

export const cardEndpoints = [
  {
    id: 'card-id-types', label: 'List ID types', method: 'GET', path: '/api/card/id-types', title: 'List supported ID types',
    description: 'Return the identity-document types accepted by the card KYC flow.', detail: 'Use the returned code as idType when updating or submitting KYC.',
    requiresAuth: true, successStatus: '200', fields: [auth, lang], example: {}, responseExample: ok([{ code: 'PASSPORT', desc: 'Passport' }, { code: 'NATIONAL_ID', desc: 'National ID' }]), errors: commonErrors,
  },
  {
    id: 'card-phone-codes', label: 'List phone codes', method: 'GET', path: '/api/card/phone-codes', title: 'List phone country codes',
    description: 'Return enabled countries and their telephone dialing metadata.', detail: 'Validate phone-number length using phoneMinLength and phoneMaxLength before submitting KYC or shipping details.',
    requiresAuth: true, successStatus: '200', fields: [auth], example: {}, responseExample: ok([{ id: 1, countryNameEn: 'Singapore', countryCode: 'SG', phoneCode: '+65', phoneMinLength: 8, phoneMaxLength: 8, currencyCode: 'SGD' }]), errors: commonErrors,
  },
  {
    id: 'card-country-codes', label: 'List countries', method: 'GET', path: '/api/card/country-codes', title: 'List supported countries',
    description: 'Return enabled country and region metadata used by card onboarding.', detail: 'Use the ISO alpha-2 countryCode values in KYC and shipping requests.',
    requiresAuth: true, successStatus: '200', fields: [auth], example: {}, responseExample: ok([{ id: 1, countryNameZh: '新加坡', countryNameTw: '新加坡', countryNameEn: 'Singapore', countryCode: 'SG', phoneCode: '+65', currencyCode: 'SGD' }]), errors: commonErrors,
  },
  {
    id: 'card-products', label: 'List available cards', method: 'GET', path: '/api/card/available', title: 'List available card products',
    description: 'Return card products visible to the authenticated user, including fees, wallet support, and funding requirements.', detail: 'Retain the returned id as ditchCardId for KYC submission and card applications. Do not calculate fees from hard-coded values.',
    requiresAuth: true, successStatus: '200', fields: [auth], example: {}, responseExample: ok([{ id: 12, ditchName: 'interlace', name: 'Global Virtual Card', code: 'GLOBAL_VIRTUAL', openingFee: 10, rechargeFeeRate: 1.5, supportGoogleWallet: 1, supportApplePay: 1, cardModel: 0, cardType: 1, supportCurrency: 'USDT,USDC', needRecharge: 1, minRechargeAmount: 20, cardScene: 0 }]), errors: commonErrors,
  },
  {
    id: 'card-kyc-info', label: 'Get KYC profile', method: 'GET', path: '/api/card/kyc/info', title: 'Get the card KYC profile',
    description: 'Return the authenticated user’s saved identity details and document URLs.', detail: 'Use this response to prefill onboarding. Treat document URLs and personal data as sensitive information.',
    requiresAuth: true, successStatus: '200', fields: [auth], example: {}, responseExample: ok({ id: 101, firstName: 'Jane', lastName: 'Doe', dateOfBirth: '1990-01-01', nationality: 'SG', idType: 'PASSPORT', phoneCountryCode: '+65', phoneNumber: '81234567', city: 'Singapore', country: 'SG', email: 'jane@example.com' }), errors: commonErrors,
  },
  {
    id: 'card-kyc-update', label: 'Update KYC profile', method: 'POST', path: '/api/card/kyc/update', title: 'Update the card KYC profile',
    description: 'Update the personal, identity, contact, and address details used for card onboarding.', detail: 'Use ISO country codes and an idType returned by the metadata endpoints. Date formats must match the card provider requirements.',
    requiresAuth: true, successStatus: '200', fields: [auth, { name: 'firstName', required: true, description: 'Given name.' }, { name: 'lastName', required: true, description: 'Family name.' }, { name: 'email', required: true, description: 'Cardholder email.' }, { name: 'dateOfBirth', required: true, description: 'Date of birth.' }, { name: 'gender', required: true, description: 'Gender value accepted by the provider.' }, { name: 'occupation', required: true, description: 'Occupation.' }, { name: 'annualSalary', required: true, description: 'Annual salary band or value.' }, { name: 'accountPurpose', required: true, description: 'Intended account use.' }, { name: 'expectedMonthlyVolume', required: true, description: 'Expected monthly transaction volume.' }, { name: 'nationality', required: true, description: 'Nationality country code.' }, { name: 'nationalId', required: true, description: 'Government identity number.' }, { name: 'idType', required: true, description: 'Identity-document type code.' }, { name: 'ssn', required: true, description: 'Social security or equivalent identifier.' }, { name: 'issueDate', required: true, description: 'Document issue date.' }, { name: 'expiryDate', required: true, description: 'Document expiry date.' }, { name: 'phoneNumber', required: true, description: 'Phone number without country code.' }, { name: 'phoneCountryCode', required: true, description: 'International dialing code.' }, { name: 'sourceType', required: true, description: 'Source type required by the card provider.' }, { name: 'addressLine1', required: true, description: 'Primary address line.' }, { name: 'postalCode', required: true, description: 'Postal code.' }, { name: 'country', required: true, description: 'ISO alpha-2 country code.' }, { name: 'state', required: true, description: 'State or province.' }, { name: 'city', required: true, description: 'City.' }, { name: 'street', required: true, description: 'Street.' }, { name: 'zipCode', required: true, description: 'ZIP or postal code.' }, { name: 'cardPackage', required: false, description: 'Physical-card package: p_0 or p_1.' }],
    example: { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', dateOfBirth: '1990-01-01', gender: 'FEMALE', occupation: 'Engineer', annualSalary: '50000-100000', accountPurpose: 'Business expenses', expectedMonthlyVolume: '5000', nationality: 'SG', nationalId: 'S1234567A', idType: 'PASSPORT', ssn: 'S1234567A', issueDate: '2022-01-01', expiryDate: '2032-01-01', phoneNumber: '81234567', phoneCountryCode: '+65', sourceType: 'SALARY', addressLine1: '1 Example Road', postalCode: '018989', country: 'SG', state: 'Singapore', city: 'Singapore', street: 'Example Road', zipCode: '018989' }, responseExample: ok(), errors: actionErrors,
  },
  {
    id: 'card-kyc-documents', label: 'Submit KYC documents', method: 'POST', path: '/api/card/kyc/submit', title: 'Submit card KYC documents',
    description: 'Upload identity-document images and a selfie using multipart/form-data.', detail: 'This multipart endpoint is documented here but cannot be sent from the JSON Try it panel. idFrontFile and selfieFile are required; idBackFile is optional.', tryEnabled: false,
    requiresAuth: true, successStatus: '200', fields: [auth, { name: 'idFrontFile', location: 'Form data', required: true, description: 'Front image of the identity document.' }, { name: 'idBackFile', location: 'Form data', required: false, description: 'Back image of the identity document.' }, { name: 'selfieFile', location: 'Form data', required: true, description: 'Cardholder selfie image.' }, { name: 'ditchCardId', location: 'Form data', required: true, description: 'Card-product ID.' }, { name: 'idType', location: 'Form data', required: true, description: 'Identity-document type code.' }], example: {}, responseExample: ok(101), errors: actionErrors,
  },
  {
    id: 'card-apply', label: 'Apply for card', method: 'POST', path: '/api/card/apply', title: 'Apply for a virtual card',
    description: 'Create a cardholder, select a card BIN, create the prepaid card, and save it to the user account.', detail: 'Use fees and minimum funding requirements returned by the available-card endpoint. rechargeAmount is required when needRecharge is 1.',
    requiresAuth: true, successStatus: '200', fields: [auth, { name: 'ditchCardId', required: true, description: 'Card-product ID.' }, { name: 'coinCode', required: true, description: 'Funding asset symbol.' }, { name: 'blockChain', required: true, description: 'Funding blockchain network.' }, { name: 'openFee', required: true, description: 'Opening fee returned by the card product.' }, { name: 'rechargeAmount', required: false, description: 'Initial funding amount when the product requires funding.' }], example: { ditchCardId: 12, coinCode: 'USDT', blockChain: 'TRC20', openFee: 10, rechargeAmount: 100 }, responseExample: ok({ applyId: 501, accountCardId: 8801, cardholderId: 'ch_01J…', internalCardId: 'card_01J…', panLastFour: '4242', state: 1 }), errors: actionErrors,
  },
  {
    id: 'card-recharge', label: 'Recharge card', method: 'POST', path: '/api/card/recharge', title: 'Recharge a card',
    description: 'Fund a card and record the resulting card transaction.', detail: 'The asset and blockchain must be supported by the selected card product. The backend applies the configured recharge fee.',
    requiresAuth: true, successStatus: '200', fields: [auth, { name: 'accountCardId', required: true, description: 'YASBe account-card ID.' }, { name: 'coinCode', required: true, description: 'Funding asset symbol.' }, { name: 'blockChain', required: true, description: 'Funding blockchain network.' }, { name: 'amount', required: true, description: 'Recharge amount.' }], example: { accountCardId: 8801, coinCode: 'USDT', blockChain: 'TRC20', amount: 100 }, responseExample: ok('Recharge submitted'), errors: actionErrors,
  },
  {
    id: 'card-list', label: 'List my cards', method: 'GET', path: '/api/card/my/list', title: 'List the user’s cards',
    description: 'Return every card owned by the authenticated user.', detail: 'PAN and CVV values are highly sensitive. Display them only after appropriate re-authentication and never log the response.',
    requiresAuth: true, successStatus: '200', fields: [auth], example: {}, responseExample: ok([{ id: 8801, internalCardId: 'card_01J…', ditchCardName: 'Global Virtual Card', pan: '************4242', expYear: '29', expMonth: '12', cvv2: '***', cardLastFour: '4242', balance: 85.5, showBalance: 85.5, negativeBalance: 0, state: 1, applyTime: '2026-09-24' }]), errors: commonErrors,
  },
  {
    id: 'card-detail', label: 'Get card detail', method: 'GET', path: '/api/card/detail/{cardId}', tryPath: '/api/card/detail/8801', title: 'Get card detail',
    description: 'Return one card owned by the authenticated user.', detail: 'The sample Try it path uses cardId 8801; replace it with a card ID owned by the authenticated user before calling the endpoint.',
    requiresAuth: true, successStatus: '200', fields: [auth, { name: 'cardId', location: 'Path', required: true, description: 'YASBe account-card ID.' }], example: {}, responseExample: ok({ id: 8801, ditchCardName: 'Global Virtual Card', pan: '************4242', expYear: '29', expMonth: '12', cvv2: '***', cardLastFour: '4242', balance: 85.5, state: 1 }), errors: [{ code: 'CARD_NOT_FOUND', status: 404, description: 'The card does not exist or is not owned by the user.' }, ...commonErrors],
  },
  {
    id: 'card-freeze', label: 'Freeze card', method: 'POST', path: '/api/card/freeze?accountCardId={accountCardId}&reason={reason}', tryPath: '/api/card/freeze?accountCardId=8801&reason=User%20requested', title: 'Freeze a card',
    description: 'Freeze a card owned by the authenticated user.', detail: 'Freezing prevents new card activity until the card is unfrozen.', requiresAuth: true, successStatus: '200',
    fields: [auth, { name: 'accountCardId', location: 'Query', required: true, description: 'YASBe account-card ID.' }, { name: 'reason', location: 'Query', required: false, description: 'Freeze reason. Defaults to a user-requested freeze.' }], example: {}, responseExample: ok(), errors: actionErrors,
  },
  {
    id: 'card-unfreeze', label: 'Unfreeze card', method: 'POST', path: '/api/card/unfreeze?accountCardId={accountCardId}', tryPath: '/api/card/unfreeze?accountCardId=8801', title: 'Unfreeze a card',
    description: 'Restore an eligible frozen card.', detail: 'Only a card in an eligible frozen state can be restored.', requiresAuth: true, successStatus: '200', fields: [auth, { name: 'accountCardId', location: 'Query', required: true, description: 'YASBe account-card ID.' }], example: {}, responseExample: ok(), errors: actionErrors,
  },
  {
    id: 'card-delete', label: 'Close card', method: 'POST', path: '/api/card/delete?accountCardId={accountCardId}', tryPath: '/api/card/delete?accountCardId=8801', title: 'Close a card',
    description: 'Request closure of a card owned by the authenticated user.', detail: 'Card closure can be irreversible. Ensure remaining balances and pending transactions are handled first. Live execution is disabled in this documentation.', tryEnabled: false,
    requiresAuth: true, successStatus: '200', fields: [auth, { name: 'accountCardId', location: 'Query', required: true, description: 'YASBe account-card ID.' }], example: {}, responseExample: ok(), errors: actionErrors,
  },
  {
    id: 'card-total-balance', label: 'Get total balance', method: 'GET', path: '/api/account/card/total-balance', title: 'Get total card balance',
    description: 'Return the combined balance, display balance, and card count for the authenticated user.', detail: 'Use totalShowBalance for customer-facing display when it differs from the ledger balance.', requiresAuth: true, successStatus: '200', fields: [auth], example: {}, responseExample: ok({ totalBalance: 1285.5, totalShowBalance: 1285.5, cardCount: 3 }), errors: commonErrors,
  },
  {
    id: 'card-statistics', label: 'Get card statistics', method: 'GET', path: '/api/account/card/statistics', title: 'Get card statistics',
    description: 'Return card counts and current-month spending and recharge totals.', detail: 'Monthly values are calculated for the authenticated user’s cards.', requiresAuth: true, successStatus: '200', fields: [auth], example: {}, responseExample: ok({ totalCards: 3, monthlyConsumption: 420.5, monthlyRecharge: 500, monthlyConsumptionCount: 8, monthlyRechargeCount: 2, normalCardCount: 2, frozenCardCount: 1 }), errors: commonErrors,
  },
  {
    id: 'card-transactions', label: 'List card transactions', method: 'GET', path: '/api/account/card/transactions?page={page}&size={size}', tryPath: '/api/account/card/transactions?page=1&size=10', title: 'List card transactions',
    description: 'Return paginated card transactions with optional card, type, status, and date filters.', detail: 'Transaction type values: 1 recharge, 2 purchase, 3 refund, 4 fee, 5 transfer out, 6 reversal. Status values: 1 processing, 2 successful, 3 failed.',
    requiresAuth: true, successStatus: '200', fields: [auth, { name: 'cardId', location: 'Query', required: false, description: 'Filter by account-card ID.' }, { name: 'cardName', location: 'Query', required: false, description: 'Fuzzy card-product name filter.' }, { name: 'lastFour', location: 'Query', required: false, description: 'Card-number last-four filter.' }, { name: 'type', location: 'Query', required: false, description: 'Transaction type: 1–6.' }, { name: 'status', location: 'Query', required: false, description: 'Transaction status: 1–3.' }, { name: 'startTime', location: 'Query', required: false, description: 'Start time in yyyy-MM-dd\'T\'HH:mm:ss format.' }, { name: 'endTime', location: 'Query', required: false, description: 'End time.' }, { name: 'page', location: 'Query', required: false, description: 'Page number, default 1.' }, { name: 'size', location: 'Query', required: false, description: 'Page size, default 10.' }], example: {}, responseExample: ok({ pageNum: 1, pageSize: 10, total: 1, list: [{ id: 9001, accountCardId: 8801, pan: '****4242', cardLastFour: '4242', cardName: 'Global Virtual Card', type: 2, amount: 25.5, fee: 0.25, currency: 'USD', status: 2, merchantName: 'Example Store', transactionTime: '2026-09-24T10:00:00' }] }), errors: commonErrors,
  },
  {
    id: 'card-withdraw', label: 'Withdraw from card', method: 'POST', path: '/api/account/card/withdraw', title: 'Withdraw funds from one card',
    description: 'Withdraw USD value from one 2B or 2C card and receive USDT or USDC.', detail: 'The backend executes this synchronously and returns the per-card result. Use only a network supported for the selected settlement asset.',
    requiresAuth: true, successStatus: '200', fields: [auth, { name: 'accountCardId', required: true, description: 'YASBe account-card ID.' }, { name: 'amount', required: true, description: 'USD amount deducted from the card.' }, { name: 'coinCode', required: true, description: 'Settlement asset: USDT or USDC.' }, { name: 'blockChain', required: true, description: 'Settlement network, such as TRC20 or ERC20.' }, { name: 'remark', required: false, description: 'Business note, up to 200 characters.' }], example: { accountCardId: 8801, amount: 50, coinCode: 'USDT', blockChain: 'TRC20', remark: 'Treasury transfer' }, responseExample: ok({ accountCardId: 8801, cardLastFour: '4242', cardName: 'Global Virtual Card', amount: 50, fee: 1, receiveAmount: 49, balanceAfter: 35.5, cryptoTransactionId: 'TX00000001', success: true, message: 'success', completedAt: '2026-09-24T10:05:00' }), errors: actionErrors,
  },
  {
    id: 'physical-card-apply', label: 'Apply for physical card', method: 'POST', path: '/api/card/physical/apply', title: 'Apply for a physical card',
    description: 'Create a physical-card application and begin cardholder creation.', detail: 'cardPackage accepts p_0 or p_1. Card designs are not currently exposed by the backend.',
    requiresAuth: true, successStatus: '200', fields: [auth, { name: 'ditchCardId', required: true, description: 'Physical card-product ID.' }, { name: 'cardDesignId', required: false, description: 'Card-design ID when available.' }, { name: 'coinCode', required: true, description: 'Funding asset symbol.' }, { name: 'blockChain', required: true, description: 'Funding network.' }, { name: 'openFee', required: true, description: 'Opening fee.' }, { name: 'rechargeAmount', required: false, description: 'Initial funding amount.' }, { name: 'cardPackage', required: true, description: 'Package type: p_0 or p_1.' }], example: { ditchCardId: 15, coinCode: 'USDT', blockChain: 'TRC20', openFee: 25, rechargeAmount: 100, cardPackage: 'p_0' }, responseExample: ok(701), errors: actionErrors,
  },
  {
    id: 'physical-card-shipping', label: 'Submit shipping address', method: 'POST', path: '/api/card/physical/shipping', title: 'Submit a physical-card shipping address',
    description: 'Save the delivery address and trigger shipment after the physical card is opened.', detail: 'taxId is required for destinations where the shipping provider requires it, including Brazil and Mexico.',
    requiresAuth: true, successStatus: '200', fields: [auth, { name: 'applyId', required: true, description: 'Physical-card application ID.' }, { name: 'firstName', required: true, description: 'Recipient given name.' }, { name: 'lastName', required: true, description: 'Recipient family name.' }, { name: 'email', required: true, description: 'Recipient email.' }, { name: 'phoneNumber', required: true, description: 'Recipient phone number.' }, { name: 'phoneCountryCode', required: true, description: 'International dialing code.' }, { name: 'addressLine1', required: true, description: 'Delivery address.' }, { name: 'city', required: true, description: 'City.' }, { name: 'state', required: true, description: 'State or province.' }, { name: 'country', required: true, description: 'ISO alpha-2 country code.' }, { name: 'postalCode', required: true, description: 'Postal code.' }, { name: 'cardPackage', required: true, description: 'Package type: p_0 or p_1.' }, { name: 'taxId', required: false, description: 'Tax ID where required for delivery.' }], example: { applyId: 701, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', phoneNumber: '81234567', phoneCountryCode: '+65', addressLine1: '1 Example Road', city: 'Singapore', state: 'Singapore', country: 'SG', postalCode: '018989', cardPackage: 'p_0' }, responseExample: ok(), errors: actionErrors,
  },
  {
    id: 'physical-card-progress', label: 'Get application progress', method: 'GET', path: '/api/card/physical/progress/{applyId}', tryPath: '/api/card/physical/progress/701', title: 'Get physical-card application progress',
    description: 'Return the current processing step and status for a physical-card application.', detail: 'Steps range from cardholder creation through shipping and PIN setup. Poll at a reasonable interval.', requiresAuth: true, successStatus: '200', fields: [auth, { name: 'applyId', location: 'Path', required: true, description: 'Physical-card application ID.' }], example: {}, responseExample: ok({ applyId: 701, applyStep: 4, applyStatus: 2, errorMessage: null, stepDescription: 'Shipped' }), errors: commonErrors,
  },
  {
    id: 'physical-card-activate', label: 'Activate physical card', method: 'POST', path: '/api/card/physical/activate', title: 'Activate a physical card',
    description: 'Activate a received physical card.', detail: 'Activation is available only after the application has reached the eligible step.', requiresAuth: true, successStatus: '200', fields: [auth, { name: 'applyId', required: true, description: 'Physical-card application ID.' }], example: { applyId: 701 }, responseExample: ok(), errors: actionErrors,
  },
  {
    id: 'physical-card-pin', label: 'Set physical card PIN', method: 'POST', path: '/api/card/physical/set-pin', title: 'Set a physical-card PIN',
    description: 'Set the six-digit PIN after activation.', detail: 'The PIN must be six digits and cannot contain three identical, ascending, or descending consecutive digits. Never log or persist the plaintext PIN.',
    requiresAuth: true, successStatus: '200', fields: [auth, { name: 'applyId', required: true, description: 'Physical-card application ID.' }, { name: 'pin', required: true, description: 'Six-digit PIN.' }], example: { applyId: 701, pin: '258036' }, responseExample: ok(), errors: actionErrors,
  },
  {
    id: 'physical-card-tracking', label: 'Get shipping tracking', method: 'GET', path: '/api/card/physical/tracking/{applyId}', tryPath: '/api/card/physical/tracking/701', title: 'Get physical-card shipping tracking',
    description: 'Return courier and tracking information for a physical-card application.', detail: 'Tracking data becomes available only after shipment.', requiresAuth: true, successStatus: '200', fields: [auth, { name: 'applyId', location: 'Path', required: true, description: 'Physical-card application ID.' }], example: {}, responseExample: ok({ expressCompany: 'DHL', trackingNumber: '1234567890', trackingUrl: 'https://www.dhl.com/track?id=1234567890', shippingTime: '2026-09-24T10:00:00Z' }), errors: commonErrors,
  },
]

const zhCn = {
  'card-id-types': ['查询证件类型', '查询支持的证件类型'], 'card-phone-codes': ['查询电话区号', '查询电话国家区号'], 'card-country-codes': ['查询国家', '查询支持的国家/地区'],
  'card-products': ['查询可开卡片', '查询可用卡产品'], 'card-kyc-info': ['查询 KYC 资料', '查询卡片 KYC 资料'], 'card-kyc-update': ['更新 KYC 资料', '更新卡片 KYC 资料'], 'card-kyc-documents': ['提交 KYC 文件', '提交卡片 KYC 文件'],
  'card-apply': ['申请开卡', '申请虚拟卡'], 'card-recharge': ['卡片充值', '为卡片充值'], 'card-list': ['查询我的卡片', '查询用户卡片'], 'card-detail': ['查询卡片详情', '查询卡片详情'],
  'card-freeze': ['冻结卡片', '冻结卡片'], 'card-unfreeze': ['解冻卡片', '解冻卡片'], 'card-delete': ['注销卡片', '注销卡片'], 'card-total-balance': ['查询总余额', '查询卡片总余额'],
  'card-statistics': ['查询卡片统计', '查询卡片统计'], 'card-transactions': ['查询卡片交易', '查询卡片交易记录'], 'card-withdraw': ['卡片提现', '从单张卡片提现'],
  'physical-card-apply': ['申请实体卡', '申请实体卡'], 'physical-card-shipping': ['提交收货地址', '提交实体卡收货地址'], 'physical-card-progress': ['查询开卡进度', '查询实体卡开卡进度'],
  'physical-card-activate': ['激活实体卡', '激活实体卡'], 'physical-card-pin': ['设置实体卡 PIN', '设置实体卡 PIN'], 'physical-card-tracking': ['查询物流', '查询实体卡物流'],
}
const zhTw = Object.fromEntries(Object.entries(zhCn).map(([key, value]) => [key, value.map((text) => text.replaceAll('查询', '查詢').replaceAll('资料', '資料').replaceAll('文件', '檔案').replaceAll('卡片充值', '卡片儲值').replaceAll('充值', '儲值').replaceAll('注销', '註銷').replaceAll('实体卡', '實體卡').replaceAll('开卡', '開卡').replaceAll('国家', '國家').replaceAll('电话', '電話').replaceAll('类型', '類型'))]))

export const cardCopy = {
  'zh-CN': Object.fromEntries(Object.entries(zhCn).map(([id, [label, title]]) => [id, { label, title, fields: {} }])),
  'zh-TW': Object.fromEntries(Object.entries(zhTw).map(([id, [label, title]]) => [id, { label, title, fields: {} }])),
}
