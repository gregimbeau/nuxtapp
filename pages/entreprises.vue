<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Entreprises Data</h1>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Enter company name"
      class="mb-4 p-2 border border-gray-300 rounded" />
    <button @click="fetchData" class="mb-4 p-2 bg-blue-500 text-white rounded">
      Search
    </button>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <div
        v-for="entreprise in apiData.results"
        :key="entreprise.siren"
        class="mb-4">
        <h2 class="text-xl font-semibold">{{ entreprise.nom_complet || 'Name Not Available' }}</h2>
        <div v-for="(value, key) in entreprise" :key="key">
          <div v-if="key === 'dirigeants'">
            <strong>{{ formatKey(key) }}:</strong>
            <div v-for="(director, index) in value" :key="index" class="director-info">
              <div><strong>Name:</strong> {{ director.nom }}, {{ director.prenoms }}</div>
              <div><strong>Birth Year:</strong> {{ director.annee_de_naissance }}</div>
              <div><strong>Birth Date:</strong> {{ director.date_de_naissance }}</div>
              <div><strong>Position:</strong> {{ director.qualite }}</div>
              <div><strong>Nationality:</strong> {{ director.nationalite }}</div>
              <div><strong>Type:</strong> {{ director.type_dirigeant }}</div>
            </div>
          </div>
          <div v-else-if="key === 'matching_etablissements'"> <!-- Corrected condition here -->
            <strong>{{ formatKey(key) }}:</strong>
            <div v-for="(etablissement, index) in value" :key="index" class="etablissement-info">
              <div v-for="(innerValue, innerKey) in etablissement" :key="innerKey">
                <strong>{{ formatKey(innerKey) }}:</strong> {{ innerValue || 'Not Available' }}
              </div>
            </div>
          </div>
          <div v-else-if="typeof value === 'object'">
            <strong>{{ formatKey(key) }}:</strong>
            <div v-for="(innerValue, innerKey) in value" :key="innerKey">
              <span>{{ formatKey(innerKey) }}: {{ innerValue || 'Not Available' }}</span>
            </div>
          </div>
          <div v-else>
            <strong>{{ formatKey(key) }}:</strong> {{ value || 'Not Available' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const apiData = ref({ results: [] });
const loading = ref(false);
const searchQuery = ref("");

const fetchData = async () => {
  loading.value = true;
  apiData.value = { results: [] };
  try {
    const response = await fetch(
      `https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(
        searchQuery.value
      )}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    apiData.value = await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    loading.value = false;
  }
};

function formatKey(key) {
  // Convert key to string to handle non-string keys
  const stringKey = String(key);

  return stringKey
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
}
</script>

<style scoped>
.director-info, .etablissement-info {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.director-info > div, .etablissement-info > div {
  margin-bottom: 5px;
}
</style>
