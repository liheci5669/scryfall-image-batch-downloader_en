<template>
  <select
    class="bg-primary-100 px-3 py-2 rounded border-primary-500 focus:border-primary-600 focus:ring-primary-600 focus-visible:outline-none"
    v-model="SelectedValue"
  >
    <option v-for="value in values" :key="value" class="">
      {{ value }}
    </option>
  </select>
</template>

<script setup lang="ts">
const props = defineProps<{
  values: string[];
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", SelectedValue: string);
}>();

const SelectedValue = computed({
  get(): string {
    return props.modelValue;
  },
  set(value: string) {
    emit("update:modelValue", value);
  },
});
</script>
