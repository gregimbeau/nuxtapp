
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
import { useAuth } from "@/composables/useAuth";

const { login, checkAuthStatus } = useAuth();
const credentials = ref({ username: "", password: "" });
const loginButtonText = ref("Se connecter");
const isLoggingIn = ref(false);

// Add a ref to track if the login has completed
const loginCompleted = ref(false);

checkAuthStatus();

const handleLogin = async () => {
  isLoggingIn.value = true;
  loginButtonText.value = "Logging in...";

  // Schedule "Validating Credentials" after 5 seconds
  setTimeout(() => {
    if (!loginCompleted.value) {
      loginButtonText.value = "Validating Credentials";
    }
  }, 5000);

  // Conditionally schedule "Almost there..." after an additional 5 seconds (10 seconds in total)
  const almostThereTimeout = setTimeout(() => {
    if (!loginCompleted.value) {
      loginButtonText.value = "Almost there...";
    }
  }, 10000);

  // Simulate login operation and complete after additionnal time
  setTimeout(async () => {
    if (!loginCompleted.value) {
      await login(credentials.value);
      loginCompleted.value = true; // Mark login as completed
      isLoggingIn.value = false;
      loginButtonText.value = "Se connecter";
      // Add your redirection logic here, if applicable
    }
    // If login completes before the "Almost there..." message, cancel the scheduled message
    clearTimeout(almostThereTimeout);
  }, 11000); // This simulates the login delay. Adjust as needed based on actual login response time
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