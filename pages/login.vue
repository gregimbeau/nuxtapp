<template>
  <div class="flex h-screen">
    <!-- Left Side -->
    <div class="w-1/2 bg-cover bg-center" style="background-image: url('https://source.unsplash.com/random')">
      <div class="flex h-full bg-gray-900 bg-opacity-50 justify-center items-center">
        <div class="text-white max-w-md mx-4 text-center">
          <h2 class="text-3xl font-semibold">Welcome to our connection interface.</h2>
          <p class="mt-4">Please enter your credentials on the right. If you do not have any, please mail us to request account creation.</p>
        </div>
      </div>
    </div>
    
    <!-- Right Side -->
    <div class="w-1/2 flex justify-center items-center bg-gray-100">
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue';
</script>
