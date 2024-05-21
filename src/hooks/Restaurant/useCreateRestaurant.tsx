import { axios_instance } from '@/api/axios';
import { Restaurant } from '@/types';
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation } from 'react-query';
import { toast } from 'sonner';


const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  
  async function createRestaurantRequest(restaurant_data: FormData): Promise<Restaurant> {
    const token = getAccessTokenSilently();
    const response = await axios_instance.post(
      '/api/my/restaurant', 
      JSON.stringify(restaurant_data), 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  }

  const { mutateAsync: createRestaurant, isLoading, isSuccess, error, } = useMutation(createRestaurantRequest);

  if (error) { toast.error(error.toString()); }

  if (isSuccess) { toast.success('Restaurant created!'); }

  return { createRestaurant, isLoading, }
}

export default useCreateRestaurant;
