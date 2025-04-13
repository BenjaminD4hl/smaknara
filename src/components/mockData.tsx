export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  emoji: string;
  producerId: string;
}

export interface Producer {
  id: string;
  name: string;
  lat: number;
  lng: number;
  emoji: string;
}

export const producers: Producer[] = [
  { id: 'p1', name: 'Anna’s Eggs', lat: 59.31, lng: 18.01, emoji: '🥚' },
  { id: 'p2', name: 'Benny’s Berries', lat: 59.29, lng: 18.02, emoji: '🍓' },
  { id: 'p3', name: 'Carla’s Carrots', lat: 59.3, lng: 18.04, emoji: '🥕' },
  { id: 'p4', name: 'Dina’s Dairy', lat: 59.28, lng: 18.03, emoji: '🧀' },
  { id: 'p5', name: 'Erik’s Apples', lat: 59.32, lng: 18.05, emoji: '🍎' },
  { id: 'p6', name: 'Fia’s Fish', lat: 59.33, lng: 18.00, emoji: '🐟' },
];

export const mockProducts: Product[] = [
  { id: '1', name: 'Organic Eggs', price: 45, image: '/images/eggs.jpg', emoji: '🥚', producerId: 'p1' },
  { id: '2', name: 'Fresh Strawberries', price: 60, image: '/images/strawberries.jpg', emoji: '🍓', producerId: 'p2' },
  { id: '3', name: 'Sweet Carrots', price: 30, image: '/images/carrots.jpg', emoji: '🥕', producerId: 'p3' },
  { id: '4', name: 'Farmhouse Cheese', price: 75, image: '/images/cheese.jpg', emoji: '🧀', producerId: 'p4' },
  { id: '5', name: 'Red Apples', price: 35, image: '/images/apples.jpg', emoji: '🍎', producerId: 'p5' },
  { id: '6', name: 'Fresh Trout', price: 90, image: '/images/fish.jpg', emoji: '🐟', producerId: 'p6' },
  { id: '7', name: 'Potatoes', price: 25, image: '/images/potatoes.jpg', emoji: '🥔', producerId: 'p1' },
  { id: '8', name: 'Cherries', price: 55, image: '/images/cherries.jpg', emoji: '🍒', producerId: 'p2' },
  { id: '9', name: 'Broccoli', price: 40, image: '/images/broccoli.jpg', emoji: '🥦', producerId: 'p3' },
  { id: '10', name: 'Milk', price: 20, image: '/images/milk.jpg', emoji: '🥛', producerId: 'p4' },
  { id: '11', name: 'Pear', price: 30, image: '/images/pears.jpg', emoji: '🍐', producerId: 'p5' },
  { id: '12', name: 'Salmon', price: 120, image: '/images/salmon.jpg', emoji: '🍣', producerId: 'p6' },
];
