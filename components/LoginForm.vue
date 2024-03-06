<template>
  <div class="flex justify-center items-center h-full">
    <form
      @submit.prevent="handleLogin"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2"
          >User Name:</label
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
          >Password:</label
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
          :class="{ 'bg-blue-500': !isLoggingIn, 'bg-green-500': isLoggingIn }"
          class="relative overflow-hidden text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-500 ease-in-out"
          style="width: 200px; height: 50px">
          <!-- Adjust width and height as needed -->
          <transition name="fade" mode="out-in">
            <span
              :key="loginButtonText"
              class="absolute inset-0 flex justify-center items-center">
              {{ loginButtonText }}
            </span>
          </transition>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const credentials = ref({ username: "", password: "" });
const loginButtonText = ref("Log In");
const isLoggingIn = ref(false);
const loginCompleted = ref(false);

const authStore = useAuthStore();

authStore.checkAuthStatus();

const handleLogin = async () => {
  isLoggingIn.value = true;
  loginButtonText.value = "Logging in...";
  loginCompleted.value = false;

  const messages = [
    "Validating Credentials", "Almost there...", "Be patient", 
    "A little more...", "Almost there...", "No kidding, almost!", 
    "You're ok...", "Soon now...",
  ];
  let messageIndex = 0;

  const messageInterval = setInterval(() => {
    if (!loginCompleted.value) {
      loginButtonText.value = messages[messageIndex++ % messages.length];
    }
  }, 5000);

  const minimumWaitTime = setTimeout(async () => {
    try {
      await authStore.login(credentials.value);
      loginCompleted.value = true;
      isLoggingIn.value = false;
      loginButtonText.value = "Logged In";
      clearInterval(messageInterval); // Nettoyer l'intervalle immédiatement après la connexion réussie
    } catch (error) {
      // Ne pas déclarer l'échec ici car nous devons attendre 45 secondes avant cela
      console.error("Error during login:", error.message);
    }
  }, 10000); // Attendre 10 secondes avant d'essayer de se connecter

  // Définir un délai maximal avant de déclarer l'échec
  const failureTimeout = setTimeout(() => {
    if (!loginCompleted.value) {
      loginCompleted.value = true;
      isLoggingIn.value = false;
      loginButtonText.value = "Try again later";
      clearInterval(messageInterval);
    }
  }, 65000); // Délai d'attente avant de déclarer l'échec
};

</script>

<style scoped>
/* Adjusting for a fade effect instead of swipe */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
}

/* Ensure the button content (text) is centered */
button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* Positioning for the span to ensure it's properly aligned and sized */
button > span {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
