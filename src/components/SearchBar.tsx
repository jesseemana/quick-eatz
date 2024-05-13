import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { SearchForm, searchSchema } from '@/schemas/search';

type Props = {
  onSubmit: (formData: SearchForm) => void;
  onReset?: () => void;
  searchQuery: string;
};

const SearchBar = ({ onSubmit, onReset, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({ searchQuery: '', });
    if (onReset) { onReset(); }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-3 justify-between flex-row border-2 border-gray-500 rounded-full p-3 mb-4 ${
          form.formState.errors.searchQuery && 'border-red-500'
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className='ml-1 text-black hidden md:block'
        />
        
        <FormField
          control={form.control}
          name='searchQuery'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input
                  {...field}
                  className='border-none shadow-none text-md md:text-xl focus-visible:ring-0'
                  placeholder='search by cuisine or restaurant Name'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          onClick={handleReset}
          type='button'
          variant='outline'
          className='rounded-full'
        >
          Reset
        </Button>
        <Button 
          type='submit'
          className='rounded-full bg-black'
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
