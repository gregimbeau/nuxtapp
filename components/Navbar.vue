<template>
  <nav class="bg-gray-300 p-4 flex items-center justify-between">
    <!-- Left: Logo and App Name always on the left -->
    <div class="flex items-center">
      <MyLogo />
      <NuxtLink to="/exemple_404" class="text-[#12b488] text-lg font-semibold ml-2">
        KamiNuxtApp
      </NuxtLink>
    </div>

    <!-- Right: Dropdown Menu always on the right -->
    <div class="mr-4">
      <DropdownMenu />
    </div>
  </nav>
</template>

<style scoped>

</style>