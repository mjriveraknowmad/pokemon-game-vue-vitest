import { mount } from '@vue/test-utils';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';

const options = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Ivysaur' },
  { id: 3, name: 'Venusaur' },
];

const props = { options, blockSelection: false, correctAnswer: 1 };

describe('<PokemonOptions />', () => {
  test('should render buttons with correct text', () => {
    const wrapper = mount(PokemonOptions, { props });

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(options.length);

    buttons.forEach((button, index) => {
      expect(button.attributes('class')).toBe(
        'capitalize disabled:shadow-none disabled:bg-gray-100',
      );
      expect(button.text()).toBe(options[index]?.name);
    });
  });

  test('should emit selectedOption event when a button is clicked', async () => {
    const wrapper = mount(PokemonOptions, { props });

    const [b1, b2, b3] = wrapper.findAll('button');

    await b1?.trigger('click');
    await b2?.trigger('click');
    await b3?.trigger('click');

    expect(wrapper.emitted().selectedOption).toBeTruthy();
    expect(wrapper.emitted().selectedOption?.[0]).toEqual([1]);
    expect(wrapper.emitted().selectedOption?.[1]).toEqual([2]);
    expect(wrapper.emitted().selectedOption?.[2]).toEqual([3]);
  });
});
