<template>
  <div v-if="addresses">
    <div
      v-for="address in addresses"
      :key="address.properties.id"
      class="mb-4 p-2 border border-gray-300 rounded">
      <!-- Tous les champs d'adresse ici -->
      <h3>{{ address.properties.label }}</h3>
      <p><strong>ID:</strong> {{ address.properties.id }}</p>
      <p><strong>Type:</strong> {{ address.properties.type }}</p>
      <p><strong>House Number:</strong> {{ address.properties.housenumber }}</p>
      <p><strong>Street:</strong> {{ address.properties.street }}</p>
      <p><strong>Locality:</strong> {{ address.properties.locality }}</p>
      <p>
        <strong>Municipality:</strong> {{ address.properties.municipality }}
      </p>
      <p><strong>Score:</strong> {{ address.properties.score }}</p>
      <p><strong>Name:</strong> {{ address.properties.name }}</p>
      <p><strong>Postcode:</strong> {{ address.properties.postcode }}</p>
      <p><strong>City Code:</strong> {{ address.properties.citycode }}</p>
      <p><strong>City:</strong> {{ address.properties.city }}</p>
      <p><strong>District:</strong> {{ address.properties.district }}</p>
      <p>
        <strong>Old City Code:</strong> {{ address.properties.oldcitycode }}
      </p>
      <p><strong>Old City:</strong> {{ address.properties.oldcity }}</p>
      <p><strong>Context:</strong> {{ address.properties.context }}</p>
      <p><strong>X Coordinate:</strong> {{ address.properties.x }}</p>
      <p><strong>Y Coordinate:</strong> {{ address.properties.y }}</p>
      <p><strong>Importance:</strong> {{ address.properties.importance }}</p>
      <p>
        <strong>Coordinates:</strong>
        {{ address.geometry.coordinates.join(", ") }}
      </p>
      <!-- Ajoutez plus de champs si nécessaire -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addresses: Array,
  },
};
</script>
