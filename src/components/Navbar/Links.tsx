import { Link } from 'react-router-dom';

const Links = ({ link, title }: { link: string, title: string }) => {
  return (
    <>
      <Link 
        to={link} 
        className='flex bg-white items-center font-normal hover:text-orange-500 capitalize'
      >
        {title}
      </Link>
    </>
  )
}

export default Links;
