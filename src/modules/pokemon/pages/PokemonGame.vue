<script setup lang="ts">
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { gameStatus, isLoading, randomPokemon, pokemonOptions, checkAnswer } = usePokemonGame();

</script>

<template>
  <section v-if="isLoading || !randomPokemon?.id" class="flex flex-col items-center justify-center w-screen h-screen">
    <h1 class="text-3xl">
      Espere por favor
    </h1>
    <h3 class="animate-pulse">
      Cargando pokemons...
    </h3>
  </section>
  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quién es este Pokemon?</h1>

    <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" />

    <PokemonOptions :options="pokemonOptions" @selected-option="checkAnswer" />
  </section>
</template>
