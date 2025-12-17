<template>
  <section class="gallery" id="gallery">
    <div class="section-heading" ref="headingRef">
      <p class="eyebrow">Gallery</p>
      <h2>Scenes from thriving communities</h2>
    </div>
    <div class="gallery__grid" ref="gridRef">
      <figure v-for="photo in gallery" :key="photo.alt" class="gallery__item" :style="{ backgroundImage: `url(${photo.src})` }">
        <figcaption>
          <p>{{ photo.alt }}</p>
          <span>{{ photo.caption }}</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { animateIn } from '@/composables/useGsapAnimations';

const headingRef = ref(null);
const gridRef = ref(null);

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    alt: 'Village learning studio',
    caption: 'Learning studio in Meghalaya',
  },
  {
    src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80',
    alt: 'Solar irrigation fields',
    caption: 'Sun-powered rice terraces',
  },
  {
    src: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1000&q=80',
    alt: 'Community gardens',
    caption: 'Regenerative edible forests',
  },
  {
    src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80',
    alt: 'Women cooperatives',
    caption: 'Design sprints with artisans',
  },
  {
    src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80',
    alt: 'Telemedicine camp',
    caption: 'Digital health brigades',
  },
  {
    src: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1000&q=80',
    alt: 'Agro innovation lab',
    caption: 'Youth innovators at work',
  },
];

onMounted(() => {
  animateIn(headingRef.value);
  animateIn(gridRef.value, { delay: 0.2 });
});
</script>
