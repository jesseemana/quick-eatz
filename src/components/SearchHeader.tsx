import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { Menu, MapPin, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchState } from '@/pages/SearchPage';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchForm, searchSchema } from '@/schemas/search';
import { Form, FormField, FormItem, FormControl, } from './ui/form';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Sheet, SheetContent, SheetTrigger, } from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import SearchBar from './SearchBar';
import useSearchRestaurants from '@/hooks/useSearchRestaurants';


const SearchHeader = ({ city, searchState, handleSearch }: { 
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

  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  });

  return (
    <header className='p-3 grid space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center md:space-x-2'>
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent side='left' className='xl:w-1/4'>
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

        <Dialog>
          <DialogTrigger>
            <div className='capitalize font-semibold flex items-center gap-1'>
              <MapPin size={18} />
              <span className='text-gray-600'>{city}</span>
            </div>
          </DialogTrigger>
          <DialogContent className='max-w-[400px] rounded-2xl'>
            <p>Change location</p>
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(searchCity)} 
                className='flex items-center rounded-full px-4 bg-gray-100 py-1'
              > 
                <Button 
                  type='submit'
                  className='bg-transparent shadow-none hover:bg-transparent p-0 text-gray-700'
                >
                  <Search />
                </Button>
                <FormField 
                  control={form.control}
                  name='searchQuery' 
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormControl>
                        <Input 
                          {...field}
                          autoComplete='off'
                          placeholder='search different location'
                          className='border-none shadow-none focus-visible:ring-0' 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <SearchBar 
          styles='hidden md:flex'
          onSubmit={handleSearch} 
          searchQuery={searchState.searchQuery}
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
        styles='md:hidden'
        onSubmit={handleSearch} 
        searchQuery={searchState.searchQuery}
      />
    </header>
  )
}

export default SearchHeader;
