<template>
  <main>
    <SibdAlerts :isLoading="isLoadingRef" :errorCardNames="errorCardNames" />

    <div
      v-if="cards.length !== 0"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-5 items-center justify-center m-4"
    >
      <ScryCard
        v-for="card in cards"
        :key="card.id"
        :card="(card as Readonly<Scry.Card>)"
        class="cursor-pointer"
        @click="
          selectCard(card as Readonly<Scry.Card>);
          isDisplayModalRef = true;
        "
      />
    </div>
    <div v-if="cards.length !== 0" class="flex justify-center mt-8">
      <ExtendedFab class="flex items-center" @click="download">
        <IconDownloadRounded color="#29535E" width="24" height="24" />
        <span class="font-bold">Download</span>
      </ExtendedFab>
    </div>

    <ScryModal v-model="isDisplayModalRef" />
  </main>
</template>

<script setup lang="ts">
import * as Scry from "scryfall-sdk";
import IconDownloadRounded from "~icons/material-symbols/download-rounded";

const ScryCard = resolveComponent("ScryCard");
const ScryModal = resolveComponent("ScryModal");
const ExtendedFab = resolveComponent("form/button/ExtendedFab");
const SibdAlerts = resolveComponent("SibdAlerts");

const { cards, cardNames, selectedCard, addCard, updateCards, selectCard } =
  useCards();

const errorCardNames = ref<string[]>([]);
const isDisplayModalRef = ref<boolean>(false);
const isLoadingRef = ref<boolean>(true);

onMounted(async () => {
  isLoadingRef.value = true;
  updateCards([]);
  for (const name of cardNames.value) {
    try {
      const { data: card } = await useFetch(`/api/cards/byName?name=${name}`);

      addCard(card.value as Scry.Card);
    } catch (e) {
      console.log(e);
      errorCardNames.value.push(name);
    }
  }
  isLoadingRef.value = false;
});

const getImageUris = (card: Scry.Card) => {
  if (card.card_faces.length >= 2 && card.card_faces[0].image_uris) {
    return card.card_faces[0].image_uris;
  } else if (card.image_uris) {
    return card.image_uris;
  }
};

const download = async () => {
  for (const card of cards.value) {
    const result = await useAsyncData(card.id, () =>
      $fetch("/api/download", {
        method: "POST",
        body: {
          url: getImageUris(card as Scry.Card)?.large,
        },
        initialCache: false,
        responseType: "blob",
      })
    );

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(result.data.value as Blob);
    link.setAttribute("download", `${card.name}.png`);
    document.body.appendChild(link);
    link.click();
  }
};
</script>
