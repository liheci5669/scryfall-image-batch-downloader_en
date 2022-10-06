<template>
  <button
    class="bg-transparent hover:bg-primary-500 text-primary-500 font-semibold hover:text-primary-100 py-2 px-6 border border-primary-500 hover:border-transparent rounded-full"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "click");
}>();
</script>
