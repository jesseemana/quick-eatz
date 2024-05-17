import { Dot } from 'lucide-react';
import { Restaurant } from '@/types';
import { Separator } from './ui/separator';


const RestaurantInfo = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <div className='space-y-2 capitalize'>
      <p className='md:text-4xl font-bold text-xl'>{restaurant.restaurantName}</p>
      <p className='md:text-lg font-semibold'>
        {restaurant.city}, {restaurant.country}
      </p>
      <div className='flex gap-8 flex-col md:flex-row'>
        <p className='flex'>
          {restaurant.cuisines.map((cuisine, index) => (
            <span key={cuisine} className='flex'>
              <span className='text-gray-600 text-[16px]'>{cuisine}</span>
              {index < restaurant.cuisines.length - 1 && <Dot />}
            </span>
          ))}
        </p>
        <div className='border py-2 px-4 rounded-md ml-2 flex w-full justify-center md:justify-end'>
          <div className='flex gap-4 md:items-end'>
            <div className='flex flex-col items-center'>
              <span className='font font-semibold'>delivery time</span>
              <span className='text-gray-800 font-semibold'>
                Mon - Sat: 
                <span className='font-normal ml-1'>09:00AM - 10:00PM</span>
              </span>
            </div>
            <Separator orientation='vertical' />
            <div className='flex flex-col items-center'>
              <span className='font-semibold text-sm'>delivery price</span>
              <span className='text-gray-600 font-semibold'>${restaurant.deliveryPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantInfo;
