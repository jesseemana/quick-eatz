import { Skeleton } from './ui/skeleton';
import { Separator } from './ui/separator';
import { AspectRatio } from './ui/aspect-ratio';

const RestaurantLoader = () => {
  return (
    <div className='space-y-4 container mt-2'>
      <AspectRatio ratio={16/4}>
        <Skeleton className='h-full bg-gray-100 rounded-none' />
      </AspectRatio>
      <Skeleton className='rounded-none md:h-6 h-4 w-[60%] bg-gray-100'/>
      <Skeleton className='rounded-none md:h-6 h-4 w-[40%] bg-gray-100'/>
      <Skeleton className='rounded-none md:h-6 h-4 w-[30%] bg-gray-100'/>
      <Separator />
      <div className='space-y-4'>
        <Skeleton className='rounded-none md:h-40 h-20 md:w-[40%] w-[60%] bg-gray-100'/>
        <Skeleton className='rounded-none md:h-40 h-20 md:w-[40%] w-[60%] bg-gray-100'/>
        <Skeleton className='rounded-none md:h-40 h-20 md:w-[40%] w-[60%] bg-gray-100'/>
        <Skeleton className='rounded-none md:h-40 h-20 md:w-[40%] w-[60%] bg-gray-100'/>
        <Skeleton className='rounded-none md:h-40 h-20 md:w-[40%] w-[60%] bg-gray-100'/>
        <Skeleton className='rounded-none md:h-40 h-20 md:w-[40%] w-[60%] bg-gray-100'/>
      </div>
    </div>
  )
}

export default RestaurantLoader;
