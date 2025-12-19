import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      transition: 'page-rise',
      title: 'Community-Led Rural Development Initiatives | Sustainable Village Transformation Programs',
      description:
        "Explore NeoRural Development's flagship community-led rural development initiatives for sustainable village transformation. Discover water security solutions for rural communities in India, climate-resilient village infrastructure development programs, and participatory rural development approaches that transform villages through sustainable agriculture development programs in rural villages.",
      keywords:
        'community-led rural development initiatives, sustainable village development programs, water security solutions for rural communities, rural infrastructure development projects, community-based rural transformation programs, sustainable agriculture development in villages, rural livelihood improvement programs, climate-resilient village infrastructure',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      transition: 'page-zoom',
      title: 'About NeoRural Development | Partners in Community-Led Rural Development & Village Transformation',
      description:
        'Learn how to partner with rural development NGO for village transformation. Discover our participatory rural development approach explained, community-led sustainable development methodology, and regenerative village development models and frameworks for sustainable village programs.',
      keywords:
        'about rural development NGO, participatory rural development approach, community-led sustainable development, village development programs, rural development partners, sustainable village transformation, regenerative village development models',
    },
  },
  {
    path: '/initiatives',
    name: 'initiatives',
    component: () => import('../views/InitiativesView.vue'),
    meta: {
      transition: 'page-slide',
      title: 'Rural Development Initiatives | Water Security, Livelihoods & Infrastructure Programs',
      description:
        "Browse NeoRural's portfolio featuring water security solutions for rural communities implementation, village water management systems design and implementation, sustainable agriculture development programs in villages, rural digital infrastructure development projects, and climate smart agriculture programs for rural communities.",
      keywords:
        'rural development initiatives, water security solutions for rural communities, village water management systems, sustainable agriculture development in villages, rural digital infrastructure development, climate smart agriculture programs, village digital commons, resilient water networks, rural livelihood improvement programs',
    },
  },
  {
    path: '/impact',
    name: 'impact',
    component: () => import('../views/ImpactView.vue'),
    meta: {
      transition: 'page-shift',
      title: 'Impact Metrics | Measurable Outcomes from Community-Led Rural Development Programs',
      description:
        "See measurable outcomes from community-led rural development programs. Explore village development program impact metrics and results, sustainable rural development impact assessment, and rural transformation success stories and case studies showcasing community-led development results.",
      keywords:
        'rural development impact metrics, village development program outcomes, community-led development results, sustainable rural development impact, rural transformation success stories, village development program impact, rural development NGO impact',
    },
  },
  {
    path: '/stories',
    name: 'stories',
    component: () => import('../views/StoriesView.vue'),
    meta: {
      transition: 'page-fade',
      title: 'Success Stories | Community-Led Rural Development in Action Across Villages',
      description:
        "Read real-world examples of sustainable village transformation and community-led rural development success stories from India. Discover village transformation stories through participatory development, rural development case studies with measurable impact, and sustainable village development examples and testimonials.",
      keywords:
        'rural development success stories, village transformation stories, community-led development case studies, sustainable village development examples, rural development success stories India, village development program stories, rural transformation testimonials',
    },
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('../views/GalleryView.vue'),
    meta: {
      transition: 'page-rise',
      title: 'Gallery | Visual Stories of Community-Led Rural Development Initiatives & Village Transformation',
      description:
        "Browse a visual gallery of NeoRural Development's on-ground community-led rural development initiatives, sustainable village transformation projects, water security solutions implementation, and community meetings showcasing participatory rural development in action.",
      keywords:
        'rural development initiative photos, village transformation gallery, community-led development images, sustainable village development photos, water security project images, rural infrastructure development gallery, participatory rural development visuals, village development program photos',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      transition: 'page-zoom',
      title: 'Contact NeoRural Development | Partner on Rural Development Initiatives & Village Programs',
      description:
        'Learn how to partner with rural development organization for sustainable village programs. Explore CSR partnerships for sustainable village development programs, funding opportunities for rural development initiatives, and collaborate on community-led rural development projects.',
      keywords:
        'contact rural development NGO, partner with rural development organization, CSR partnerships rural development, village development program partnership, rural development collaboration, sustainable village development partnership, rural development funding opportunities',
    },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogView.vue'),
    meta: {
      transition: 'page-rise',
      title: 'Rural Development Blog | Insights on Community-Led Village Transformation Programs',
      description:
        "Explore NeoRural Development's blog for perspectives, frameworks and field notes on community-led rural development initiatives. Learn about sustainable village development, water security solutions, and participatory rural development approaches.",
      keywords:
        'rural development blog, village development articles, sustainable rural development insights, community-led development blog, rural transformation articles, village development program insights, rural development best practices',
    },
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: () => import('../views/BlogDetailView.vue'),
    meta: {
      transition: 'page-fade',
      title: 'Rural Development Article | Community-Led Village Transformation Insights',
      description:
        'Read an in-depth article from NeoRural Development on community-led rural development initiatives, sustainable village transformation, water security solutions, and participatory rural development approaches.',
      keywords:
        'rural development article, village transformation article, community-led development insights, sustainable rural development case study, village development program article, rural development best practices',
    },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/PrivacyView.vue'),
    meta: {
      transition: 'page-fade',
      title: 'Privacy Policy | NeoRural Development - Rural Development NGO',
      description:
        "Read NeoRural Development's privacy policy covering how we handle personal data for partners in our community-led rural development initiatives and sustainable village transformation programs.",
      keywords: 'rural development NGO privacy policy, village development program privacy, community development privacy',
    },
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../views/TermsView.vue'),
    meta: {
      transition: 'page-fade',
      title: 'Terms of Service | NeoRural Development - Rural Development Organization',
      description:
        "Review the terms and conditions for using NeoRural Development's website and engaging with our community-led rural development initiatives, sustainable village transformation programs, and rural development partnerships.",
      keywords: 'rural development NGO terms, village development program terms, community development terms of service',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    // Use saved position if available (browser back/forward)
    if (savedPosition) {
      return savedPosition;
    }
    // Smooth scroll to top for new routes
    return { top: 0, behavior: 'smooth' };
  },
  routes,
});

// Performance: Optimize route loading - don't block navigation
router.beforeEach((to, from, next) => {
  // Allow navigation immediately, components load asynchronously
  next();
});

export default router;
