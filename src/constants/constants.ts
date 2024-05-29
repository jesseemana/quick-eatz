import img1 from '@/assets/restaurant(1).webp';
import img2 from '@/assets/restaurant(2).webp';
import img3 from '@/assets/restaurant(3).webp';
import img4 from '@/assets/restaurant(4).webp';
import img5 from '@/assets/restaurant(5).webp';
import img6 from '@/assets/restaurant(6).webp';
import img7 from '@/assets/restaurant(7).webp';
import img8 from '@/assets/restaurant(8).webp';
import { Restaurant } from '@/types';

export const restaurants = [
  {
    _id: '638919710ba78a0914',
    imageUrl: img1,
    restaurantName: 'Test Restaurant 1',
    deliveryPrice: 100000,
    deliveryMin: 10,
    deliveryMax: 30
  },
  {
    _id: '638919710ba78b0981',
    imageUrl: img2,
    restaurantName: 'Test Restaurant 2',
    deliveryPrice: 350000,
    deliveryMin: 10,
    deliveryMax: 20
  },
  {
    _id: '638919710ba78c4091',
    imageUrl: img3,
    restaurantName: 'Test Restaurant 3',
    deliveryPrice: 280000,
    deliveryMin: 20,
    deliveryMax: 40
  },
  {
    _id: '638919710ba78d01431',
    imageUrl: img4,
    restaurantName: 'Test Restaurant 4',
    deliveryPrice: 170000,
    deliveryMin: 10,
    deliveryMax: 30
  },
  {
    _id: '638919710ba78e109a1',
    imageUrl: img5,
    restaurantName: 'Test Restaurant 5',
    deliveryPrice: 90000,
    deliveryMin: 10,
    deliveryMax: 30
  },
  {
    _id: '638919710ba78f0971',
    imageUrl: img6,
    restaurantName: 'Test Restaurant 6',
    deliveryPrice: 90000,
    deliveryMin: 10,
    deliveryMax: 30
  },
  {
    _id: '638919710ba78g314',
    imageUrl: img7,
    restaurantName: 'Test Restaurant 7',
    deliveryPrice: 90000,
    deliveryMin: 10,
    deliveryMax: 30
  },
  {
    _id: '638919710ba78h791',
    imageUrl: img8,
    restaurantName: 'Test Restaurant 8',
    deliveryPrice: 90000,
    deliveryMin: 10,
    deliveryMax: 30
  },
]

export const restaurant: Restaurant = {
  _id: '90709809198sf90akjaz78',
  user: '897109rj1gs989asf9100',
  restaurantName: 'New Ho King',
  city: 'toronto',
  country: 'canada',
  delivery: true,
  deliveryPrice: 200000,
  deliveryMin: 10,
  deliveryMax: 30,
  deliveryTime: 30,
  estimatedDeliveryTime: 20,
  cuisines: ['chinese', 'fastfood', 'noodles', 'vegan', 'american'],
  menuItems: [
    {
      _id: 'random_id_1',
      name: 'kendrick lamar special',
      ingridients: 'Fried rice, dip sauce, blammy.',
      price: 1500
    },
    {
      _id: 'random_id_2',
      name: 'hot wings',
      ingridients: 'Fried chicken, chilli sauce, chips, pepsi or coke.',
      price: 200
    },
    {
      _id: 'random_id_3',
      name: 'magherita pizza',
      ingridients: 'Tomato, mozarella, basil & olive oil.',
      price: 1000
    },
    {
      _id: 'random_id_4',
      name: 'calamari fritti',
      ingridients: 'Deep fried calamari, smoked paprika, olives & preserved lemon.',
      price: 1200
    },
    {
      _id: 'random_id_5',
      name: 'bacon & avo & feta pizza',
      ingridients: 'Tomato, mozarella, bacon, avocadp & feta.',
      price: 1200
    },
    {
      _id: 'random_id_6',
      name: 'melanzane parmigiana',
      ingridients: 'Aurbegine, mozarella, napolitana & basil aioli.',
      price: 1480
    },
  ],
  imageUrl: '',
  lastUpdated: '2024-05-13',
}

export const links = [
  {
    id: 1,
    name: 'orders',
    link: '/order-status'
  },
  {
    id: 2,
    name: 'profile',
    link: '/user'
  },
  {
    id: 3,
    name: 'restaurant',
    link: '/manage-restaurant'
  },
]

export const main_links = [
  {
    id: 1,
    title: 'profile',
    link: '/user'
  },
  {
    id: 2,
    title: 'orders',
    link: '/my-orders'
  },
  {
    id: 3,
    title: 'restaurant',
    link: '/my-restaurant'
  },
]

export const sortOptions = [
  // {
  //   label: 'Best Match',
  //   value: 'bestMatch'
  // },
  {
    label: 'price',
    value: 'deliveryPrice'
  },
  {
    label: 'time',
    value: 'estimatedDeliveryTime'
  },
]

export const cuisine_list = [
  'American',
  'BBQ',
  'Breakfast',
  'Burgers',
  'Cafe',
  'Chinese',
  'Desserts',
  'French',
  'Fastfood',
  'Greek',
  'Healthy',
  'Indian',
  'Italian',
  'Japanese',
  'Mexican',
  'Noodles',
  'Organic',
  'Pasta',
  'Pizza',
  'Salads',
  'Seafood',
  'Spanish',
  'Steak',
  'Sushi',
  'Tacos',
  'Vegan',
];
