<template>
  <section class="text-center p-10">
    <div class="container mx-auto">
      <CTAComponent />
      <p><br></p>
      <div class="flex-container">
        <GridComponent class="grid-item" />
        <div class="divider"></div>
        <Card class="card-item" />
      </div>
    </div>
  </section>
</template>


<script>
// Page-specific JavaScript here
export default {
  // No need to specify the layout if using the default
};
</script>

<style>
.flex-container {
  display: flex;
  /* justify-content: center; */
  align-items: stretch;
}

.grid-item {
  flex-grow: 1; /* Permet au GridComponent de grandir et remplir l'espace disponible */
  flex-shrink: 0; /* Empêche le GridComponent de rétrécir */
  flex-basis: 0; /* Définit la base de départ comme 0 pour permettre la croissance */
  margin-right: 5px; /* Ajustez selon les besoins */
}

.card-item {
  flex-grow: 0; /* Empêche le Card de grandir */
  flex-shrink: 0; /* Empêche le Card de rétrécir */
  flex-basis: auto; /* La taille de base est la taille naturelle du Card */
  margin-left: 5px; /* Ajustez selon les besoins */
}

.divider {
  width: 2px;
  background-color: #ccc;
  margin: 0 20px;
}
</style>
