import { Skeleton } from './ui/skeleton';

const SearchLoading = () => {
  return (
    <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
      {[...new Array(16)].map((_, index) => (
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
  )
}

export default SearchLoading;
