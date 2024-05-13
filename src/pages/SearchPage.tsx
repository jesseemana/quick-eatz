import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SearchForm } from '@/schemas/search';
import SearchBar from '@/components/SearchBar';
import PaginationSelector from '@/components/Pagination';
import SearchResultInfo from '@/components/SearchResultInfo';
import SearchResultCard from '@/components/SearchResultCard';
import useSearchRestaurants from '@/hooks/useSearchRestaurants';


export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};


const SearchPage = () => {
  const { city } = useParams();

  const [searchState, setSearchState] = useState({
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch',
  })

  const { results, isLoading, } = useSearchRestaurants(searchState, city);

  function setPage(page: number) {
    setSearchState(prev => ({
      ...prev,
      page,
    }))
  }

  function setSearchQuery(data: SearchForm) {
    setSearchState(prev => ({
      ...prev,
      searchQuery: data.searchQuery,
      page: 1,
    }));
  }

  function resetSearch() {
    setSearchState(prev => ({
      ...prev,
      searchQuery: '',
      page: 1,
    }));
  }

  return (
    <div className='min-h-screen pt-16 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div id='cuisine-list' className='border border-red-400 p-1'>
        cuisines
      </div>
      <div id='main-content' className='border border-red-400 p-1'>
        <SearchBar 
          onReset={resetSearch} 
          onSubmit={setSearchQuery}
          searchQuery={searchState.searchQuery}
        />
         
        {isLoading ? <p>loading...</p> : (
          <>
            <div className='flex justify-between flex-col gap-3 lg:flex-row'>
              {!results || !city ? (
                <SearchResultInfo 
                  total={0} 
                  city={city} 
                />
              ):(
                <SearchResultInfo 
                  city={city} 
                  total={results.pagination.total} 
                />
              )}
            </div>
          
            {!results || !city ? (
              <p className='text-center py-20'>No restaurants to display</p>
            ):(
              results.data.map(restaurant => (
                <SearchResultCard 
                  key={restaurant._id} 
                  restaurant={restaurant} 
                />
              ))
            )}
          </>
        )}

        {results && city && 
          <PaginationSelector 
            onPageChange={setPage}
            page={results.pagination.page}
            pages={results.pagination.pages}
          />
        }
      </div>
    </div>
  );
}

export default SearchPage;
