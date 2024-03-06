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
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Assurez-vous que ce chemin correspond à l'emplacement de votre magasin Pinia

// Initialisation des références
const credentials = ref({ username: '', password: '' });
const loginButtonText = ref('Log In');
const isLoggingIn = ref(false);
const loginCompleted = ref(false); // Pour suivre si la connexion est terminée

// Utiliser le magasin Pinia pour l'authentification
const authStore = useAuthStore();

// Vérifier le statut de l'authentification au démarrage
authStore.checkAuthStatus();

const handleLogin = async () => {
  isLoggingIn.value = true;
  loginButtonText.value = 'Logging in...';

  // Programmer "Validating Credentials" après 5 secondes
  setTimeout(() => {
    if (!loginCompleted.value) {
      loginButtonText.value = 'Validating Credentials';
    }
  }, 5000);

  // Programmer conditionnellement "Almost there..." après 5 secondes supplémentaires (10 secondes au total)
  const almostThereTimeout = setTimeout(() => {
    if (!loginCompleted.value) {
      loginButtonText.value = 'Almost there...';
    }
  }, 10000);

  // Simuler l'opération de connexion et compléter après un temps supplémentaire
  setTimeout(async () => {
    if (!loginCompleted.value) {
      try {
        await authStore.login(credentials.value); // Utiliser l'action de connexion de Pinia
        loginCompleted.value = true; // Marquer la connexion comme terminée
        isLoggingIn.value = false;
        loginButtonText.value = 'Logged In';
        // Ajouter ici votre logique de redirection, si applicable
      } catch (error) {
        loginButtonText.value = 'Log In'; // Gérer les erreurs de connexion
        isLoggingIn.value = false;
      }
      // Si la connexion se termine avant le message "Almost there...", annuler le message programmé
      clearTimeout(almostThereTimeout);
    }
  }, 15000); // Ce temps simule le délai de connexion. Ajustez selon le temps de réponse réel de la connexion
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
