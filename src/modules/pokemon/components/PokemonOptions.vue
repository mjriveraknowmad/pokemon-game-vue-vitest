<template>
  <section class="mt-5 flex flex-col">
    <button v-for="{ id, name } in props.options" :key="id" @click="emit('selectedOption', id)"
      :disabled="props.blockSelection" :class="[
        'capitalize disabled:shadow-none disabled:bg-gray-100',
        {
          correct: id === props.correctAnswer && props.blockSelection,
          incorrect: id !== props.correctAnswer && props.blockSelection,
        },
      ]">
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">

import type { Pokemon } from '../interfaces';

interface Props {
  options: Pokemon[];
  blockSelection: boolean;
  correctAnswer: number;
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

.correct {
  @apply bg-blue-500 text-white;
}

.incorrect {
  @apply bg-red-100 opacity-70;
}
</style>
