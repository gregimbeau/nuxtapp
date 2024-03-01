<template>
  <div>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Nom d'utilisateur:</label>
        <input id="username" v-model="credentials.username" type="text" required>
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input id="password" v-model="credentials.password" type="password" required>
      </div>
      <button type="submit">Se connecter</button>
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

const handleLogin = () => {
  login(credentials.value);
};
</script>

<style scoped>
/* Style de votre choix */
</style>
