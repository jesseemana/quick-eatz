import { axios_instance } from '@/api/axios';
import { Restaurant } from '@/types';
import { useQuery } from 'react-query';
import { toast } from 'sonner';

const useGetRestaurant = (restaurant_id?: string)=> {
  async function getRestaurantById(): Promise<Restaurant | undefined> {
    const response = await axios_instance.get(`/api/restaurant/${restaurant_id}`);
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
