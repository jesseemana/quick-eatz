import { axios_instance } from '@/api/axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';

const useRegisterUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  async function registerUserRequest({ auth0Id, email }: { auth0Id: string, email: string }) {
    try {
      const token = getAccessTokenSilently();
      const response = await axios_instance.post('/api/my/user', JSON.stringify({ auth0Id, email }), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to register user:', error);
    }
  }
  
  const { mutateAsync: registerUser, isLoading, isSuccess, isError, } = useMutation(registerUserRequest);

  return { registerUser, isLoading, isSuccess, isError, }
}

export default useRegisterUser;
