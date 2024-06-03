import { useForm } from 'react-hook-form';
import { MapPin, Search } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';
import { Form, FormField, FormItem, FormControl, } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { SearchForm, searchSchema } from '@/schemas/search';
import { zodResolver } from '@hookform/resolvers/zod';

const SearchModal = ({ city, searchCity }: { 
  city?: string, 
  searchCity: (searchValues: SearchForm) => void 
}) => {

  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  });

  return (
    <Dialog>
      <DialogTrigger>
        <div className='capitalize font-semibold items-center gap-1 flex'>
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
  )
}

export default SearchModal;
