import american from '@/assets/American.png';
import asian from '@/assets/Asian.png';
import bakery from '@/assets/Bakery.png';
import bbq from '@/assets/BBQ.png';
import chicken from '@/assets/Chicken.png';
import chinese from '@/assets/Chinese.png';
import coffee from '@/assets/Coffee.png';
import dessert from '@/assets/Dessert.png';
import fastfood from '@/assets/FastFood.png';
import greek from '@/assets/Greek.png';
import halal from '@/assets/Halal.png';
import healthy from '@/assets/Healthy.png';
import indian from '@/assets/Indian.png';
import icecream from '@/assets/IceCream.png';
import italian from '@/assets/Italian.png';
import korean from '@/assets/Korean.png';
import mexican from '@/assets/Mexican.png';
import pizza from '@/assets/Pizza.png';
import salad from '@/assets/Salad.png';
import seafood from '@/assets/Seafood.png';
import sushi from '@/assets/Sushi.png';
import vegan from '@/assets/Vegan.png';
import wings from '@/assets/Wings.png';



import { Wallet } from 'lucide-react';
import { BookmarkX } from 'lucide-react';
import { LifeBuoy } from 'lucide-react';
import { Briefcase } from 'lucide-react';
import { Tag } from 'lucide-react';
import { UsersRound } from 'lucide-react';

export const links = [
  {
    id: 1,
    name: 'Orders',
    link: '/order-status',
    icon: BookmarkX,
  },
  {
    id: 3,
    name: 'Wallet',
    link: '#',
    icon: Wallet,
  },
  {
    id: 4,
    name: 'Meal plan',
    link: '#',
    icon: Briefcase,
  },
  {
    id: 5,
    name: 'Help',
    link: '#',
    icon: LifeBuoy,
  },
  {
    id: 6,
    name: 'Promotions',
    link: '#',
    icon: Tag,
  },
  {
    id: 7,
    name: 'Invite friends',
    link: '#',
    icon: UsersRound
  },
]


export const sortOptions = [
  {
    label: 'price',
    value: 'deliveryPrice'
  },
  {
    label: 'time',
    value: 'estimatedDeliveryTime'
  },
]


export const cuisines = [
  {
    name: 'American',
    icon: american,
  },
  {
    name: 'Asian',
    icon: asian,
  },
  {
    name: 'Fastfood',
    icon: fastfood,
  },
  {
    name: 'Breakfast',
    icon: bakery,
  },
  {
    name: 'Coffee',
    icon: coffee,
  },
  {
    name: 'Pizza',
    icon: pizza,
  },
  {
    name: 'Desserts',
    icon: dessert,
  },
  {
    name: 'Chinese',
    icon: chinese,
  },
  {
    name: 'BBQ',
    icon: bbq,
  },
  {
    name: 'Chicken',
    icon: chicken,
  },
  {
    name: 'Tacos',
    icon: greek,
  },
  {
    name: 'IceCream',
    icon: icecream,
  },
  {
    name: 'Healthy',
    icon: healthy,
  },
  {
    name: 'Indian',
    icon: indian,
  },
  {
    name: 'Italian',
    icon: italian,
  },
  {
    name: 'Halal',
    icon: halal,
  },
  {
    name: 'Mexican',
    icon: mexican,
  },
  {
    name: 'Noodles',
    icon: korean,
  },
  {
    name: 'Wings',
    icon: wings,
  },
  {
    name: 'Salads',
    icon: salad,
  },
  {
    name: 'Seafood',
    icon: seafood,
  },
  {
    name: 'Sushi',
    icon: sushi,
  },
  {
    name: 'Vegan',
    icon: vegan,
  },
]
