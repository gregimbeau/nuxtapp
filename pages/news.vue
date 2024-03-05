<template>
  <div class="py-8 bg-gray-100">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-center mb-12">Bitcoin News</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="article in news" :key="article.url" class="bg-white overflow-hidden shadow rounded-lg">
          <img :src="article.urlToImage" alt="Article Image" class="w-full h-48 object-cover">
          <div class="p-6">
            <h2 class="font-semibold text-lg mb-2">{{ article.title }}</h2>
            <p class="text-gray-500 text-sm mb-4">{{ new Date(article.publishedAt).toLocaleDateString() }}</p>
            <p>{{ article.description }}</p>
          </div>
        </div>
      </div>
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { useNews } from '~/composables/useNews';
import { onMounted } from 'vue';

const { news, loading, error, fetchNews } = useNews();

onMounted(fetchNews);
</script>
