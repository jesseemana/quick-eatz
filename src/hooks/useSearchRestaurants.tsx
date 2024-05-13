import { axios_instance } from '@/api/axios';
import { useQuery } from 'react-query';
import { RestaurantSearchResponse } from '@/types';
import { SearchState } from '@/pages/SearchPage';

const useSearchRestaurants = (search_state: SearchState, city?: string) => {
  async function searchRestaurant(): Promise<RestaurantSearchResponse | undefined> {
    try {
      const params = new URLSearchParams();

      params.set('searchQuery', search_state.searchQuery);
      params.set('page', search_state.page.toString());
      params.set('sortOption', search_state.sortOption);
      params.set('selectedCuisines', search_state.selectedCuisines.join(','));

      const response = await axios_instance.get(`/api/restaurant/search/${city}?${params.toString()}`);
      return response.data;
    } catch (error) {
      // @ts-expect-error might/might not be axios error
      console.error('Error fetching restaurants:', error.message);
    }
  }

  const { data: results, isLoading, } = useQuery(
    ['searchRestaurants', search_state], 
    searchRestaurant, 
    { enabled: !!city }
  )

  return { results, isLoading, }
}

export default useSearchRestaurants;
