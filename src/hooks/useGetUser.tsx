import { axios_instance } from '@/api/axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import { toast } from 'sonner';

const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  async function getMyUserRequest() {
    const token = await getAccessTokenSilently();
    const response = await axios_instance.get(
      import.meta.env.VITE_MY_USER_ENDPOINT, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }

  const { data: currentUser, isLoading, error, } = useQuery('fetchCurrentUser', getMyUserRequest);

  if (error) { toast.error(error.toString()); }
  
  return { currentUser, isLoading, }
}

export default useGetUser;
