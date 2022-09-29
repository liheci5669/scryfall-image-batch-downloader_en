<template>
  <section>
    <img :src="getImageUris(card as Scry.Card).large" :title="card.name" />
  </section>
</template>
<script setup lang="ts">
import * as Scry from "scryfall-sdk";

const props = defineProps<{
  card: Readonly<Scry.Card>;
}>();

const getImageUris = (card: Scry.Card) => {
  if (card.card_faces.length >= 2 && card.card_faces[0].image_uris) {
    return card.card_faces[0].image_uris;
  } else if (card.image_uris) {
    return card.image_uris;
  }
};
</script>
