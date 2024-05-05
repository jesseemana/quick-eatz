import { axios_instance } from '@/api/axios';
import { useMutation } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'sonner';

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
      const token = await getAccessTokenSilently();
      const response = await axios_instance.put('/api/my/user', JSON.stringify(user_data), {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  }

  const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(updateUserRequest);

  if (isSuccess) { toast.success('User updated!'); }

  if (error) { 
    toast.error('Error updating user!'); 
    reset();
  }
  
  return { isLoading, updateUser, }
}

export default useUpdateUser;
