<template>
  <div class="container">
    <div class="column enterprises">
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-6">Entreprises Data</h1>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Enter company name"
          class="mb-4 p-2 border border-gray-300 rounded" />
        <button
          @click="fetchData"
          class="mb-4 p-2 bg-blue-500 text-white rounded">
          Search
        </button>
        <div v-if="loading" class="column entreprise">Loading...</div>
        <ApiEntreprise :data="apiData" />
      </div>
    </div>

    <!-- Divider and Particulars Column -->
    <div class="divider"></div>
    <div class="column particulars">
      <h1 class="text-2xl font-bold mb-4 p-3">Particulars Data</h1>
      <particuliers />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import ApiEntreprise from "../components/ApiEntreprise.vue"; // Assurez-vous que le chemin est correct
import Particuliers from "./particuliers.vue";

const apiData = ref({ results: [] });
const loading = ref(false);
const searchQuery = ref("");

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      `https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(
        searchQuery.value
      )}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    apiData.value = await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    // Gérer l'erreur ici, par exemple en définissant un message d'erreur dans une variable réactive
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.column {
  padding: 10px;
  box-sizing: border-box;
  flex: 1;
}

.divider {
  flex: 0 0 2px;
  background-color: #ccc;
  align-self: stretch;
}

.director-info,
.etablissement-info {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.director-info > div,
.etablissement-info > div {
  margin-bottom: 5px;
}
</style>
