import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import { mount } from '@vue/test-utils';

describe('<PokemonPicture />', () => {
  test('should render the hidden image when showPokemon prop is false', () => {
    const pokemonId = 25;
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId,
        showPokemon: false,
      },
    });
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.classes()).toContain('brightness-0');
    expect(img.attributes('src')).toBe(url);
  });

  test('should render the image when showPokemon prop is true', () => {
    const pokemonId = 25;
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId,
        showPokemon: true,
      },
    });
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
    console.log(wrapper.html());
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    // expect(img.classes()).toContain('fade-in');
    // expect(img.attributes('src')).toBe(url);

    const attributes = img.attributes();
    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'fade-in h-[200px]',
        src: url,
      }),
    );
  });
});
