<template>
  <div class="column enterprises">
    <div v-if="data && data.results && data.results.length > 0">
      <div
        v-for="entreprise in data.results"
        :key="entreprise.siren"
        class="mb-4">
        <h2 class="text-xl font-semibold">
          {{ entreprise.nom_complet || "Name Not Available" }}
        </h2>
        <div v-for="(value, key) in entreprise" :key="key">
          <div v-if="key === 'dirigeants'">
            <strong>{{ formatKey(key) }}:</strong>
            <div
              v-for="(director, index) in value"
              :key="index"
              class="director-info">
              <div>
                <strong>Name:</strong> {{ director.nom }},
                {{ director.prenoms }}
              </div>
              <div>
                <strong>Birth Year:</strong>
                {{ director.annee_de_naissance }}
              </div>
              <div>
                <strong>Birth Date:</strong>
                {{ director.date_de_naissance }}
              </div>
              <div><strong>Position:</strong> {{ director.qualite }}</div>
              <div>
                <strong>Nationality:</strong> {{ director.nationalite }}
              </div>
              <div><strong>Type:</strong> {{ director.type_dirigeant }}</div>
            </div>
          </div>
          <div v-else-if="key === 'matching_etablissements'">
            <strong>{{ formatKey(key) }}:</strong>
            <div
              v-for="(etablissement, index) in value"
              :key="index"
              class="etablissement-info">
              <div
                v-for="(innerValue, innerKey) in etablissement"
                :key="innerKey">
                <strong>{{ formatKey(innerKey) }}:</strong>
                {{ innerValue || "Not Available" }}
              </div>
            </div>
          </div>
          <div v-else-if="typeof value === 'object'">
            <strong>{{ formatKey(key) }}:</strong>
            <div v-for="(innerValue, innerKey) in value" :key="innerKey">
              <span
                >{{ formatKey(innerKey) }}:
                {{ innerValue || "Not Available" }}</span
              >
            </div>
          </div>
          <div v-else>
            <strong>{{ formatKey(key) }}:</strong>
            {{ value || "Not Available" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  data: Object,
});

function formatKey(key) {
  const stringKey = String(key);
  return stringKey
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
}
</script>

<style scoped>
/* ... Styles specific to ApiEntreprise component ... */
</style>
