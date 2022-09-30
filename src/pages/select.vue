<template>
  <main>
    <transition-group
      enter-active-class="animate-animated animate-bounceIn"
      move-class="animate-animated"
      class="flex items-center justify-center"
      tag="div"
    >
      <SibdAlert
        v-if="isLoadingRef"
        :text="`Now Loading: ${cards.length} / ${cardNames.length}`"
        type="info"
        class="my-8 mx-2"
        key="isLoading"
      />
      <SibdAlert
        v-if="!isLoadingRef && errorCardNames.length === 0"
        :text="`Loading Complete: ${cards.length}`"
        type="success"
        class="my-8 mx-2"
        key="isSuccess"
      />
      <SibdAlert
        v-if="cards.length !== 0 && errorCardNames.length !== 0"
        text="以下のファイルがダウンロードできませんでした。"
        type="warning"
        class="my-8 mx-2"
        key="isNotDownloaded"
      />
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
    <div v-else class="grid grid-cols-6 gap-5 items-center justify-center m-4">
      <div role="status">
        <svg
          class="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-if="cards.length !== 0" class="flex justify-center mt-8">
      <ExtendedFab class="flex items-center" @click="download">
        <IconDownloadRounded color="#29535E" width="24" height="24" />
        <span class="font-bold">Download</span>
      </ExtendedFab>
    </div>
    <ScryModal v-if="isDisplayModalRef" />
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
  for (const name of cardNames.value) {
    try {
      const { data: card } = await useFetch(`/api/cards/byName?name=${name}`, {
        initialCache: false,
      });

      addCard(card.value as Scry.Card);
    } catch (e) {
      console.log(e);
      errorCardNames.value.push(name);
    }
  }
  isLoadingRef.value = false;
});

onUnmounted(() => {
  updateCards([]);
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
