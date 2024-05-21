import { axios_instance } from '@/api/axios';
import { Restaurant } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import { toast } from 'sonner';


const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  async function getMyRestaurant(): Promise<Restaurant> {
    const token = await getAccessTokenSilently();
    const response = await axios_instance.get('/api/my/restaurant', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }

  const { data: restaurant, isLoading, error, } = useQuery('fetchMyRestaurant', getMyRestaurant);

  if (error) { toast.error(error.toString()); }

  return { isLoading, restaurant, }
}

export default useGetMyRestaurant;
