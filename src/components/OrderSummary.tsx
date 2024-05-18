import { Restaurant } from '@/types';
import { CartItem } from '@/pages/RestaurantDetails';
import { Trash, Plus, Minus, } from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

const OrderSummary = ({ restaurant, cartItems, addToCart, decreaseCart, removeFromCart, }: {
  restaurant: Restaurant;
  cartItems: CartItem[];
  addToCart: (cartItem: CartItem) => void;
  decreaseCart: (cartItem: CartItem) => void;
  removeFromCart: (cartItem: CartItem) => void;
}) => {
  const getTotalCost = () => {
    const total = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity, 
      0
    );
    
    const totalWithDelivery = total + restaurant.deliveryPrice;

    return totalWithDelivery;
  };

  return (
    <>
      <CardHeader>
        <CardTitle className='flex justify-between tracking-tight lg:text-2xl capitalize'>
          <p>total order 
            <span className='font font-normal'>(plus delivery)</span>
          </p>
          <p>${getTotalCost()}</p>
        </CardTitle>
        <Separator />
        <CardContent className='p-0'>
          {cartItems.length === 0 
          ? <p className='text text-center py-4'>choose meal(s) to order</p> 
          : <>
            {cartItems.map((item) => (
              <div 
                key={item._id} 
                className='grid grid-cols-[4fr_2fr_2fr] place-items-center gap-4'
              >
                <p className='py-2'>
                  <span className='capitalize flex items-start'>{item.name}</span>
                </p>
                <div className='flex'>
                  <Minus 
                    size={20} 
                    className='cursor-pointer' 
                    onClick={() => decreaseCart(item)}
                  />
                  <Badge 
                    variant='outline' 
                    className='mr-2 rounded-sm'
                  >
                    {item.quantity}
                  </Badge>
                  <Plus 
                    size={20} 
                    onClick={() => addToCart(item)} 
                    className='cursor-pointer' 
                  />
                </div>
                <div className='flex gap-2 flex-row-revers'>
                  ${(item.price * item.quantity)}
                  <Trash 
                    color='red'
                    size={20}
                    className='cursor-pointer' 
                    onClick={() => removeFromCart(item)}
                  />
                </div>
              </div>
            ))}
          </>}
          <Separator />
        </CardContent>
      </CardHeader>
    </>
  )
}

export default OrderSummary;
