import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import confetti from 'canvas-confetti';

import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { withSetup } from '../../../utils/with-setup';
import { pokemonListFake } from '../../../data/fake-pokemons';

import { GameStatus } from '@/modules/pokemon/interfaces';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import { mountComposable } from '../../../utils/mount-composable'; // lo mismo que withSetup

const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: pokemonListFake,
});

// Sino mostraría un error de: Not implemented: HTMLCanvasElement's getContext() method: without installing the canvas npm package
// con los expect(confetti) de los últimos tests después
vi.mock('canvas-confetti', () => ({
  // oxlint-disable-next-line vitest/require-mock-type-parameters
  default: vi.fn(),
}));

// oxlint-disable-next-line jest/valid-describe-callback
describe('usePokemonGame', async () => {
  test('should initialize with the correct default values...', async () => {
    // const [results] = withSetup(usePokemonGame);
    const { result: results } = mountComposable(() => usePokemonGame());

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.isLoading.value).toBe(true);
    expect(results.pokemonOptions.value).toEqual([]);
    expect(results.randomPokemon.value).toBe(undefined);

    //La lógica dentro de onMounted resuelve promesas (como una llamada de red)
    // por eso se debe resolver los ticks de Vue o las promesas pendientes en el test usando await flushPromises() o await nextTick()
    await flushPromises();

    expect(results.isLoading.value).toBe(false);
    expect(results.pokemonOptions.value.length).toBe(4);
    expect(results.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });

  test('should correctly handle getNextRound', async () => {
    const [results] = withSetup(usePokemonGame); // lo mismo que mountComposable
    await flushPromises();

    results.gameStatus.value = GameStatus.Won;

    results.getNextRound(5);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.pokemonOptions.value).toHaveLength(5);
  });

  test('should correctly handle getNextRound and return different pokemons', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    const firstOptions = [...results.pokemonOptions.value].map((p) => p.name);

    results.getNextRound();

    const secondOptions = [...results.pokemonOptions.value];

    secondOptions.forEach((pokemon) => {
      expect(firstOptions).not.toContain(pokemon.name);
    });
  });

  test('should correctly handle a incorrect answer', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    const { checkAnswer, gameStatus } = results;

    expect(gameStatus.value).toBe(GameStatus.Playing);

    checkAnswer(100000000); // pokemon id inexistente.

    expect(gameStatus.value).toBe(GameStatus.Lost);
  });

  test('should correctly handle a correct answer', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    const { checkAnswer, gameStatus, randomPokemon } = results;

    expect(gameStatus.value).toBe(GameStatus.Playing);

    checkAnswer(randomPokemon.value.id); // pokemon id inexistente.

    expect(confetti).toHaveBeenCalled();
    expect(confetti).toHaveBeenCalledWith({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.6 },
    });
    expect(gameStatus.value).toBe(GameStatus.Won);
  });
});
