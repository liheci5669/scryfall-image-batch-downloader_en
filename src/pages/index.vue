<template>
  <main class="h-full">
    <section
      class="flex flex-col gap-5 items-center justify-center h-full mt-[-48px]"
    >
      <SibdTextarea
        v-model="cardsStringRef"
        placeholder="1 Kenrith, the Returned King
1 Archivist of Oghma
1 Avacyn's Pilgrim
1 Biomancer's Familiar
..."
        class="w-2/3 md:w-1/3 h-[500px]"
      />
      <FilledButton
        @click="toSelect"
        :disabled="!canStart"
        class="flex items-center gap-1 text-lg mt-2"
      >
        <ImageSearchRounded color="currentcolor" width="24" height="24" />
        Search
      </FilledButton>
    </section>
  </main>
</template>

<script setup lang="ts">
import * as Scry from "scryfall-sdk";
import ImageSearchRounded from "~icons/material-symbols/image-search-rounded";

const SibdTextarea = resolveComponent("form/SibdTextarea");
const FilledButton = resolveComponent("form/button/FilledButton");

const { cards, updateCardNames } = useCards();

onMounted(() => {
  if (cards && cards.value.length !== 0) {
    const names = (cards.value as Scry.Card[]).map((c) => c.name);
    cardsStringRef.value = "1 " + names.join("\n1 ");
  }
});

const cardsStringRef = ref<string>(
  "1 Kenrith, the Returned King\n1 Archivist of Oghma"
);

const cardNamesRef = computed(() => {
  if (cardsStringRef.value === "") return [];
  const tempArray = cardsStringRef.value.split("\n");

  if (tempArray.every((t) => /\d+ (.*)/.test(t))) {
    return tempArray.map((t) => t.match(/\d+ (.*)/)[1]);
  } else {
    return [];
  }
});

const canStart = computed(() => {
  return cardNamesRef.value.length !== 0;
});

const toSelect = async () => {
  const router = useRouter();

  updateCardNames(cardNamesRef.value);
  router.push("/select");
};
</script>
