import { UserFormData } from '@/schemas/user-profile';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import UserProfileForm from '../forms/user-profile-form/UserProfileForm';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../ui/button';
import { useLocation } from 'react-router-dom';
import LoadingButton from '../loading/LoadingButton';
import useGetUser from '@/hooks/useGetUser';

const CheckOut = ({ onCheckout, disabled, isLoading, checkout, }: {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  checkout: boolean;
  isLoading: boolean;
}) => {
  const { pathname } = useLocation();
  const { currentUser } = useGetUser();
  const { isLoading: isAuthLoading, loginWithRedirect, isAuthenticated, } = useAuth0();

  async function onLogin() {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  }

  if (!isAuthenticated) {
    return (
      <>
        {checkout && 
          <Button 
            onClick={onLogin} 
            className='flex-1 capitalize'
          >
            log in to checkout
          </Button>
        }
      </>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) return <LoadingButton title='loading' />;

  return (
    <Dialog>
      <DialogTrigger>
        {checkout && 
          <button 
            disabled={disabled} 
            className={`bg-primary ${disabled && 'cursor-not-allowed hover:bg-primary'} 
              hover:bg-primary/90 flex-1 w-full px-10 py-2 rounded-sm text-white capitalize`
            }
          >
            checkout
          </button>
        }
      </DialogTrigger>
      <DialogContent className='max-w-[425px] md:min-w-[700px] bg-gray-50'>
        <UserProfileForm 
          checkOut
          onSave={onCheckout}
          currentUser={currentUser}
          title='Confirm Delivery Details'
          buttonText='Proceed to payment' 
        />
      </DialogContent>
    </Dialog>
  )
}

export default CheckOut;
