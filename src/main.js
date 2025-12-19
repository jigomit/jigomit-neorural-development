import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// Performance: CSS import - Vite will bundle it, but critical CSS is already inlined in index.html
import '@/assets/main.css';
import { useSEO } from './composables/useSEO';

const DEFAULT_TITLE = 'NeoRural Development | Community-Led Rural Development Initiatives for Sustainable Village Transformation';
const DEFAULT_DESCRIPTION =
  'NeoRural Development designs and scales community-led rural development initiatives that improve livelihoods, water security and village infrastructure. Partner with us for sustainable village transformation programs, water security solutions for rural communities, and climate-resilient village infrastructure development.';
const DEFAULT_KEYWORDS =
  'community-led rural development initiatives, sustainable village development programs, water security solutions for rural communities, rural infrastructure development projects, community-based rural transformation programs, sustainable agriculture development in villages, rural livelihood improvement programs, climate-resilient village infrastructure, participatory rural development approach, regenerative village development models';

// Update this to your actual domain
const BASE_URL = import.meta.env.VITE_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://neorural.dev');

function updateMetaTag(name, content, isProperty = false) {
  if (!content) return;
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    if (isProperty) {
      tag.setAttribute('property', name);
    } else {
      tag.setAttribute('name', name);
    }
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function updateLinkTag(rel, href) {
  if (!href) return;
  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

router.afterEach((to) => {
  const title = to.meta?.title || DEFAULT_TITLE;
  const description = to.meta?.description || DEFAULT_DESCRIPTION;
  const keywords = to.meta?.keywords || DEFAULT_KEYWORDS;
  const canonical = BASE_URL + to.fullPath;
  const image = to.meta?.image || `${BASE_URL}/logo.png`;

  // Update title
  document.title = title;

  // Update meta tags
  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords);
  updateMetaTag('author', 'NeoRural Development');
  updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  
  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', title);
  updateMetaTag('twitter:description', description);
  updateMetaTag('twitter:image', image);
  updateMetaTag('twitter:site', '@neoruraldev');
  updateMetaTag('twitter:creator', '@neoruraldev');

  // Open Graph tags
  updateMetaTag('og:type', 'website', true);
  updateMetaTag('og:title', title, true);
  updateMetaTag('og:description', description, true);
  updateMetaTag('og:url', canonical, true);
  updateMetaTag('og:image', image, true);
  updateMetaTag('og:image:width', '1200', true);
  updateMetaTag('og:image:height', '630', true);
  updateMetaTag('og:site_name', 'NeoRural Development', true);
  updateMetaTag('og:locale', 'en_US', true);

  // Update canonical URL
  updateLinkTag('canonical', canonical);

  // Update language attribute
  document.documentElement.lang = 'en';
});

const app = createApp(App);
app.use(router);

// Initialize SEO on app mount
app.mount('#app');

// Initialize SEO composable after mount
router.isReady().then(() => {
  // SEO will be initialized in App.vue
});
