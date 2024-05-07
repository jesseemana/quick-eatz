import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Restaurant } from '@/types';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import LoadingButton from '@/components/LoadingButton';
import { RestaurantFormData, restaurantSchema } from '@/schemas/restaurant';

import Menu from './Menu';
import Banner from './Banner';
import Details from './Details';
import Cuisines from './Cuisines';


type RestaurantFormProps = { 
  onSave?: (data: FormData) => void, 
  loading?: boolean, 
  restaurant?: Restaurant 
}


const ManageRestaurantForm = ({ onSave, loading, restaurant }: RestaurantFormProps) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: '', price: 0 }]
    }
  });

  async function onSubmit(formDataJson: RestaurantFormData) {
    const formData = new FormData();
    onSave(formData);
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className='space-y-8 bg-gray-50 p-10 rounded-sm'
      >
        <Details />
        <Separator />
        <Cuisines />
        <Separator />
        <Menu />
        <Separator />
        <Banner />
        {loading ? <LoadingButton /> : (
          <Button 
            type='submit' 
            className='capitalize'
          >
            submit
          </Button>
        )}
      </form>
    </Form>
  )
}

export default ManageRestaurantForm;
