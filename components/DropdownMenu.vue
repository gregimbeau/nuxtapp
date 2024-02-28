<template>
  <div
    class="relative flex items-center group"
    >
    <svg
      class="h-6 w-6 mr-2 cursor-pointer"
      @mouseover="showDropdown = true"
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
    <NuxtLink to="/22" class="text-[#12b488] text-lg font-semibold">MonAppNuxtKiTue</NuxtLink>
    <div v-if="showDropdown" class="dropdown-content absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg flex flex-col z-50" @mouseleave="showDropdown = false">
      <NuxtLink to="/" class="dropdown-item px-3 py-2 flex items-center text-black hover:bg-[#12b488] hover:text-white">
        <!-- Home Icon -->
        <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9.5V22h18V9.5L12 3 3 9.5z"></path></svg>
        Home
      </NuxtLink>
      <!-- Separator -->
      <div class="border-t border-gray-300"></div>
      <NuxtLink to="/contact" class="dropdown-item px-3 py-2 flex items-center text-black hover:bg-[#12b488] hover:text-white">
        <!-- Pencil Icon -->
        <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7L2 20.172V22h1.828L17 8.828l-1.828-1.828z"></path></svg>
        Who we are
      </NuxtLink>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
const showDropdown = ref(false);
</script>


<style scoped>
  .dropdown-item {
    padding: 8px 12px;
    color: black;
    text-align: left;
  }

  .dropdown-item:hover {
    background-color: #12b488;
    color: white;
  }
</style>
