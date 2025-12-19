import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020', // Modern target to avoid deprecated APIs
    minify: 'esbuild', // Faster and built-in
    // Remove console.log in production
    esbuild: {
      drop: ['console', 'debugger'],
      legalComments: 'none',
      target: 'es2020', // Modern target to avoid deprecated APIs
    },
    // Performance: Optimize chunk sizes
    cssMinify: true,
    reportCompressedSize: false, // Faster builds
    rollupOptions: {
      output: {
        // Performance: Reduce critical path by deferring non-critical chunks
        experimentalMinChunkSize: 20000,
        manualChunks: (id) => {
          // Performance: Optimize chunk splitting to reduce critical path
          if (id.includes('node_modules')) {
            if (id.includes('three')) {
              return 'vendor-three';
            }
            // Performance: Defer GSAP - it's only needed for animations
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            // Performance: Keep Vue core in main bundle for faster initial load
            if (id.includes('vue') && !id.includes('vue-router')) {
              return undefined; // Keep Vue in main bundle
            }
            if (id.includes('vue-router')) {
              return 'vendor-router';
            }
            // Other node_modules
            return 'vendor-other';
          }
          // Performance: Separate route chunks to prevent blocking
          if (id.includes('/views/')) {
            const viewName = id.split('/views/')[1].split('.')[0];
            // Don't bundle home view with others - it's critical for initial load
            if (viewName === 'HomeView') {
              return undefined; // Keep in main bundle for faster initial load
            }
            // Group all non-critical views into fewer chunks to reduce requests
            if (['ContactView', 'BlogView', 'BlogDetailView', 'PrivacyView', 'TermsView', 'GalleryView', 'StoriesView'].includes(viewName)) {
              return 'views-secondary';
            }
            // Group primary views together
            if (['AboutView', 'InitiativesView', 'ImpactView'].includes(viewName)) {
              return 'views-primary';
            }
            return 'views-other';
          }
          // Performance: Defer composables that aren't critical
          if (id.includes('/composables/')) {
            const composableName = id.split('/composables/')[1].split('.')[0];
            if (composableName === 'useGsapAnimations') {
              return 'composables-gsap';
            }
            // Keep critical composables in main bundle
            if (['useSEO', 'usePerformance'].includes(composableName)) {
              return undefined;
            }
          }
          // Performance: Keep GSAP vendor separate and deferred
          if (id.includes('gsap') && !id.includes('node_modules')) {
            return 'composables-gsap';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[ext]/[name]-[hash][extname]`;
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false,
    // Enable compression
    reportCompressedSize: true,
    // Optimize asset inlining threshold
    assetsInlineLimit: 4096, // 4kb
    // Performance: Optimize module preloading
    modulePreload: {
      polyfill: false, // Don't polyfill for modern browsers
    },
    // Performance: Reduce critical path by optimizing CSS
    cssTarget: 'es2020', // Modern CSS target
    // Performance: Optimize for mobile
    assetsDir: 'assets',
  },
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['three', 'gsap'], // Three.js and GSAP are heavy, load on demand
  },
  // Performance: Reduce server overhead
  server: {
    hmr: {
      overlay: false, // Disable error overlay in dev for better performance
    },
  },
});
