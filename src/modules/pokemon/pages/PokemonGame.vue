<script setup lang="ts">
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { gameStatus, isLoading, randomPokemon, pokemonOptions, checkAnswer, getNextRound } = usePokemonGame();

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

    <div class="h-20">
      <button v-if="gameStatus !== GameStatus.Playing" @click="getNextRound(4)"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-all">
        ¿Jugar de nuevo?
      </button>
    </div>

    <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" />

    <PokemonOptions :options="pokemonOptions" :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemon?.id || 0" @selected-option="checkAnswer" />
  </section>
</template>
