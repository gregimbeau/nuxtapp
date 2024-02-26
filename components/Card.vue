<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <img class="w-full" :src="imageUrl" alt="Random Image">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">A nice picture</div>
      <p class="text-gray-700 text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Replace this URL with the actual URL for a random image
      imageUrl: 'https://i.pinimg.com/originals/05/45/69/05456984e4c9a25d50083a4f641d7268.jpg',
    }
  }
}
</script>

<style scoped>
/* Add any additional styling here */
</style>
