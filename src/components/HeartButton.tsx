import { Heart } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import useCheckFavorite from '@/hooks/useCheckFavorite';
import useHandleBookmark from '@/hooks/useHandleBookmark';

const HeartButton = ({ restaurantId }: { restaurantId: string }) => {
  const { pathname } = useLocation();

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const { bookmarked } = useCheckFavorite(restaurantId);
  const isBookmarked = !!bookmarked
  const { toggleBookmark } = useHandleBookmark({ restaurantId, isBookmarked });

  const toggleFavorite = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      await loginWithRedirect({
        appState: {
          returnTo: pathname,
        },
      })
    }
    toggleBookmark
  }

  return (
    <button 
      onClick={toggleFavorite}
      className='relative'
    >
      <Heart className={`text-white 
        ${isBookmarked 
          ? 'fill-white' 
          : 'bg-transparent'
        }`} 
      />
    </button>
  );
}

export default HeartButton;
