<template>
  <div class="hero-globe" ref="globeContainer"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as THREE from 'three';

const globeContainer = ref(null);
let frameId;

const initScene = () => {
  if (!globeContainer.value) return;

  const container = globeContainer.value;
  const scene = new THREE.Scene();
  const width = container.clientWidth || 420;
  const height = container.clientHeight || 420;

  const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
  camera.position.set(0, 0, 8);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio || 1);
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

  const animate = () => {
    sphere.rotation.y += 0.0025;
    sphere.rotation.x += 0.0015;
    orbitalRing.rotation.z += 0.001;
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  };

  window.addEventListener('resize', resize);
  animate();

  return () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener('resize', resize);
    renderer.dispose();
    container.removeChild(renderer.domElement);
  };
};

let cleanup;

onMounted(() => {
  cleanup = initScene();
});

onBeforeUnmount(() => {
  cleanup && cleanup();
});
</script>
