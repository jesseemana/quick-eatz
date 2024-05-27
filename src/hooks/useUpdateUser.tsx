import axios from '@/api/axios';
import { toast } from 'sonner';
import { UserData } from '@/types';
import { useMutation } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';


const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  async function updateUserRequest(user_data: UserData) {
    const token = await getAccessTokenSilently();
    const response = await axios.put(
      '/api/my/user', 
      JSON.stringify(user_data), 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }

  const { mutateAsync: updateUser, isLoading, isSuccess, error, reset, } = useMutation(updateUserRequest);

  if (isSuccess) { toast.success('User updated!'); }

  if (error) { 
    toast.error('Error updating user!'); 
    reset();
  }
  
  return { isLoading, updateUser, }
}

export default useUpdateUser;
