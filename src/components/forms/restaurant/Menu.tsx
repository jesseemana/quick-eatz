import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormDescription, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import MenuItemInput from './MenuItemInput';


const Menu = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'menuItems'
  })

  return (
    <div className='space-y-2'>
      <>
        <h1 className='capitalize font-semibold text-2xl'>menu</h1>
        <FormDescription>
          Create your menu and give each item a name and a price
        </FormDescription>
      </>
      
      <FormField 
        control={control} 
        name='menuItems' 
        render={() => (
          <FormItem>
            {fields.map((_, index) => (
              <MenuItemInput 
                key={index} 
                index={index} 
                removeItem={() => remove(index)} 
              />
            ))}
          </FormItem>
        )} 
      />

      <Button 
        type='button' 
        className='capitalize' 
        onClick={() => append({ name: '', price: '' })} 
      >
        add menu item
      </Button>
    </div>
  )
}

export default Menu;
