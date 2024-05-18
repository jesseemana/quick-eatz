import { Link } from 'react-router-dom';
import MainNav from './navbar/MainNav';
import MobileNav from './navbar/MobileNav';

const Header = ({ styles }: { styles?: string }) => {
  return (
    <header className={`fixed w-full py-3 z-10 ${styles}`}>
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
