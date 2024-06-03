import { Order } from '@/types';
import { Separator } from '../ui/separator';

const OrderStatusDetail = ({ order }: { order: Order }) => {
  return (
    <div className='space-y-5'>
      <div className='flex flex-col mt-4'>
        <p className='capitalize font-normal text-gray-900'>
          delivering to:
          <span className='font-semibold ml-1'>
            {order.deliveryDetails.name}
          </span> 
        </p>
        <span className='font-semibold'>
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
        </span>
      </div>
      <div>
        <p className='font-bold capitalize'>your order:</p>
        <ul>
          {order.cartItems.map(item => (
            <li 
              key={item.menuItemId}
              className='font font-normal'
            >
              <span className='capitalize'>
                {item.name}
              </span> x 
              <span className='capitalize'>
                {item.quantity}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className='flex flex-col'>
        <span className='font-bold'>Total</span>
        <span>MWK{(order.totalAmount)}</span>
      </div>
    </div>
  )
}

export default OrderStatusDetail;
