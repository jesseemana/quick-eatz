import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManageRestaurantForm from '@/components/forms/restaurant/ManageRestaurantForm';
import useCreateRestaurant from '@/hooks/useCreateRestaurant';
import useGetMyRestaurant from '@/hooks/useGetMyRestaurant';
import useUpdateRestaurant from '@/hooks/useUpdateRestaurant';
import useDocumentTitle from '@/hooks/useDocumentTitle';


const Restaurant = () => {
  useDocumentTitle('Manage Restaurant');

  const { restaurant } = useGetMyRestaurant();
  const { isLoading: updateLoading, updateRestaurant, } = useUpdateRestaurant();
  const { isLoading: createLoading, createRestaurant, } = useCreateRestaurant();

  const isEditing = !!restaurant;
  
  return (
    <div className='md:container p-4 md:px-8'>
      <h1 className='mb-4 py-2 text-gray-600'>View orders and manage your restaurant.</h1>
      <Tabs defaultValue='orders'>
        <TabsList className='rounded-[4px] text-gray-700 bg-transparent'>
          <TabsTrigger 
            value='orders' 
            className='p-10 capitalize rounded-[1px] py-2 border-gray-700 bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2'
          >
            orders
          </TabsTrigger>
          <TabsTrigger 
            value='manage-restaurant' 
            className='capitalize rounded-[1px] py-2 border-gray-700 bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2'
          >
            manage restaurant
          </TabsTrigger>
        </TabsList>
        <TabsContent value='orders'>
          Orders
        </TabsContent>
        <TabsContent value='manage-restaurant'>
          <ManageRestaurantForm
            restaurant={restaurant} 
            loading={updateLoading || createLoading} 
            onSave={isEditing ? updateRestaurant : createRestaurant }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Restaurant;
