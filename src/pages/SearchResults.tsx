import { useState } from 'react';
import { useParams } from 'react-router';
import { SearchForm } from '@/schemas/search';
import Footer from '@/components/Footer';
import SearchHeader from '@/components/SearchHeader';
import SearchLoading from '@/components/SearchLoading';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import useSearchRestaurants from '@/hooks/useSearchRestaurants';


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

  if (isLoading) return (
    <div className='md:container'>
      <SearchHeader 
        city={city} 
        searchState={searchState} 
        handleSearch={handleSearch}
      />
      <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {[...new Array(16)].map((_, index) => <SearchLoading key={index} />) }
      </div>
      <Footer />
    </div>
  )

  return (
    <div className='md:container'>
      <SearchHeader 
        city={city} 
        searchState={searchState} 
        handleSearch={handleSearch}
      />
      <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 min-h-[700px] xl:min-h-[400px]'>
        <p>search results</p>
      </div>
      <Footer />
    </div>
  )
}

export default SearchResults;
