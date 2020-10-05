const cities = [
  'Ciudad de Mexico',
  'Bogota',
  'Lima',
  'Buenos Aires',
  'Guadalajara',
];

const randomCity = () => {
  const city = cities[Math.floor(Math.random() * cities.length)];
  return city;
};

module.exports = randomCity;
