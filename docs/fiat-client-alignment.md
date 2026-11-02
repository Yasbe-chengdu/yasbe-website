# 法币开放API文档范围

更新日期：2026-11-02。

官网继续使用“法币 → EUR & GBP / USD”入口。公开目录包含23个 `/partner-api/v1` 业务操作、22个 `/apiTenant/developer` 安全管理操作，以及Webhook接收协议说明。

## 公开范围

- API Key换取访问Token、客户管理、开户文件上传、开户与账户查询。
- 同名外部账户、入金指引、出金、账户划转、交易查询。
- 安全管理：API Key创建/轮换/吊销，Webhook创建/修改/验证/密钥轮换/内容加密，IP白名单查询与覆盖，投递查询/重试，公钥查询/下载/轮换。仅成员Token的管理员或开发者可调用，不能使用API Key业务Token。LIVE Key操作强制2FA，其他操作按相应偏好校验。
- 当前租户与YASBe的账单查询和PDF下载，要求invoices:read；文档明确这些不是终端客户的账单接口。
- Webhook事件接收、HMAC和RSA验签、时间戳检查、事件幂等去重、加密信封解密及投递重试处理。

## 移出公开目录

60个客户端操作继续排除：35个账户及成员操作、25个页面业务操作，包括激活、登录、密码、2FA绑定、租户切换、设备会话、成员邀请及重复页面业务路由。其文档由YasbeeTenant单独维护。

官网调试台分别在内存保存API Key业务Token与成员登录Token，按接口类型选取，不提供账户登录和租户切换流程。同步采用两个明确的路由范围，禁止把其他客户端操作带入公开目录。Secret只显示一次，平台签名私钥及下游解密私钥不提供下载。

## 验证与维护

```sh
node scripts/sync-fiat-client-docs.mjs /path/to/white-label-client-apifox.openapi.json
node scripts/sync-fiat-client-docs.mjs /path/to/white-label-client-apifox.openapi.json --check
npm run test:api-docs
npm run build
```

检查内容：EUR/GBP/USD共用45条操作；仅允许业务与开发者安全路由；无账户、页面业务和管理端路由；中文参数、类型、响应字段保留；开户文件引用及各币种付款示例保持一致；Webhook协议依据当前投递和加密代码核对。

本次仅更新官网公开文档与调试台，未修改后端或执行真实业务请求。

## 本次修改文件

- scripts/sync-fiat-client-docs.mjs
- src/data/apiDocsFiat.js
- src/data/apiDocsFiatClient.js
- src/data/apiDocsFiatWebhooks.js
- src/views/ApiDocsView.vue
- tests/fiat-api-docs.test.mjs
- docs/fiat-client-alignment.md
