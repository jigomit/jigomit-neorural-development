<template>
  <div class="hero-globe" ref="globeContainer"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { useIntersectionObserver } from '@/composables/usePerformance';

const globeContainer = ref(null);
let frameId;
let sceneInstance = null;

const initScene = async () => {
  if (!globeContainer.value || sceneInstance) return;

  // Lazy load Three.js only when component is visible
  const THREE = await import('three');
  
  const container = globeContainer.value;
  const scene = new THREE.Scene();
  const width = container.clientWidth || 420;
  const height = container.clientHeight || 420;

  const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
  camera.position.set(0, 0, 8);

  // Performance: Reduce pixel ratio on mobile, limit antialiasing
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const renderer = new THREE.WebGLRenderer({ 
    antialias: pixelRatio > 1, 
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(pixelRatio);
  // Performance: Enable renderer optimizations
  renderer.shadowMap.enabled = false;
  container.appendChild(renderer.domElement);

  const gradientMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: new THREE.Color('#66e3c4') },
      color2: { value: new THREE.Color('#1c3f84') },
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      uniform vec3 color1;
      uniform vec3 color2;
      void main() {
        float intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        vec3 color = mix(color1, color2, intensity);
        gl_FragColor = vec4(color, 0.95);
      }
    `,
    transparent: true,
  });

  const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(3, 2), gradientMaterial);
  scene.add(sphere);

  const ringGeometry = new THREE.TorusGeometry(4.2, 0.02, 16, 100);
  const ringMaterial = new THREE.MeshBasicMaterial({ color: '#8ef5df', opacity: 0.4, transparent: true });
  const orbitalRing = new THREE.Mesh(ringGeometry, ringMaterial);
  orbitalRing.rotation.x = Math.PI / 3;
  scene.add(orbitalRing);

  const resize = () => {
    const { clientWidth, clientHeight } = container;
    renderer.setSize(clientWidth, clientHeight);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  };

  // Performance: Throttle animation when not visible
  let isVisible = true;
  const animate = () => {
    if (isVisible) {
      sphere.rotation.y += 0.0025;
      sphere.rotation.x += 0.0015;
      orbitalRing.rotation.z += 0.001;
      renderer.render(scene, camera);
    }
    frameId = requestAnimationFrame(animate);
  };

  // Performance: Use passive resize listener
  const throttledResize = throttle(resize, 250);
  window.addEventListener('resize', throttledResize, { passive: true });
  
  // Pause animation when tab is hidden
  const handleVisibilityChange = () => {
    isVisible = !document.hidden;
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  animate();

  sceneInstance = {
    cleanup: () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', throttledResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sceneInstance = null;
    }
  };

  return sceneInstance.cleanup;
};

// Simple throttle for resize
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Lazy load when component enters viewport
const { elementRef, hasIntersected } = useIntersectionObserver({
  rootMargin: '100px',
  threshold: 0.1,
});

onMounted(() => {
  if (globeContainer.value) {
    elementRef.value = globeContainer.value;
  }
});

// Initialize scene when visible
let cleanup;

watch(
  () => hasIntersected.value,
  async (visible) => {
    if (visible && !sceneInstance) {
      cleanup = await initScene();
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (cleanup) cleanup();
});
</script>
