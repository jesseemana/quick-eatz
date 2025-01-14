import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { SearchForm, searchSchema } from '@/schemas/search';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem } from '../ui/form';


// TODO: add callback and logic for resetting form in props and component, use form.reset()
const SearchBar = ({ onSubmit, searchQuery, className }: { 
  onSubmit: (formData: SearchForm) => void 
  searchQuery: string 
  className?: string 
}) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className={cn('flex items-center rounded-full px-4 md:w-[300px] lg:w-[500px] xl:w-[800px] bg-gray-100 py-1', className)}
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
                  placeholder='search by cuisine or restaurant'
                  className='border-none shadow-none focus-visible:ring-0' 
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* button/icon for resetting form goes here */}
      </form>
    </Form>
  );
};

export default SearchBar;
