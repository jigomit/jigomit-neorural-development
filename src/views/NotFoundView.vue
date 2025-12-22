<template>
  <div class="page">
    <section class="not-found-section">
      <div class="not-found-container">
        <h1 class="not-found-title">Page not found</h1>
        <p class="not-found-text">
          Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
        </p>
        <p class="not-found-text">
          <RouterLink to="/" class="not-found-link">Return to home</RouterLink> or explore our
          <RouterLink to="/initiatives" class="not-found-link">initiatives</RouterLink>.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useSEO } from '@/composables/useSEO';

// Set SEO metadata for 404 page
useSEO({
  title: 'Page Not Found | NeoRural Development',
  description: 'The page you are looking for could not be found. Return to NeoRural Development homepage or explore our community-led rural development initiatives.',
});
</script>

<style scoped>
.not-found-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 3rem 1.5rem;
}

.not-found-container {
  max-width: 600px;
  text-align: center;
  background: var(--surface);
  border: 1px solid var(--outline);
  border-radius: var(--radius-xl);
  padding: 3rem 2rem;
  box-shadow: var(--shadow);
}

.not-found-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 1.5rem;
  font-family: 'Space Grotesk', system-ui, sans-serif;
}

.not-found-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--muted);
  margin: 0 0 1rem;
}

.not-found-text:last-of-type {
  margin-bottom: 0;
}

.not-found-link {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s ease;
}

.not-found-link:hover {
  color: var(--accent-alt);
}

@media (max-width: 768px) {
  .not-found-title {
    font-size: 2rem;
  }

  .not-found-text {
    font-size: 1rem;
  }

  .not-found-container {
    padding: 2rem 1.5rem;
  }
}
</style>



