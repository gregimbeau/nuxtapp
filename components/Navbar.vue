<template>
  <nav
    class="bg-gray-300 p-4 flex flex-col sm:flex-row items-center justify-between">
    <!-- Left: Dropdown Menu -->
    <div class="flex items-center justify-start w-1/3">
          <MyLogo />

          <NuxtLink to="/22" class="text-[#12b488] text-lg font-semibold"
      >MyKillaNuxtApp</NuxtLink
    >
    </div>

    <!-- Center: Home Link -->

    <div class="w-1/3 text-center">
      
    </div>

    <!-- Right: Profile Link -->
          <DropdownMenu />

  </nav>
</template>

<style scoped>
.navbar { /* Assurez-vous que c'est la classe correcte pour votre barre de navigation */
  display: flex;
  justify-content: flex-end; /* Aligner les éléments à droite */
}

</style>