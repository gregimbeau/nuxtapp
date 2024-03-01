// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  runtimeConfig: {
    public: {
      apiUrl: process.env.PUBLIC_VUE_APP_API_URL, // make sure this env variable is set in your .env file
    },
  },
});
