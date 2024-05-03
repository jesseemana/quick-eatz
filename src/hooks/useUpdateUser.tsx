import { axios_instance, handleErrors } from '@/api/axios';
import { useMutation } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';


type UserData = {
  name: string
  city: string
  country: string
  addressLine1: string
}


const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  async function updateUserRequest(user_data: UserData) {
    try {
      const access_token = await getAccessTokenSilently();
      const response = await axios_instance.put('/api/my/user', JSON.stringify(user_data), {
        headers: {
          Authorization: `Bearer ${access_token}`, 
          'Content-Type': 'application/json',
        },
      });
      return response.status;
    } catch (error) {
      console.log('Error updating user:', error);
      return handleErrors(error);
    }
  }

  const { isLoading, isSuccess, isError, mutateAsync: updateUser, } = useMutation(updateUserRequest);
  
  return { isLoading, isSuccess, isError, updateUser, }
}

export default useUpdateUser;
