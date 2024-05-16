import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dot } from 'lucide-react';
import { Restaurant } from '@/types';

const RestaurantInfo = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Card className='border-sla mt-8 rounded-sm w-full'>
      <CardHeader>
        <CardTitle className='text-xl md:text-3xl font-bold tracking-tight capitalize'>
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription className='capitalize text-sm'>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-wrap'>
        {restaurant.cuisines.map((item, index) => (
          <div 
            key={item} 
            className='flex'
          >
            <span className='capitalize'>{item}</span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RestaurantInfo;
