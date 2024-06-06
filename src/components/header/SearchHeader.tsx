import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { SearchState } from '@/context/SearchQueryProvider';
import { SearchForm } from '@/schemas/search';
import SearchBar from './SearchBar';
import useSearchRestaurants from '@/hooks/useSearchRestaurants';
import MainNav from '../navbar/MainNav';
import SearchModal from '../search/SearchModal';


const SearchHeader = ({ city, searchState, handleSearch, }: { 
  city: string, 
  searchState: SearchState, 
  handleSearch: (data: SearchForm) => void, 
}) => {  
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useSearchRestaurants(searchState, city);

  async function onLogin() {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  }

  function searchCity(searchValues: SearchForm) {
    navigate({
      pathname: `/search/${searchValues.searchQuery}`,
    });
    refresh();
  }
  
  const refresh = () => navigate(0);

  return (
    <header className='p-3 grid space-y-4 py-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center md:space-x-2'>
          <MainNav className='text-black' />
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
            onClick={onLogin} 
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
