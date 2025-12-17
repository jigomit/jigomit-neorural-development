import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/main.css';

const DEFAULT_TITLE = 'NeoRural Development | Community-led rural development initiatives';
const DEFAULT_DESCRIPTION =
  'NeoRural Development designs and scales community-led rural development initiatives that improve livelihoods, water security and village infrastructure.';

function updateMetaTag(name, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

router.afterEach((to) => {
  const title = to.meta?.title || DEFAULT_TITLE;
  const description = to.meta?.description || DEFAULT_DESCRIPTION;

  document.title = title;
  updateMetaTag('description', description);
  updateMetaTag('twitter:title', title);
  updateMetaTag('twitter:description', description);
});

const app = createApp(App);
app.use(router);
app.mount('#app');
