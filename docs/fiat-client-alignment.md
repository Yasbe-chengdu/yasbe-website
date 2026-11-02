# 法币开放API文档范围

更新日期：2026-11-02。

官网继续使用“法币 → EUR & GBP / USD”入口。公开目录仅包含23个 `/partner-api/v1` 操作，以及Webhook接收协议说明。

## 公开范围

- API Key换取访问Token、客户管理、开户文件上传、开户与账户查询。
- 同名外部账户、入金指引、出金、账户划转、交易查询。
- 当前租户与YASBe的账单查询和PDF下载，要求invoices:read；文档明确这些不是终端客户的账单接口。
- Webhook事件接收、HMAC和RSA验签、时间戳检查、事件幂等去重、加密信封解密及投递重试处理。

## 移出公开目录

82个客户端操作已移除：35个账户及成员操作、25个页面业务操作、22个开发者配置操作。移除范围包括激活、登录、密码、2FA、租户切换、设备会话、成员邀请、页面出入金、API Key管理、Webhook配置、白名单、投递重试及签名密钥轮换。

客户端接口仍由YasbeeTenant的 `docs/white-label-client-apifox.openapi.json` 及客户端前端对接文档维护。官网调试台只保存开放API访问Token，客户端操作契约不进入官网浏览器构建产物。同步脚本只接受 `/partner-api/v1/` 契约，并排除共享DTO中仅用于页面操作的totpCode字段。

## 验证与维护

```sh
node scripts/sync-fiat-client-docs.mjs /path/to/white-label-client-apifox.openapi.json
node scripts/sync-fiat-client-docs.mjs /path/to/white-label-client-apifox.openapi.json --check
npm run test:api-docs
npm run build
```

检查内容：EUR/GBP/USD共用23条开放操作；无客户端和管理端路由；中文参数、类型、响应字段保留；开户文件引用及各币种付款示例保持一致；Webhook协议依据当前投递和加密代码核对。

本次仅更新官网公开文档与调试台，未修改后端或执行真实业务请求。

## 本次修改文件

- package.json
- scripts/sync-fiat-client-docs.mjs
- src/data/apiDocsFiat.js
- src/data/apiDocsFiatClient.js
- src/data/apiDocsFiatWebhooks.js（新增）
- src/views/ApiDocsView.vue
- src/utils/fiatDocsSession.js（删除）
- tests/fiat-api-docs.test.mjs
- tests/fiat-docs-session.test.mjs（删除）
- docs/fiat-client-alignment.md
