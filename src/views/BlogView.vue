<template>
  <section class="page blog-view">
    <div class="page-heading">
      <p class="eyebrow">Blog</p>
      <h1>Blog</h1>
      <p class="blog-subtitle">Stories, tips & updates from our rescue community</p>
    </div>

    <div class="blog-grid">
      <RouterLink
        v-for="post in posts"
        :key="post.slug"
        :to="{ name: 'blog-detail', params: { slug: post.slug } }"
        class="blog-card"
      >
        <div class="blog-card-image" v-if="post.image">
          <img :src="post.image" :alt="post.title" />
        </div>
        <div class="blog-card-content">
          <p class="blog-date">{{ formatDate(post.date) }}</p>
          <h3>{{ post.title }}</h3>
          <p class="blog-excerpt">{{ post.excerpt }}</p>
          <span class="blog-readmore">
            Read More
          </span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { posts } from '@/data/posts';

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  const month = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
};
</script>

