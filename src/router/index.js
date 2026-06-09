import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/bridging-economies',
      name: 'bridging-economies',
      component: () => import('../views/BridgingEconomiesView.vue'),
    },
    {
      path: '/careers',
      name: 'careers',
      component: () => import('../views/CareersView.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
    },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: () => import('../views/BlogDetailView.vue'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue'),
    },
    {
      path: '/news/:slug',
      name: 'news-detail',
      component: () => import('../views/NewsDetailView.vue'),
    },
    {
      path: '/stablecoin-checkout',
      name: 'stablecoin-checkout',
      component: () => import('../views/StablecoinCheckoutView.vue'),
    },
    {
      path: '/virtual-account',
      name: 'virtual-account',
      component: () => import('../views/VirtualAccountView.vue'),
    },
    {
      path: '/global-collection-payout',
      name: 'global-collection-payout',
      component: () => import('../views/GlobalCollectionPayoutView.vue'),
    },
    {
      path: '/institutional-otc',
      name: 'institutional-otc',
      component: () => import('../views/InstitutionalOtcView.vue'),
    },
    {
      path: '/yasbe-card',
      name: 'yasbe-card',
      component: () => import('../views/YasbeCardView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/legal',
      name: 'legal',
      component: () => import('../views/LegalView.vue'),
    },
    {
      path: '/treasury',
      name: 'treasury',
      component: () => import('../views/TreasuryView.vue'),
    },
    {
      path: '/importExport',
      name: 'importExport',
      component: () => import('../views/ImportExport.vue'),
    },
    {
      path: '/servicesPage',
      name: 'servicesPage',
      component: () => import('../views/servicesPage.vue'),
    },
    {
      path: '/vcPage',
      name: 'vcPage',
      component: () => import('../views/vcPage.vue'),
    },
    {
      path: '/cryptoPage',
      name: 'cryptoPage',
      component: () => import('../views/cryptoPage.vue'),
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }

    return { top: 0 }
  },
})

export default router
