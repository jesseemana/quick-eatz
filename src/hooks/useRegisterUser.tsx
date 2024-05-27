import axios from '@/api/axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const useRegisterUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  async function registerUserRequest({ auth0Id, email }: { auth0Id: string, email: string }) {
    const token = getAccessTokenSilently();
    const response = await axios.post(
      '/api/my/user', 
      JSON.stringify({ auth0Id, email }), 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }
  
  const { mutateAsync: registerUser, isLoading, isSuccess, error, } = useMutation(registerUserRequest);

  if (isSuccess) { toast.success('User registered!'); }

  if (error) { toast.error(error.toString()); }

  return { registerUser, isLoading, }
}

export default useRegisterUser;
