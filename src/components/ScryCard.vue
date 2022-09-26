<template>
  <section>
    <img :src="(card as Scry.Card).image_uris.large" :title="card.name" />
  </section>
</template>
<script setup lang="ts">
import * as Scry from "scryfall-sdk";

const props = defineProps<{
  card: Scry.Card;
}>();
</script>
