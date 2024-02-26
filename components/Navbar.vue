<template>
  <nav class="bg-gray-300 p-4 text-white flex items-center justify-between">
    <!-- Left: SVG Logo -->
    <div class="flex items-center justify-start w-1/3">
      <svg
        class="h-6 w-6 mr-2"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <!-- Your SVG content here -->
        <path
          d="M12 2L21.5 22H2.5L12 2Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
      <NuxtLink to="/22" class="text-[#12b488] text-lg font-semibold"
        >NuxtApp</NuxtLink
      >
    </div>

    <!-- Center: Home Link -->
    <div class="w-1/3 text-center">
      <NuxtLink to="/" class="text-black text-md">Home</NuxtLink>
    </div>

    <!-- Right: Profile Link -->
    <div class="w-1/3 text-right">
      <NuxtLink to="/contact" class="text-black text-md">Who we are</NuxtLink>
      <!-- This link is a placeholder for a future profile page -->
    </div>
  </nav>
</template>

<style scoped>
  a {
    display: inline-block; 
    padding: 2px 4px; 
    margin: 0; 
    box-sizing: border-box; 
    transition: background-color 0.3s, color 0.3s; 
    border-radius: 4px; 
  }

  a:hover {
    background-color: #12b488; 
    color: white; 
  }
</style>
