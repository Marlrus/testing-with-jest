# Unit Testing con Jest en React

Curso de Platzi con Oscar Barajas Tavares [Unit Testing con Jest en React](https://platzi.com/clases/1788-jest/25125-bienvenido-al-curso-de-jest/)

## Introduccion a Unit Testing

Verificar que tu código esta devolviendo lo que necesitas que devuelva. Hay pruebas funcionales y no funcionales. Las funcionales usan pruebas unitarias que usan pequeñas fracciones de código. En desarrollo web tenemos que ver que cada una de las secciones de la pagina e interacciones con el usuario cumplan lo que necesitamos. Con UT vamos a trabajar con Jest. Jest trabaja con todos los frameworks y muchas herramientas adicionales. No requiere tanta configuración y tiene bastante documentación. Es potente, fácil de usar, y rápido. Con el coverage se genera un reporte de cuanto código estamos probando y nos permite hacer _mocks_.

## Preparar el entorno con Jest

Iniciamos un proyecto con `npm init` donde corremos `yarn add jest -D` Adentro creamos un src/ dir y adentro de ese creamos un **\_\_test\_\_** dir con un archivo de nombre **globalt.test.js** que lo coloca por fuera del flujo de nuestros archivos JS normales. Esto es clave para que Jest sepa que este archivo se va a utilizar para las pruebas.

### Probando strings

Usamos una función llamada **test** que es la que hace nuestras pruebas y toma dos argumentos, el primero es la **descripción** y la segunda es el **callback** que tiene la función que vamos a estar probando. Adentro utilizamos las funciones **expect** y **toMatch** que se explican solas.

```javascript
const text = 'Hello World!';

test('Debe contener un texto', () => {
  expect(text).toMatch(/World/);
});
```

Para correr las pruebas corremos `yarn test`, pero este nos envía un mensaje de error porque en nuestro **package.json** no tenemos un comando para las pruebas sino solo un echo que nos devuelve el mensaje de error. Para esto tenemos que **configurar** nuestro script de pruebas. Para configurarlo solo tenemos que cambiar el comando a `"test": "jest"`. Al correrlo podemos ver que nuestra prueba paso y vamos a ver la descripción que usamos en la función **test** al lado de nuestra prueba, lo que nos va a ayudar a verificar que nuestra prueba se cumplió apropiadamente.

## Probando Boolean, Array, y Callbacks

Creamos un Array de fruitas, y creamos nuestra prueba para ver si una de las frutas que estamos buscando esta en el Array. Esto se hace con la función **toContain** en nuestro expect, que es igual a **includes** de JS. Utilizamos **toBeGreaterThan** para probar un numero, y utilizamos **toBeTruthy** para probar un boolean. Para probar el callback lo que cambia es que tenemos que utilizarlo en el CB de nuestro **test** y adentro cuando llamamos nuestra función usamos el **expect.toBe** para verificar que la función esta haciendo lo que necesitamos que haga.

```javascript
const fruits = ['manzana', 'melon', 'banana'];

test('Temeos banana?', () => {
  expect(fruits).toContain('banana');
});

test('Mayor que', () => {
  expect(10).toBeGreaterThan(9);
});

test('Verdadero', () => {
  expect(true).toBeTruthy();
});

const reverseString = (str, callback) => {
  callback(str.split('').reverse().join(''));
};

test('Probar Callback', () => {
  reverseString('hola', str => {
    expect(str).toBe('aloh');
  });
});
```

En estas pruebas podemos ver que las cosas son bastante obvias, mi única critica es que mi IDE no esta recibiendo ningún tipo de **intellisense** cuando estoy corriendo mis pruebas. Esto debe tener alguna solución sencilla. Voy a intentar una prueba cambiando nuestra función para que sea algo razonable que no utiliza callbacks:

```javascript
const reverseString = str => str.split('').reverse().join('');

test('Probar Fn', () => {
  expect(reverseString('hola')).toBe('aloh');
});
```

Al probarla de esa forma funciona como es esperado.

### Intellisense con Jest

Lo único que tocaba hacer era instalar los tipos para Jest con `yarn add -D @types/jest` y se crea el soporte así se este trabajando con JS nada mas.

## Pruebas con Promesas y Async Await

Las pruebas con promesas funcionan similar a las de callback, a excepción de que tenemos que hacer el uso de **expects** dentro de el **then**. Con async/await es igual, solo se agrega **async** al CB de test y la forma mas fácil es guardar el **return** de la promesa en una variable y utilizarla en nuestro **expect**. De igual manera se puede utilizar el await adentro de **expect** y obtenemos el resultado esperado de igual forma:

```javascript
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
```

Acá las cosas funcionan exactamente como esperamos.

### afterEach, afterAll, beforeEach, beforeAll

Estas son funciones que se ejecutan como dice cada una de ellas y nos permite utilizar código en diferentes periodos de nuestras pruebas.

```javascript
afterEach(() => console.log('Despues de cada prueba.'));
afterAll(() => console.log('Despues de todas las pruebas'));

beforeEach(() => console.log('Antes de cada prueba'));
beforeAll(() => console.log('Antes de todas las pruebas'));
```

Funciona exactamente como dicen las funciones.

## Watch y Coverage

En esta sección vamos a trabajar sobre el archivo **index.js** que creamos anteriormente. Adentro creamos un Array de ciudades y una función que usa Math.floor y random para escoger una ciudad aleatoria de nuestro Array. Exportamos esa función y _creamos un archivo dentro de nuestro dir de pruebas_ **index.test.js**. Como no estamos usando un compilador, no se puede utilizar el sintaxis de **import** por lo cual utilice **module.exports**. Al correr esta función probamos algo muy flojo, y es que lo que retorne la función sea un string...

```javascript
const randomCity = require('../index');

test('Probar la funcionalidad', () => {
  expect(typeof randomCity()).toBe('string');
});
```

Esto no nos asegura que lo que esta función retorna es una ciudad de las de nuestro Array, sino simplemente que se retorna un string, algo que se podría verificar con mucha mas facilidad y precisión utilizando **TypeScript**. Corremos la prueba y recibimos los resultados de todas las pruebas, que con las funciones de logging que tenemos, es bastante verboso.

### Correr Tests Especificos

Una forma de lograr esto es corriendo Jest en el archivo `jest src/... fileName`, Oscar sugiere instalar Jest globalmente para que este comando funcione, sin embargo a mi me funciona sin tener que instalarlo globalmente y si me tocara, buscaría una alternativa para no tener que hacerlo.

Entre a los DOCS de Jest y encontré opciones para un archivo de configuración, el cual cree en JS como **jest.config.js** en el cual solo coloque dos opciones, _verbose, collectCoverage_. Des afortunadamente no encontré lo que estaba buscando. Leyendo mas encontré que hay opciones de Jest en el CLI.

### jest -o

Un comando del CLI que usa el flag **-o** el cual corre las pruebas relacionadas a cambios basados en **git**. Esto quiere decir que solamente corre tests en archivos que cambiaron segun el punto de referencia de git. Si nosotros hacemos un commit y corremos pruebas, ninguna correra porque no hay cambios en los ojos de Jest. Si creamos cambios, entonces las pruebas correrán en los archivos que cambiaron. Esta opcion se puede correr de dos maneras: `yarn test -o` o cambiando el package.json:

```json
"scripts": {
  "test": "jest -o",
  "testAll": "jest"
},
```

Esta fue mi solución, ahora si quiero correr todas las pruebas o correr un archivo en especifico uso el comando **testAll** y si quiero correr pruebas solo en los archivos que cambia utilizo **test**. Mas acerca de las opciones en [Jest CLI Options DOCS](https://jestjs.io/docs/en/cli.html#--onlychanged)

### describe

Describe nos permite crear bloques de pruebas. Es una funcion que encapsula nuestras funciones test y las coloca dentro de la misma _suite_ de tests. Tiene la misma estructura de test con la descripcion y el callback y al correrla vemos que es lo que se esta probando en ese bloque y si funciono o no.

### -- watch

Podemos colocar un flag de --watch en nuestras pruebas que va a hacer que nuestras pruebas se corran cada vez que salvamos. Me parece una herramienta útil siempre y cuando no se demoren excesivamente las pruebas en correr porque nos frenaría la productividad.

### -- coverage

Al utilizar coverage recibimos mas información en el CLI, pero también creamos una carpeta con varios archivos que generan un reporte que podemos abrir en nuestro navegador, que utiliza HTML. Esto lo coloque automático con mi **jest.config.js**.
