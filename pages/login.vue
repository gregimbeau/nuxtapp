<template>
  <div class="flex flex-col lg:flex-row h-screen">
    <!-- Left Side -->
    <div
      class="lg:w-1/2 w-full bg-cover bg-center"
      style="background-image: url('https://source.unsplash.com/random')">
      <div
        class="flex h-full bg-gray-900 bg-opacity-50 justify-center items-center">
        <div class="text-white max-w-md mx-4 text-center">
          <h2 class="text-xl lg:text-3xl font-semibold">
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
      class="lg:w-1/2 w-full flex flex-col justify-center items-center bg-gray-100 space-y-4 px-4">
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
      <pre class="test-account-info w-full lg:w-2/6">
        <code>
// Test account

{
  "username": "testUser2",
  "password": "password123"
}

// Please be patient, slow login server
        </code>
      </pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LoginForm from "../components/LoginForm.vue";

const loading = ref(false);

const handleLoginStart = () => {
  loading.value = true;
};

const handleLoginEnd = () => {
  loading.value = false;
};
</script>

<style scoped>
.test-account-info {
  color: rgb(8, 242, 8);
  font-size: 12px !important;
  background-color: black;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow: auto;
  height: 210px;
  overflow: hidden;
}

/* Adjustments for smaller screens */
@media (max-width: 768px) {
  .test-account-info {
    width: 90%;
    font-size: 0.8rem; 
  }
}

/* Adjustments for larger screens */
@media (min-width: 769px) {
  .test-account-info {
    width: 42%;
    font-size: 1rem;
  }
}
</style>
