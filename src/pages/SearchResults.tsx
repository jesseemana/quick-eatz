import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { SearchForm } from '@/schemas/search';
import { Menu, MapPin } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import SearchBar from '@/components/SearchBar';
// import Footer from '@/components/Footer';


export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};


const SearchResults = () => {
  const { city } = useParams();

  useDocumentTitle('Search results');

  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch'
  })

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  function handleSearch(data: SearchForm) {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: data.searchQuery,
      page: 1
    }));
  }

  return (
    <div className='md:container'>
      <header className='p-3 flex items-center justify-between'>
        <div className='flex items-center md:space-x-2'>
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent side='left'>
              // TODO: add navigation stuff right here
            </SheetContent>
          </Sheet>
          <Link 
            to='/' 
            className='font-normal text-lg md:text-2xl md:mb-2 mb-1'
          >
            quick<span className='font-semibold'>eatz</span>
          </Link>
        </div>

        <div className='capitalize font-semibold flex items-center gap-1'>
          <MapPin size={18} />
          <span className='text-gray-600'>{city}</span>
        </div>

        <SearchBar 
          onSubmit={handleSearch} 
          searchQuery={searchState.searchQuery}
          styles='hidden md:flex'
        />
        
        {!isAuthenticated && (
          <button 
            onClick={() => loginWithRedirect()} 
            className='px-6 py-1 rounded-full bg-transparent border border-black text-black text-md hover:text-white hover:bg-black hover:border-none' 
          >
            Login
          </button>
        )}
      </header>
      {/* <Footer /> */}
    </div>
  )
}

export default SearchResults;
