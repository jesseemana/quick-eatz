import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';

const useRegisterUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  async function registerUserRequest({ auth0Id, email }: { auth0Id: string, email: string }) {
    try {
      const access_token = await getAccessTokenSilently();
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/my/user/`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth0Id, email }),
      });
    } catch (error) {
      throw new Error(`Failed to register user: ${error}`);
    }
  }
  
  const { mutateAsync: registerUser, isLoading, isSuccess, isError, } = useMutation(registerUserRequest);

  return { registerUser, isLoading, isSuccess, isError, }
}

export default useRegisterUser;
