import { Skeleton } from '../ui/skeleton';

const SearchLoading = () => {
  return (
    <div className='px-2 pb-10 space-y-4'>
      <Skeleton className='h-8 w-[40%] rounded-none bg-gray-200' />
      <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {[...new Array(12)].map((_, index) => (
          <div 
            key={index} 
            className='space-y-4'
          >
            <Skeleton className='h-[140px] rounded-none bg-gray-200' />
            <Skeleton className='h-3 w-[60%] rounded-none bg-gray-200' />
            <Skeleton className='h-3 w-[40%] rounded-none bg-gray-200' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchLoading;
