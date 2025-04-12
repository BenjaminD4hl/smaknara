const mockProducts = [
  {
    id: 'demo1',
    name: 'Ekologiska Ägg',
    category: 'Dairy',
    price: 45,
    image: '/images/eggs.jpg',
    tags: ['eco', 'organic'],
    diet: ['vegetarian'],
  },
  {
    id: 'demo2',
    name: 'Potatis',
    category: 'Vegetables',
    price: 30,
    image: '/images/potatoes.jpg',
    tags: ['local'],
    diet: ['vegan', 'gluten-free'],
  },
  {
    id: 'demo3',
    name: 'Havrebröd',
    category: 'Bakery',
    price: 35,
    image: '/images/bread.jpg',
    tags: ['organic'],
    diet: ['vegan'],
  }
];

export const producers = [
  {
    id: 'p1',
    name: 'Björns Äggfarm',
    lat: 59.31,
    lng: 18.02
  },
  {
    id: 'p2',
    name: 'Kåre Bröd & Korn',
    lat: 59.29,
    lng: 18.01
  }
];

export default mockProducts;
