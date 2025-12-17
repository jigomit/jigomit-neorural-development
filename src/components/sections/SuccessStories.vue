<template>
  <section class="success-stories" id="stories">
    <div class="section-heading" ref="headingRef">
      <p class="eyebrow">Success Stories</p>
      <h2>Villages rewriting their future</h2>
    </div>
    <div class="stories__carousel" ref="carouselRef">
      <article v-for="story in stories" :key="story.title" class="story" :style="{ '--story-cover': `url(${story.image})` }">
        <div class="story__content">
          <p class="eyebrow">{{ story.location }}</p>
          <h3>{{ story.title }}</h3>
          <p>{{ story.description }}</p>
          <div class="story__impact">
            <div v-for="impact in story.impacts" :key="impact.label">
              <span class="value">{{ impact.value }}</span>
              <span class="label">{{ impact.label }}</span>
            </div>
          </div>
          <RouterLink class="ghost" :to="{ name: 'stories' }">Explore story</RouterLink>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { animateIn } from '@/composables/useGsapAnimations';

const headingRef = ref(null);
const carouselRef = ref(null);

const stories = [
  {
    title: 'Circular Agro-Park',
    location: 'Laguna, Philippines',
    description: 'Agro-waste-to-energy system funds scholarships and micro-loans while cutting waste by 92%.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80',
    impacts: [
      { label: 'Jobs created', value: '540' },
      { label: 'CO₂ saved', value: '1.2kt' },
    ],
  },
  {
    title: 'Future Forest Corridor',
    location: 'Sierra Norte, Mexico',
    description: 'Community rangers plant native forests with carbon markets and eco-tourism funding.',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=900&q=80',
    impacts: [
      { label: 'Trees planted', value: '2.1M' },
      { label: 'Green enterprises', value: '64' },
    ],
  },
  {
    title: 'Digital Health Brigades',
    location: 'Mbarara, Uganda',
    description: 'Telemedicine kiosks, drone logistics, and AI triage serving 140 remote villages.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    impacts: [
      { label: 'Clinics equipped', value: '40' },
      { label: 'Response time', value: '-55%' },
    ],
  },
];

onMounted(() => {
  animateIn(headingRef.value);
  animateIn(carouselRef.value, { delay: 0.25 });
});
</script>
