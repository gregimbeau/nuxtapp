<template>
  <section class="text-center py-10">
    <div class="container mx-auto">
      <CTAComponent />
      <p class="my-5"></p>
      <div class="flex flex-col md:flex-row items-stretch">
        <GridComponent class="w-full md:w-2/3 xl:w-3/4 flex-grow flex-shrink-0 basis-0 mr-0 md:mr-10" />
        <div class="h-2 bg-gray-300 my-4 md:my-0 md:h-auto md:w-2 mx-20"></div>
        <Card class="flex-shrink-0 basis-auto ml-0 md:ml-10" />
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
  margin-right: 10%; /* Ajustez selon les besoins */
}

.card-item {
  flex-grow: 0; /* Empêche le Card de grandir */
  flex-shrink: 0; /* Empêche le Card de rétrécir */
  flex-basis: auto; /* La taille de base est la taille naturelle du Card */
  margin-left: 10%; /* Ajustez selon les besoins */
}

.divider {
  width: 2px;
  background-color: #ccc;
  margin: 0 20px;
}
</style>
