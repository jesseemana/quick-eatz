import axios from '@/api/axios';
import { Order } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import { toast } from 'sonner';

const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  async function getMyOrdersRequest(): Promise<Order[]> {
    const token = await getAccessTokenSilently();
    const response = await axios.get('/api/order', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  }

  const { data: orders, isLoading, error, } = useQuery(
    'getMyOrders', 
    getMyOrdersRequest, 
    { refetchInterval: 5000 }
  );

  if (error) { toast.error(error.toString()); }

  return { orders, isLoading, }
}

export default useGetMyOrders;
