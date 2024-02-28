<template>
  <footer
    class="bg-[#12b488] p-4 text-white text-center flex justify-between items-center">
    <div class="container mx-auto flex justify-between items-center">
      <span>© 2024 KamiApp. All rights reserved.</span>
      <div>
        <NuxtLink to="/social" class="mx-2">
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </NuxtLink>
        <NuxtLink to="/social" class="mx-2">
          <font-awesome-icon :icon="['fab', 'facebook']" />
        </NuxtLink>
        <NuxtLink to="/social" class="mx-2">
          <font-awesome-icon :icon="['fab', 'x-twitter']" />
        </NuxtLink>
        <NuxtLink to="/social" class="mx-2">
          <font-awesome-icon :icon="['fab', 'youtube']" />
        </NuxtLink>
        <NuxtLink to="/social" class="mx-2">
          <font-awesome-icon :icon="['fab', 'telegram']" />
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
