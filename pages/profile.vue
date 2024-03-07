<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6 text-center">User Profile</h1>
    <div
      v-if="user"
      class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <!-- Display uploaded picture -->
      <div class="flex justify-center mb-4">
        <img
          v-if="user.picture"
          :src="user.picture"
          alt="Profile Picture"
          class="max-w-xs rounded-full" />
      </div>
      <form @submit.prevent="updateUser" class="space-y-4">
        <!-- Username Field -->
        <div class="space-y-1">
          <div class="flex items-center">
            <span class="text-md font-semibold w-32">Username:</span>
            <span class="flex-1 text-sm text-gray-600 ml-4">{{
              user.username || "Not set"
            }}</span>
            <button
              type="button"
              @click="toggleInput('username')"
              class="text-xs text-blue-500 bg-blue-100 hover:bg-blue-200 rounded-full px-3 py-1">
              Click to change
            </button>
          </div>
          <input
            v-show="showInput.username"
            type="text"
            v-model="user.username"
            id="username"
            class="mt-1 block w-full border border-gray-300 p-2 rounded shadow-sm"
            :placeholder="'Enter your new username'" />
        </div>
        <!-- Email Field -->
        <div class="space-y-1">
          <div class="flex justify-between items-center">
            <span class="text-md font-semibold w-32">Email:</span>
            <span class="flex-1 text-sm text-gray-600 ml-4">{{
              user.email || "Not set"
            }}</span>
            <button
              type="button"
              @click="toggleInput('email')"
              class="text-xs text-blue-500 bg-blue-100 hover:bg-blue-200 rounded-full px-3 py-1">
              Click to change
            </button>
          </div>
          <input
            v-show="showInput.email"
            type="email"
            v-model="user.email"
            id="email"
            class="mt-1 block w-full border border-gray-300 p-2 rounded shadow-sm"
            :placeholder="'Enter your new email'" />
        </div>
        <!-- Picture Upload Field -->
        <div class="space-y-1">
          <div class="flex justify-between items-center">
            <span class="text-md font-semibold w-32">Profile Picture:</span>
            <input
              type="file"
              @change="uploadImage"
              class="mt-1 block w-full border border-gray-300 p-2 rounded shadow-sm" />
          </div>
        </div>
        <!-- Description Field -->
        <div class="space-y-1">
          <div class="flex justify-between items-center">
            <span class="text-md font-semibold w-32">Description:</span>
            <span class="flex-1 text-sm text-gray-600 ml-4">{{
              user.description || "Not set"
            }}</span>
            <button
              type="button"
              @click="toggleInput('description')"
              class="text-xs text-blue-500 bg-blue-100 hover:bg-blue-200 rounded-full px-3 py-1">
              Click to change
            </button>
          </div>
          <textarea
            v-show="showInput.description"
            v-model="user.description"
            id="description"
            rows="3"
            class="mt-1 block w-full border border-gray-300 p-2 rounded shadow-sm"
            :placeholder="'Enter your new description'"></textarea>
        </div>
        <!-- First Name Field -->
        <div class="space-y-1">
          <div class="flex justify-between items-center">
            <span class="text-md font-semibold w-32">First Name:</span>
            <span class="flex-1 text-sm text-gray-600 ml-4">{{
              user.firstname || "Not set"
            }}</span>
            <button
              type="button"
              @click="toggleInput('firstname')"
              class="text-xs text-blue-500 bg-blue-100 hover:bg-blue-200 rounded-full px-3 py-1">
              Click to change
            </button>
          </div>
          <input
            v-show="showInput.firstname"
            type="text"
            v-model="user.firstname"
            id="firstname"
            class="mt-1 block w-full border border-gray-300 p-2 rounded shadow-sm"
            :placeholder="'Enter your new first name'" />
        </div>
        <!-- Surname Field -->
        <div class="space-y-1">
          <div class="flex justify-between items-center">
            <span class="text-md font-semibold w-32">Surname:</span>
            <span class="flex-1 text-sm text-gray-600 ml-4">{{
              user.surname || "Not set"
            }}</span>
            <button
              type="button"
              @click="toggleInput('surname')"
              class="text-xs text-blue-500 bg-blue-100 hover:bg-blue-200 rounded-full px-3 py-1">
              Click to change
            </button>
          </div>
          <input
            v-show="showInput.surname"
            type="text"
            v-model="user.surname"
            id="surname"
            class="mt-1 block w-full border border-gray-300 p-2 rounded shadow-sm"
            :placeholder="'Enter your new surname'" />
        </div>
        <!-- Submit Button -->
        <div class="flex justify-center mt-4">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
            v-show="Object.values(showInput).some((v) => v)">
            Update Profile
          </button>
        </div>
      </form>
      <div class="mt-6 flex justify-center">
        <button
          @click="logout"
          class="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-700 transition duration-200">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

const authStore = useAuthStore();
const router = useRouter();
const user = ref({}); // Initialize user as an empty object
const showInput = reactive({
  username: false,
  email: false,
  picture: false,
  description: false,
  firstname: false,
  surname: false,
});
// Toggle function to show input fields
const toggleInput = (field) => {
  showInput[field] = !showInput[field];
};

onMounted(async () => {
  authStore.checkAuthStatus();
  if (!authStore.isLoggedIn) {
    router.push("/login");
  } else if (authStore.userId) {
    await fetchUser(authStore.userId);
  } else {
    console.log("User ID is not available");
  }
});

const uploadImage = async (event) => {
  const files = event.target.files;
  if (!files.length) return;

  const formData = new FormData();
  formData.append("file", files[0]);
  formData.append("upload_preset", "eom5grdo");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dmq3cpw6u/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    user.value.picture = data.secure_url; // Save the URL to your user object
    alert("Image uploaded successfully!");
  } catch (error) {
    console.error("Failed to upload image:", error);
    alert("Failed to upload image.");
  }
};

// Adjusted to accept userId as a parameter
const fetchUser = async (userId) => {
  console.log(`Fetching data for user ID: ${userId}`); // Debug log
  try {
    const response = await axios.get(
      `https://apiusers-dbia.onrender.com/users/${userId}`
    );
    console.log(response.data); // Debug log to inspect the fetched data
    user.value = response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};

const updateUser = async () => {
  try {
    // Ensuring userId is dynamically set based on the logged-in user's ID
    await axios.put(
      `https://apiusers-dbia.onrender.com/users/${authStore.userId}`,
      user.value
    );
    alert("Profile updated successfully.");
  } catch (error) {
    console.error("Failed to update user:", error);
    alert("Failed to update profile.");
  }
};

const logout = () => {
  authStore.logout();
  router.push("/login"); // Redirect to login after logout
};
</script>
