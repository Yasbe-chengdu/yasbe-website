const sharedBenefitsEn = [
  'Fast track career development in a fintech startup',
  'Competitive salary with above-market compensation for the right people',
  'Stock options upon joining',
  'Fully remote, with freedom to work from anywhere',
]

const sharedBenefitsZh = [
  '在金融科技创业公司获得快速职业发展',
  '具备竞争力的薪资，优秀人才可获得高于市场水平的待遇',
  '加入即可参与股权期权激励',
  '远程办公，自由选择工作地点',
]

export const careersContent = {
  en: [
    {
      title: 'Payments Compliance Manager',
      meta: 'Compliance · Remote',
      about:
        'The Compliance Department ensures that YASBe products and processes align with regulatory standards. This is a practical, hands-on role for someone excited to build compliance capabilities from the ground up and guide the business on regulatory requirements and controls.',
      responsibilities: [
        'Develop, implement, and execute AML/CTF policies, rulebooks, and handbooks.',
        'Coordinate new or changing compliance requirements from regulators such as FINTRAC and the Bank of Canada.',
        'Maintain AML regulatory compliance management frameworks, testing programs, internal controls, and regulatory inventories.',
        'Manage day-to-day AML/CTF operations including customer screening, onboarding, training, reporting, and senior management updates.',
      ],
      requirements: [
        '5+ years of regulatory or compliance experience in financial services, a regulator, or government department.',
        'Prior experience as Head of Compliance, Compliance Officer, MLRO, or similar role.',
        'ACAMS certification and deep knowledge of AML/CTF, regulatory risk, cross-border payments, remittance, cards, lending, and consumer protection.',
        'Strong analytical, investigative, documentation, ownership, and leadership skills.',
      ],
      niceToHave: [
        'Experience with SWIFT, correspondent banking, AMEX, MasterCard, Visa, Interac, real-time payments, blockchain, open banking, or the Retail Payments Activity Act.',
      ],
      benefits: sharedBenefitsEn,
    },
    {
      title: 'Front-end (Web) Engineer',
      meta: 'Technology · Remote',
      about:
        'The Technology Department builds financial products from the ground up for SMBs worldwide. This role owns client-facing and internal web assets, turning user and business needs into functional, responsive front-end experiences.',
      responsibilities: [
        'Lead the web application lifecycle from concept to delivery and post-launch support.',
        'Design, build, test, debug, and maintain client-facing and internal web assets.',
        'Collaborate with internal teams on wireframes, prototypes, mockups, product enhancements, and new features.',
        'Translate user and business needs into front-end design and code using JavaScript, HTML, and CSS.',
      ],
      requirements: [
        'Bachelor’s degree or above in Computer Science, Engineering, Mathematics, Physics, Statistics, or related field.',
        'Strong experience with JavaScript, CSS, HTML5, and frameworks such as React, Angular, Vue, TypeScript, GraphQL, or equivalents.',
        'Hands-on REST API integration experience and comfort working closely with backend engineers.',
        'Experience with UI/UX projects, GitHub PR review, and cloud tooling such as AWS, Docker, Kubernetes, JenkinsX, or Datadog APM.',
      ],
      niceToHave: [
        'Payment network knowledge, enterprise dashboard experience, or backend experience with Java, Kotlin, Spring, or Spring Boot.',
      ],
      benefits: sharedBenefitsEn,
    },
    {
      title: 'Full Stack Engineer',
      meta: 'Technology · Remote',
      about:
        'We are looking for a Full Stack Engineer who enjoys learning new skills, experimenting with new methods, and building advanced financial products across front-end and backend systems.',
      responsibilities: [
        'Integrate front-end and backend aspects of the application hands-on.',
        'Write maintainable, testable, performant software and reusable libraries.',
        'Participate in code reviews and extensive testing to ensure software quality.',
        'Implement secure services, including OAuth, Single Sign-On, data security processes, and clear technical documentation.',
      ],
      requirements: [
        'Bachelor’s degree or above in Computer Science, Engineering, Mathematics, Physics, Statistics, or related field.',
        '5+ years of software development experience.',
        'Experience with JavaScript, CSS, HTML5, React, Angular, Vue, TypeScript, GraphQL, Java, Kotlin, Spring Boot, Ruby, NodeJS, or equivalents.',
        'Experience with REST APIs, TDD, BDD, contract testing, Redis, SQL, large databases, CI/CD, Docker, Kubernetes, GitHub, AWS, Jenkins X, or Datadog APM.',
      ],
      niceToHave: [
        'Payment network knowledge, strong UI/UX instincts, quality mindset, and complex enterprise dashboard experience.',
      ],
      benefits: sharedBenefitsEn,
    },
    {
      title: 'Head of Engineering',
      meta: 'Technology Leadership · Remote',
      about:
        'The Head of Engineering blends technical oversight with people leadership, building exceptional engineering teams and collaborating closely with Product Owners and Business Heads.',
      responsibilities: [
        'Own product development and platform architecture with a focus on quality control and code optimization.',
        'Influence best practices, standard operating procedures, manuals, and engineering standards across the company.',
        'Optimize and review team performance to improve engineering quality as a functional leader.',
        'Actively participate in hiring and scaling the engineering team.',
      ],
      requirements: [
        'Bachelor’s degree or above in Computer Science, Engineering, Mathematics, Physics, Statistics, or related field.',
        '5+ years of software engineering experience, including low-latency distributed systems.',
        'Experience building and scaling high-achieving engineering teams, with 1+ years managing and mentoring developers.',
        'Hands-on front-end, backend, REST API, testing, Redis, SQL, DevOps, GitHub, cloud, and observability tooling experience.',
      ],
      niceToHave: [
        'Payment network knowledge, a GitHub account with meaningful projects, or HashMap experience.',
      ],
      benefits: sharedBenefitsEn,
    },
    {
      title: 'Partner Onboarding Associate',
      meta: 'Operations · Remote',
      about:
        'The Partner Onboarding Associate helps build trading and operational relationships with global banking, payment, and trading partners, coordinating internal teams and preparing onboarding documents.',
      responsibilities: [
        'Manage the end-to-end onboarding process and securely process corporate and personal confidential information.',
        'Collaborate with internal teams to streamline onboarding, track account progress, and address complex cases.',
        'Help build global banking systems and payment connections in a dynamic fintech environment.',
      ],
      requirements: [
        '0-3 years of experience in client onboarding, KYC-focused roles, or related fields; fresh graduates are welcome.',
        'Fluency in English and Mandarin, including reading, writing, and speaking.',
        'Detail-oriented mindset, strong follow-up, problem-solving, prioritization, multitasking, and pressure-management skills.',
      ],
      niceToHave: [],
      benefits: sharedBenefitsEn,
    },
    {
      title: 'Sr. User Experience Designer',
      meta: 'Design · Remote',
      about:
        'This role leads UX design for upcoming digital products across payment systems and Web3 user journeys, connecting digital assets with real-world usage in secure, compliant, and engaging ways.',
      responsibilities: [
        'Create wireframes, prototypes, user flows, journey maps, and mockups across mobile and web platforms.',
        'Design payment experiences for virtual accounts, stablecoin checkout, crypto on/off-ramp flows, staking dashboards, and transaction monitoring.',
        'Partner with engineering, product, business, marketing, compliance, and vendor stakeholders to deliver polished design solutions.',
        'Develop and maintain YASBe’s design system and drive Web3 experiences such as wallet integration, KYC/KYT, rewards dashboards, and token utility flows.',
      ],
      requirements: [
        '5+ years of UX/UI/Product design experience with design systems and responsive web principles.',
        'Proven fintech, payment, digital wallet, checkout, OTC trading, or financial application design experience.',
        'Strong familiarity with Web3 product design, including stablecoin ramps, crypto OTC trading, wallet integration, blockchain transactions, and tokenomics UX.',
        'Excellent communication skills and experience leading 0-to-1 product launches or large-scale UX projects.',
      ],
      niceToHave: [],
      benefits: sharedBenefitsEn,
    },
    {
      title: 'Marketing Manager — YASBe Social & Community Incubator',
      meta: 'Growth · Remote',
      about:
        'YASBe is seeking a Marketing Manager to scale our global social media presence and community ecosystem across X, LinkedIn, TikTok, and YouTube around PayFi, stablecoins, payments, and digital finance.',
      responsibilities: [
        'Own social media strategy, content calendars, campaigns, product updates, and thought leadership.',
        'Create short-form posts, articles, explainers, video scripts, and YouTube content that make fintech and crypto concepts engaging.',
        'Build and manage YASBe’s global community ecosystem through campaigns, user interaction, feedback, trust, and advocacy.',
        'Plan product launches, partnership announcements, referral programs, influencer/KOL collaborations, and community-led campaigns.',
      ],
      requirements: [
        'Strong passion for marketing, community building, user engagement, and storytelling.',
        'Interest in Web3, crypto, fintech, PayFi, cross-border payments, and digital assets.',
        'Active use of X, LinkedIn, TikTok, and YouTube, with content trend awareness and audience intuition.',
        'Native English speaker; Chinese is a plus. Self-driven, hands-on, curious, and fast to execute and iterate.',
      ],
      niceToHave: [
        'Creativity, execution, curiosity, energy, and ownership matter more than credentials or titles.',
      ],
      benefits: sharedBenefitsEn,
    },
    {
      title: 'Product Director - Payment & Banking',
      meta: 'Product · Remote',
      about:
        'This role owns payment and banking product initiatives from inception through execution, collaborating with engineering, design, analytics, marketing, and cross-functional teams to ship remarkable products.',
      responsibilities: [
        'Create, maintain, and communicate roadmap, milestones, and dependencies aligned with strategic priorities.',
        'Define features, write product specifications, run user studies, iterate on feedback, review QA plans, manage backlog, and ship timely product releases.',
        'Interview customers, prioritize initiatives, weigh tradeoffs, and represent the team across cross-functional communications.',
        'Track market dynamics and deliver best-in-class money movement and transfer experiences with bank, fintech, and wallet partners.',
      ],
      requirements: [
        '5+ years of fintech product management experience; international payment systems and cash clearing network knowledge is a major advantage.',
        'Strong API aptitude and ability to translate technical behavior into user stories.',
        'Experience across fintech, crypto, digital asset exchanges, traditional finance, settlement flows, and customer-facing products.',
        'Leadership, ownership, stakeholder management, humility, and ability to collaborate with design, engineering, QA, marketing, compliance, and growth teams.',
      ],
      niceToHave: [],
      benefits: sharedBenefitsEn,
    },
    {
      title: 'Social Media & Community Manager',
      meta: 'Growth / Community · Remote / USA',
      about:
        'YASBe is building global payments infrastructure powered by stablecoins, AI routing, and Web3 rails. We need someone who lives online, understands Web3 culture, and can turn product ideas into conversations across social and community channels.',
      responsibilities: [
        'Run YASBe channels across X, LinkedIn, Instagram, YouTube, Telegram, and Discord.',
        'Plan content calendars, ship daily and weekly content, and adapt tone per platform.',
        'Moderate community spaces, answer questions, route issues, collect feedback, and help turn users into advocates.',
        'Write posts, threads, announcements, captions, scripts, and snackable content from decks, blogs, and whitepapers.',
      ],
      requirements: [
        'Fluent English and knowledge of Web3, payments, and banking.',
        'Hands-on social media or community experience in Web3, crypto, or fintech.',
        'Strong writing skills, familiarity with X, Telegram, Discord, and crypto/Web3 ecosystem basics.',
        'High ownership mindset and comfort with fast-moving chats, time zones, and compliance-sensitive messaging.',
      ],
      niceToHave: [
        'Experience with Canva, Notion, Buffer, Notebook, Kimi, Manus, Photoshop, Hootsuite, or coordinating design, product, commercial, and video teams.',
      ],
      benefits: [
        'Competitive salary and fast career advancement',
        'Travel opportunities to global events in the US and Europe',
        'Direct work with founders and the core team',
        'High autonomy, high trust, and a front-row seat to the future of payments and Web3',
      ],
    },
    {
      title: 'Web3 Payment Operations Specialist',
      meta: 'Operations · Remote',
      about:
        'This role oversees day-to-day payment operations, monitors transaction flows, reconciles accounts, resolves exceptions, mitigates risk, and partners with banks, payment companies, crypto liquidity providers, and internal teams.',
      responsibilities: [
        'Monitor payment service providers and crypto liquidity providers so client orders and funds are processed and posted on time.',
        'Respond to RFIs, own operational processes, maintain accuracy and controls, and identify risks.',
        'Improve workflows, introduce frameworks, and enhance operational efficiency and scalability.',
        'Investigate reconciliation, tracing, exception handling, chargebacks, disputes, and provide transaction data analysis.',
      ],
      requirements: [
        '2-5 years of operations experience in banking, payments, fintech, or crypto exchange.',
        'Strong analytical mindset and ability to present insights clearly.',
        'Solid understanding of payment processes such as SWIFT cross-border payments and stablecoin on/off-ramp flows.',
        'Proficiency in Mandarin and English, high integrity, cross-functional collaboration, and strong problem-solving skills.',
      ],
      niceToHave: [],
      benefits: sharedBenefitsEn,
    },
  ],
  zh: [
    {
      title: '支付合规经理',
      meta: '合规 · 远程',
      about: '负责搭建并运营 YASBe 的合规能力，确保产品、流程和消费者保护实践符合监管要求。这是一个非常实战的岗位，需要为业务提供合规要求、控制措施和监管沟通支持。',
      responsibilities: ['制定并执行 AML/CTF 政策、规则手册和操作指南。', '跟进 FINTRAC、Bank of Canada 等监管要求变化，并协调内部落地。', '维护 AML 合规管理框架、测试计划、内部控制、监管清单和培训材料。', '负责客户筛查、开户审核、监管报告、管理层汇报和合规路线图执行。'],
      requirements: ['5 年以上金融服务、监管机构或政府部门合规/风控/审计经验。', '有合规负责人、合规官、MLRO 或类似岗位经验。', '具备 ACAMS 认证，熟悉 AML/CTF、跨境支付、汇款、卡、信贷和消费者保护监管。', '具备细致的文档能力、研究调查能力、项目 ownership 和领导力。'],
      niceToHave: ['了解 SWIFT、代理行、卡组织、Interac、实时支付、区块链、开放银行或加拿大 Retail Payments Activity Act。'],
      benefits: sharedBenefitsZh,
    },
    {
      title: '前端（Web）工程师',
      meta: '技术 · 远程',
      about: '技术团队从 0 到 1 构建面向全球 SMB 的金融产品。前端工程师负责客户侧和内部 Web 资产，将用户需求和业务需求转化为可靠、易用、响应式的前端体验。',
      responsibilities: ['负责 Web 应用从概念、交付到上线后支持的完整生命周期。', '设计、开发、测试、调试并维护客户侧和内部 Web 产品。', '与团队协作完成线框图、原型、功能增强和新产品设计。', '使用 JavaScript、HTML、CSS 将需求转化为前端设计和代码。'],
      requirements: ['计算机、工程、数学、物理、统计等相关专业本科及以上。', '熟悉 JavaScript、CSS、HTML5，以及 React、Angular、Vue、TypeScript、GraphQL 等技术。', '具备 REST API 对接经验，能与后端工程师协同。', '有 UI/UX 项目、GitHub PR 流程和 AWS、Docker、Kubernetes、JenkinsX、Datadog APM 等工具经验。'],
      niceToHave: ['了解支付网络、大型企业级 Dashboard，或具备 Java、Kotlin、Spring / Spring Boot 后端经验。'],
      benefits: sharedBenefitsZh,
    },
    {
      title: '全栈工程师',
      meta: '技术 · 远程',
      about: '负责前后端系统集成和平台核心能力建设，适合主动学习、愿意探索新技术并解决复杂问题的工程师。',
      responsibilities: ['负责应用前端与后端的集成开发。', '编写可维护、可测试、高性能的软件和可复用代码库。', '参与代码评审和充分测试，确保软件质量。', '实现 OAuth、单点登录、数据安全流程，并维护清晰技术文档。'],
      requirements: ['计算机、工程、数学、物理、统计等相关专业本科及以上。', '5 年以上软件开发经验。', '熟悉 JavaScript、CSS、HTML5、React、Angular、Vue、TypeScript、GraphQL、Java、Kotlin、Spring Boot、Ruby、NodeJS 等。', '具备 REST API、TDD/BDD、契约测试、Redis、SQL、大型数据库、CI/CD、Docker、Kubernetes、GitHub、AWS 等经验。'],
      niceToHave: ['了解支付网络，关注质量、设计和用户体验，有复杂企业级 Dashboard 经验。'],
      benefits: sharedBenefitsZh,
    },
    {
      title: '工程负责人',
      meta: '技术管理 · 远程',
      about: '负责建设高水平工程团队，将技术架构、质量控制、团队管理和跨部门协作结合起来，与产品和业务负责人共同推动关键项目。',
      responsibilities: ['负责产品开发和平台架构，重点关注质量控制和代码优化。', '建立最佳实践、SOP、手册和工程标准。', '作为职能负责人优化团队表现，提高工程质量。', '深度参与招聘和团队扩张。'],
      requirements: ['计算机、工程、数学、物理、统计等相关专业本科及以上。', '5 年以上软件工程经验，熟悉低延迟和分布式系统。', '有搭建和扩展高绩效工程团队经验，至少 1 年团队管理或 mentor 经验。', '具备前端、后端、REST API、测试、Redis、SQL、DevOps、GitHub、云服务和可观测性工具经验。'],
      niceToHave: ['了解支付网络，有优秀 GitHub 项目或 HashMap 相关经验。'],
      benefits: sharedBenefitsZh,
    },
    {
      title: '合作伙伴导入专员',
      meta: '运营 · 远程',
      about: '负责与全球银行、支付服务商和交易伙伴建立合作关系，协调内部团队准备导入资料，并与全球合作伙伴保持高效沟通。',
      responsibilities: ['管理端到端 onboarding 流程，安全高效处理企业和个人敏感信息。', '协同内部团队优化流程，主动跟进账户进度并解决复杂案例。', '参与搭建全球银行系统和支付连接，支持公司战略。'],
      requirements: ['0-3 年客户导入、KYC 或相关经验，应届毕业生也可申请。', '英文和中文听说读写流利。', '细致负责，具备跟进、问题解决、任务评估、优先级管理、多任务处理和抗压能力。'],
      niceToHave: [],
      benefits: sharedBenefitsZh,
    },
    {
      title: '高级用户体验设计师',
      meta: '设计 · 远程',
      about: '负责领导公司核心系统的用户体验设计，与业务、市场、合规和开发团队协作，提供创新且直观的设计方案，重点关注无缝支付系统和 Web3 用户体验。',
      responsibilities: ['创建线框图、交互原型、用户流程图和设计稿。', '设计虚拟账户、稳定币收单、加密货币出入金、质押面板和交易监控等支付体验。', '推动钱包集成、KYC/KYT、质押与奖励面板、代币应用流程等 Web3 场景体验。', '与开发、产品、合规和外部伙伴协作，确保设计高质量落地并维护 YASBe 设计系统。'],
      requirements: ['5 年以上 UX/UI/产品设计经验，深刻理解 Web 设计原则、设计系统和响应式设计。', '具备支付系统、金融应用或金融科技平台设计经验。', '熟悉 Web3 产品设计，包括出入金、钱包集成、区块链交易和代币经济相关体验。', '有独立主导 0 到 1 产品设计或大型 UX 项目经验者优先。'],
      niceToHave: [],
      benefits: sharedBenefitsZh,
    },
    {
      title: '市场经理 - YASBe 社交与社区孵化',
      meta: '增长 · 远程',
      about: '负责扩大 YASBe 在 X、LinkedIn、TikTok、YouTube 等平台的全球社交媒体影响力和社区生态，围绕 PayFi、稳定币、支付和数字金融建立品牌叙事。',
      responsibilities: ['负责社交媒体策略、内容日历、活动、产品更新和思想领导力内容。', '创作短帖、长文、解释型内容、视频脚本和 YouTube 内容。', '建设并管理全球社区，提升用户互动、反馈、信任和长期倡导。', '策划产品发布、合作公告、推荐计划、KOL 合作和社区驱动活动。'],
      requirements: ['热爱市场、社区建设、用户互动和故事表达。', '对 Web3、加密、金融科技、PayFi、跨境支付和数字资产有兴趣。', '熟悉 X、LinkedIn、TikTok、YouTube 的内容趋势和用户行为。', '英语表达能力强，中文为加分项；自驱、动手能力强，能快速测试和迭代。'],
      niceToHave: ['相比履历，我们更看重创造力、执行力、好奇心、能量和 ownership。'],
      benefits: sharedBenefitsZh,
    },
    {
      title: '支付与银行产品总监',
      meta: '产品 · 远程',
      about: '负责支付与银行相关产品从构想到落地的全流程，和工程、设计、数据、市场等跨职能团队合作，打造卓越的钱流和转账产品体验。',
      responsibilities: ['制定、维护并沟通产品路线图、里程碑和依赖关系。', '定义功能、编写产品规格、进行用户研究、迭代反馈、评审 QA 计划、管理 backlog 并按时交付。', '访谈客户、建立用户同理心、权衡优先级并代表团队跨部门沟通。', '持续跟踪市场动态，打造领先的钱流、银行、钱包和支付伙伴接入能力。'],
      requirements: ['5 年以上金融科技产品管理经验，熟悉国际支付系统和清算网络优先。', '理解技术 API，并能转化为用户故事和产品影响。', '具备金融科技、加密、数字资产交易所、传统金融和结算流程经验。', '具备领导力、ownership、C 级 stakeholder 沟通能力，并能与设计、工程、QA、市场、合规和增长团队协作。'],
      niceToHave: [],
      benefits: sharedBenefitsZh,
    },
    {
      title: '社交媒体与社区经理',
      meta: '增长 / 社区 · 远程 / 美国',
      about: 'YASBe 正在建设由稳定币、AI routing 和 Web3 rails 支撑的全球支付基础设施。我们需要熟悉线上社区和 Web3 文化的人，把产品、观点和时刻转化为社交平台上的真实对话。',
      responsibilities: ['运营 X、LinkedIn、Instagram、YouTube、Telegram 和 Discord 等渠道。', '制定内容日历，持续发布日常和每周内容，并根据平台调整语气。', '管理社区、回答问题、分流反馈，把用户转化为贡献者和倡导者。', '撰写帖子、长帖、公告、文案、脚本，并将长内容转化为易传播的短内容。'],
      requirements: ['英语流利，了解 Web3、支付和银行领域。', '有 Web3、加密或金融科技社交媒体/社区运营经验。', '写作能力强，熟悉 X、Telegram、Discord 和加密/Web3 基础生态。', '高 ownership，适应快速聊天、多时区和合规敏感表达。'],
      niceToHave: ['熟悉 Canva、Notion、Buffer、Notebook、Kimi、Manus、Photoshop、Hootsuite，或能协调设计、产品、商务和视频团队。'],
      benefits: ['有竞争力薪资和快速晋升通道', '有机会参加美国和欧洲全球行业活动', '直接与创始人和核心团队协作', '高自主、高信任，站在支付与 Web3 未来的前排'],
    },
    {
      title: 'Web3 支付运营专员',
      meta: '运营 · 远程',
      about: '负责日常支付运营，包括管理交易流程、账户对账、异常处理和风险控制，并与合规团队、银行、支付公司、加密货币流动性提供商等合作伙伴紧密协作。',
      responsibilities: ['管理支付服务提供商和加密货币流动性提供商，确保客户订单及时处理、资金及时入账。', '及时回复银行调单 RFI，保证交易流程顺畅，并负责运营流程准确性和风控。', '持续改进工作流程，引入框架和 SOP 以提升效率和扩展性。', '处理对账、资金追踪、异常、拒付、争议，并提供交易数据分析和报告支持。'],
      requirements: ['2-5 年银行、支付公司、金融科技或加密货币交易所运营经验。', '具备较强分析能力，理解 SWIFT 跨境支付和稳定币出入金流程。', '精通中文和英文，具备优秀书面和口头沟通能力。', '诚信透明，适应跨部门、快节奏、国际化环境，并能高效解决复杂支付问题。'],
      niceToHave: [],
      benefits: sharedBenefitsZh,
    },
  ],
}

export function getCareersQuestions(locale) {
  return locale?.startsWith('zh') ? careersContent.zh : careersContent.en
}
