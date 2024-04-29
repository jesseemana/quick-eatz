import { Link } from 'react-router-dom';
import { DropdownMenuItem } from '../ui/dropdown-menu';

const DropDownLink = ({ link, title }: { link: string, title: string }) => {
  return (
    <>
      <DropdownMenuItem>
        <Link 
          to={link}
          className='font-normal hover:text-black capitalize'
        >
          {title}
        </Link>
      </DropdownMenuItem>
    </>
  )
}

export default DropDownLink;
