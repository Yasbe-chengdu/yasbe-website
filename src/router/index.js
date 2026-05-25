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
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }

    return { top: 0 }
  },
})

export default router
