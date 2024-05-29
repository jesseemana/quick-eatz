import ManageRestaurantForm from '@/components/forms/restaurant/ManageRestaurantForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useCreateRestaurant from '@/hooks/restaurant/useCreateRestaurant';
import useGetMyRestaurant from '@/hooks/restaurant/useGetMyRestaurant';
import useUpdateRestaurant from '@/hooks/restaurant/useUpdateRestaurant';
import useDocumentTitle from '@/hooks/useDocumentTitle';


const Restaurant = () => {
  useDocumentTitle('Manage Restaurant');

  const { restaurant } = useGetMyRestaurant();

  const { isLoading: updateLoading, updateRestaurant, } = useUpdateRestaurant();

  const { isLoading: createLoading, createRestaurant, } = useCreateRestaurant();

  const isEditing = !!restaurant;
  
  return (
    <div className='min-h-screen'>
      <h1 className='mb-4'>View orders and manage your restaurant.</h1>
      <Tabs defaultValue='orders'>
        <TabsList className='rounded-[4px] text-black bg-transparent'>
          <TabsTrigger 
            value='orders' 
            className='p-10 capitalize rounded-[1px] py-2 border-black data-[state=active]:bg-gray-50 bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2'
          >
            orders
          </TabsTrigger>
          <TabsTrigger 
            value='manage-restaurant' 
            className='capitalize rounded-[1px] py-2 border-black bg-transparent data-[state=active]:bg-gray-50 data-[state=active]:shadow-none data-[state=active]:border-b-2'
          >
            manage restaurant
          </TabsTrigger>
        </TabsList>
        <TabsContent value='orders'>
          Orders
        </TabsContent>
        <TabsContent value='manage-restaurant'>
          <ManageRestaurantForm
            onSave={isEditing ? updateRestaurant : createRestaurant }
            restaurant={restaurant} 
            loading={updateLoading || createLoading} 
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Restaurant;
