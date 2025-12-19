<template>
  <section class="page stories-view">
    <div class="stories-hero" ref="heroRef">
      <div>
        <p class="eyebrow">Community Voices</p>
        <h1>Immersive stories of rural regeneration authored by citizens.</h1>
        <p>
          Experience real-world examples of sustainable village transformation. Discover community-led rural development success stories from India, village transformation stories through participatory development, and rural development case studies with measurable impact showcasing sustainable village development examples and testimonials.
        </p>
      </div>
      <div class="story-metrics">
        <div v-for="metric in heroMetrics" :key="metric.label">
          <span class="value">{{ metric.value }}</span>
          <span class="label">{{ metric.label }}</span>
        </div>
      </div>
    </div>

    <div class="stories-grid">
      <article v-for="story in stories" :key="story.title" class="story-card" ref="storyRefs">
        <img 
          :src="story.image" 
          :alt="`${story.title} - Real-world example of sustainable village transformation through community-led rural development success stories from India`"
          width="1200"
          height="800"
          loading="lazy"
          decoding="async"
          style="width: 100%; height: 240px; object-fit: cover; display: block;"
        />
        <div class="story-card__body">
          <p class="eyebrow">{{ story.location }}</p>
          <h2>{{ story.title }}</h2>
          <p>{{ story.description }}</p>
          <ul>
            <li v-for="detail in story.details" :key="detail">{{ detail }}</li>
          </ul>
        </div>
      </article>
    </div>

    <div class="stories-cta" ref="ctaRef">
      <div>
        <p class="eyebrow">Join the movement</p>
        <h2>Bring premium storytelling + program orchestration to your village.</h2>
        <p>
          We co-design narrative studios, live dashboards, and broadcast partnerships so every transformation reaches the world.
        </p>
      </div>
      <RouterLink :to="{ name: 'contact' }" class="primary">Start a Story Sprint</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { animateIn } from '@/composables/useGsapAnimations';

const heroRef = ref(null);
const storyRefs = ref([]);
const ctaRef = ref(null);

const heroMetrics = [
  { label: 'Villages captured', value: '48' },
  { label: 'Story fellows', value: '320' },
  { label: 'Films delivered', value: '138' },
];

const stories = [
  {
    title: 'Solar Agro Cooperative Renaissance',
    location: 'Navapura, Gujarat',
    description: 'Precision irrigation, soil health labs, and circular waste loops tripled incomes within 2 seasons.',
    details: ['Solar irrigation guild', 'AI soil diagnostics', 'Women-led finance council'],
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Artisan Market Linked to Global Buyers',
    location: 'Banepa, Nepal',
    description: 'Slow fashion studios powered by natural dye labs, storytelling residencies, and ethical ecommerce.',
    details: ['Story studio for artisans', 'Blockchain provenance', 'Shared logistics network'],
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Village Innovation Labs for Youth',
    location: 'Kilosa, Tanzania',
    description: 'Pop-up labs teach robotics, regenerative agriculture, and climate entrepreneurship, paired with mentors.',
    details: ['Robotics & agro-tech lab', 'Seed fund challenges', 'Global mentor exchanges'],
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  },
];

onMounted(() => {
  animateIn(heroRef.value);
  storyRefs.value.forEach((el, index) => animateIn(el, { delay: 0.2 * index }));
  animateIn(ctaRef.value, { delay: 0.5 });
});
</script>
