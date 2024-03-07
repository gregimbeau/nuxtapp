<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">User Profile</h1>
    <div v-if="user">
      <form @submit.prevent="updateUser">
        <!-- Username Field -->
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" v-model="user.username" id="username" class="mt-1 block w-full border border-gray-300 p-2 shadow-sm" :placeholder="user.username ? '' : 'Nothing yet, you can edit it below'">
        </div>
        <!-- Email Field -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" v-model="user.email" id="email" class="mt-1 block w-full border border-gray-300 p-2 shadow-sm" :placeholder="user.email ? '' : 'Nothing yet, you can edit it below'">
        </div>
        <!-- Picture URL Field -->
        <div class="mb-4">
          <label for="picture" class="block text-sm font-medium text-gray-700">Picture URL</label>
          <input type="text" v-model="user.picture" id="picture" class="mt-1 block w-full border border-gray-300 p-2 shadow-sm" :placeholder="user.picture ? '' : 'Nothing yet, you can edit it below'">
        </div>
        <!-- Description Field -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea v-model="user.description" id="description" rows="3" class="mt-1 block w-full border border-gray-300 p-2 shadow-sm" :placeholder="user.description ? '' : 'Nothing yet, you can edit it below'"></textarea>
        </div>
        <!-- First Name Field -->
        <div class="mb-4">
          <label for="firstname" class="block text-sm font-medium text-gray-700">First Name</label>
          <input type="text" v-model="user.firstname" id="firstname" class="mt-1 block w-full border border-gray-300 p-2 shadow-sm" :placeholder="user.firstname ? '' : 'Nothing yet, you can edit it below'">
        </div>
        <!-- Surname Field -->
        <div class="mb-4">
          <label for="surname" class="block text-sm font-medium text-gray-700">Surname</label>
          <input type="text" v-model="user.surname" id="surname" class="mt-1 block w-full border border-gray-300 p-2 shadow-sm" :placeholder="user.surname ? '' : 'Nothing yet, you can edit it below'">
        </div>
        <!-- Submit Button -->
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Update Profile</button>
      </form>
    </div>
    <!-- Logout Button -->
    <button @click="logout" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Logout</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const authStore = useAuthStore();
const router = useRouter();
const user = ref({}); // Initialize user as an empty object

onMounted(async () => {
  authStore.checkAuthStatus();
  if (!authStore.isLoggedIn) {
    router.push('/login');
  } else if (authStore.userId) { 
    await fetchUser(authStore.userId);
  } else {
    console.log("User ID is not available");
  }
});


// Adjusted to accept userId as a parameter
const fetchUser = async (userId) => {
  console.log(`Fetching data for user ID: ${userId}`); // Debug log
  try {
    const response = await axios.get(`https://apiusers-dbia.onrender.com/users/${userId}`);
    console.log(response.data); // Debug log to inspect the fetched data
    user.value = response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};


const updateUser = async () => {
  try {
    // Ensuring userId is dynamically set based on the logged-in user's ID
    await axios.put(`https://apiusers-dbia.onrender.com/users/${authStore.userId}`, user.value);
    alert('Profile updated successfully.');
  } catch (error) {
    console.error("Failed to update user:", error);
    alert('Failed to update profile.');
  }
};

const logout = () => {
  authStore.logout();
  router.push('/login'); // Redirect to login after logout
};
</script>
