const randomCity = require('../index');

describe('Probar funcionalidades de randomCity', () => {
  test('Probar la funcionalidad', () => {
    expect(typeof randomCity()).toBe('string');
  });
  test('Comprobar que no existe una ciudad', () => {
    expect(randomCity()).not.toMatch(/Cordoba/);
  });
});
