import { useState } from 'react';
import { useParams } from 'react-router';
import SearchHeader from '@/components/SearchHeader';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { SearchForm } from '@/schemas/search';
import useSearchRestaurants from '@/hooks/useSearchRestaurants';
// import Footer from '@/components/Footer';


export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};


const SearchResults = () => {
  const { city } = useParams();

  useDocumentTitle('Search results');

  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch'
  })

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  function handleSearch(data: SearchForm) {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: data.searchQuery,
      page: 1
    }));
  }

  return (
    <div className='lg:container'>
      <SearchHeader 
        city={city} 
        searchState={searchState} 
        handleSearch={handleSearch}
      />
      {isLoading && <p>loading...</p>}
      {/* <Footer /> */}
    </div>
  )
}

export default SearchResults;
