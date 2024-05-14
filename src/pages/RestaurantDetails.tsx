import { useState } from 'react';
import { useParams } from 'react-router';
import { MenuItem, Restaurant } from '@/types';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';
import useGetRestaurant from '@/hooks/useGetRestaurants';
import RestaurantInfo from '@/components/RestaurantInfo';
import OrderSummary from '@/components/OrderSummary';
import MenuItems from '@/components/MenuItems';
import banner from '../assets/restaurant1.jpg';

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const RestaurantDetails = () => {
  const { id } = useParams();

  const { isLoading, restaurant } = useGetRestaurant(id);

  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (menu_item: MenuItem) => {
    setCartItems((prev) => {
      const existing_item = prev.find((cart_item) => cart_item._id === menu_item._id);

      let updatedCartItems;

      // increase item quantity if item is already in cart
      if (existing_item) {
        updatedCartItems = prev.map((cart_item) => 
          cart_item._id === menu_item._id 
          ? { 
              ...cart_item, 
              quantity: cart_item.quantity + 1, 
            } 
          : cart_item
        );
      } else {
        // push the item into the array
        updatedCartItems = [
          ...prev,
          {
            _id: menu_item._id,
            name: menu_item.name,
            price: menu_item.price,
            quantity: 1,
          }
        ]
      }

      return updatedCartItems;
    });
  }

  const decreaseCart = (menu_item: CartItem) => {
    setCartItems((prev) => {
      const updatedCartItems = prev.map(cartitem => 
        cartitem._id === menu_item._id 
        ? cartitem.quantity > 1 
          ? { 
              ...cartitem, 
              quantity: cartitem.quantity - 1 
            } 
          : cartitem
        : cartitem
      )

      return updatedCartItems;
    })
  }

  const removeFromCart = (cart_item: CartItem) => {
    setCartItems((prev) => {
      const updated_cart = prev.filter((item) => item._id !== cart_item._id);
      return updated_cart;
    });
  }

  if (isLoading) return <p className='pt-14 min-h-[500px]'>loading...</p>

  return (
    <div className='pt-14'>
      <AspectRatio ratio={16/5}>
        <img 
          src={banner} 
          alt='restaurant banner' 
          className='rounded-md object-cover h-full w-full'
        />
      </AspectRatio>
      <div className='grid md:grid-cols-[4fr_2fr] gap-5 md:px-32'>
        <div className='flex flex-col gap-4'>
          <RestaurantInfo restaurant={restaurant} />
          <h1 className='text-2xl font-bold tracking-tight capitalize'>menu</h1>
          {restaurant.menuItems.map(item => (
            <MenuItems 
              key={item._id} 
              menuItem={item}
              addToCart={() => addToCart(item)}
            />
          ))}
        </div>
        <div>
          <Card className='mt-8 rounded-sm'>
            <OrderSummary 
              addToCart={addToCart}
              cartItems={cartItems} 
              restaurant={restaurant} 
              decreaseCart={decreaseCart}
              removeFromCart={removeFromCart}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
