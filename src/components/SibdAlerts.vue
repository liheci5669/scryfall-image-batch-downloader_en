<template>
  <UContainer>
    <transition-group
      enter-active-class="animate-in zoom-in duration-700"
      leave-active-class="animate-out zoom-out duration-500"
      move-class="animate-in duration-700"
      class="my-4 flex flex-col gap-4"
      tag="div"
    >
      <UAlert
        v-if="isDisplayLoadingAlert && isLoading"
        :title="`Now Loading: ${cards.length} / ${cardNames.length}`"
        icon="i-material-symbols-search-rounded"
        key="isLoading"
        @close="isDisplayLoadingAlert = false"
        :close-button="{
          icon: 'i-material-symbols-close-rounded',
          color: 'gray',
          variant: 'link',
          size: '2xs',
        }"
      />
      <UAlert
        v-if="
          isDisplayCompleteAlert && !isLoading && errorCardNames.length === 0
        "
        :title="`Loading Complete: ${cards.length}`"
        icon="i-material-symbols-done-rounded"
        color="green"
        key="isSuccess"
        @close="isDisplayCompleteAlert = false"
        :close-button="{
          icon: 'i-material-symbols-close-rounded',
          color: 'gray',
          variant: 'link',
          size: '2xs',
        }"
      />
      <UAlert
        v-if="
          isDisplayErrorAlert &&
          cards.length !== 0 &&
          errorCardNames.length !== 0
        "
        title="以下のファイルがダウンロードできませんでした。"
        icon="i-material-symbols-feedback-rounded"
        color="red"
        key="isNotDownloaded"
        @close="isDisplayErrorAlert = false"
        :close-button="{
          icon: 'i-material-symbols-close-rounded',
          color: 'gray',
          variant: 'link',
          size: '2xs',
        }"
      >
        <template #description>
          <ul class="list-disc" v-for="name in errorCardNames" key="name">
            <li>{{ name }}</li>
          </ul>
        </template>
      </UAlert>
      <UAlert
        v-if="isDisplayDoubleFaceAlert && doubleFacedCards.length > 0"
        title="両面カードが存在します。"
        icon="i-material-symbols-feedback-rounded"
        color="yellow"
        key="doubleFacedCardExists"
        @close="isDisplayDoubleFaceAlert = false"
        :close-button="{
          icon: 'i-material-symbols-close-rounded',
          color: 'gray',
          variant: 'link',
          size: '2xs',
        }"
      >
        <template #description>
          <ul class="list-disc" v-for="card in doubleFacedCards">
            <li>
              <a
                :href="card.scryfall_uri"
                target="_blank"
                class="link:text-pink-400"
                >{{ card.name }}</a
              >
            </li>
          </ul>
        </template>
      </UAlert>
    </transition-group>
  </UContainer>
</template>
<script setup lang="ts">
const { cards, cardNames } = useCards();

const props = defineProps<{
  isLoading: boolean;
  errorCardNames: string[];
}>();

const isDisplayLoadingAlert = ref<boolean>(true);
const isDisplayCompleteAlert = ref<boolean>(true);
const isDisplayErrorAlert = ref<boolean>(true);
const isDisplayDoubleFaceAlert = ref<boolean>(true);

const doubleFacedCards = computed(() => {
  if (cards.value.length === 0) return [];

  return cards.value.filter(
    (c) => c.card_faces.length >= 2 && c.card_faces[0].image_uris
  );
});
</script>
