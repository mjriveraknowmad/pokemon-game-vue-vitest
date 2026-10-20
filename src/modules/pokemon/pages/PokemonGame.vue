<script setup lang="ts">
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';

</script>

<template>
  <section v-if="false" class="flex flex-col items-center justify-center w-screen h-screen">
    <h1 class="text-3xl">
      Espere por favor
    </h1>
    <h3 class="animate-pulse">
      Cargando pokemons...
    </h3>
  </section>
  <section class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quién es este Pokemon?</h1>

    <PokemonPicture />

    <PokemonOptions />
  </section>
</template>
