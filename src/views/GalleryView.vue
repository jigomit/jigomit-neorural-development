<template>
  <section class="page gallery-view">
    <div class="page-heading" ref="headingRef">
      <p class="eyebrow">Gallery</p>
      <h1>Visual narratives from rural communities on the rise.</h1>
    </div>
    <div class="gallery-mosaic" ref="gridRef">
      <figure v-for="shot in shots" :key="shot.alt" class="mosaic-item">
        <div class="mosaic-frame">
          <img :src="shot.src" :alt="shot.alt" />
        </div>
        <figcaption>
          <h4>{{ shot.alt }}</h4>
          <p>{{ shot.caption }}</p>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { animateIn } from '@/composables/useGsapAnimations';
import premiumPhoto from '@/assets/images/premium_photo-1661964187491-1d04df68c6d6.png';

const headingRef = ref(null);
const gridRef = ref(null);

const shots = [
  {
    src: premiumPhoto,
    alt: 'Forest Guardians',
    caption: 'Community rangers protecting native corridors.',
  },
  {
    src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=90',
    alt: 'Agro Innovation',
    caption: 'Climate-smart fields with solar irrigation.',
  },
  {
    src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=90',
    alt: 'Makers at Work',
    caption: 'Youth building digital fabrication prototypes.',
  },
  {
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=90',
    alt: 'Learning Studio',
    caption: 'Telehealth + education pods in the commons.',
  },
  {
    src: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1600&q=90',
    alt: 'Collective Harvest',
    caption: 'Women-led cooperatives distributing produce.',
  },
  {
    src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=90',
    alt: 'Design Workshop',
    caption: 'Co-creation sprint with artisans and architects.',
  },
];

onMounted(() => {
  animateIn(headingRef.value);
  animateIn(gridRef.value, { delay: 0.2 });
});
</script>
