import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';

import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { withSetup } from '../../../utils/with-setup';
import { pokemonListFake } from '../../../data/fake-pokemons';

import { GameStatus } from '@/modules/pokemon/interfaces';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import { mountComposable } from '../../../utils/mount-composable';

const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: pokemonListFake,
});

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
});
