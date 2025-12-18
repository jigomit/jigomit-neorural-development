<template>
  <img
    ref="imgRef"
    :src="src"
    :alt="alt"
    :class="['lazy-image', { loaded: isLoaded }]"
    :loading="loading"
    :width="width"
    :height="height"
    @load="handleLoad"
    @error="handleError"
  />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useIntersectionObserver } from '@/composables/usePerformance';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  loading: {
    type: String,
    default: 'lazy',
    validator: (value) => ['lazy', 'eager'].includes(value),
  },
  width: {
    type: [String, Number],
    default: null,
  },
  height: {
    type: [String, Number],
    default: null,
  },
  placeholder: {
    type: String,
    default: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E',
  },
});

const imgRef = ref(null);
const isLoaded = ref(false);
const hasError = ref(false);
const currentSrc = ref(props.placeholder);

const { elementRef, hasIntersected } = useIntersectionObserver({
  rootMargin: '50px',
});

const handleLoad = () => {
  isLoaded.value = true;
};

const handleError = () => {
  hasError.value = true;
};

watch(
  () => hasIntersected.value,
  (intersected) => {
    if (intersected && !isLoaded.value && !hasError.value) {
      currentSrc.value = props.src;
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (imgRef.value) {
    elementRef.value = imgRef.value;
    // Use native loading if available
    if (props.loading === 'eager' || !('loading' in HTMLImageElement.prototype)) {
      currentSrc.value = props.src;
    }
  }
});

// Update src when it changes
watch(
  () => props.src,
  (newSrc) => {
    if (hasIntersected.value) {
      currentSrc.value = newSrc;
    }
  }
);
</script>

<style scoped>
.lazy-image {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  display: block;
  max-width: 100%;
  height: auto;
}

.lazy-image.loaded {
  opacity: 1;
}
</style>

