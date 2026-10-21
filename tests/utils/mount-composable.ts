import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

/**
 * Para los tests. Monta un composable dentro de un componente de prueba para poder evaluarlo en un entorno controlado.
 * @param composable El composable que se desea montar y probar.
 * @returns Un objeto con el resultado del composable y el wrapper del componente de prueba.
 */
export function mountComposable<T>(composable: () => T) {
  let result: T;

  const TestComponent = defineComponent({
    setup() {
      result = composable();
      return () => null; // Render function vacía
    },
  });

  const wrapper = mount(TestComponent);

  return {
    result: result!,
    wrapper,
  };
}
