import axios from '@/api/axios';
import { toast } from 'sonner';
import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';

const useCheckFavorite = (restaurantId: string) => {
  const { getAccessTokenSilently } = useAuth0();

  async function handleBookmarkRequest(): Promise<boolean | undefined> {
    const response = await axios.get(`/api/favorites/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
    });

    if (response.status === 200) { 
      return true;
    } else if (response.status === 404) {
      return false;
    }
  }

  const { data: bookmarked, error, } = useQuery('checkBookmark', handleBookmarkRequest);

  if (error) { toast.error(error.toString()); }

  return { bookmarked }
}

export default useCheckFavorite;
