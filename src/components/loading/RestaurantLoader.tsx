import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';
import { AspectRatio } from '../ui/aspect-ratio';

const RestaurantLoader = () => {
  return (
    <div className='md:space-y-4 space-y-2 container mt-2 mb-8'>
      <div className='md:hidden'>
        <AspectRatio ratio={16/6}>
          <Skeleton className='h-full bg-gray-100 rounded-sm' />
        </AspectRatio>
      </div>
      <div className='hidden md:block'>
        <AspectRatio ratio={16/4}>
          <Skeleton className='h-full bg-gray-100 rounded-sm' />
        </AspectRatio>
      </div>
      <Skeleton className='rounded-none md:h-6 h-4 w-[30%] bg-gray-100'/>
      <Skeleton className='rounded-none md:h-6 h-4 w-[20%] bg-gray-100'/>
      <Skeleton className='rounded-none md:h-6 h-4 w-[35%] bg-gray-100'/>
      <Skeleton className='rounded-none md:h-6 h-4 w-[30%] bg-gray-100'/>
      <Separator />
      <div className='space-y-4'>
        {[...new Array(6)].map((_, index) => (
          <Skeleton 
            key={index} 
            className='rounded-none md:h-40 h-20 md:w-[40%] w-[60%] bg-gray-100' 
          />
        ))}
      </div>
    </div>
  );
}

export default RestaurantLoader;
