import { createI18n } from 'vue-i18n'

const STORAGE_KEY = 'yasbe-locale'

export const localeOptions = [
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'zh-CN', label: '简体中文', shortLabel: '简' },
  { code: 'zh-TW', label: '繁體中文', shortLabel: '繁' },
  { code: 'ja', label: '日本語', shortLabel: '日' },
  { code: 'ko', label: '한국어', shortLabel: '한' },
  { code: 'es', label: 'Español', shortLabel: 'ES' },
  { code: 'fr', label: 'Français', shortLabel: 'FR' },
]

const supportedLocaleCodes = new Set(localeOptions.map((option) => option.code))

const messages = {
  en: {
    nav: {
      links: {
        globalPayment: 'Global Payment',
        otc: 'Institutional OTC',
        contact: 'Contact',
      },
      auth: {
        signUp: 'Sign Up',
        login: 'Login',
      },
      language: {
        ariaLabel: 'Switch language',
      },
    },
    hero: {
      titleLight: 'Connect You with the',
      titleBold: 'World Economy',
      subtitle: 'Fast, secure global payments with access to top-tier investments.',
      cta: 'Try For Free',
    },
    stats: {
      description:
        'Stablecoins move money at the speed of the internet, overcoming traditional banking inefficiencies.',
      labels: {
        supportedChains: 'Supported Chains',
        integratedProjects: 'Integrated Projects',
        marketShare: 'Yieldcoin Market Share',
        tvl: 'TVL',
      },
    },
    globalPayments: {
      title: 'Global Payments via SWIFT & Blockchain',
      subtitle:
        'We work with top-tier banks, payment providers, and liquidity partners to enable fast, secure, and efficient global transfers. Our network spans over 28 countries and continues to grow.',
      cards: {
        trust: {
          title: 'A Legacy You Can Trust',
          text: 'Built on SWIFT and a vast network of correspondent banks, traditional payment rails ensure secure and reliable transactions, where redundancy drives resilience.',
        },
        stablecoin: {
          title: 'Stablecoin-Powered Global Transfers',
          text: 'Using stablecoins and blockchain, we overcome legacy inefficiencies, delivering faster, lower-cost payments across borders.',
        },
      },
    },
    worldMap: {
      title: 'Redefining the<br />Speed of Money',
      description:
        'Stablecoins move money at the speed of the internet, overcoming traditional banking inefficiencies.',
      cta: 'Learn More',
    },
    features: {
      title: 'Holistic Digital Finance, Infinite Value Connection',
      slide1: {
        update: 'Last updated Just now',
        from: 'From',
        to: 'To',
        rateLabel: 'Our current rate',
        exchangeButton: 'Get started',
        title: 'Live Exchange Rates &<br />Instant Conversion',
        description:
          'Compare and convert between currencies and cryptocurrencies in real time. Stay updated with the latest rates and make informed decisions instantly.',
        cta: 'Try Now',
      },
      slide2: {
        visualButton: 'Trade Securely',
        title: 'Unlock Security for Your Digital Transactions',
        description:
          'Trust is built on security, and we take both seriously. With Institutional OTC, every fiat or crypto transaction is protected by encryption, risk controls, and compliance-grade safeguards.',
      },
      slide3: {
        title: 'Institutional OTC',
        description:
          "Stablecoins are a key part of modern payments. Institutional OTC enhances YASBe's infrastructure to move money faster, smarter, and cheaper.",
        listTitle: 'What Institutional OTC gives you:',
        listItems:
          'Competitive pricing & minimal slippage<br />Real-time access to liquidity across fiat & crypto<br />Custom OTC strategies just for you',
        cta: 'Find Out More',
      },
      slide4: {
        title: 'Dual Asset Diversification',
        description:
          "The future of investing isn't either crypto or traditional assets, it's both. Invest across borders, markets, and asset classes seamlessly.",
        listTitle:
          "We're not just observing the financial revolution, we're building it with bold, like-minded partners. Beyond just investing, we actively:",
        listItems:
          "Back disruptive technologies reshaping finance<br />Support innovators advancing the cryptosphere<br />Build infrastructure for tomorrow's asset landscape",
        cta: 'Find Out More',
      },
    },
    products: {
      title: 'Everything You Need, in One Place',
      slide1: {
        title: 'Global Payment',
        text: 'Built with redundancy at every layer, YASBe ensures reliable transactions across multiple payment rails. Your payments are processed efficiently, and your partners receive the right amount, every time, fast, secure, and trusted.',
      },
      slide2: {
        title: 'Traditional & Crypto Markets',
        text: 'Bridge traditional finance and cryptocurrency markets with our comprehensive trading platform. Execute trades across multiple asset classes with institutional-grade security and compliance.',
      },
      slide3: {
        title: 'Investment Opportunities',
        text: 'Access top-tier investment opportunities across traditional and digital assets. Our platform provides institutional-grade access to diversified portfolios and exclusive deals.',
      },
    },
    footer: {
      copyright: 'Copyright © YASBe 2026. All Rights Reserved',
      company: {
        heading: 'Company',
        about: 'About Us',
        careers: 'Careers',
        contact: 'Contact Us',
      },
      products: {
        heading: 'Products',
        virtualAccounts: 'Virtual Accounts',
        globalCollection: 'Global Collection & Payout',
        stablecoinCheckout: 'Stablecoin Checkout',
        otc: 'Institutional OTC',
        investment: 'Investment Opportunities',
        card: 'Card',
      },
      useCases: {
        heading: 'Use Cases',
        treasury: 'Corporate Treasury Management',
        importExport: 'Import & Export Companies',
        services: 'Professional Services',
        vc: 'Venture Capital & Investment Funds',
        crypto: 'Crypto-native',
      },
      resources: {
        heading: 'Resources',
        legal: 'Legal and Compliance',
      },
    },
    about: {
      eyebrow: 'About Route',
      title: 'This is a sample secondary page.',
      descriptionPrefix:
        'This route currently uses',
      descriptionMiddle:
        'which works well for a standard frontend site. To add more pages later, keep extending',
      descriptionSuffix: '.',
    },
  },
  'zh-CN': {
    nav: {
      links: {
        globalPayment: '全球支付',
        otc: '机构 OTC',
        contact: '联系我们',
      },
      auth: {
        signUp: '注册',
        login: '登录',
      },
      language: {
        ariaLabel: '切换语言',
      },
    },
    hero: {
      titleLight: '连接你与',
      titleBold: '世界经济',
      subtitle: '安全高效的全球支付能力，连接优质投资机会。',
      cta: '免费试用',
    },
    stats: {
      description: '稳定币以互联网的速度转移资金，突破传统银行体系的效率限制。',
      labels: {
        supportedChains: '支持链数',
        integratedProjects: '已集成项目',
        marketShare: 'Yieldcoin 市场份额',
        tvl: 'TVL',
      },
    },
    globalPayments: {
      title: '通过 SWIFT 与区块链实现全球支付',
      subtitle:
        '我们与顶级银行、支付服务商和流动性伙伴合作，提供快速、安全、高效的全球转账服务。我们的网络已覆盖 28 个以上国家，并持续扩展。',
      cards: {
        trust: {
          title: '值得信赖的成熟体系',
          text: '依托 SWIFT 与广泛的代理银行网络，传统支付通道提供安全可靠的交易体验，冗余架构带来更强韧性。',
        },
        stablecoin: {
          title: '稳定币驱动的全球转账',
          text: '借助稳定币与区块链，我们突破传统体系低效限制，实现更快、更低成本的跨境支付。',
        },
      },
    },
    worldMap: {
      title: '重新定义<br />资金流动速度',
      description: '稳定币以互联网的速度转移资金，突破传统银行体系的效率限制。',
      cta: '了解更多',
    },
    features: {
      title: '全方位数字金融，连接无限价值',
      slide1: {
        update: '刚刚更新',
        from: '从',
        to: '到',
        rateLabel: '当前汇率',
        exchangeButton: '立即开始',
        title: '实时汇率与<br />即时兑换',
        description: '实时比较并兑换法币与加密货币，随时掌握最新汇率，快速做出更明智的决策。',
        cta: '立即体验',
      },
      slide2: {
        visualButton: '安全交易',
        title: '为你的数字交易解锁安全保障',
        description:
          '信任建立在安全之上，而这两者我们都极其重视。通过机构 OTC，每一笔法币或加密交易都受到加密、风控与合规级保障的保护。',
      },
      slide3: {
        title: '机构 OTC',
        description: '稳定币已成为现代支付的重要组成部分。机构 OTC 强化了 YASBe 的基础设施，让资金流转更快、更聪明、更低成本。',
        listTitle: '机构 OTC 能为你带来：',
        listItems: '更具竞争力的价格与更低滑点<br />实时获取法币与加密市场流动性<br />为你量身定制 OTC 策略',
        cta: '了解更多',
      },
      slide4: {
        title: '双资产多元配置',
        description: '投资的未来不是在加密资产和传统资产之间二选一，而是两者兼顾。跨越地域、市场与资产类别，实现无缝配置。',
        listTitle: '我们不只是旁观金融革命，而是与志同道合的伙伴共同建设它。除了投资之外，我们还在积极：',
        listItems: '支持重塑金融格局的颠覆性技术<br />扶持推动加密生态前进的创新者<br />建设面向未来资产版图的基础设施',
        cta: '了解更多',
      },
    },
    products: {
      title: '一站式满足你的全部需求',
      slide1: {
        title: '全球支付',
        text: 'YASBe 在每一层都构建了冗余能力，确保多种支付通道下的可靠交易。你的付款高效处理，合作伙伴始终准确收款，快速、安全、值得信赖。',
      },
      slide2: {
        title: '传统与加密市场',
        text: '通过我们的综合交易平台连接传统金融与加密货币市场，以机构级安全与合规能力执行多资产类别交易。',
      },
      slide3: {
        title: '投资机会',
        text: '把握传统资产与数字资产中的优质投资机会。平台提供机构级的多元化组合与专属项目准入。',
      },
    },
    footer: {
      copyright: 'Copyright © YASBe 2026. 保留所有权利',
      company: {
        heading: '公司',
        about: '关于我们',
        careers: '加入我们',
        contact: '联系我们',
      },
      products: {
        heading: '产品',
        virtualAccounts: '虚拟账户',
        globalCollection: '全球收款与付款',
        stablecoinCheckout: '稳定币收银台',
        otc: '机构 OTC',
        investment: '投资机会',
        card: '卡产品',
      },
      useCases: {
        heading: '应用场景',
        treasury: '企业资金管理',
        importExport: '进出口企业',
        services: '专业服务',
        vc: '风险投资与基金',
        crypto: '加密原生企业',
      },
      resources: {
        heading: '资源',
        legal: '法律与合规',
      },
    },
    about: {
      eyebrow: '关于路由',
      title: '这是一个示例子页面。',
      descriptionPrefix: '当前路由使用',
      descriptionMiddle: '，适合常规前端站点结构。后续如果你要增加更多页面，可以继续扩展',
      descriptionSuffix: '。',
    },
  },
  'zh-TW': {
    nav: {
      links: {
        globalPayment: '全球支付',
        otc: '機構 OTC',
        contact: '聯絡我們',
      },
      auth: {
        signUp: '註冊',
        login: '登入',
      },
      language: {
        ariaLabel: '切換語言',
      },
    },
    hero: {
      titleLight: '連結你與',
      titleBold: '世界經濟',
      subtitle: '安全高效的全球支付能力，串接優質投資機會。',
      cta: '免費試用',
    },
    stats: {
      description: '穩定幣以網際網路的速度轉移資金，突破傳統銀行體系的效率限制。',
      labels: {
        supportedChains: '支援鏈數',
        integratedProjects: '已整合專案',
        marketShare: 'Yieldcoin 市場佔有率',
        tvl: 'TVL',
      },
    },
    globalPayments: {
      title: '透過 SWIFT 與區塊鏈實現全球支付',
      subtitle:
        '我們與頂級銀行、支付服務商及流動性夥伴合作，提供快速、安全且高效的全球轉帳服務。我們的網路已覆蓋超過 28 個國家，且仍在持續擴展。',
      cards: {
        trust: {
          title: '值得信賴的成熟體系',
          text: '依託 SWIFT 與廣泛的代理銀行網路，傳統支付通道提供安全可靠的交易體驗，而冗餘設計則提升整體韌性。',
        },
        stablecoin: {
          title: '穩定幣驅動的全球轉帳',
          text: '藉由穩定幣與區塊鏈，我們突破傳統體系的效率瓶頸，實現更快速、成本更低的跨境支付。',
        },
      },
    },
    worldMap: {
      title: '重新定義<br />資金流動速度',
      description: '穩定幣以網際網路的速度轉移資金，突破傳統銀行體系的效率限制。',
      cta: '了解更多',
    },
    features: {
      title: '全方位數位金融，串聯無限價值',
      slide1: {
        update: '剛剛更新',
        from: '從',
        to: '到',
        rateLabel: '目前匯率',
        exchangeButton: '立即開始',
        title: '即時匯率與<br />快速兌換',
        description: '即時比較並兌換法幣與加密貨幣，隨時掌握最新匯率，迅速做出更明智的決策。',
        cta: '立即體驗',
      },
      slide2: {
        visualButton: '安全交易',
        title: '為你的數位交易解鎖安全保障',
        description:
          '信任建立在安全之上，而這兩者我們都同樣重視。透過機構 OTC，每一筆法幣或加密交易都受到加密、風控與合規級保護。',
      },
      slide3: {
        title: '機構 OTC',
        description: '穩定幣已成為現代支付的重要一環。機構 OTC 強化了 YASBe 的基礎設施，使資金流轉更快、更聰明、成本更低。',
        listTitle: '機構 OTC 能為你帶來：',
        listItems: '更具競爭力的價格與更低滑點<br />即時接入法幣與加密市場流動性<br />為你量身打造 OTC 策略',
        cta: '了解更多',
      },
      slide4: {
        title: '雙資產多元配置',
        description: '投資的未來不是在加密資產和傳統資產之間二選一，而是兩者兼具。跨越地域、市場與資產類別，實現無縫配置。',
        listTitle: '我們不只是旁觀金融革命，而是與志同道合的夥伴共同打造它。除了投資之外，我們還積極：',
        listItems: '支持重塑金融樣貌的顛覆性技術<br />扶持推動加密生態前進的創新者<br />建設面向未來資產版圖的基礎設施',
        cta: '了解更多',
      },
    },
    products: {
      title: '一站式滿足你的所有需求',
      slide1: {
        title: '全球支付',
        text: 'YASBe 在每一層都建立冗餘能力，確保跨多種支付通道的可靠交易。你的付款能高效處理，合作夥伴也能穩定準確收款，快速、安全且值得信賴。',
      },
      slide2: {
        title: '傳統與加密市場',
        text: '透過我們的綜合交易平台串聯傳統金融與加密貨幣市場，以機構級安全與合規能力執行多資產類別交易。',
      },
      slide3: {
        title: '投資機會',
        text: '掌握傳統資產與數位資產中的優質投資機會。平台提供機構級的多元投資組合與專屬機會准入。',
      },
    },
    footer: {
      copyright: 'Copyright © YASBe 2026. 保留所有權利',
      company: {
        heading: '公司',
        about: '關於我們',
        careers: '加入我們',
        contact: '聯絡我們',
      },
      products: {
        heading: '產品',
        virtualAccounts: '虛擬帳戶',
        globalCollection: '全球收款與付款',
        stablecoinCheckout: '穩定幣收款',
        otc: '機構 OTC',
        investment: '投資機會',
        card: '卡片',
      },
      useCases: {
        heading: '使用場景',
        treasury: '企業資金管理',
        importExport: '進出口企業',
        services: '專業服務',
        vc: '創投與投資基金',
        crypto: '加密原生企業',
      },
      resources: {
        heading: '資源',
        legal: '法律與合規',
      },
    },
    about: {
      eyebrow: '關於路由',
      title: '這是一個示例次級頁面。',
      descriptionPrefix: '目前路由使用',
      descriptionMiddle: '，適合一般前端網站結構。若之後要新增更多頁面，可繼續擴展',
      descriptionSuffix: '。',
    },
  },
  ja: {
    nav: {
      links: {
        globalPayment: 'グローバル決済',
        otc: '機関投資家向け OTC',
        contact: 'お問い合わせ',
      },
      auth: {
        signUp: '新規登録',
        login: 'ログイン',
      },
      language: {
        ariaLabel: '言語を切り替える',
      },
    },
    hero: {
      titleLight: 'あなたを',
      titleBold: '世界経済へつなぐ',
      subtitle: '高速かつ安全なグローバル決済で、一流の投資機会へアクセス。',
      cta: '無料で試す',
    },
    stats: {
      description: 'ステーブルコインは、従来の銀行の非効率を越えて、インターネットの速度で資金を動かします。',
      labels: {
        supportedChains: '対応チェーン',
        integratedProjects: '統合済みプロジェクト',
        marketShare: 'Yieldcoin 市場シェア',
        tvl: 'TVL',
      },
    },
    globalPayments: {
      title: 'SWIFT とブロックチェーンによるグローバル決済',
      subtitle:
        '当社はトップクラスの銀行、決済プロバイダー、流動性パートナーと連携し、高速・安全・効率的な国際送金を実現します。ネットワークは 28 か国以上に広がり、今も拡大を続けています。',
      cards: {
        trust: {
          title: '信頼できる確かな基盤',
          text: 'SWIFT と幅広いコルレス銀行ネットワークを基盤とする従来の決済レールは、安全で信頼性の高い取引を実現し、冗長性がその強さを支えます。',
        },
        stablecoin: {
          title: 'ステーブルコインによるグローバル送金',
          text: 'ステーブルコインとブロックチェーンを活用し、従来の非効率を乗り越えて、より速く低コストな越境決済を実現します。',
        },
      },
    },
    worldMap: {
      title: '資金移動のスピードを<br />再定義する',
      description: 'ステーブルコインは、従来の銀行の非効率を越えて、インターネットの速度で資金を動かします。',
      cta: '詳しく見る',
    },
    features: {
      title: '包括的なデジタル金融、無限の価値接続',
      slide1: {
        update: 'たった今更新',
        from: '送金元',
        to: '送金先',
        rateLabel: '現在のレート',
        exchangeButton: '今すぐ始める',
        title: 'ライブ為替レートと<br />即時換算',
        description: '法定通貨と暗号資産をリアルタイムで比較・換算できます。最新レートを把握し、素早く適切な判断を行えます。',
        cta: '今すぐ試す',
      },
      slide2: {
        visualButton: '安全に取引',
        title: 'デジタル取引に確かなセキュリティを',
        description:
          '信頼はセキュリティの上に成り立ちます。Institutional OTC では、すべての法定通貨・暗号資産取引が暗号化、リスク管理、コンプライアンス水準の保護によって守られています。',
      },
      slide3: {
        title: 'Institutional OTC',
        description:
          'ステーブルコインは現代の決済における重要な要素です。Institutional OTC は YASBe のインフラをさらに強化し、資金移動をより速く、より賢く、より低コストにします。',
        listTitle: 'Institutional OTC が提供する価値：',
        listItems:
          '競争力の高い価格と最小限のスリッページ<br />法定通貨・暗号資産双方の流動性へリアルタイムアクセス<br />お客様に合わせた OTC 戦略',
        cta: '詳しく見る',
      },
      slide4: {
        title: 'デュアルアセット分散投資',
        description:
          '投資の未来は、暗号資産か伝統資産かの二択ではなく、その両方です。国境、市場、資産クラスをまたいでシームレスに投資できます。',
        listTitle:
          '私たちは金融革命を眺めているだけではありません。大胆で志を同じくするパートナーとともに築いています。投資だけでなく、次のことにも取り組んでいます：',
        listItems:
          '金融を再構築する破壊的技術への支援<br />暗号圏を前進させるイノベーターの支援<br />次世代の資産基盤となるインフラ構築',
        cta: '詳しく見る',
      },
    },
    products: {
      title: '必要なものを、すべて一か所に',
      slide1: {
        title: 'グローバル決済',
        text: 'YASBe はあらゆるレイヤーに冗長性を備え、複数の決済レールにまたがる信頼性の高い取引を実現します。支払いは効率的に処理され、パートナーは常に正確な金額を受け取れます。高速で安全、そして信頼できる仕組みです。',
      },
      slide2: {
        title: '伝統金融と暗号資産市場',
        text: '当社の包括的な取引プラットフォームで、伝統金融市場と暗号資産市場を橋渡しします。機関投資家レベルのセキュリティとコンプライアンスのもと、複数の資産クラスを取引できます。',
      },
      slide3: {
        title: '投資機会',
        text: '伝統資産とデジタル資産の両方にまたがる一流の投資機会へアクセスできます。分散ポートフォリオや限定案件への機関投資家レベルのアクセスを提供します。',
      },
    },
    footer: {
      copyright: 'Copyright © YASBe 2026. All Rights Reserved',
      company: {
        heading: '会社情報',
        about: '私たちについて',
        careers: '採用情報',
        contact: 'お問い合わせ',
      },
      products: {
        heading: '製品',
        virtualAccounts: 'バーチャル口座',
        globalCollection: 'グローバル集金・支払い',
        stablecoinCheckout: 'ステーブルコイン決済',
        otc: 'Institutional OTC',
        investment: '投資機会',
        card: 'カード',
      },
      useCases: {
        heading: 'ユースケース',
        treasury: '企業財務管理',
        importExport: '輸出入企業',
        services: 'プロフェッショナルサービス',
        vc: 'ベンチャーキャピタル・投資ファンド',
        crypto: 'クリプトネイティブ企業',
      },
      resources: {
        heading: 'リソース',
        legal: '法務・コンプライアンス',
      },
    },
    about: {
      eyebrow: 'About Route',
      title: 'これはサンプルのサブページです。',
      descriptionPrefix: 'このルートでは',
      descriptionMiddle: 'を使用しており、一般的なフロントエンドサイトに適しています。今後ページを増やす場合は、引き続き',
      descriptionSuffix: 'を拡張してください。',
    },
  },
  ko: {
    nav: {
      links: {
        globalPayment: '글로벌 결제',
        otc: '기관 OTC',
        contact: '문의하기',
      },
      auth: {
        signUp: '회원가입',
        login: '로그인',
      },
      language: {
        ariaLabel: '언어 변경',
      },
    },
    hero: {
      titleLight: '당신을',
      titleBold: '세계 경제와 연결합니다',
      subtitle: '빠르고 안전한 글로벌 결제로 최상위 투자 기회에 접근하세요.',
      cta: '무료로 시작하기',
    },
    stats: {
      description: '스테이블코인은 전통 금융의 비효율을 넘어 인터넷 속도로 자금을 이동시킵니다.',
      labels: {
        supportedChains: '지원 체인',
        integratedProjects: '통합 프로젝트',
        marketShare: 'Yieldcoin 시장 점유율',
        tvl: 'TVL',
      },
    },
    globalPayments: {
      title: 'SWIFT와 블록체인을 통한 글로벌 결제',
      subtitle:
        '최상위 은행, 결제 제공업체, 유동성 파트너와 협력하여 빠르고 안전하며 효율적인 글로벌 송금을 지원합니다. 당사 네트워크는 이미 28개국 이상을 아우르며 계속 확장되고 있습니다.',
      cards: {
        trust: {
          title: '신뢰할 수 있는 검증된 레거시',
          text: 'SWIFT와 광범위한 코레스폰던트 은행 네트워크를 기반으로, 전통 결제 레일은 안전하고 안정적인 거래를 보장하며, 이중화 구조가 회복 탄력성을 높입니다.',
        },
        stablecoin: {
          title: '스테이블코인 기반 글로벌 송금',
          text: '스테이블코인과 블록체인을 활용해 기존 시스템의 비효율을 극복하고 더 빠르고 저렴한 국경 간 결제를 제공합니다.',
        },
      },
    },
    worldMap: {
      title: '자금 이동 속도를<br />다시 정의하다',
      description: '스테이블코인은 전통 금융의 비효율을 넘어 인터넷 속도로 자금을 이동시킵니다.',
      cta: '더 알아보기',
    },
    features: {
      title: '통합 디지털 금융, 무한한 가치 연결',
      slide1: {
        update: '방금 업데이트됨',
        from: '보내는 자산',
        to: '받는 자산',
        rateLabel: '현재 환율',
        exchangeButton: '시작하기',
        title: '실시간 환율과<br />즉시 전환',
        description: '실시간으로 법정화폐와 암호자산을 비교하고 전환하세요. 최신 환율을 확인하고 즉시 더 나은 결정을 내릴 수 있습니다.',
        cta: '지금 사용해보기',
      },
      slide2: {
        visualButton: '안전하게 거래하기',
        title: '디지털 거래를 위한 보안 강화',
        description:
          '신뢰는 보안에서 시작되며, 우리는 두 요소 모두를 중요하게 생각합니다. 기관 OTC를 통해 모든 법정화폐 및 암호화폐 거래는 암호화, 리스크 관리, 컴플라이언스 수준의 보호를 받습니다.',
      },
      slide3: {
        title: '기관 OTC',
        description:
          '스테이블코인은 현대 결제의 핵심 요소입니다. 기관 OTC는 YASBe의 인프라를 강화해 더 빠르고 더 똑똑하며 더 저렴한 자금 이동을 가능하게 합니다.',
        listTitle: '기관 OTC가 제공하는 가치:',
        listItems:
          '경쟁력 있는 가격과 최소한의 슬리피지<br />법정화폐 및 암호화폐 유동성에 대한 실시간 접근<br />맞춤형 OTC 전략 제공',
        cta: '자세히 보기',
      },
      slide4: {
        title: '듀얼 자산 분산 투자',
        description:
          '투자의 미래는 암호자산이냐 전통 자산이냐의 선택이 아니라 둘 다입니다. 국가, 시장, 자산군을 넘나들며 매끄럽게 투자하세요.',
        listTitle:
          '우리는 금융 혁명을 지켜보기만 하지 않습니다. 대담하고 뜻이 맞는 파트너들과 함께 직접 만들어 갑니다. 단순한 투자를 넘어 우리는 다음을 실천합니다:',
        listItems:
          '금융을 재편하는 혁신 기술 지원<br />암호 생태계를 발전시키는 혁신가 후원<br />미래 자산 환경을 위한 인프라 구축',
        cta: '자세히 보기',
      },
    },
    products: {
      title: '필요한 모든 것을 한곳에',
      slide1: {
        title: '글로벌 결제',
        text: 'YASBe는 모든 레이어에 이중화를 설계해 다양한 결제 레일 전반에서 안정적인 거래를 보장합니다. 결제는 효율적으로 처리되고 파트너는 언제나 정확한 금액을 수령합니다. 빠르고 안전하며 신뢰할 수 있습니다.',
      },
      slide2: {
        title: '전통 금융 및 크립토 시장',
        text: '포괄적인 거래 플랫폼으로 전통 금융과 암호화폐 시장을 연결하세요. 기관급 보안과 컴플라이언스를 바탕으로 다양한 자산군을 거래할 수 있습니다.',
      },
      slide3: {
        title: '투자 기회',
        text: '전통 자산과 디지털 자산 전반의 우수한 투자 기회에 접근하세요. 플랫폼은 분산 포트폴리오와 독점 딜에 대한 기관급 접근을 제공합니다.',
      },
    },
    footer: {
      copyright: 'Copyright © YASBe 2026. All Rights Reserved',
      company: {
        heading: '회사',
        about: '회사 소개',
        careers: '채용',
        contact: '문의하기',
      },
      products: {
        heading: '제품',
        virtualAccounts: '가상 계좌',
        globalCollection: '글로벌 수납 및 지급',
        stablecoinCheckout: '스테이블코인 체크아웃',
        otc: '기관 OTC',
        investment: '투자 기회',
        card: '카드',
      },
      useCases: {
        heading: '활용 사례',
        treasury: '기업 자금 관리',
        importExport: '수출입 기업',
        services: '전문 서비스',
        vc: '벤처캐피털 및 투자 펀드',
        crypto: '크립토 네이티브 기업',
      },
      resources: {
        heading: '리소스',
        legal: '법률 및 컴플라이언스',
      },
    },
    about: {
      eyebrow: 'About Route',
      title: '이 페이지는 샘플 보조 페이지입니다.',
      descriptionPrefix: '현재 이 라우트는',
      descriptionMiddle: '를 사용하며 일반적인 프런트엔드 사이트에 적합합니다. 이후 더 많은 페이지를 추가하려면',
      descriptionSuffix: '를 계속 확장하면 됩니다.',
    },
  },
  es: {
    nav: {
      links: {
        globalPayment: 'Pago global',
        otc: 'OTC institucional',
        contact: 'Contacto',
      },
      auth: {
        signUp: 'Registrarse',
        login: 'Iniciar sesión',
      },
      language: {
        ariaLabel: 'Cambiar idioma',
      },
    },
    hero: {
      titleLight: 'Te conectamos con la',
      titleBold: 'economía mundial',
      subtitle: 'Pagos globales rápidos y seguros con acceso a oportunidades de inversión de primer nivel.',
      cta: 'Probar gratis',
    },
    stats: {
      description: 'Las stablecoins mueven dinero a la velocidad de internet y superan las ineficiencias de la banca tradicional.',
      labels: {
        supportedChains: 'Cadenas compatibles',
        integratedProjects: 'Proyectos integrados',
        marketShare: 'Cuota de mercado de Yieldcoin',
        tvl: 'TVL',
      },
    },
    globalPayments: {
      title: 'Pagos globales vía SWIFT y blockchain',
      subtitle:
        'Trabajamos con bancos de primer nivel, proveedores de pago y socios de liquidez para habilitar transferencias globales rápidas, seguras y eficientes. Nuestra red abarca más de 28 países y sigue creciendo.',
      cards: {
        trust: {
          title: 'Un legado en el que puedes confiar',
          text: 'Basados en SWIFT y en una amplia red de bancos corresponsales, los rieles de pago tradicionales garantizan transacciones seguras y confiables, donde la redundancia fortalece la resiliencia.',
        },
        stablecoin: {
          title: 'Transferencias globales impulsadas por stablecoins',
          text: 'Con stablecoins y blockchain superamos las ineficiencias heredadas y ofrecemos pagos transfronterizos más rápidos y de menor costo.',
        },
      },
    },
    worldMap: {
      title: 'Redefiniendo la<br />velocidad del dinero',
      description: 'Las stablecoins mueven dinero a la velocidad de internet y superan las ineficiencias de la banca tradicional.',
      cta: 'Saber más',
    },
    features: {
      title: 'Finanzas digitales integrales, conexión de valor infinita',
      slide1: {
        update: 'Actualizado hace un instante',
        from: 'Desde',
        to: 'Hacia',
        rateLabel: 'Nuestra tasa actual',
        exchangeButton: 'Comenzar',
        title: 'Tipos de cambio en vivo y<br />conversión instantánea',
        description: 'Compara y convierte entre monedas y criptomonedas en tiempo real. Mantente al día con las últimas tasas y toma decisiones informadas al instante.',
        cta: 'Probar ahora',
      },
      slide2: {
        visualButton: 'Operar con seguridad',
        title: 'Desbloquea seguridad para tus transacciones digitales',
        description:
          'La confianza se construye sobre la seguridad, y nosotros nos tomamos ambas muy en serio. Con OTC institucional, cada transacción fiat o cripto está protegida por cifrado, controles de riesgo y salvaguardas de nivel normativo.',
      },
      slide3: {
        title: 'OTC institucional',
        description:
          'Las stablecoins son una pieza clave de los pagos modernos. El OTC institucional fortalece la infraestructura de YASBe para mover dinero de forma más rápida, inteligente y económica.',
        listTitle: 'Lo que te ofrece el OTC institucional:',
        listItems:
          'Precios competitivos y deslizamiento mínimo<br />Acceso en tiempo real a liquidez en fiat y cripto<br />Estrategias OTC personalizadas para ti',
        cta: 'Más información',
      },
      slide4: {
        title: 'Diversificación de doble activo',
        description:
          'El futuro de la inversión no es cripto o activos tradicionales, sino ambos. Invierte entre fronteras, mercados y clases de activos de forma fluida.',
        listTitle:
          'No solo observamos la revolución financiera, la estamos construyendo con socios audaces y afines. Más allá de invertir, también:',
        listItems:
          'Respaldamos tecnologías disruptivas que transforman las finanzas<br />Apoyamos a innovadores que hacen avanzar el ecosistema cripto<br />Construimos infraestructura para el panorama de activos del mañana',
        cta: 'Más información',
      },
    },
    products: {
      title: 'Todo lo que necesitas, en un solo lugar',
      slide1: {
        title: 'Pago global',
        text: 'Con redundancia en cada capa, YASBe garantiza transacciones confiables a través de múltiples rieles de pago. Tus pagos se procesan con eficiencia y tus socios reciben siempre el importe correcto, de forma rápida, segura y confiable.',
      },
      slide2: {
        title: 'Mercados tradicionales y cripto',
        text: 'Conecta los mercados financieros tradicionales y de criptomonedas con nuestra plataforma de trading integral. Ejecuta operaciones en múltiples clases de activos con seguridad y cumplimiento de nivel institucional.',
      },
      slide3: {
        title: 'Oportunidades de inversión',
        text: 'Accede a oportunidades de inversión de primer nivel en activos tradicionales y digitales. Nuestra plataforma ofrece acceso institucional a carteras diversificadas y oportunidades exclusivas.',
      },
    },
    footer: {
      copyright: 'Copyright © YASBe 2026. Todos los derechos reservados',
      company: {
        heading: 'Empresa',
        about: 'Sobre nosotros',
        careers: 'Carreras',
        contact: 'Contáctanos',
      },
      products: {
        heading: 'Productos',
        virtualAccounts: 'Cuentas virtuales',
        globalCollection: 'Cobros y pagos globales',
        stablecoinCheckout: 'Checkout con stablecoins',
        otc: 'OTC institucional',
        investment: 'Oportunidades de inversión',
        card: 'Tarjeta',
      },
      useCases: {
        heading: 'Casos de uso',
        treasury: 'Gestión de tesorería corporativa',
        importExport: 'Empresas de importación y exportación',
        services: 'Servicios profesionales',
        vc: 'Capital de riesgo y fondos de inversión',
        crypto: 'Empresas cripto nativas',
      },
      resources: {
        heading: 'Recursos',
        legal: 'Legal y cumplimiento',
      },
    },
    about: {
      eyebrow: 'Ruta About',
      title: 'Esta es una página secundaria de ejemplo.',
      descriptionPrefix: 'Actualmente esta ruta utiliza',
      descriptionMiddle: ', lo que funciona bien para un sitio frontend estándar. Si luego quieres añadir más páginas, sigue ampliando',
      descriptionSuffix: '.',
    },
  },
  fr: {
    nav: {
      links: {
        globalPayment: 'Paiement mondial',
        otc: 'OTC institutionnel',
        contact: 'Contact',
      },
      auth: {
        signUp: "S'inscrire",
        login: 'Connexion',
      },
      language: {
        ariaLabel: 'Changer de langue',
      },
    },
    hero: {
      titleLight: 'Nous vous connectons à',
      titleBold: "l'économie mondiale",
      subtitle: 'Des paiements mondiaux rapides et sécurisés avec un accès à des opportunités d’investissement de premier plan.',
      cta: 'Essayer gratuitement',
    },
    stats: {
      description:
        "Les stablecoins déplacent l'argent à la vitesse d'internet et dépassent les inefficacités du système bancaire traditionnel.",
      labels: {
        supportedChains: 'Chaînes prises en charge',
        integratedProjects: 'Projets intégrés',
        marketShare: 'Part de marché de Yieldcoin',
        tvl: 'TVL',
      },
    },
    globalPayments: {
      title: 'Paiements mondiaux via SWIFT et blockchain',
      subtitle:
        'Nous travaillons avec des banques de premier plan, des prestataires de paiement et des partenaires de liquidité pour permettre des transferts mondiaux rapides, sûrs et efficaces. Notre réseau couvre plus de 28 pays et continue de croître.',
      cards: {
        trust: {
          title: 'Un héritage digne de confiance',
          text: 'Reposant sur SWIFT et un vaste réseau de banques correspondantes, les rails de paiement traditionnels garantissent des transactions sûres et fiables, où la redondance renforce la résilience.',
        },
        stablecoin: {
          title: 'Transferts mondiaux alimentés par les stablecoins',
          text: 'Grâce aux stablecoins et à la blockchain, nous dépassons les inefficacités historiques pour offrir des paiements transfrontaliers plus rapides et moins coûteux.',
        },
      },
    },
    worldMap: {
      title: "Redéfinir la<br />vitesse de l'argent",
      description:
        "Les stablecoins déplacent l'argent à la vitesse d'internet et dépassent les inefficacités du système bancaire traditionnel.",
      cta: 'En savoir plus',
    },
    features: {
      title: 'Finance numérique holistique, connexion de valeur infinie',
      slide1: {
        update: 'Mis à jour à l’instant',
        from: 'De',
        to: 'Vers',
        rateLabel: 'Notre taux actuel',
        exchangeButton: 'Commencer',
        title: 'Taux de change en direct et<br />conversion instantanée',
        description:
          'Comparez et convertissez devises et cryptomonnaies en temps réel. Restez à jour avec les derniers taux et prenez des décisions éclairées immédiatement.',
        cta: 'Essayer maintenant',
      },
      slide2: {
        visualButton: 'Trader en toute sécurité',
        title: 'Renforcez la sécurité de vos transactions numériques',
        description:
          'La confiance repose sur la sécurité, et nous prenons les deux très au sérieux. Avec l’OTC institutionnel, chaque transaction en fiat ou en crypto est protégée par le chiffrement, des contrôles de risque et des garde-fous de niveau conformité.',
      },
      slide3: {
        title: 'OTC institutionnel',
        description:
          "Les stablecoins sont un élément clé des paiements modernes. L’OTC institutionnel renforce l’infrastructure de YASBe pour déplacer l'argent plus vite, plus intelligemment et à moindre coût.",
        listTitle: "Ce que l’OTC institutionnel vous apporte :",
        listItems:
          'Tarification compétitive et glissement minimal<br />Accès en temps réel à la liquidité fiat et crypto<br />Stratégies OTC personnalisées pour vous',
        cta: 'En savoir plus',
      },
      slide4: {
        title: 'Diversification bi-actifs',
        description:
          "L’avenir de l’investissement n’est pas crypto ou actifs traditionnels, mais les deux. Investissez entre frontières, marchés et classes d’actifs en toute fluidité.",
        listTitle:
          'Nous ne faisons pas qu’observer la révolution financière, nous la construisons avec des partenaires audacieux et alignés. Au-delà de l’investissement, nous :',
        listItems:
          'Soutenons des technologies disruptives qui transforment la finance<br />Accompagnons les innovateurs qui font progresser l’écosystème crypto<br />Construisons l’infrastructure du paysage d’actifs de demain',
        cta: 'En savoir plus',
      },
    },
    products: {
      title: 'Tout ce dont vous avez besoin, au même endroit',
      slide1: {
        title: 'Paiement mondial',
        text: 'Grâce à une redondance à chaque couche, YASBe garantit des transactions fiables sur plusieurs rails de paiement. Vos paiements sont traités efficacement et vos partenaires reçoivent toujours le bon montant, rapidement, en toute sécurité et en toute confiance.',
      },
      slide2: {
        title: 'Marchés traditionnels et crypto',
        text: 'Reliez les marchés financiers traditionnels et les marchés crypto grâce à notre plateforme de trading complète. Exécutez des transactions sur plusieurs classes d’actifs avec une sécurité et une conformité de niveau institutionnel.',
      },
      slide3: {
        title: "Opportunités d'investissement",
        text: 'Accédez à des opportunités d’investissement de premier ordre sur les actifs traditionnels et numériques. Notre plateforme offre un accès institutionnel à des portefeuilles diversifiés et à des opérations exclusives.',
      },
    },
    footer: {
      copyright: 'Copyright © YASBe 2026. Tous droits réservés',
      company: {
        heading: 'Entreprise',
        about: 'À propos',
        careers: 'Carrières',
        contact: 'Nous contacter',
      },
      products: {
        heading: 'Produits',
        virtualAccounts: 'Comptes virtuels',
        globalCollection: 'Encaissement et paiement mondiaux',
        stablecoinCheckout: 'Paiement en stablecoins',
        otc: 'OTC institutionnel',
        investment: "Opportunités d'investissement",
        card: 'Carte',
      },
      useCases: {
        heading: "Cas d'usage",
        treasury: 'Gestion de trésorerie d’entreprise',
        importExport: "Entreprises d'import-export",
        services: 'Services professionnels',
        vc: "Capital-risque et fonds d'investissement",
        crypto: 'Entreprises crypto natives',
      },
      resources: {
        heading: 'Ressources',
        legal: 'Juridique et conformité',
      },
    },
    about: {
      eyebrow: 'Route About',
      title: "Ceci est une page secondaire d'exemple.",
      descriptionPrefix: 'Cette route utilise actuellement',
      descriptionMiddle:
        ', ce qui convient bien à un site frontend classique. Pour ajouter plus de pages par la suite, continuez à étendre',
      descriptionSuffix: '.',
    },
  },
}

const defaultLocale = 'en'

function getInitialLocale() {
  if (typeof window === 'undefined') {
    return defaultLocale
  }

  const savedLocale = window.localStorage.getItem(STORAGE_KEY)

  return supportedLocaleCodes.has(savedLocale) ? savedLocale : defaultLocale
}

function applyDocumentLanguage(locale) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale
  }
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getInitialLocale(),
  fallbackLocale: defaultLocale,
  messages,
})

applyDocumentLanguage(i18n.global.locale.value)

export function setAppLocale(locale) {
  if (!supportedLocaleCodes.has(locale)) {
    return
  }

  i18n.global.locale.value = locale
  applyDocumentLanguage(locale)

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, locale)
  }
}

