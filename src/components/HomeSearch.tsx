import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Button } from './ui/button';

const formSchema = z.object({
  searchQuery: z.string({
    required_error: 'Restaurant name is required',
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type SearchProps = { 
  onSubmit: (searchValues: SearchForm) => void 
  searchQuery?: string 
  styles?: string 
}

const HomeSearch = ({ onSubmit, searchQuery, styles }: SearchProps) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    }
  });
  
  return (
    <div className={`flex flex-col gap-8 p-4 ${styles}`}>
      <p className='md:text-5xl text-3xl font-bold text-black lg:text-white'>
        Order delivery near you
      </p>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className={`flex items-center gap-3 flex-col md:flex-row ${
            form.formState.errors.searchQuery && 'border-red-500'
          }`}
        >
          <FormField 
            control={form.control} 
            name='searchQuery' 
            render={({ field }) => (
              <FormItem className='bg-white text-black w-full md:w-[400px] rounded-[1px] h-12 px-2 grid place-items-center font-light'>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Search by location'
                    className='border-none shadow-none text-xl focus-visible:ring-0'
                  />
                </FormControl>
              </FormItem>
            )} 
          />
          <Button 
            type='submit' 
            className='rounded-sm bg-black px-8 h-12 capitalize font-semibold w-full md:w-auto'
          >
            search
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default HomeSearch;
