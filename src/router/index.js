import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      transition: 'page-rise',
      title: 'NeoRural Development | Community-led rural development initiatives',
      description:
        'Explore NeoRural Development’s flagship community-led rural development initiatives improving livelihoods, water security and climate resilience.',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      transition: 'page-zoom',
      title: 'About NeoRural Development | Partners in community-led rural development',
      description:
        'Learn how NeoRural Development partners with villages to co-design community-led rural development initiatives rooted in lived experience.',
    },
  },
  {
    path: '/initiatives',
    name: 'initiatives',
    component: () => import('../views/InitiativesView.vue'),
    meta: {
      transition: 'page-slide',
      title: 'Rural development initiatives | Water, livelihoods & infrastructure',
      description:
        'Browse NeoRural’s portfolio of community-led rural development initiatives focused on water conservation, livelihoods, health and village infrastructure.',
    },
  },
  {
    path: '/impact',
    name: 'impact',
    component: () => import('../views/ImpactView.vue'),
    meta: {
      transition: 'page-shift',
      title: 'Impact | Measurable outcomes from community-led rural development',
      description:
        'See the impact metrics and stories behind NeoRural Development’s community-led rural development initiatives across villages.',
    },
  },
  {
    path: '/stories',
    name: 'stories',
    component: () => import('../views/StoriesView.vue'),
    meta: {
      transition: 'page-fade',
      title: 'Stories from the field | Community-led rural development in action',
      description:
        'Read stories from communities and partners where NeoRural’s community-led rural development initiatives are transforming daily life.',
    },
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('../views/GalleryView.vue'),
    meta: {
      transition: 'page-rise',
      title: 'Gallery | Visual stories of rural development initiatives',
      description:
        'Browse a visual gallery of NeoRural Development’s on-ground rural development initiatives, community meetings and project sites.',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      transition: 'page-zoom',
      title: 'Contact NeoRural Development | Partner on rural development initiatives',
      description:
        'Reach out to NeoRural Development to collaborate on community-led rural development initiatives, CSR partnerships and rural programs.',
    },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogView.vue'),
    meta: {
      transition: 'page-rise',
      title: 'Insights blog | Community-led rural development perspectives',
      description:
        'Explore NeoRural Development’s blog for perspectives, frameworks and field notes on community-led rural development initiatives.',
    },
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: () => import('../views/BlogDetailView.vue'),
    meta: {
      transition: 'page-fade',
      title: 'NeoRural blog | Community-led rural development article',
      description:
        'Read an in-depth article from NeoRural Development on a specific aspect of community-led rural development initiatives.',
    },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/PrivacyView.vue'),
    meta: {
      transition: 'page-fade',
      title: 'Privacy Policy | NeoRural Development',
      description:
        'Read NeoRural Development’s privacy policy covering how we handle personal data for partners in our rural development initiatives.',
    },
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../views/TermsView.vue'),
    meta: {
      transition: 'page-fade',
      title: 'Terms of Service | NeoRural Development',
      description:
        'Review the terms and conditions for using NeoRural Development’s website and engaging with our community-led rural development initiatives.',
    },
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
