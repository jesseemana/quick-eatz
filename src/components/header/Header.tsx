import { Link } from 'react-router-dom';
import Nav from '../navbar/Nav';
import { Button } from '../ui/button';
import { useAuth0 } from '@auth0/auth0-react';


const Header = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <header className='fixed w-full py-3 z-10'>
      <nav className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Nav className='text-white' />
          <Link
            to='/'
            className='text-2xl font-light tracking-tight text-white mb-2'
          >
            quickeatz
          </Link>
        </div>
        <div className='flex gap-2'>
          {!isAuthenticated && 
            <Button 
              variant='outline' 
              onClick={async () => await loginWithRedirect()}
              className='capitalize font-light border border-white bg-transparent text-white hover:text-black hover:bg-white'
            >
              log in
            </Button>
          }
        </div>
      </nav>
    </header>
  );
};

export default Header;
