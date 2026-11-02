# 法币文档与客户端操作对齐

更新日期：2026-11-02。

官网继续使用“法币 → EUR & GBP / USD”入口，不新增独立白标产品，也不修改后端路由。

## 契约与操作

- 法币业务：23个开放API操作，使用API Key换取的Token。
- 密钥与回调：22个开发者操作，使用选择租户后的成员accessToken；仅租户管理员或开发者可操作。
- 客户端：60个账户与页面操作，覆盖激活、账户统一2FA、邮箱登录、选择租户、系统内切换、修改/找回密码、设备会话、成员邀请、开户及文件上传、同名外部账户、入金指引、出金、划转和账单导出。
- 账户Token只用于账户会话接口的请求体；页面业务使用成员accessToken。两者与开放API Token分别保存在调试台内存，退出或密码变更成功后清空成员与账户凭证。
- 首次激活必须绑定2FA；已有账户共用验证器；丢失后由平台重置再走邮箱验证补绑；禁止直接解绑。
- 入金为线下打款，到账由上游回调确认；开户须上传相应证件、地址证明及流水；外部账户需同名。页面敏感业务按成员偏好校验TOTP，LIVE API Key操作强制校验。

参数与响应表来自当前客户端OpenAPI，包含中文说明、类型、格式、枚举及条件必填说明。开户、支付、回调的示例标识和文件key必须替换为真实值。金额单位遵循字段定义，付款走廊受实际账户与通道能力约束。

## 维护和验证

同步来源：YasbeeTenant/docs/white-label-client-apifox.openapi.json。

```sh
node scripts/sync-fiat-client-docs.mjs /path/to/white-label-client-apifox.openapi.json
node scripts/sync-fiat-client-docs.mjs /path/to/white-label-client-apifox.openapi.json --check
npm run test:api-docs
npm run build
```

本次检查：105/105个契约路由覆盖（客户端健康检查不放入操作文档）；10项测试通过；英语、简体中文及繁体中文SSR渲染通过。未发送实际开户、付款或邮件请求；本次修改仅涉及官网文档与调试台。

## 修改文件

- package.json
- scripts/sync-fiat-client-docs.mjs
- src/data/apiDocsFiat.js
- src/data/apiDocsFiatClient.js
- src/views/ApiDocsView.vue
- src/utils/fiatDocsSession.js
- tests/fiat-api-docs.test.mjs
- tests/fiat-docs-session.test.mjs
- docs/fiat-client-alignment.md
