<template>
  <nav class="bg-gray-800 p-4 text-white flex justify-between items-center">
    <!-- Left: SVG Logo -->
    <div class="flex items-center">
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

      <a href="/" class="text-lg font-semibold">NuxtApp</a>
    </div>

    <!-- Center: Home Link -->
    <div>
      <a href="/" class="text-md">Home</a>
    </div>

    <!-- Right: Profile Link -->
    <div>
      <a href="/contact" class="text-md">Profile</a>
      <!-- This link is placeholder for future profile page -->
    </div>
  </nav>
</template>
