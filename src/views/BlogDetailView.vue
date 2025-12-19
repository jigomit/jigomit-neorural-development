<template>
  <section class="page blog-detail-view">
    <RouterLink :to="{ name: 'blog' }" class="back-link">← Back to Blog</RouterLink>

    <article v-if="post">
      <p class="blog-detail-date">{{ formatDate(post.date) }}</p>
      <h1>{{ post.title }}</h1>
      
      <div class="blog-hero-image" v-if="post.image">
        <img :src="post.image" :alt="`${post.title} - Insights on community-led village transformation programs and sustainable rural development best practices`" />
        <figcaption v-if="post.imageCaption" class="blog-image-caption">{{ post.imageCaption }}</figcaption>
      </div>

      <div class="blog-body">
        <p v-for="(para, idx) in paragraphs" :key="idx">{{ para }}</p>
      </div>
    </article>

    <div v-else class="blog-missing">
      <h2>Post not found</h2>
      <p>The article you're looking for is unavailable.</p>
      <RouterLink :to="{ name: 'blog' }" class="primary">Back to Blog</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { posts } from '@/data/posts';

const route = useRoute();
const BASE_URL = import.meta.env.VITE_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://neorural.dev');

const post = computed(() => posts.find((p) => p.slug === route.params.slug));
const paragraphs = computed(() => {
  if (!post.value) return [];
  return post.value.content
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim());
});

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  const month = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
};

const injectArticleSchema = () => {
  if (!post.value) return;

  // Remove existing article schema
  const existing = document.querySelector('script[data-schema="article"]');
  if (existing) existing.remove();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.value.title,
    description: post.value.excerpt,
    image: typeof post.value.image === 'string' ? post.value.image : `${BASE_URL}${post.value.image}`,
    datePublished: post.value.date,
    dateModified: post.value.date,
    author: {
      '@type': 'Organization',
      name: 'NeoRural Development',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NeoRural Development',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.value.slug}`,
    },
    keywords: 'insights on community-led village transformation programs, best practices for sustainable rural development, rural development frameworks and methodologies, village development program implementation guides, community-led rural development initiatives, water security solutions for rural communities, participatory rural development approach',
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'article');
  script.textContent = JSON.stringify(articleSchema);
  document.head.appendChild(script);
};

onMounted(() => {
  injectArticleSchema();
});

watch(
  () => route.params.slug,
  () => {
    injectArticleSchema();
  }
);
</script>

