<template>
  <transition enter-active-class="animate-animated animate-fadeInLeft">
    <section v-show="!isLoadingRef">
      <img
        :src="getImageUris(card as Scry.Card).large"
        :title="card.name"
        @load="isLoadingRef = false"
          @click="emit('click')"
      />
    </section>
  </transition>
</template>
<script setup lang="ts">
import * as Scry from "scryfall-sdk";

const isLoadingRef = ref<boolean>(true);

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

const emit = defineEmits<{
  (e: "click");
}>();
</script>
