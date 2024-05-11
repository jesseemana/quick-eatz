import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Button } from './ui/button';

const formSchema = z.object({
  searchQuery: z.string({
    required_error: 'search value is required',
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type SearchProps = { 
  onSubmit: (searchValues: SearchForm) => void 
  styles?: string 
}

const HomeSearch = ({ onSubmit, styles }: SearchProps) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
  });
  
  return (
    <div className={`flex flex-col gap-8 p-4 ${styles}`}>
      <p className='md:text-5xl text-3xl font-bold text-black lg:text-white md:tracking-wide'>
        Order delivery near you
      </p>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className={`flex items-center gap-3 flex-col md:flex-row`}
        >
          <FormField 
            control={form.control} 
            name='searchQuery' 
            render={({ field }) => (
              <FormItem className={`bg-white text-black rounded-sm w-full md:w-[400px] h-12 px-2 grid place-items-center font-light ${
                form.formState.errors.searchQuery && 'border-2 border-red-500'}`}
              >
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
  );
}

export default HomeSearch;
