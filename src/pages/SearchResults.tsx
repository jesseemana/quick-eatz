import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SearchForm } from '@/schemas/search';
import Footer from '@/components/Footer';
import SearchHeader from '@/components/SearchHeader';
import SearchLoading from '@/components/SearchLoading';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import SearchResultCard from '@/components/SearchResultCard';
import useSearchRestaurants from '@/hooks/useSearchRestaurants';

import img1 from '@/assets/restaurant1.jpg';
import img2 from '@/assets/restaurant2.jpg';
import img3 from '@/assets/restaurant3.jpg';
import { useCity } from '@/context/CityProvider';

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};


const restaurants = [
  {
    _id: '638919710ba78a',
    image: img1,
    name: 'Test Restaurant 1',
    deliveryPrice: 100000,
    deliveryMin: 10,
    deliveryMax: 30
  },
  {
    _id: '638919710ba78b',
    image: img2,
    name: 'Test Restaurant 2',
    deliveryPrice: 350000,
    deliveryMin: 10,
    deliveryMax: 20
  },
  {
    _id: '638919710ba78c',
    image: img3,
    name: 'Test Restaurant 3',
    deliveryPrice: 280000,
    deliveryMin: 20,
    deliveryMax: 40
  },
  {
    _id: '638919710ba78d',
    image: img1,
    name: 'Test Restaurant 4',
    deliveryPrice: 170000,
    deliveryMin: 10,
    deliveryMax: 30
  },
  {
    _id: '638919710ba78e',
    image: img2,
    name: 'Test Restaurant 5',
    deliveryPrice: 90000,
    deliveryMin: 10,
    deliveryMax: 30
  },
]


const SearchResults = () => {
  const { city } = useParams();

  const { setCity } = useCity();

  setCity(city as string);

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
    <div className='md:container'>
      <SearchHeader 
        city={city} 
        searchState={searchState} 
        handleSearch={handleSearch}
      />
      {isLoading ? <SearchLoading /> : (
        <div className='md:container'>
          <p className='px-4 text-gray-800 font-semibold lg:text-3xl text-xl'>
            Results for <span className='capitalize'>{city}</span>
          </p>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 p-4 lg:min-h-[700px] xl:min-h-[400px]'>
            {restaurants.map((restaurant) => (
              <SearchResultCard 
                key={restaurant._id} 
                restaurant={restaurant} 
              />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default SearchResults;
