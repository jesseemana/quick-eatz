import { Restaurant } from '@/types';
import { Separator } from './ui/separator';
import { Dot, ShoppingBasket, } from 'lucide-react';

const RestaurantInfo = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <div className='space-y-2'>
      <p className='md:text-4xl font-bold text-xl capitalize'>{restaurant.restaurantName}</p>
      <p className='md:text-lg text-gray-700 capitalize'>
        {restaurant.city}, {restaurant.country}
      </p>
      <div className='flex gap-2 flex-col md:flex-row'>
        <div className='flex flex-col w-[500px]'>
          <p className='flex flex-wrap capitalize'>
            {restaurant.cuisines.map((cuisine, index) => (
              <span key={cuisine} className='flex items-center'>
                <span className='text-gray-700 text-[12px] md:text-[14px]'>{cuisine}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </p>
          <div className='flex gap-1 py-2 items-center'>
            <ShoppingBasket 
              size={20} 
              className='text-gray-900' 
            /> 
            <p className='text-gray-700'>
              {restaurant.delivery 
                ? <span className='flex md:gap-1 text-[14px] md:text-[16px] items-center'>Delivery
                    <span className='ml-1 flex md:hidden'>:</span>
                    <span className='hidden md:flex'>available</span> 
                    <span className='flex ml-2 items-center text-[12px] md:hidden'>
                      <span>{restaurant.deliveryTime}</span> 
                      <Dot />
                      <span>${restaurant.deliveryPrice}</span>
                    </span>
                  </span> 
                : 'Delivery unavailable'
              }
            </p>
          </div>
        </div>
        <div className='border py-2 px-4 rounded-md ml-2 md:flex flex-1 w-full justify-center md:justify-end hidden'>
          <div className='flex gap-2 md:items-end'>
            <div className='flex flex-col items-center'>
              <p className='font-semibold capitalize'>delivery time</p>
              <p className='text-gray-700 text-[14px]'>
                {restaurant.delivery 
                  ? restaurant.deliveryTime 
                  : 'unavailable'
                }
              </p>
            </div>
            <Separator orientation='vertical' />
            <div className='flex flex-col items-center'>
              <p className='font-semibold capitalize'>pricing & fees</p>
              <p className='text-gray-700 text-[14px]'>
                {restaurant.delivery 
                  ? `$${restaurant.deliveryPrice}` 
                  : 'unavailable'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantInfo;
