<template>
  <div
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex items-center justify-center bg-gray-500 bg-opacity-75"
    v-if="selectedCard !== undefined"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ selectedCard.name }}
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="unset"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="flex justify-center border-b border-gray-200">
          <img
            :src="selectedCard.image_uris.large"
            :title="selectedCard.name"
            class="inline-block p-4 max-h-[400px]"
          />
        </div>
        <div
          v-if="usingLangRef === 'ja' && !pendingJa"
          class="grid grid-cols-4 gap-1 justify-center items-center p-3 overflow-y-scroll h-[14rem]"
        >
          <div
            v-for="card in (searchedCardsJa as Scry.Card[])"
            :key="card.id"
            class="text-center cursor-pointe"
            :class="[card.id === selectedCard.id ? 'bg-primary-300' : '']"
            @click="selectCard(card)"
          >
            <img
              :src="(card as Scry.Card).image_uris.small"
              :title="card.set"
              class="inline-block p-1"
            />
          </div>
        </div>
        <div
          v-if="usingLangRef === 'en' && !pendingEn"
          class="grid grid-cols-4 gap-1 justify-center items-center p-3 overflow-y-scroll h-[12rem]"
        >
          <div
            v-for="card in (searchedCardsEn as Scry.Card[])"
            :key="card.id"
            class="text-center cursor-pointe"
            :class="[card.id === selectedCard.id ? 'bg-primary-300' : '']"
            @click="selectCard(card)"
          >
            <img
              :src="(card as Scry.Card).image_uris.small"
              :title="card.set"
              class="inline-block p-1"
            />
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex flex-col md:flex-row md:justify-between items-center gap-3 p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
        >
          <FilledButton class="flex items-center gap-1" @click="changeLang">
            <IconLanguage color="currentColor" />
            EN<IconSwapHorizRounded color="currentColor" />JP
          </FilledButton>
          <div class="flex items-center gap-2">
            <OutlinedButton @click="unset">Cancel</OutlinedButton>
            <FilledButton class="flex items-center gap-1" @click="changeCard">
              <IconSwapVertRounded color="currentColor" />
              Change Image
            </FilledButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as Scry from "scryfall-sdk";
import IconLanguage from "~icons/material-symbols/language";
import IconSwapHorizRounded from "~icons/material-symbols/swap-horiz-rounded";
import IconSwapVertRounded from "~icons/material-symbols/swap-vert-rounded";

const FilledButton = resolveComponent("form/button/FilledButton");
const OutlinedButton = resolveComponent("form/button/OutlinedButton");

const { selectedCard, selectCard, updateCardsWithSelectedCard } = useCards();

const usingLangRef = ref<string>("ja");

const { pending: pendingJa, data: searchedCardsJa } = await useLazyFetch(
  `/api/cards/search/prints?id=${selectedCard.value.oracle_id}&lang=ja`,
  {
    initialCache: false,
  }
);

const { pending: pendingEn, data: searchedCardsEn } = await useLazyFetch(
  `/api/cards/search/prints?id=${selectedCard.value.oracle_id}&lang=en`,
  {
    initialCache: false,
  }
);

const changeLang = () => {
  if (usingLangRef.value === "ja") {
    usingLangRef.value = "en";
  } else {
    usingLangRef.value = "ja";
  }
};

const changeCard = () => {
  updateCardsWithSelectedCard();
  unset();
};

const unset = () => {
  selectCard(undefined);
};
</script>
