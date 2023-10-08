<template>
  <header class="bg-primary-500 px-2 mt-0 w-full shadow">
    <div
      class="container mx-auto flex flex-wrap justify-between items-center w-full"
    >
      <div class="flex items-center text-white font-extrabold">
        <nuxt-link to="/">
          <span class="text-2xl pl-2 py-2 font-display font-medium">
            Scryfall Image Batch Downloader
          </span>
        </nuxt-link>
      </div>
      <div class="flex text-right text-white font-bold">
        <nuxt-link
          to="https://github.com/kintsuba/scryfall-image-batch-downloader"
          class="p-2 flex items-center hover:bg-primary-600"
        >
          <IconGitHub color="currentcolor" width="28" height="28" />
          <span class="pl-1 text-lg hidden md:inline"> Repository </span>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import IconGitHub from "~icons/mdi/github";
</script>
