import { toast } from 'sonner';
import { Heart } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import useCheckFavorite from '@/hooks/useCheckFavorite';
import useHandleBookmark from '@/hooks/useHandleBookmark';

const HeartButton = ({ restaurantId }: { restaurantId: string }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const { bookmarked } = useCheckFavorite(restaurantId);
  const isBookmarked = !!bookmarked
  const { toggleBookmark } = useHandleBookmark({ restaurantId, isBookmarked });

  async function toggleFavorite(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    // redirect unauthenticated users, else add or remove bookmark
    toast.success('Button clicked!');
    console.log('Button clicked!');
  }

  return (
    <button 
      onClick={toggleFavorite}
      className='p-0 bg-transparent shadow-none hover:bg-transparent relative'
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
