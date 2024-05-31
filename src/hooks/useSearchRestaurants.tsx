import axios from '@/api/axios';
import { useQuery } from 'react-query';
import { RestaurantSearchResponse } from '@/types';
import { SearchState } from '@/context/SearchQueryProvider';
import { toast } from 'sonner';

const useSearchRestaurants = (search_state: SearchState, city?: string) => {
  async function searchRestaurant(): Promise<RestaurantSearchResponse> {
    const params = new URLSearchParams();

    params.set('searchQuery', search_state.searchQuery);
    params.set('page', search_state.page.toString());
    params.set('sortOption', search_state.sortOption);
    params.set('selectedCuisines', search_state.selectedCuisines.join(','));

    const response = await axios.get(`/api/restaurant/search/${city}?${params.toString()}`);
    return response.data;
  }

  const { data: results, isLoading, error, } = useQuery(
    ['searchRestaurants', search_state], 
    searchRestaurant, 
    { enabled: !!city }
  )

  if (error) { toast.error(error.toString()); }

  return { results, isLoading, }
}

export default useSearchRestaurants;
