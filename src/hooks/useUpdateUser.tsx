import axios from '@/api/axios';
import { useMutation } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';


interface UpdateUserData {
  name: string
  city: string
  country: string
  addressLine1: string
}


const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  async function updateUserRequest(data: UpdateUserData) {
    try {
      const access_token = getAccessTokenSilently();
      await axios.put('/api/my/user', JSON.stringify(data), {
        headers: {
          authorization: `Bearer ${access_token}`, 
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(`Error updating user: ${error}`);
    }
  }

  const { isLoading, isSuccess, isError, mutateAsync: updateUser, } = useMutation(updateUserRequest);
  
  return { isLoading, isSuccess, isError, updateUser, }
}

export default useUpdateUser;
