<template>
  <div class="loading-spinner" :class="{ 'loading-spinner--small': small }" aria-label="Loading">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
defineProps({
  small: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 200px;
}

.loading-spinner--small {
  padding: 1rem;
  min-height: auto;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(116, 245, 213, 0.2);
  border-top-color: var(--accent, #74f5d5);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  will-change: transform;
}

.loading-spinner--small .spinner {
  width: 24px;
  height: 24px;
  border-width: 2px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    border-top-color: var(--accent, #74f5d5);
  }
}
</style>

