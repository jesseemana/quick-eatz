import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useSearchRestaurant from '@/hooks/useSearchRestaurant';
import SearchBar from '@/components/SearchBar';
import PaginationSelector from '@/components/Pagination';
import SearchResultInfo from '@/components/SearchResultInfo';
import SearchResultCard from '@/components/SearchResultCard';


const SearchPage = () => {
  const { city } = useParams();

  const [searchState, setSearchState] = useState({
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch'
  })

  const { results, isLoading, } = useSearchRestaurant(city);

  if (isLoading) return <p className='pt-10 min-h-[500px]'>loading...</p>

  // if (!results?.data || !city) return <p className='pt-10 min-h-[500px]'>No results found</p>

  return (
    <div className='min-h-screen pt-16 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div id='cuisine-list' className='border border-red-400'>
        cuisines
      </div>
      <div id='main-content' className='border border-red-400'>
        <SearchBar 
          searchQuery={searchState.searchQuery}
          // onSubmit={setSearchQuery}
          // onReset={resetSearch} 
        />
        <div className='flex justify-between flex-col gap-3 lg:flex-row'>
          <SearchResultInfo 
            city={city} 
            total={results?.pagination.total} 
          />
        </div>

        {results?.data.map((restaurant) => (
          <SearchResultCard 
            key={restaurant._id} 
            restaurant={restaurant} 
          />
        ))}

        <PaginationSelector 
          page={results?.pagination.page}
          pages={results?.pagination.pages}
          // onPageChange={}
        />
      </div>
    </div>
  );
}

export default SearchPage;
