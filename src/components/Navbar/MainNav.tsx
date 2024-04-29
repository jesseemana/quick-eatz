import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../ui/button';
import User from '../User';

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className='flex gap-2'>
      {/* {isAuthenticated ? <User /> : 
        <Button 
          variant='outline' 
          onClick={async () => await loginWithRedirect()}
          className='capitalize font-light border border-white bg-transparent text-white hover:text-black hover:bg-white'
        >
          log in
        </Button>
      } */}
      <User />
    </div>
  )
}

export default MainNav;
