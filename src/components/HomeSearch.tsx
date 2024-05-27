import { useForm } from 'react-hook-form';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchForm, searchSchema } from '@/schemas/search';


const HomeSearch = ({ onSubmit }: { onSubmit: (searchValues: SearchForm) => void }) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  });
  
  return (
    <div className='flex flex-col gap-8 p-4'>
      <p className='md:text-5xl text-3xl font-bold text-black lg:text-white md:tracking-wide'>
        Order delivery near you
      </p>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className='flex items-center gap-2 flex-col md:flex-row'
        >
          <FormField 
            control={form.control} 
            name='searchQuery' 
            render={({ field }) => (
              <FormItem className={`bg-white text-black rounded-sm w-full md:w-[400px] h-12 px-2 grid place-items-center font-normal ${
                form.formState.errors.searchQuery && 'border-2 border-red-500'}`}
              >
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Search by location'
                    className='border-none shadow-none text-lg md:text-xl focus-visible:ring-0 text-black'
                    autoComplete='off'
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
