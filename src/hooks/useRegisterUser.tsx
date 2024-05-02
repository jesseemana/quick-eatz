import axios from '@/api/axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';

const useRegisterUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  async function registerUserRequest({ auth0Id, email }: { auth0Id: string, email: string }) {
    try {
      const access_token = await getAccessTokenSilently();
      await axios.post('/api/my/user', JSON.stringify({ auth0Id, email }), {
        headers: {
          authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw new Error(`Failed to register user: ${error}`);
    }
  }
  
  const { mutateAsync: registerUser, isLoading, isSuccess, isError, } = useMutation(registerUserRequest);

  return { registerUser, isLoading, isSuccess, isError, }
}

export default useRegisterUser;
