import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCity } from '@/context/CityProvider';
import { useSearchState } from '@/context/SearchQueryProvider';
import SearchLoading from '@/components/loading/SearchLoading';
import SortDropdown from '@/components/search/SortDropdown';
import BestMatch from '@/components/search/BestMatch';
import Cuisines from '@/components/search/Cuisines';
import SearchResultCard from '@/components/search/SearchResultCard';
import PaginationSelector from '@/components/search/Pagination';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import useSearchRestaurants from '@/hooks/useSearchRestaurants';


const SearchResults = () => {
  const { city } = useParams();
  const { setCity } = useCity();
  const { searchState, setPage, setSortOption, setSelectedCuisines } = useSearchState();
  const { results, isLoading } = useSearchRestaurants(searchState, city);
  
  const [checked, setChecked] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useDocumentTitle('Search results');

  useEffect(() => {
    setCity(city as string);
  }, [city, setCity]);

  function toggleBestMatch(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(prev => !prev);
    if (checked){ setSortOption(e.target.value) }
  }

  function toggleDropdown(value: string) {
    setChecked(false);
    setSortOption(value)
  }

  return (
    <div className='lg:container mx-auto space-y-4'>
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
            onChange={toggleDropdown} 
            onExpand={() => setIsExpanded(prev => !prev)} 
          />
        </div>
      </div>
      {isLoading ? <SearchLoading /> : (
        <div className='space-y-4'>
          <p className='px-2 text-gray-800 font-semibold lg:text-2xl text-xl'>
            Results for <span className='capitalize'>{city}</span>
          </p>
          {!results ? (
            <p className='text-gray-600 capitalize grid place-items-center py-40'>
              no results found
            </p>
            ):(
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-8 p-2 lg:min-h-[700px] xl:min-h-[400px]'>
              {results.data.map((restaurant) => (
                <SearchResultCard 
                  key={restaurant._id} 
                  restaurant={restaurant} 
                />
              ))}
            </div>
          )}
          <PaginationSelector 
            onPageChange={setPage}
            page={searchState.page}
            pages={results?.pagination.pages as number}
          />
        </div>
      )}
    </div>
  );
}

export default SearchResults;
