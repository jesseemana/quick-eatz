import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RestaurantFormData, restaurantSchema } from '@/schemas/restaurant';
import LoadingButton from '@/components/loading/LoadingButton';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Restaurant } from '@/types';
import Menu from './Menu';
import Banner from './Banner';
import Details from './Details';
import Cuisines from './Cuisines';


const ManageRestaurantForm = ({ onSave, loading, restaurant }: { 
  onSave: (data: FormData) => void, 
  loading: boolean, 
  restaurant?: Restaurant, 
}) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: '', price: 0 }]
    }
  });
  

  useEffect(() => {
    if (!restaurant) return;

    const formattedDeliveryPrice = parseInt((restaurant.deliveryPrice).toString());

    const formattedMenuItems = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price).toString())
    }))

    const updatedRestaurant = {
      ...restaurant,
      menuItems: formattedMenuItems,
      deliveryPrice: formattedDeliveryPrice,
    }

    form.reset(updatedRestaurant);
  }, [form, restaurant]);


  const onSubmit = async (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append('restaurantName', formDataJson.restaurantName);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('deliveryPrice', (formDataJson.deliveryPrice).toString());
    formData.append('estimatedDeliveryPrice', (formDataJson.estimatedDeliveryTime).toString());
    formDataJson.cuisines.forEach((cuisine, index) => formData.append(`cuisines[${index}]`, cuisine));
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, (menuItem.price).toString());
    })

    if (formDataJson.imageFile) {
      formData.append('imageFile', formDataJson.imageFile);
    }

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
