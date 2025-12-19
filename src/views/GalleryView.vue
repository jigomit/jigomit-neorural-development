<template>
  <section class="page gallery-view">
    <div class="page-heading" ref="headingRef">
      <p class="eyebrow">Gallery</p>
      <h1>Visual narratives from rural communities on the rise.</h1>
      <p>
        Browse visual stories of community-led rural development initiatives, sustainable village transformation projects, water security solutions implementation, and community meetings showcasing participatory rural development in action.
      </p>
    </div>
    <div class="gallery-mosaic" ref="gridRef">
      <figure v-for="shot in shots" :key="shot.alt" class="mosaic-item">
        <div class="mosaic-frame">
          <img 
            :src="shot.src" 
            :alt="shot.alt"
            width="1600"
            height="1000"
            loading="lazy"
            decoding="async"
            style="width: 100%; height: 100%; object-fit: cover;"
          />
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
    alt: 'Community-led rural development initiatives protecting native forest corridors through sustainable village transformation',
    caption: 'Community rangers protecting native corridors.',
  },
  {
    src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=90',
    alt: 'Climate smart agriculture programs for rural communities with solar irrigation systems',
    caption: 'Climate-smart fields with solar irrigation.',
  },
  {
    src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=90',
    alt: 'Rural digital infrastructure development projects with village digital commons maker labs',
    caption: 'Youth building digital fabrication prototypes.',
  },
  {
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=90',
    alt: 'Village digital commons for rural connectivity with telehealth and education services',
    caption: 'Telehealth + education pods in the commons.',
  },
  {
    src: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1600&q=90',
    alt: 'Rural livelihood improvement programs through community participation with women-led cooperatives',
    caption: 'Women-led cooperatives distributing produce.',
  },
  {
    src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=90',
    alt: 'Participatory rural development approach in action with co-creation workshops',
    caption: 'Co-creation sprint with artisans and architects.',
  },
];

onMounted(() => {
  animateIn(headingRef.value);
  animateIn(gridRef.value, { delay: 0.2 });
});
</script>
