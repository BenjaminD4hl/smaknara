export const producers = [
  {
    id: 1,
    name: 'Lilla Gården',
    lat: 59.3293,
    lng: 18.0686,
    products: [
      {
        id: 101,
        name: 'Ekologiska ägg (12 st)',
        price: 35,
        image: 'https://images.unsplash.com/photo-1614695791642-54d925f2b571?auto=format&fit=crop&w=600&h=400&q=80', // eggs
        tags: ['eco', 'organic'],
      },
      {
        id: 102,
        name: 'Potatis (1kg)',
        price: 15,
        image: 'https://images.unsplash.com/photo-1601987077955-3ccde507f290?auto=format&fit=crop&w=600&h=400&q=80', // real potatoes
        tags: ['local'],
      },
    ],
  },
  {
    id: 2,
    name: 'Björnens Honung',
    lat: 59.3325,
    lng: 18.0649,
    products: [
      {
        id: 201,
        name: 'Lokal honung (350g)',
        price: 45,
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1ee6980?auto=format&fit=crop&w=600&h=400&q=80', // honey
        tags: ['honey', 'eco'],
      },
    ],
  },
];
