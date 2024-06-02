import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import IconWrapper from './Icon';

const Links = ({ link, title, icon }: { link: string, title: string, icon: LucideIcon }) => {
  return (
    <>
      <Link 
        to={link} 
        className='font-semibold text-[16px] hover:text-green-700 text-black flex gap-2 group'
      > 
        <IconWrapper 
          IconComponent={icon} 
          className='group-hover:text-green-700' 
        />
        {title}
      </Link>
    </>
  )
}

export default Links;
