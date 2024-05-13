import { Link } from 'react-router-dom';

const SearchResultInfo = ({ city, total }: { city?: string, total: number }) => {
  return (
     <div className='text-md md:text-lg font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row'>
      <span>
        {total} Restaurants found in <span className='capitalize'>{city?.toLowerCase()}</span>
        <Link
          to='/'
          className='ml-1 text-sm font-semibold underline cursor-pointer text-blue-500'
        >
          Change Location
        </Link>
      </span>
    </div>
  )
}

export default SearchResultInfo;
