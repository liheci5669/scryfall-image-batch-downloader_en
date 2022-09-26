<template>
  <button
    class="bg-primary-500 hover:bg-primary-700 text-primary-100 font-bold py-2 px-6 rounded-full"
    :class="{ 'opacity-50 cursor-not-allowed': disabled }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: Boolean,
});
</script>
