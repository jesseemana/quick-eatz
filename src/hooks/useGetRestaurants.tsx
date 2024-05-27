import axios from '@/api/axios';
import { Restaurant } from '@/types';
import { useQuery } from 'react-query';
import { toast } from 'sonner';

const useGetRestaurant = (restaurant_id?: string)=> {
  async function getRestaurantById(): Promise<Restaurant> {
    const response = await axios.get(`/api/restaurant/${restaurant_id}`);
    return response.data;
  }

  const { data: restaurant, isLoading, error, } = useQuery(
    'fetchRestaurant', 
    getRestaurantById, 
    { enabled: !!restaurant_id }
  );

  if (error) { toast.error(error.toString()); }

  return { restaurant, isLoading, }
}

export default useGetRestaurant;
