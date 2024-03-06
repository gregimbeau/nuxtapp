// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      apiUrl: process.env.PUBLIC_VUE_APP_API_URL,
      newsApiKey: process.env.NEWS_API_KEY,
    },
  },
});
