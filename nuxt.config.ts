// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-09-21",

  experimental: {
    sharedPrerenderData: false,
    resetAsyncDataToUndefined: true,
    defaults: {
      useAsyncData: {
        deep: true,
        value: "null",
        errorValue: "null",
      },
    },
  },

  modules: ["@nuxt/ui"],
  ui: { global: true },
});
