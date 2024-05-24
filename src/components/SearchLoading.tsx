import { Skeleton } from './ui/skeleton';

const SearchLoading = () => {
  return (
    <div className='space-y-2'>
      <Skeleton className='h-[140px] rounded-sm' />
      <Skeleton className='h-6 w-full rounded-sm' />
      <Skeleton className='h-6 w-full rounded-sm' />
    </div>
  )
}

export default SearchLoading;
