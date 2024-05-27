import { Dot } from 'lucide-react';
import { Restaurant } from '@/types';
import { Link } from 'react-router-dom';
import { AspectRatio } from './ui/aspect-ratio';
import HeartButton from './HeartButton';

const SearchResultCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant._id}`}>
      <AspectRatio ratio={16/7}>
        <img 
          src={restaurant.imageUrl}
          alt='restaurant banner' 
          loading='lazy'
          className='rounded-xl h-full w-full object-cover'
        />
        <div className='absolute top-2 right-3'>
          <HeartButton restaurantId={restaurant._id} />
        </div>
      </AspectRatio>
      <p className='font-semibold text-xl capitalize text-gray-800'>
        {restaurant.restaurantName}
      </p>
      <span className='flex items-center text-gray-900 md:text-[10px] text-sm lg:text-sm capitalize tracking-tight'>
        <span>MWK{(restaurant.deliveryPrice/100)} delivery fee</span>
        <Dot className='px-0 text-gray-700' /> 
        <span className='flex items-center space-x-1 text-gray-500'>
          {restaurant.deliveryMin}-{restaurant.deliveryMax}min
        </span>
      </span>
    </Link>
  );
}

export default SearchResultCard;
