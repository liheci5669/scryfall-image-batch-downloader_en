import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  target: "server",
  srcDir: "src/",
  modules: ["nuxt-windicss", "unplugin-icons/nuxt"],
});
