import { useAuth0 } from '@auth0/auth0-react';
import { Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchState } from '@/pages/SearchPage';
import { SearchForm } from '@/schemas/search';
import { Sheet, SheetContent, SheetTrigger, } from './ui/sheet';
import SearchBar from './SearchBar';
import useSearchRestaurants from '@/hooks/useSearchRestaurants';
import SearchModal from './SearchModal';


const SearchHeader = ({ city, searchState, handleSearch, }: { 
  city?: string, 
  searchState: SearchState, 
  handleSearch: (data: SearchForm) => void, 
}) => {  
  const navigate = useNavigate();

  useSearchRestaurants(searchState, city);

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  function searchCity(searchValues: SearchForm) {
    navigate({
      pathname: `/search/${searchValues.searchQuery}`,
    });
    refresh();
  }
  
  const refresh = () => navigate(0);

  return (
    <header className='p-3 grid space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center md:space-x-2'>
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent side='left' className='xl:w-1/4'>
              {/* // TODO: add navigation stuff here */}
            </SheetContent>
          </Sheet>
          <Link 
            to='/' 
            className='font-normal text-lg md:text-2xl md:mb-2 mb-1'
          >
            quick<span className='font-semibold'>eatz</span>
          </Link>
        </div>

        <SearchModal 
          city={city} 
          searchCity={searchCity}
        />

        <SearchBar 
          onSubmit={handleSearch} 
          searchQuery={searchState.searchQuery}
          className='hidden md:flex'
        />

        {!isAuthenticated && (
          <button 
            onClick={() => loginWithRedirect()} 
            className='md:px-6 px-4 py-1 rounded-sm bg-transparent border border-black text-black text-md hover:text-white hover:bg-black hover:border-none' 
          >
            Login
          </button>
        )}
      </div>

      <SearchBar 
        onSubmit={handleSearch} 
        searchQuery={searchState.searchQuery}
        className='md:hidden'
      />
    </header>
  )
}

export default SearchHeader;
