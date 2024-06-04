import { FormProps } from '@/types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormItem, 
  FormLabel, 
  FormField, 
  FormMessage, 
  FormControl, 
  FormDescription, 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/loading/LoadingButton';
import { UserFormData, userSchema } from '@/schemas/user-profile';
import { cn } from '@/lib/utils';


const UserProfileForm = ({ 
  onSave, 
  isLoading, 
  currentUser, 
  checkOut, 
  className,
  buttonText='submit', 
  title='user details', 
}: FormProps) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);
  
  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSave)} 
        className={cn('space-y-4 rounded-lg px-4 md:px-8 py-2', className)}
      >
        <>
          <h2 className='text-2xl font-bold capitalize'>{title}</h2>
          {!checkOut && (
            <FormDescription className='text-sm'>
              View and update your profile.
            </FormDescription>
          )}
        </>

        <FormField 
          name='email' 
          control={form.control} 
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  disabled 
                  className='bg-white shadow-none border-gray-400' 
                />
              </FormControl>
            </FormItem>
          )} 
        />

        <FormField 
          name='phone' 
          control={form.control} 
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Phone:</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  className='bg-white shadow-none border-gray-400' 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />

        <div className='flex flex-col md:flex-row gap-4'>
          <FormField 
            name='name' 
            control={form.control} 
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input {...field} className='bg-white shadow-none border-gray-400' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />

          <FormField 
            name='addressLine1' 
            control={form.control} 
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Address:</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className='bg-white shadow-none border-gray-400' 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />
        </div>

        <div className='flex flex-col md:flex-row gap-4'>
          <FormField 
            name='city' 
            control={form.control} 
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>City:</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className='bg-white shadow-none border-gray-400' 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />

          <FormField 
            name='country' 
            control={form.control} 
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Country:</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className='bg-white shadow-none border-gray-400' 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />
        </div>

        {isLoading ? <LoadingButton /> : (
          <Button 
            type='submit' 
            variant='default'
          >
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
}

export default UserProfileForm;
