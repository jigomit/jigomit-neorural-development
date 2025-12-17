<template>
  <section class="page blog-detail-view">
    <RouterLink :to="{ name: 'blog' }" class="back-link">← Back to Blog</RouterLink>

    <article v-if="post">
      <p class="blog-detail-date">{{ formatDate(post.date) }}</p>
      <h1>{{ post.title }}</h1>
      
      <div class="blog-hero-image" v-if="post.image">
        <img :src="post.image" :alt="post.title" />
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
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { posts } from '@/data/posts';

const route = useRoute();
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
</script>

