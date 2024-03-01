<template>
  <div class="flex justify-center items-center h-full">
    <form @submit.prevent="handleLogin" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Nom d'utilisateur:</label>
        <input id="username" v-model="credentials.username" type="text" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Mot de passe:</label>
        <input id="password" v-model="credentials.password" type="password" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="flex items-center justify-between">
        <button type="submit" class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Se connecter
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

// Appeler checkAuthStatus au chargement du composant
checkAuthStatus();

const handleLogin = async () => {
  await login(credentials.value);
};
</script>

<style scoped>
/* Ajoutez ici des styles supplémentaires si nécessaire */
</style>
