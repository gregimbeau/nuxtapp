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
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter(); 

onMounted(() => {
  authStore.checkAuthStatus(); 
  if (!authStore.isLoggedIn) {
    router.push('/login'); 
  }
});

const logout = () => {
  authStore.logout();
};
</script>



