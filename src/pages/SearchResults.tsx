import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth0 } from '@auth0/auth0-react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Menu, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';


const SearchResults = () => {
  const { city } = useParams();

  useDocumentTitle('Search results');

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const form = useForm();

  function handleSubmit() {}

  return (
    <div className=''>
      <header className='container p-3 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Sheet>
            <SheetTrigger>
              <Menu  />
            </SheetTrigger>
            <SheetContent side='left'>
            </SheetContent>
          </Sheet>
          <Link 
            to='/' 
            className='font-normal text-2xl'
          >
            quick<span className='font-semibold'>eatz</span>
          </Link>
        </div>

        <div className='capitalize font-semibold'>{city}</div>

        <Form {...form}>
          <form 
            onSubmit={handleSubmit} 
            className='flex items-center rounded-full px-4 w-[600px] bg-gray-100'
          >
            <Search 
              className='text-gray-700' 
            />
            <FormField 
              control={form.control}
              name='searchQuery' 
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input 
                      {...field}
                      className='border-none shadow-none focus-visible:ring-0' 
                      placeholder='search by cuisine or restaurant'
                      autoComplete='off'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        
        {!isAuthenticated && (
          <Button 
          onClick={() => loginWithRedirect()} 
            className='px-8 rounded-md bg-transparent border border-black text-black text-md shadow-none' 
          >
            Login
          </Button>
        )}
      </header>
      <Footer />
    </div>
  )
}

export default SearchResults;
