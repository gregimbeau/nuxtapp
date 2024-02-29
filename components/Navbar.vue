<template>
  <nav
    class="bg-gray-300 p-4 flex flex-col sm:flex-row items-center justify-between">
    <!-- Left: Dropdown Menu -->
    <div class="flex items-center justify-start w-1/3">
      <DropdownMenu />
    </div>

    <!-- Center: Home Link -->
    <div class="w-1/3 text-center">
      <NuxtLink
        to="/"
        class="text-black text-md hover:bg-[#12b488] hover:text-white p-2 rounded transition-colors duration-300"
        >Home</NuxtLink
      >
    </div>

    <!-- Right: Profile Link -->
    <div class="w-1/3 text-right">
      <NuxtLink
        to="/contact"
        class="text-black text-md hover:bg-[#12b488] hover:text-white p-2 rounded transition-colors duration-300"
        >Who we are</NuxtLink
      >
    </div>
  </nav>
</template>

<style scoped>

</style>
