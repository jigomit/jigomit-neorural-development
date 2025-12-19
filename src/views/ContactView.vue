<template>
  <section class="page contact-view">
    <div class="page-heading" ref="headingRef">
      <p class="eyebrow">Contact</p>
      <h1>Let's craft a community development roadmap tailored for your village.</h1>
      <p>
        Learn how to partner with rural development organization for sustainable village programs. Explore CSR partnerships for sustainable village development programs, funding opportunities for rural development initiatives, and collaborate on community-led rural development projects.
      </p>
    </div>

    <div class="contact-shell" ref="cardRef">
      <div class="contact-details">
        <p>
          Share your ambitions for agriculture, infrastructure, or youth innovation. We’ll assemble a rapid response studio with
          designers, engineers, and local facilitators.
        </p>
        <div class="detail-grid">
          <div>
            <span>Email</span>
            <p>hello@community.dev</p>
          </div>
          <div>
            <span>Phone</span>
            <p>+1 (415) 555-4824</p>
          </div>
          <div>
            <span>HQ</span>
            <p>Nairobi • Manila • Mexico City</p>
          </div>
        </div>
      </div>
      <form class="contact-form" novalidate @submit.prevent="handleSubmit">
        <div v-if="success" class="form-success" role="status" aria-live="polite">
          Thanks for reaching out. We’ll review your request and follow up shortly.
        </div>
        <label>
          Full Name
          <input v-model.trim="form.name" type="text" placeholder="Jane Doe" required />
          <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
        </label>
        <label>
          Organization
          <input v-model.trim="form.org" type="text" placeholder="Village Cooperative" />
        </label>
        <label>
          Email
          <input v-model.trim="form.email" type="email" placeholder="you@example.com" required />
          <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
        </label>
        <label>
          Tell us about your vision
          <textarea v-model.trim="form.vision" rows="4" placeholder="Describe the transformation you envision..." required></textarea>
          <span v-if="errors.vision" class="field-error">{{ errors.vision }}</span>
        </label>
        <button type="submit" class="primary">Request Blueprint Sprint</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { animateIn } from '@/composables/useGsapAnimations';

const headingRef = ref(null);
const cardRef = ref(null);
const success = ref(false);
const successTimer = ref(null);
const form = reactive({
  name: '',
  org: '',
  email: '',
  vision: '',
});
const errors = reactive({
  name: '',
  email: '',
  vision: '',
});

const validate = () => {
  errors.name = form.name ? '' : 'Please enter your name.';
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/i;
  errors.email = form.email
    ? emailPattern.test(form.email.trim())
      ? ''
      : 'Enter a valid email.'
    : 'Email is required.';
  errors.vision = form.vision ? '' : 'Tell us about your vision.';
  return !errors.name && !errors.email && !errors.vision;
};

const handleSubmit = () => {
  success.value = false;
  const isValid = validate();
  if (!isValid) return;
  success.value = true;
  if (successTimer.value) clearTimeout(successTimer.value);
  successTimer.value = setTimeout(() => {
    success.value = false;
    successTimer.value = null;
  }, 4000);
  form.name = '';
  form.org = '';
  form.email = '';
  form.vision = '';
};

onMounted(() => {
  animateIn(headingRef.value);
  animateIn(cardRef.value, { delay: 0.2 });
});

onUnmounted(() => {
  if (successTimer.value) {
    clearTimeout(successTimer.value);
  }
});
</script>
