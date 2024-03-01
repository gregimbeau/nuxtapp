<template>
  <div>
    <form @submit.prevent="login">
      <div>
        <label for="username">Nom d'utilisateur:</label>
        <input
          id="username"
          v-model="credentials.username"
          type="text"
          required />
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input
          id="password"
          v-model="credentials.password"
          type="password"
          required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRuntimeConfig } from "#imports";

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

const credentials = ref({
  username: "",
  password: "",
});
const router = useRouter();

const login = async () => {
  try {
    const response = await fetch(`${apiUrl}/login`, { // Using the apiUrl from runtime config
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials.value),
    });

    if (!response.ok) {
      throw new Error('Erreur de connexion');
    }
    const data = await response.json();
    console.log('Connexion réussie:', data);
    alert('Connexion réussie!');
    router.push('/');
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    alert('Erreur lors de la connexion. Veuillez vérifier vos informations d\'identification et réessayer.');
  }
};
</script>

<style scoped>
/* Style de votre choix */
</style>
