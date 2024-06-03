import { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { UserFormData } from '@/schemas/user-profile';
import { Separator } from '@/components/ui/separator';
import { Card, CardFooter } from '@/components/ui/card';
import { CheckoutRequestType, MenuItem, CartItem } from '@/types';
import useCreateCheckoutSession from '@/hooks/useCreateCheckoutSession';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import useGetRestaurant from '@/hooks/useGetRestaurants';
import Banner from '@/components/restaurant/Banner';
import CheckOut from '@/components/restaurant/CheckOut';
import MenuItems from '@/components/restaurant/MenuItems';
import OrderSummary from '@/components/restaurant/OrderSummary';
import RestaurantInfo from '@/components/restaurant/RestaurantInfo';
import RestaurantLoader from '@/components/loading/RestaurantLoader';


const RestaurantDetails = () => {
  const { id } = useParams();
  const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();
  const { restaurant, isLoading: isRestaurantLoading } = useGetRestaurant(id);

  useDocumentTitle(`Order ${restaurant?.restaurantName}`);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored_items = sessionStorage.getItem(`cartItems-${id}`);
    return stored_items ? JSON.parse(stored_items) : [];
  });

  if (!restaurant) return <p className='px-4 text-gray-600'>restaurant doesn't exist</p>

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prev) => {
      const existing_item = prev.find(cartItem => cartItem._id === menuItem._id);

      let updatedCartItems;

      if (existing_item) {  
        updatedCartItems = prev.map((cartItem) => 
          cartItem._id === menuItem._id 
          ? { 
              ...cartItem, 
              quantity: cartItem.quantity + 1, 
            } 
          : cartItem
        );
      } else {  
        updatedCartItems = [
          ...prev,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          }
        ]
      }

      sessionStorage.setItem(
        `cartItems-${id}`, 
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  }

  const decreaseCart = (item: CartItem) => { 
    setCartItems((prev) => {
      const cartItems = prev.map(cartItem => 
        cartItem._id === item._id 
        ? cartItem.quantity > 1 
          ? { 
              ...cartItem, 
              quantity: cartItem.quantity - 1 
            } 
          : cartItem
        : cartItem
      );

      sessionStorage.setItem(
        `cartItems-${id}`, 
        JSON.stringify(cartItems)
      );

      return cartItems;
    });
  }

  const removeFromCart = (item: CartItem) => { 
    setCartItems((prev) => {
      const updatedCart = prev.filter(cartItem => cartItem._id !== item._id);

      sessionStorage.setItem(
        `cartItems-${id}`, 
        JSON.stringify(updatedCart)
      );

      toast.success('Item removed');

      return updatedCart;
    });
  }

  const onCheckOut = async (user_data: UserFormData) => {
    if (!restaurant) return;
    
    const checkoutData: CheckoutRequestType = {
      cartItems: cartItems.map(cartItem => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      deliveryDetails: {
        name: user_data.name,
        city: user_data.city,
        email: user_data.email,
        addressLine1: user_data.addressLine1,
      },
      restaurantId: restaurant._id,
    }

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  }

  return (
    <>
      {isRestaurantLoading ? <RestaurantLoader /> : (
        <div className='mb-8 container mt-4'>
          <div className='space-y-2'>
            <Banner image={restaurant.imageUrl} />
            <RestaurantInfo restaurant={restaurant} />
          </div>
          <Separator className='md:w-[380px] lg:w-[500px] mt-4 md:mt-0' />
          <div className='grid md:grid-cols-[4fr_2fr] gap-5 mt-4'>
            <div className='gap-4'>
              <h1 className='text-xl font-semibold tracking-tight capitalize'>menu</h1>
              <div className='grid md:grid-cols-2 gap-4'>
                {restaurant.menuItems.map(item => (
                  <MenuItems 
                    key={item._id} 
                    menuItem={item}
                    addToCart={() => addToCart(item)}
                  />
                ))}
              </div>
            </div>
            <div>
              <Card className='mt-8 rounded-lg shadow-sm'>
                <OrderSummary 
                  cartItems={cartItems} 
                  restaurant={restaurant} 
                  addToCart={addToCart}
                  decreaseCart={decreaseCart}
                  removeFromCart={removeFromCart}
                />
                <CardFooter className='grid place-items-center'>
                  <CheckOut 
                    onCheckout={onCheckOut}
                    checkout={cartItems.length > 0}
                    isLoading={isCheckoutLoading}
                    disabled={cartItems.length === 0} 
                  />
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RestaurantDetails;
