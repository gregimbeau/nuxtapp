<!-- login.vue -->
<template>
  <div class="login-container">
    <h1>Connexion</h1>
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
import { useRouter } from "vue-router"; // Importez useRouter de vue-router

const credentials = ref({
  username: "",
  password: "",
});
const router = useRouter(); // Utilisez useRouter pour créer une instance de router

const login = async () => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials.value),
    });
    if (!response.ok) {
      throw new Error("Erreur de connexion");
    }
    const data = await response.json();
    console.log("Connexion réussie:", data);
    alert("Connexion réussie!"); // Affichez une alerte pour la connexion réussie
    router.push("/"); // Redirigez vers la page d'accueil
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    alert(
      "Erreur lors de la connexion. Veuillez vérifier vos informations d'identification et réessayer."
    );
  }
};
</script>


<style scoped>
.login-container {
  /* Style de votre choix */
}
</style>
