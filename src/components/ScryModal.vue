<template>
  <UModal v-model="isDisplayRef">
    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <!-- Modal header -->
      <div
        class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ selectedCard?.name }}
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
          v-if="selectedCard"
          :src="getImageUris(selectedCard as Scry.Card)?.large"
          :title="selectedCard?.name"
          class="inline-block p-4 max-h-[400px]"
        />
      </div>
      <CardSuggestion
        v-if="selectedCard"
        @selectCard="selectCard"
        :usingLangRef="usingLangRef"
      />
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
  </UModal>
</template>
<script setup lang="ts">
import * as Scry from "scryfall-sdk";
import IconLanguage from "~icons/material-symbols/language";
import IconSwapHorizRounded from "~icons/material-symbols/swap-horiz-rounded";
import IconSwapVertRounded from "~icons/material-symbols/swap-vert-rounded";

const CardSuggestion = resolveComponent("modal/CardSuggestion");
const FilledButton = resolveComponent("form/button/FilledButton");
const OutlinedButton = resolveComponent("form/button/OutlinedButton");

const { selectedCard, selectCard, updateCardsWithSelectedCard } = useCards();

const usingLangRef = ref<string>("ja");

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", isDisplay: boolean): void;
}>();

const isDisplayRef = computed({
  get(): boolean {
    return props.modelValue;
  },
  set(value: boolean) {
    emit("update:modelValue", value);
  },
});

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
  isDisplayRef.value = false;
};

const getImageUris = (card: Scry.Card) => {
  if (card.card_faces.length >= 2 && card.card_faces[0].image_uris) {
    return card.card_faces[0].image_uris;
  } else if (card.image_uris) {
    return card.image_uris;
  }
};
</script>
