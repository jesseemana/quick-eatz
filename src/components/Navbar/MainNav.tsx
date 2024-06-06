import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import { Menu } from 'lucide-react';
import { 
  Sheet, 
  SheetTitle, 
  SheetTrigger, 
  SheetContent,  
  SheetDescription, 
} from '../ui/sheet';
import { Button } from '../ui/button';
import NavLinks from './NavLinks';
import profile from '@/assets/profile.png'
import { Separator } from '../ui/separator';

const MainNav = ({ className }: { className: string }) => {
  const { pathname } = useLocation();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className={cn(className)} />
      </SheetTrigger>
      <SheetContent 
        side='left' 
        className='space-y-4 md:w-[300px]'
      >
        <SheetTitle className='place-items-center'>
          {isAuthenticated ? (
            <div className='flex items-center font-bold gap-2'>
              <img 
                src={profile} 
                alt='user profile icon' 
                className='w-20'
              />
              <div className='text-lg md:text-xl'>
                <p className='capitalize hover:cursor-default text-gray-700'>{user?.given_name}</p>
                <Link to='/user'>
                  <p className='text-green-600 hover:underline font-medium tracking-tight'>
                    Manage account
                  </p>
                </Link>
              </div>
            </div>) : (
            <div className='space-y-2'>
              <h1 className='text text-center'>Quickeatz</h1>
              <Separator />
            </div>
          )}
        </SheetTitle>
        <SheetDescription className='space-y-8 pt-4'>
          {isAuthenticated 
          ? <NavLinks /> 
          : (
            <Button 
              variant='outline'
              onClick={onLogin} 
              className='w-full shadow-none'
            >
              Log in
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

export default MainNav;
