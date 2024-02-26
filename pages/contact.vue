<template>
  <div class="flex flex-col items-center justify-start mt-10 p-4">
    <div class="relative bg-white shadow-md rounded px-8 pt-6" style="width: 90vw; height: 60vh; overflow-auto;">
      <!-- Dropdowns for About Us, Disclaimer, Terms and Conditions -->
      <template v-for="section in sections" :key="section.name">
        <div class="mb-4">
          <button
            class="text-xl font-bold w-full text-left"
            @click="toggleDropdown(section.name)">
            {{ section.title }}
          </button>
          <div v-if="dropdowns[section.name]" class="border-l-4 p-4" :class="section.style">
            <p>{{ apiData[section.name] }}</p>
          </div>
        </div>
      </template>

      <!-- Logo at the bottom -->
     <div class="absolute bottom-5 left-0 right-0 flex justify-center pb-4">
        <svg
          class="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <!-- SVG content -->
          <path
            d="M12 2L21.5 22H2.5L12 2Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const { data: apiData } = await useFetch('/api/kami');
const dropdowns = ref({
  aboutUs: false,
  disclaimer: false,
  termsAndConditions: false,
});

const sections = [
  { name: 'aboutUs', title: 'About Us', style: 'bg-blue-100 border-blue-500 text-blue-700' },
  { name: 'disclaimer', title: 'Disclaimer', style: 'bg-yellow-100 border-yellow-500 text-yellow-700' },
  { name: 'termsAndConditions', title: 'Terms and Conditions', style: 'bg-red-100 border-red-500 text-red-700' },
];

const toggleDropdown = (dropdown) => {
  dropdowns.value[dropdown] = !dropdowns.value[dropdown];
};
</script>


<style scoped></style>
