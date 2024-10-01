<template>
  <section>
    <CardList
      v-if="usingLangRef === 'ja' && !pendingJa"
      :cards="searchedCardsJa"
      :selectedCard="selectedCard"
      @selectCard="selectCard"
    />
    <CardList
      v-else-if="usingLangRef === 'en' && !pendingEn"
      :cards="searchedCardsEn"
      :selectedCard="selectedCard"
      @selectCard="selectCard"
    />
    <div v-else class="flex items-center justify-center h-60">
      <ScryLoading />
    </div>
  </section>
</template>
<script setup lang="ts">
import * as Scry from "scryfall-sdk";

const CardList = resolveComponent("modal/CardList");

const { selectedCard, selectCard } = useCards();

const { pending: pendingJa, data: searchedCardsJa } = await useLazyFetch(
  `/api/cards/search/prints?id=${selectedCard.value?.oracle_id}&lang=en`
);

const { pending: pendingEn, data: searchedCardsEn } = await useLazyFetch(
  `/api/cards/search/prints?id=${selectedCard.value?.oracle_id}&lang=en`
);

const props = defineProps<{
  usingLangRef: string;
}>();

const emit = defineEmits<{
  (e: "selectCard", card: Scry.Card): void;
}>();
</script>
