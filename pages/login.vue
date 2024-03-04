<template>
  <div class="flex h-screen">
    <!-- Left Side -->
    <div
      class="w-1/2 bg-cover bg-center"
      style="background-image: url('https://source.unsplash.com/random')">
      <div
        class="flex h-full bg-gray-900 bg-opacity-50 justify-center items-center">
        <div class="text-white max-w-md mx-4 text-center">
          <h2 class="text-3xl font-semibold">
            Welcome to our connection interface.
          </h2>
          <p class="mt-4">
            Please enter your credentials on the right. If you do not have any,
            please mail us to request account creation.
          </p>
        </div>
      </div>
    </div>

    <!-- Right Side -->
    <div
      class="w-1/2 flex flex-col justify-center items-center bg-gray-100 space-y-4">
      <div class="w-full max-w-md">
        <LoginForm
          @login-start="handleLoginStart"
          @login-end="handleLoginEnd" />

        <div
          v-if="loading"
          class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <span class="text-white">Loading, please wait...</span>
        </div>
      </div>
      <pre
        class="text-green-500 w-2/6 flex flex-col justify-center items-center bg-black space-y-4">
        <code>
// Test account

{
  "username": "testUser2",
  "password": "password123"
}
        </code>
      </pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LoginForm from "../components/LoginForm.vue";

const loading = ref(false);

let loginStartTime = 0;

const handleLoginStart = () => {
  loading.value = true;
  loginStartTime = Date.now(); // Record the start time
};

const handleLoginEnd = () => {
  const elapsedTime = Date.now() - loginStartTime;
  const remainingTime = Math.max(0, 2000 - elapsedTime);

  // Wait for the remainder of the 2 seconds, if necessary
  setTimeout(() => {
    loading.value = false;
  }, remainingTime);
};
</script>
