import { axios_instance } from '@/api/axios';
import { CheckoutRequestType } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  async function createCheckoutSessionRequest(checkoutData: CheckoutRequestType) {
    const token = await getAccessTokenSilently();
    const response = await axios_instance.post(
      '/api/order/create-checkout-session', 
      JSON.stringify(checkoutData), 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }

  const { mutate: createCheckoutSession, isLoading, error, reset, } = useMutation(createCheckoutSessionRequest);

  if (error) { 
    toast.error(error.toString()); 
    reset();
  }

  return { createCheckoutSession, isLoading, }
}

export default useCreateCheckoutSession;
