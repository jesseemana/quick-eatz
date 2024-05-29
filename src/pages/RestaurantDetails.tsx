import { useEffect } from 'react';
import { useParams } from 'react-router';
import { UserFormData } from '@/schemas/user-profile';
import { Separator } from '@/components/ui/separator';
import { Card, CardFooter } from '@/components/ui/card';
import { CheckoutRequestType } from '@/types';
import { useRestaurantId } from '@/context/RestaurantIdProvider';
import { CartItem, useCart } from '@/context/CartProvider';
import useCreateCheckoutSession from '@/hooks/useCreateCheckoutSession';
import useGetRestaurant from '@/hooks/useGetRestaurants';
import OrderSummary from '@/components/OrderSummary';
import Banner from '@/components/Banner';
import CheckOut from '@/components/CheckOut';
import MenuItems from '@/components/MenuItems';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import RestaurantInfo from '@/components/RestaurantInfo';
import RestaurantLoader from '@/components/RestaurantLoader';
import { restaurant } from '@/constants/constants';


const RestaurantDetails = () => {
  const { id } = useParams();
  const { setRestaurantId } = useRestaurantId();
  const { addToCart, decreaseCart, removeFromCart, } = useCart();
  const { isLoading: isRestaurantLoading, } = useGetRestaurant(id);
  const { isLoading: isCheckoutLoading, createCheckoutSession } = useCreateCheckoutSession();
  
  useDocumentTitle(`Order ${restaurant.restaurantName}`);

  useEffect(() => {
    if (id) {
      setRestaurantId(id);
    }
  }, [id, setRestaurantId]);
  
  const stored_items = sessionStorage.getItem(`cartItems-${id}`);
  const cartItems: CartItem[] = stored_items ? JSON.parse(stored_items) : [];

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
