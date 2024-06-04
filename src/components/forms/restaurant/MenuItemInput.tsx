import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage, 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';


const MenuItemInput = ({ index, removeItem }: { index: number, removeItem: () => void }) => {
  const { control } = useFormContext();

  return (
    <div className='flex flex-row items-end gap-2'>
      <FormField 
        control={control} 
        name={`menuItems.${index}.name`} 
        render={({ field }) => (
          <FormItem>
            <FormLabel className='flex items-center gap-1'>
              Name: 
            </FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder='nsima & pork' 
                className='bg-white' 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} 
      />

      <FormField 
        control={control} 
        name={`menuItems.${index}.price`} 
        render={({ field }) => (
          <FormItem>
            <FormLabel className='flex items-center gap-1'>
              Price (MWK): 
            </FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder='4,000' 
                className='bg-white' 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} 
      />

      <Button 
        type='button' 
        onClick={removeItem} 
        className='bg-red-500 max-h-fit capitalize'
      >
        remove
      </Button>
    </div>
  )
}

export default MenuItemInput;
