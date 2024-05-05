import { axios_instance } from '@/api/axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import { toast } from 'sonner';

const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  async function getMyUserRequest() {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios_instance.get('/api/my/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }

  const { data: currentUser, isLoading, error, } = useQuery('fetchCurrentUser', getMyUserRequest);

  if (error) { toast.error(error.toString()); }
  
  return { currentUser, isLoading, }
}

export default useGetUser;
