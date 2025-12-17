<template>
  <section class="contact" id="contact">
    <div class="contact__card" ref="cardRef">
      <div>
        <p class="eyebrow">Contact</p>
        <h2>Let’s co-create a flagship community development program.</h2>
        <p>
          Share your priorities and we will assemble architects, data scientists, and local facilitators to design a custom roadmap
          within 4 weeks.
        </p>
        <div class="contact__info">
          <div>
            <span>Write to us</span>
            <p>hello@community.dev</p>
          </div>
          <div>
            <span>Call us</span>
            <p>+1 (415) 555-4824</p>
          </div>
        </div>
      </div>
      <form class="contact__form">
        <label>
          Full Name
          <input type="text" placeholder="Jane Doe" />
        </label>
        <label>
          Organization
          <input type="text" placeholder="Village Council" />
        </label>
        <label>
          Email
          <input type="email" placeholder="hello@example.com" />
        </label>
        <label>
          Project Vision
          <textarea rows="3" placeholder="Describe your goals..."></textarea>
        </label>
        <button class="primary" type="button">Send Proposal Brief</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { animateIn } from '@/composables/useGsapAnimations';

const cardRef = ref(null);

onMounted(() => {
  animateIn(cardRef.value);
});
</script>
