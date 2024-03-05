<template>
  <div class="py-12 bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">Video Library</h1>
        <p class="mt-4 max-w-2xl text-xl mx-auto text-gray-500">Explore our collection of videos. Enjoy learning with our curated content.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <template v-for="video in videos" :key="video.id">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h2 class="text-lg leading-6 font-medium text-gray-900">{{ video.title }}</h2>
              <div class="mt-2">
                <iframe :src="video.url" class="w-full" style="aspect-ratio: 16 / 9;" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
              <p class="mt-4 text-sm text-gray-500">{{ video.description }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const videos = ref([
  { id: 1, title: 'Video Title 1', url: 'https://www.youtube.com/embed/7Ifz89NQlA8', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.' },
  { id: 2, title: 'Video Title 2', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.' },
  { id: 3, title: 'Video Title 3', url: 'https://www.youtube.com/embed/oRbfte2pqE0', description: 'Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.' },
  { id: 4, title: 'Video Title 4', url: 'https://www.youtube.com/embed/tgbNymZ7vqY', description: 'Proin faucibus arcu quis ante. In consectetuer turpis ut velit. Nulla sit amet est.' },
  { id: 5, title: 'Video Title 5', url: 'https://www.youtube.com/embed/sNPnbI1arSE', description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.' },
  { id: 6, title: 'Video Title 6', url: 'https://www.youtube.com/embed/wvZ6nB3cl1w', description: 'Etiam sit amet orci eget faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.' },
]);
</script>

<style scoped>
/* Additional styles if needed */
</style>
