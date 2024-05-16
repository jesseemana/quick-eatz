import { axios_instance } from '@/api/axios';
import { Restaurant } from '@/types';
import { useQuery } from 'react-query';

const useGetRestaurant = (restaurant_id?: string)=> {
  async function getRestaurantById(): Promise<Restaurant | undefined> {
    try {
      const response = await axios_instance.get(`/api/restaurant/${restaurant_id}`);
      return response.data;
    } catch (error: unknown) {
      // @ts-expect-error might/might not be axios error
      console.error('Error fetching restaurants:', error.message);
    }
  }

  const { data: restaurant, isLoading } = useQuery(
    'fetchRestaurant', 
    getRestaurantById, 
    { enabled: !!restaurant_id }
  );

  return { restaurant, isLoading, }
}

export default useGetRestaurant;
