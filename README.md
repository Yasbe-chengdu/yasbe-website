# YASBe Website

YASBe 数字金融官网 — 连接你与世界经济。

基于 Vue 3 构建的纯前端展示型官网，涵盖全球支付、机构 OTC、投资机会与双资产多元化配置等核心业务。

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Vue 3 | ^3.5.32 |
| 路由 | Vue Router | ^5.0.4 |
| 国际化 | vue-i18n | ^11.3.2 |
| 构建工具 | Vite | ^8.0.4 |
| CSS 方案 | 纯 CSS（BEM 命名 + CSS 变量） | — |

零第三方 UI 库，所有样式与交互均手写实现。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（0.0.0.0:5173）
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 页面结构

### 路由

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | HomeView | 主页 Landing Page |
| `/about` | AboutView | 示例子页面（占位） |

### 主页区块

```
HomeView
├── Navbar                    固定导航栏（毛玻璃 + 响应式汉堡菜单 + 语言切换）
├── HeroSection               英雄区（标题 + 背景视频 + CTA）
├── StatsSection              数据统计（10 链 / 153 项目 / 80% 份额 / $2.74B TVL）
├── GlobalPaymentsSection     全球支付（SWIFT + 稳定币双卡片）
├── WorldMapSection           世界地图（视频 + CTA）
├── FeaturesSection           功能展示（4 屏滑块：汇率/安全/OTC/多元化）
├── ProductsSection           产品展示（3 屏滑块 + MacBook 设备模型）
└── Footer                    页脚（链接 + 社交图标）
```

## 国际化

支持 7 种语言，用户选择持久化至 `localStorage`：

| 代码 | 语言 |
|------|------|
| `en` | English |
| `zh-CN` | 简体中文 |
| `zh-TW` | 繁體中文 |
| `ja` | 日本語 |
| `ko` | 한국어 |
| `es` | Español |
| `fr` | Français |

翻译文件位于 `src/i18n/index.js`，按 `nav` / `hero` / `stats` / `globalPayments` / `worldMap` / `features` / `products` / `footer` 命名空间组织。

## 自定义指令

### `v-reveal` — 滚动揭示动画

基于 IntersectionObserver 实现，灵感来自 ScrollReveal.js。

```html
<div v-reveal>默认从下方滑入</div>
<div v-reveal="{ origin: 'left', delay: 120, distance: 40 }">自定义方向与延迟</div>
```

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `delay` | `0` ms | 延迟时间 |
| `duration` | `720` ms | 动画时长 |
| `distance` | `32` px | 滑入距离 |
| `origin` | `bottom` | 方向（left/right/top/bottom） |
| `threshold` | `0.16` | 可见比例阈值 |
| `once` | `true` | 是否只触发一次 |
| `scale` | `1` | 缩放比例 |

自动检测 `prefers-reduced-motion: reduce`，为偏好减少动画的用户直接显示内容。

## 项目结构

```
src/
├── main.js                    入口：注册 router / i18n / v-reveal
├── App.vue                    根组件
├── router/index.js            路由配置（HTML5 History 模式）
├── i18n/index.js              国际化（7 语言 + localStorage 持久化）
├── directives/reveal.js       v-reveal 滚动揭示指令
├── views/
│   ├── HomeView.vue           主页
│   └── AboutView.vue          关于页（占位）
├── components/
│   ├── Navbar.vue             导航栏
│   ├── HeroSection.vue        英雄区
│   ├── StatsSection.vue       数据统计
│   ├── GlobalPaymentsSection.vue  全球支付
│   ├── WorldMapSection.vue    世界地图
│   ├── FeaturesSection.vue    功能展示（4 屏滑块）
│   ├── FeatureNav.vue         滑块导航子组件
│   ├── ProductsSection.vue    产品展示（3 屏滑块）
│   └── Footer.vue             页脚
├── styles/
│   ├── index.css              入口
│   ├── base/
│   │   ├── tokens.css         设计令牌（颜色/字体/间距/圆角）
│   │   ├── global.css         全局重置
│   │   └── motion.css         动画系统 + reveal 样式
│   ├── views/                 页面样式
│   └── components/            组件样式
└── assets/images/             图片与视频资源
```

## 设计体系

- **设计令牌**：`src/styles/base/tokens.css`，通过 CSS 变量管理颜色、字体、间距、圆角
- **响应式断点**：Desktop（>1199px）、Tablet（768–1199px）、Mobile（<767px）
- **动画系统**：浮动、漂移、脉冲、呼吸灯、CTA 光泽扫过等，均通过 CSS keyframes 实现
- **苹果风格**：大量留白、大号字体、毛玻璃效果、深色视觉卡片

## 构建

Vite 构建输出自动分类：

- JS → `js/[name]-[hash].js`
- CSS → `css/[name]-[hash].css`
- 图片 → `images/[name]-[hash][ext]`
- 其他 → `assets/[name]-[hash][ext]`
