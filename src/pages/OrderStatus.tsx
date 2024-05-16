import OrderStatusDetail from '@/components/OrderStatusDetail';
import OrderStatusHeader from '@/components/OrderStatusHeader';
import { AspectRatio } from '@/components/ui/aspect-ratio';

 const orders = [
  {
    _id: 'orderidnumber1',
    restaurant: {
      estimatedDeliveryTime: 30,
    },
    cartItems: [
      {
        menuItemId: 'menuitemidnumb1',
        name: 'fried rice',
        quantity: '1',
      },
      {
        menuItemId: 'menuitemidnumbe3',
        name: 'mushu pork',
        quantity: '1',
      },
    ],
    deliveryDetails: {
      name: 'Jesse Emana',
      addressLine1: 'Chinyonga',
      city: 'Blantyre',
      email: 'jesseemana@gmail.com',
    },
    totalAmount: 13000,
    status: 'placed',
    createdAt: '2024 18:04:11',
    restaurantId: 'restaurantidnumber1',
  }
];

const OrderStatus = () => {
  return (
    <div className='lg:px-20 lg:py-10 space-y-10'>
      {orders.map(order => (
        <div key={order._id} className='p-10'>
          <OrderStatusHeader order={order} />
          <div className='grid gap-10 md:grid-cols-2 mt-8'>
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className='rounded-md object-cover h-full w-full'
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderStatus;
  