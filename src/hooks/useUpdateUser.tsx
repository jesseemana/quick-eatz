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
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/my/user`, { 
        method: 'PUT', 
        headers: {
          authorization: `Bearer ${access_token}`, 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(`Error updating user: ${error}`);
    }
  }

  const { isLoading, isSuccess, isError, mutateAsync: updateUser, } = useMutation(updateUserRequest);
  
  return { isLoading, isSuccess, isError, updateUser, }
}

export default useUpdateUser;
