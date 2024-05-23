import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SearchForm } from '@/schemas/search';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import PaginationSelector from '@/components/Pagination';
import SearchResultInfo from '@/components/SearchResultInfo';
import SearchResultCard from '@/components/SearchResultCard';
import useSearchRestaurants from '@/hooks/useSearchRestaurants';
import CuisineFilter from '@/components/CuisineFilter';
import SortDropdown from '@/components/SortDropdown';
import SearchBar from '@/components/SearchBar';

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();

  useDocumentTitle(`Search Results - ${city}`)

  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch',
  })

  const { results, isLoading, } = useSearchRestaurants(searchState, city);

  const setPage = (page: number) => {
    setSearchState(prev => ({
      ...prev,
      page,
    }))
  }

  function setSelectedCuisines(selectedCuisines: string[]) {
    setSearchState(prev => ({
      ...prev,
      selectedCuisines,
      page: 1
    }))
  }

  function setSortOption(sortOption: string) {
    setSearchState(prev => ({
      ...prev,
      sortOption,
      page: 1,
    }))
  }

  function setSearchQuery(data: SearchForm) {
    setSearchState(prev => ({
      ...prev,
      searchQuery: data.searchQuery,
      page: 1,
    }));
  }

  // const resetSearch = () => {
  //   setSearchState(prev => ({
  //     ...prev,
  //     searchQuery: '',
  //     page: 1,
  //   }));
  // }

  return (
    <div className='min-h-[700px] md:pt-16 flex flex-col lg:grid lg:grid-cols-[250px_1fr] gap-5'>
      <div id='cuisine-list' className='p-1 pt-10 md:pt-4'>
        <CuisineFilter 
          isExpanded={isExpanded}
          onChange={setSelectedCuisines}
          selectedCuisines={searchState.selectedCuisines}
          onExpandedClick={() => setIsExpanded(prev => !prev)} 
        />
      </div>

      <div id='main-content' className='p-1 '>
        <SearchBar 
          onSubmit={setSearchQuery}
          searchQuery={searchState.searchQuery}
        />

        {isLoading ? <p>loading...</p> : (
          <>
            <div className='flex justify-between flex-col gap-3 md:flex-row'>
              <div>
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
              <SortDropdown 
                sortOption={searchState.sortOption} 
                onChange={(value) => setSortOption(value) } 
              />
            </div>
            {!results || !city ? (
              <p className='text-center py-20'>No results to display</p>
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
