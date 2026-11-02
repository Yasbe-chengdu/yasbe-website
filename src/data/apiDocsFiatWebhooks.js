// 接收协议与WebhookDeliveryWorker一致；密钥及回调配置由租户业务台完成。
export const fiatWebhookGuide = {
  en: {
    title: 'Receive and verify webhooks',
    steps: [
      'Configure the HTTPS endpoint, callback destination IP allowlist and subscriptions in the tenant console. Save the one-time HMAC secret and download the public signing keys there. Configuration APIs are documented under Security Management and require a member login token instead of an API Key business token.',
      'Read t and v1 from X-YASBe-Signature. The signed bytes are UTF-8(timestamp + "." + raw HTTP request body), with timestamp in Unix seconds. Do not parse and serialize the body before verification.',
      'Compute HMAC-SHA256 using the endpoint secret, encode as lowercase hexadecimal, and compare it to v1 using a constant-time comparison. Verify the Base64 X-YASBe-RSA-Signature over the same bytes with SHA256withRSA (PKCS#1 v1.5), selecting the public key by X-YASBe-Key-Id.',
      'Enforce your timestamp freshness policy and deduplicate using X-YASBe-Event-Id. Verify customer ownership when X-YASBe-External-Customer-Id is supplied. Store the event durably before returning HTTP 2xx; unsuccessful deliveries may be retried and duplicate deliveries must be safe.',
      'If content encryption is enabled, first verify the received encrypted envelope. Its algorithm is RSA-OAEP-256+A256GCM. Decode encryptedKey, iv and ciphertext as unpadded Base64url; decrypt encryptedKey with your private key using OAEP SHA-256 and MGF1 SHA-256, then decrypt ciphertext with AES-256-GCM (128-bit tag appended to the ciphertext). Your private key stays in your system.',
    ],
  },
  'zh-CN': {
    title: '接收与验证 Webhook',
    steps: [
      '在租户业务台配置 HTTPS 回调地址、目标 IP 白名单及订阅事件，保存仅展示一次的 HMAC Secret 并下载验签公钥。对应接口见安全管理章节，使用成员登录Token，与API Key业务Token分开。',
      '从 X-YASBe-Signature 读取 t 与 v1。签名内容为 UTF-8 编码的 timestamp + "." + 原始 HTTP 请求正文，timestamp 为 Unix 秒级时间戳。验签前不能先解析再重新序列化正文。',
      '使用端点 Secret 计算 HMAC-SHA256，输出小写十六进制，与 v1 做恒定时间比较；同时按 X-YASBe-Key-Id 选择公钥，使用 SHA256withRSA（PKCS#1 v1.5）验证 Base64 编码的 X-YASBe-RSA-Signature，两者签名内容相同。',
      '校验时间戳有效窗口，并按 X-YASBe-Event-Id 幂等去重。存在 X-YASBe-External-Customer-Id 时还应核对客户归属。事件可靠保存后返回 HTTP 2xx；非成功投递可能重试，应能安全处理重复回调。',
      '启用内容加密时，先验证收到的加密信封，再解密。algorithm 为 RSA-OAEP-256+A256GCM；encryptedKey、iv、ciphertext 使用无填充 Base64url。用下游私钥按 OAEP SHA-256、MGF1 SHA-256 解出 AES 密钥，再用 AES-256-GCM 解密 ciphertext（末尾包含128位认证标签）。下游私钥始终由自己保管。',
    ],
  },
}
