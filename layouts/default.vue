<template>
  <div class="bg-gray-200 flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>


<script>
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
/* Assuming Navbar and Footer have specific classes or you can add them */
.navbar, .footer {
  z-index: 10; /* Adjust as necessary */
  width: 100%;
}

</style>
