<template>
  <div class="flex justify-center items-center h-full">
    <form
      @submit.prevent="handleLogin"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2"
          >Nom d'utilisateur:</label
        >
        <input
          id="username"
          v-model="credentials.username"
          type="text"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2"
          >Mot de passe:</label
        >
        <input
          id="password"
          v-model="credentials.password"
          type="password"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
     <div class="flex items-center justify-between">
        <button
          type="submit"
          :class="{'bg-blue-500': !isLoggingIn, 'bg-green-500': isLoggingIn}"
          class="relative overflow-hidden text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-500 ease-in-out">
          <span class="block" :class="{'swipe-effect': isLoggingIn}">
            {{ loginButtonText }}
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";

const { login, checkAuthStatus } = useAuth();
const credentials = ref({ username: "", password: "" });
const loginButtonText = ref("Se connecter");
const isLoggingIn = ref(false);

checkAuthStatus();

const handleLogin = async () => {
  isLoggingIn.value = true;
  loginButtonText.value = "Logging in...";

  setTimeout(async () => {
    await login(credentials.value);
    isLoggingIn.value = false;
    loginButtonText.value = "Se connecter";
    // Add your redirection logic here, if any
  }, 2000);
};
</script>

<style scoped>
.swipe-effect {
  position: relative;
  animation: swipe 2s forwards;
}

@keyframes swipe {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}

/* You can add more styles here if necessary */
</style>