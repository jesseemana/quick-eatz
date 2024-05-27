import axios from '@/api/axios';
import { toast } from 'sonner';
import { useMutation } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react'

type BookmarkProps = {
  restaurantId: string 
  isBookmarked: boolean 
}

const useHandleBookmark = ({ restaurantId, isBookmarked }: BookmarkProps) => {
  const { getAccessTokenSilently } = useAuth0();

  async function handleBookmarkRequest(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();

    let toggle;

    if (isBookmarked) {
      toggle = async () => await axios.delete(
        `/api/favorites/${restaurantId}`, 
        {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          }
        }
      );
      toast.success('Removed from bookmarks');
    } else {
      toggle = async () => await axios.post(
        `/api/favorites/${restaurantId}`, {}, 
        {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          }
        }
      );
      toast.success('Added to bookmarks');
    }

    toggle();
  }

  const { mutateAsync: toggleBookmark, error, } = useMutation(handleBookmarkRequest);
  if (error) { toast.error(error.toString()); }

  return { toggleBookmark }
}

export default useHandleBookmark;
