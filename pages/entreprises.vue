<template>
  <div class="container">
    <div class="column enterprises">
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-6">Entreprises Data (FR)</h1>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Enter company name"
          class="mb-4 p-2 border border-gray-300 rounded w-full" />
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
    <div class="column particulars ml-4 mr-4 mb-4 p-2 ">
      <h1 class="text-2xl font-bold mb-2 p-4">Addresses Data (FR)</h1>
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
  flex-wrap: wrap; /* Allow items to wrap as needed */
  justify-content: center;
  align-items: flex-start; /* Adjust alignment to start to handle different heights */
  gap: 20px; /* Add some space between flex items */
  height: auto; /* Adjust height to be auto for flexibility */
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px; /* Add some padding for smaller screens */
  box-sizing: border-box; /* Include padding in the width calculation */
}

.column {
  padding: 10px;
  box-sizing: border-box;
  flex: 1 1 100%; /* Make columns full width on smaller screens */
  min-width: 0; /* Prevent flex items from overflowing */
}

.divider {
  display: none; /* Hide divider on smaller screens */
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .container {
    flex-wrap: nowrap; /* Prevent wrapping on larger screens */
    padding: 20px 0; /* Adjust padding */
  }

  .column {
    flex: 1; /* Adjust columns to share available space equally */
  }

  .divider {
    display: block; /* Show divider on larger screens */
    flex: 0 0 2px; /* Adjust divider width and prevent it from growing */
    background-color: #ccc;
    align-self: stretch; /* Stretch divider to fill parent height */
  }
}

/* Improve form elements responsiveness */
input[type="text"],
button {
  width: 100%; /* Full width for smaller screens */
  box-sizing: border-box; /* Include padding and border in the element's width */
}

@media (min-width: 768px) {
  input[type="text"],
  button {
    max-width: 400px; /* Limit width on larger screens */
  }
}
</style>
