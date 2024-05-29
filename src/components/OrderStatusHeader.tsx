import { Order } from '@/types';
import { Progress } from './ui/progress';
import { ORDER_STATUS } from '@/constants/orderstatus';

const OrderStatusHeader = ({ order }: { order: Order }) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };
  
  return (
    <>
      <h1 className='md:text-3xl text-lg font-light tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between mb-2'>
        <span> Order Status: 
          <span className='font font-semibold text-gray-700 ml-1'>
            {getOrderStatusInfo().label}
          </span>
        </span>
        <span> Expected by: 
          <span className='font font-semibold text-gray-700 ml-1'>
            {getExpectedDelivery()}
          </span>
        </span>
      </h1>
      <Progress
        className='animate-pulse'
        value={getOrderStatusInfo().progressValue}
      />
    </>
  )
}

export default OrderStatusHeader;
