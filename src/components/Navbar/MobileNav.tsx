import { 
  Sheet, 
  SheetTitle, 
  SheetTrigger, 
  SheetContent, 
  SheetDescription, 
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useAuth0 } from '@auth0/auth0-react';
import MobileNavLinks from './MobileNavLinks';
import { CircleUserRound, Menu } from 'lucide-react';


const MobileNav = () => {
  const  { user, isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='text-white' />
      </SheetTrigger>
      <SheetContent className='space space-y-3'>
        <SheetTitle className='grid place-items-center'>
          {isAuthenticated ? (
            <div className='flex items-center font-bold gap-2'>
              <CircleUserRound className='text-black' />
              {user?.email}
            </div> 
            ): 
            <h1 className='capitalize'>quick eatz</h1>
          }
        </SheetTitle>
        <Separator />
        <SheetDescription className='flex flex-col gap-4'>
          {isAuthenticated ? <MobileNavLinks /> : 
          <Button 
            variant='outline'
            onClick={() => loginWithRedirect()} 
          >
            log in
          </Button>}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav;
