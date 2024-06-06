import OrderStatusDetail from '@/components/restaurant/OrderStatusDetail';
import OrderStatusHeader from '@/components/restaurant/OrderStatusHeader';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import useGetMyOrders from '@/hooks/useGetMyOrders';

const OrderStatus = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) return <p>loading...</p>
  
  if (!orders) return (
    <div>
      <p>you currently don't have any orders</p>
    </div>
  );

  return (
    <div className='lg:px-10 lg:py-4 space-y-10'>
      {orders.map(order => (
        <div key={order._id} className='p-10'>
          <OrderStatusHeader order={order} />
          <div className='grid gap-10 md:grid-cols-2 mt-8'>
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16/5}>
              <img
                src={order.restaurant.imageUrl}
                className='rounded-md object-cover h-full w-full'
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderStatus;
