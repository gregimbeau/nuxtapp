<template>
  <svg
    class="h-6 w-6 mr-2 cursor-pointer"
    @mouseover="$emit('mouseover')"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <!-- SVG content -->
    <path
      d="M12 2L21.5 22H2.5L12 2Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round" />
  </svg>
</template>

<script>
export default {
  name: 'MyLogo',
};
</script>
