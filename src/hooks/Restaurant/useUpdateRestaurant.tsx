import { axios_instance } from '@/api/axios';
import { Restaurant } from '@/types';
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation } from 'react-query';
import { toast } from 'sonner';


const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  async function updateRestaurantRequest(restaurant_data: FormData): Promise<Restaurant> {
    const token = getAccessTokenSilently();
    const response = await axios_instance.put(
      import.meta.env.VITE_MY_RESTAURANT_ENDPOINT, 
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

  const { mutateAsync: updateRestaurant, isLoading, isSuccess, error, } = useMutation(updateRestaurantRequest);

  if (isSuccess) { toast.success('Restaurant updated!'); }

  if (error) { toast.error('Failed to update restaurant!'); }

  return { updateRestaurant, isLoading, }
}

export default useUpdateRestaurant;
