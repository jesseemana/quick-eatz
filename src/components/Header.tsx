import { Link } from 'react-router-dom';
import MobileNav from './Navbar/MobileNav';
import MainNav from './Navbar/MainNav';

const Header = () => {
  return (
    <header className='fixed bg-transparent w-full py-4'>
      <nav className='container mx-auto flex justify-between items-center'>
        <Link
          to='/'
          className='text-2xl font-light tracking-tight text-white'
        >
          quickeatz
        </Link>
        <div className='md:hidden'>
          <MobileNav />
        </div>
        <div className='hidden md:block'>
          <MainNav />
        </div>
      </nav>
    </header>
  );
};

export default Header;
