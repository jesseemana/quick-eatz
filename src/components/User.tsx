import { 
  DropdownMenu, 
  DropdownMenuItem, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
} from './ui/dropdown-menu';
import Links from './Navbar/Links';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useAuth0 } from '@auth0/auth0-react';
import { CircleUserRound } from 'lucide-react';
import { main_links } from '@/constants/constants';


const User = () => {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center font-bold hover:text-white gap-2'>
        <CircleUserRound className='text-white sticky' />
        {user && user.picture}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-8'>
        {main_links.map((link) => (
          <DropdownMenuItem>
            <Links 
              key={link.id} 
              link={link.link} 
              title={link.title} 
              styles='font-normal hover:text-black capitalize'
            />
          </DropdownMenuItem>
        ))}
        <Separator />
        <DropdownMenuItem>
          <Button 
            onClick={() => logout()}
            className='flex flex-1 font-thin capitalize'
          >
            log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default User;
