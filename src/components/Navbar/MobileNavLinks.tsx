import Links from './Links';
import { Button } from '../ui/button';
import { links } from '@/constants/data';
import { useAuth0 } from '@auth0/auth0-react';

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  return (
    <div className='flex flex-col gap-4 text-gray-900'>
      {links.map((link) => (
        <Links 
          key={link.id} 
          link={link.link} 
          title={link.name} 
        />
      ))}
      <Button
        onClick={() => logout()}
        className='flex items-center px-3 font-normal hover:bg-gray-500 capitalize'
      >
        log out
      </Button>
    </div>
  )
}

export default MobileNavLinks;
