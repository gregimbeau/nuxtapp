<template>
  <div class="grid grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
    <!-- Row 1 -->
    <div class="bg-gray-100 p-2 rounded flex items-center justify-center">
      <!-- Placeholder for video -->
      <video controls class="max-h-32">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
        Your browser does not support HTML video.
      </video>
    </div>
    <div class="bg-gray-100 p-2 rounded flex items-center justify-center">
      <!-- Placeholder for comment -->
      <p>Sample comment text goes here.</p>
    </div>
    <div class="bg-gray-100 p-2 rounded flex items-center justify-center">
      <!-- Placeholder for icon -->
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
    </div>

    <!-- Row 2 -->
    <div class="bg-pastel-green p-2 rounded flex items-center justify-center">
      <!-- Placeholder for icon 1 -->
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
    </div>
    <div class="bg-pastel-blue p-2 rounded flex items-center justify-center">
      <!-- Placeholder for icon 2 -->
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
    </div>
    <div class="bg-pastel-pink p-2 rounded flex items-center justify-center">
      <!-- Placeholder for icon 3 -->
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m6 0H9m6 0H9"></path></svg>
    </div>

    <!-- Row 3 -->
    <div class="bg-gray-100 p-2 rounded flex items-center justify-center">
      <!-- Placeholder for comment -->
      <p>Another sample comment here.</p>
    </div>
    <div class="bg-gray-100 p-2 rounded flex items-center justify-center">
      <!-- Placeholder for video -->
      <video controls class="max-h-32">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
        Your browser does not support HTML video.
      </video>
    </div>
    <div class="bg-gray-100 p-2 rounded flex items-center justify-center">
      <!-- Placeholder for picture -->
      <img src="https://via.placeholder.com/150" alt="Placeholder Image" class="max-h-32">
    </div>
  </div>
</template>

<style scoped>
.bg-pastel-green {
  background-color: #a8e6cf; /* Example pastel green color */
}
.bg-pastel-blue {
  background-color: #dcedc1; /* Example pastel blue color */
}
.bg-pastel-pink {
  background-color: #ffd3b6; /* Example pastel pink color */
}
</style>
