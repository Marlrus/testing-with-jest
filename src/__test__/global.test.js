const text = 'Hello World!';
const fruits = ['manzana', 'melon', 'banana'];

test('Debe contener un texto', () => {
  expect(text).toMatch(/World/);
});

test('Temeos banana?', () => {
  expect(fruits).toContain('banana');
});

test('Mayor que', () => {
  expect(10).toBeGreaterThan(9);
});

test('Verdadero', () => {
  expect(true).toBeTruthy();
});

const reverseStringCB = (str, callback) => {
  callback(str.split('').reverse().join(''));
};

test('Probar Callback', () => {
  reverseStringCB('hola', str => {
    expect(str).toBe('aloh');
  });
});

const reverseString = str => str.split('').reverse().join('');

test('Probar Fn', () => {
  expect(reverseString('hola')).toBe('aloh');
});

const reverseStringPromsie = str => {
  return new Promise((res, rej) => {
    if (!str) rej(Error('Error'));
    res(str.split('').reverse().join(''));
  });
};

test('Probar una promesa', () => {
  reverseStringPromsie('Hola').then(str => {
    expect(str).toBe('aloH');
  });
});

test('Probar async/await', async () => {
  const str = await reverseStringPromsie('hola');
  expect(str).toBe('aloh');
});

afterEach(() => console.log('Despues de cada prueba.'));
afterAll(() => console.log('Despues de todas las pruebas'));

beforeEach(() => console.log('Antes de cada prueba'));
beforeAll(() => console.log('Antes de todas las pruebas'));
