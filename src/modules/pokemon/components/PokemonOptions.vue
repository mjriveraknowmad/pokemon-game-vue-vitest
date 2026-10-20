<template>
  <section class="mt-5 flex flex-col">
    <button v-for="(option, index) in props.options" :key="index" @click="emit('selectedOption', option.id)"
      class="capitalize">
      {{ option.name }}
    </button>
  </section>
</template>

<script setup lang="ts">

import type { Pokemon } from '../interfaces';

interface Props {
  options: Pokemon[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  selectedOption: [id: number]
}>();

</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}
</style>
