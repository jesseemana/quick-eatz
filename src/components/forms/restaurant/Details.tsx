import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';


const Details = () => {
  const { control } = useFormContext();

  return (
    <div className='space-y-2'>
      <>
        <h1 className='capitalize font-semibold text-2xl'>details</h1>
        <FormDescription>Enter your restaurant details</FormDescription>
      </>

      <FormField control={control} name='restaurantName' render={({ field }) => (
        <FormItem>
          <FormLabel>Name:</FormLabel>
          <FormControl>
            <Input {...field}  className='bg-white rounded-sm' />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      <div className='flex gap-4'>
        <FormField control={control} name='city' render={({ field }) => (
          <FormItem className='flex-1'>
            <FormLabel>City:</FormLabel>
            <FormControl>
              <Input {...field} className='bg-white rounded-sm' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name='country' render={({ field }) => (
          <FormItem className='flex-1'>
            <FormLabel>Country:</FormLabel>
            <FormControl>
              <Input {...field} className='bg-white rounded-sm' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <FormField control={control} name='deliveryPrice' render={({ field }) => (
        <FormItem className='max-w-[50%]'>
          <FormLabel>Delivery price (MWK):</FormLabel>
          <FormControl>
            <Input {...field} className='bg-white rounded-sm' placeholder='2,000' />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      <FormField control={control} name='estimatedDeliveryTime' render={({ field }) => (
        <FormItem className='max-w-[50%]'>
          <FormLabel>Estimated delivery time(minutes):</FormLabel>
          <FormControl>
            <Input {...field} className='bg-white rounded-sm' placeholder='30' />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  )
}

export default Details;
