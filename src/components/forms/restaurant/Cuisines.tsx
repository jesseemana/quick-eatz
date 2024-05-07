import { FormDescription, FormField, FormItem } from '@/components/ui/form';
import { cuisine_list } from '@/constants/constants';
import { useFormContext } from 'react-hook-form';
import CusineCheck from './CusineCheck';

const Cuisines = () => {
  const { control } = useFormContext();

  return (
    <div className='space-y-2'>
      <>
        <h1 className='capitalize font-semibold text-2xl'>cuisines</h1>
        <FormDescription>Choose the cuisines available at your restaurant</FormDescription>
      </>
      <FormField control={control} name='cuisines' render={({ field }) => (
        <FormItem>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-1'>
            {cuisine_list.map((cuisine, index) => (
              <CusineCheck 
                key={index}
                field={field} 
                cuisine={cuisine} 
              />
            ))}
          </div>
        </FormItem>
      )} />
    </div>
  )
}

export default Cuisines;
