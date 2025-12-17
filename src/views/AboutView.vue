<template>
  <section class="page about-view">
    <div class="page-heading" ref="headingRef">
      <p class="eyebrow">About</p>
      <h1>We are village futurists powering community-led rural development ecosystems.</h1>
      <p>
        Our teams embed with councils, cooperatives, and youth leaders to map assets, co-create regenerative masterplans, and run
        long-term, community-led rural development programs that blend design, finance, and digital infrastructure.
      </p>
    </div>

    <div class="about-panels" ref="panelRef">
      <article v-for="panel in panels" :key="panel.title" class="about-panel">
        <div class="panel-header">
          <span>{{ panel.category }}</span>
          <h3>{{ panel.title }}</h3>
        </div>
        <p>{{ panel.description }}</p>
        <ul>
          <li v-for="point in panel.points" :key="point">{{ point }}</li>
        </ul>
      </article>
    </div>

    <div class="about-flow" ref="flowRef">
      <div v-for="stage in flow" :key="stage.title" class="flow-step">
        <span>{{ stage.index }}</span>
        <h4>{{ stage.title }}</h4>
        <p>{{ stage.copy }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { animateIn } from '@/composables/useGsapAnimations';

const headingRef = ref(null);
const panelRef = ref(null);
const flowRef = ref(null);

const panels = [
  {
    category: 'Immersion',
    title: 'Community Listening',
    description: 'Participatory labs that surface citizen aspirations via storytelling, sensory mapping, and data diaries.',
    points: ['Village walk-throughs', 'Cultural rituals', 'Geo-spatial data layers'],
  },
  {
    category: 'Design',
    title: 'Living Blueprints',
    description: 'Scenario studios that produce adaptable masterplans anchored in land, water, livelihoods, and culture.',
    points: ['Digital twins', 'Agro-ecology models', 'Funding architecture'],
  },
  {
    category: 'Delivery',
    title: 'Impact Orchestration',
    description: 'End-to-end program management with local talent, regenerative supply chains, and transparent reporting.',
    points: ['Community PMOs', 'ESG dashboards', 'Mentorship alliances'],
  },
];

const flow = [
  { index: '01', title: 'Discover', copy: 'Gather stories and data to understand hidden potential.' },
  { index: '02', title: 'Co-design', copy: 'Prototype pilots with local champions and global mentors.' },
  { index: '03', title: 'Activate', copy: 'Launch programs with regenerative revenue models.' },
  { index: '04', title: 'Scale', copy: 'Document playbooks and expand to clusters of villages.' },
];

onMounted(() => {
  animateIn(headingRef.value);
  animateIn(panelRef.value, { delay: 0.2 });
  animateIn(flowRef.value, { delay: 0.4 });
});
</script>
