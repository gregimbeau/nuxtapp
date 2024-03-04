<template>
  <div class="bg-gray-200 flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useHead } from '#imports'
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

// Composants utilisés dans le layout
defineProps({
  components: {
    Navbar,
    Footer,
  },
});

// Injection dynamique du script Chatling
onMounted(() => {
  if (process.client) {
    const existingScript = document.getElementById('chatling-embed-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.dataset.id = "2826697742";
      script.id = "chatling-embed-script";
      script.src = "https://chatling.ai/js/embed.js";
      document.body.appendChild(script);
    }
  }
});

// Utilisation de useHead pour gérer le <head> du document
useHead({
  script: [
    {
      src: 'https://chatling.ai/js/embed.js',
      async: true,
      type: 'text/javascript',
      id: 'chatling-embed-script',
      'data-id': '2826697742',
      body: true, // S'assure que le script est ajouté au body
    },
  ],
});
</script>

<style>
/* Assuming Navbar and Footer have specific classes or you can add them */
.navbar, .footer {
  z-index: 10; /* Adjust as necessary */
  width: 100%;
}
</style>
