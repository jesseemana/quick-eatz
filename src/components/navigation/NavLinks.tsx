import Links from './Links';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { links } from '@/constants/constants';
import { useAuth0 } from '@auth0/auth0-react';

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  return (
    <div className='text-gray-900 space-y-4 ml-2'>
      <div className='space-y-8'>
        {links.map((link) => (
          <Links 
            key={link.id} 
            link={link.link} 
            icon={link.icon} 
            title={link.name} 
          />
        ))}
      </div>
      <Button
        onClick={() => logout()}
        className='font-medium hover:underline hover:bg-inherit text-gray-600 shadow-none w-14 bg-inherit'
      >
        Sign out
      </Button>
      <Separator />
      <div className='grid space-y-4'>
        <Link 
          to='#' 
          className='hover:underline'
        >
          <span>Create a business profile</span>
        </Link>
        <Link 
          to='/manage-restaurant' 
          className='hover:underline'
        >
          <span>Add your restaurant</span>
        </Link>
      </div>
    </div>
  );
}

export default MobileNavLinks;
