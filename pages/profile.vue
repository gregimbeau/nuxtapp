<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">User Profile</h1>
    <!-- User profile content goes here -->
    <p>Welcome to your profile!</p>
    <button @click="logout" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Logout</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router'; // Import useRouter

const { logout, checkAuthStatus, isLoggedIn } = useAuth();
const router = useRouter(); // Get the router instance

onMounted(async () => {
  await checkAuthStatus();
  if (!isLoggedIn.value) {
    router.push('/login'); // Use the router instance to navigate
  }
});
</script>


