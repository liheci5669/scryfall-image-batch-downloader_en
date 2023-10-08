<template>
  <main>
    <transition-group
      enter-active-class="animate-animated animate-bounceIn"
      move-class="animate-animated"
      class="flex flex-col w-full items-center mt-4"
      tag="div"
    >
      <SibdAlert
        v-if="isLoadingRef"
        type="info"
        class="my-4 mx-2"
        key="isLoading"
      >
        <p>Now Loading: {{ cards.length }} / {{ cardNames.length }}</p>
      </SibdAlert>
      <SibdAlert
        v-if="!isLoadingRef && errorCardNames.length === 0"
        type="success"
        class="my-4 mx-2"
        key="isSuccess"
      >
        <p>Loading Complete: {{ cards.length }}</p>
      </SibdAlert>
      <SibdAlert
        v-if="cards.length !== 0 && errorCardNames.length !== 0"
        type="warning"
        class="my-4 mx-2"
        key="isNotDownloaded"
      >
        <p>以下のファイルがダウンロードできませんでした。</p>
        <ul class="mt-2 list-disc" v-for="name in errorCardNames" key="name">
          <li>{{ name }}</li>
        </ul>
      </SibdAlert>
      <SibdAlert
        v-if="doubleFacedCards.length > 0"
        type="info"
        class="my-4 mx-2"
        key="doubleFacedCardExists"
      >
        <p>両面カードが存在します。</p>
        <ul class="mt-2 list-disc" v-for="card in doubleFacedCards">
          <li>
            <a
              :href="card.scryfall_uri"
              target="_blank"
              class="link:text-pink-400"
              >{{ card.name }}</a
            >
          </li>
        </ul>
      </SibdAlert>
    </transition-group>

    <div
      v-if="cards.length !== 0"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-5 items-center justify-center m-4"
    >
      <ScryCard
        v-for="card in cards"
        :key="card.id"
        :card="(card as Readonly<Scry.Card>)"
        class="cursor-pointer"
        @click="selectCard(card as Readonly<Scry.Card>)"
      />
    </div>
    <div v-if="cards.length !== 0" class="flex justify-center mt-8">
      <ExtendedFab class="flex items-center" @click="download">
        <IconDownloadRounded color="#29535E" width="24" height="24" />
        <span class="font-bold">Download</span>
      </ExtendedFab>
    </div>
    <transition
      enter-active-class="animate-animated animate-fadeIn"
      leave-active-class="animate-animated animate-fadeOut"
    >
      <ScryModal v-if="isDisplayModalRef" />
    </transition>
  </main>
</template>

<script setup lang="ts">
import * as Scry from "scryfall-sdk";
import IconDownloadRounded from "~icons/material-symbols/download-rounded";

const ScryCard = resolveComponent("ScryCard");
const ScryModal = resolveComponent("ScryModal");
const ExtendedFab = resolveComponent("form/button/ExtendedFab");
const SibdAlert = resolveComponent("util/SibdAlert");

const { cards, cardNames, selectedCard, addCard, updateCards, selectCard } =
  useCards();

const errorCardNames = ref<string[]>([]);
const isDisplayModalRef = computed(() => selectedCard.value !== undefined);
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

const doubleFacedCards = computed(() => {
  if (cards.value.length === 0) return [];

  return cards.value.filter(
    (c) => c.card_faces.length >= 2 && c.card_faces[0].image_uris
  );
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
          url: getImageUris(card as Scry.Card).large,
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
