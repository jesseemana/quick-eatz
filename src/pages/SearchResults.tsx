import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCity } from '@/context/CityProvider';
import { useSearchState } from '@/context/SearchQueryProvider';
import SearchLoading from '@/components/SearchLoading';
import SortDropdown from '@/components/SortDropdown';
import BestMatch from '@/components/BestMatch';
import PaginationSelector from '@/components/Pagination';
import SearchHeader from '@/components/SearchHeader';
import SearchResultCard from '@/components/SearchResultCard';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import useSearchRestaurants from '@/hooks/useSearchRestaurants';
import Footer from '@/components/Footer';
import { restaurants } from '@/constants/constants';


const SearchResults = () => {
  const { city } = useParams();
  const { setCity } = useCity();
  const { searchState, handleSearch, setPage, setSortOption, } = useSearchState();
  const { results, isLoading } = useSearchRestaurants(searchState, city);
  const [checked, setChecked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useDocumentTitle('Search results');

  useEffect(() => {
    if (city) { setCity(city) }
  }, [city, setCity]);

  // const isLoading = false

  const toggleBestMatch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((prev) => !prev)
    setSortOption(e.target.value);
  }

  return (
    <div className='md:container'>
      <SearchHeader 
        city={city} 
        searchState={searchState} 
        handleSearch={handleSearch}
      />
      {isLoading ? <SearchLoading /> : (
        <div className='space-y-4'>
          <div className='flex items-center px-4'>
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
          <p className='px-4 text-gray-800 font-semibold lg:text-2xl text-xl'>
            Results for <span className='capitalize'>{city}</span>
          </p>
          <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 lg:min-h-[700px] xl:min-h-[400px]'>
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
      <Footer />
    </div>
  );
}

export default SearchResults;
