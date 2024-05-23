import { Link } from 'react-router-dom';
import { Menu, MapPin } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { SearchForm } from '@/schemas/search';
import { Sheet, SheetContent, SheetTrigger, } from '@/components/ui/sheet';
import SearchBar from '@/components/SearchBar';


const SearchHeader = ({ city, searchQuery, handleSearch }: { 
  city?: string, 
  searchQuery: string, 
  handleSearch: (data: SearchForm) => void, 
}) => {  
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <header className='p-3 grid space-y-6'>
      <div className='flex items-center justify-between'>
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
          searchQuery={searchQuery}
          styles='hidden md:flex'
        />

        {!isAuthenticated && (
          <button 
            onClick={() => loginWithRedirect()} 
            className='md:px-6 px-4 py-1 rounded-md bg-transparent border border-black text-black text-md hover:text-white hover:bg-black hover:border-none' 
          >
            Login
          </button>
        )}
      </div>

      <SearchBar 
        onSubmit={handleSearch} 
        searchQuery={searchQuery}
        styles='md:hidden'
      />
    </header>
  )
}

export default SearchHeader;
