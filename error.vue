<template>
    <div class="flex flex-col min-h-screen">

  <Navbar />
      <main class="flex-grow">

  <div class="mt-7 max-w-sm mx-auto text-center card">
    <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
    <p class="mt-7 text-6xl">Oops</p>
    <p class="mt-7">{{ error.message }}</p>
    <button class="btn my-7" @click="handleClearError">Go Home...</button>
  </div>
      </main>

    <Footer />
  </div>

</template>

<script setup>
defineProps(["error"]);
const handleClearError = () => clearError({ redirect: '/'})
</script>

<style scoped></style>
