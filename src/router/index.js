import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { transition: 'page-rise' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { transition: 'page-zoom' },
  },
  {
    path: '/initiatives',
    name: 'initiatives',
    component: () => import('../views/InitiativesView.vue'),
    meta: { transition: 'page-slide' },
  },
  {
    path: '/impact',
    name: 'impact',
    component: () => import('../views/ImpactView.vue'),
    meta: { transition: 'page-shift' },
  },
  {
    path: '/stories',
    name: 'stories',
    component: () => import('../views/StoriesView.vue'),
    meta: { transition: 'page-fade' },
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('../views/GalleryView.vue'),
    meta: { transition: 'page-rise' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: { transition: 'page-zoom' },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogView.vue'),
    meta: { transition: 'page-rise' },
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: () => import('../views/BlogDetailView.vue'),
    meta: { transition: 'page-fade' },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/PrivacyView.vue'),
    meta: { transition: 'page-fade' },
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../views/TermsView.vue'),
    meta: { transition: 'page-fade' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
  routes,
});

export default router;
