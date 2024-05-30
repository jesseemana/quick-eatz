import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCity } from '@/context/CityProvider';
import { useSearchState } from '@/context/SearchQueryProvider';
import SearchLoading from '@/components/SearchLoading';
import SortDropdown from '@/components/SortDropdown';
import BestMatch from '@/components/BestMatch';
import Cuisines from '@/components/Cuisines';
import SearchResultCard from '@/components/SearchResultCard';
import PaginationSelector from '@/components/Pagination';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import useSearchRestaurants from '@/hooks/useSearchRestaurants';
import { restaurants } from '@/constants/constants';


const SearchResults = () => {
  const { city } = useParams();
  const { setCity } = useCity();
  const { searchState, setPage, setSortOption, setSelectedCuisines } = useSearchState();
  const { results, isLoading } = useSearchRestaurants(searchState, city);
  const [checked, setChecked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useDocumentTitle('Search results');

  useEffect(() => {
    if (city) { setCity(city) }
  }, [city, setCity]);

  const toggleBestMatch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((prev) => !prev);
    setSortOption(e.target.value);
  }

  return (
    <div className='md:container mx-auto space-y-4'>
      <div className='space-y-4 px-2'>
        <Cuisines 
          onChange={setSelectedCuisines} 
          selectedCuisines={searchState.selectedCuisines} 
        />
        <div className='flex items-center'>
          <BestMatch 
            checked={checked} 
            toggleBestMatch={toggleBestMatch} 
          />
          <SortDropdown 
            isExpanded={isExpanded} 
            onChange={(value) => setSortOption(value)} 
            onExpand={() => setIsExpanded((prev) => !prev)} 
          />
        </div>
      </div>
      {isLoading ? <SearchLoading /> : (
        <div className='space-y-4'>
          <p className='px-2 text-gray-800 font-semibold lg:text-2xl text-xl'>
            Results for <span className='capitalize'>{city}</span>
          </p>
          <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-8 p-2 lg:min-h-[700px] xl:min-h-[400px]'>
            {restaurants.map((restaurant) => (
              <SearchResultCard 
                key={restaurant._id} 
                restaurant={restaurant} 
              />
            ))}
          </div>
          <PaginationSelector 
            page={searchState.page}
            pages={3} 
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}

export default SearchResults;
