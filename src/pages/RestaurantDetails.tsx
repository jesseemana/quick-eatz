import { useState } from 'react';
import { useParams } from 'react-router';
import { CheckoutRequestType, MenuItem, Restaurant } from '@/types';
import { Card, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { UserFormData } from '@/schemas/user-profile';
import { Separator } from '@/components/ui/separator';
import { Dot } from 'lucide-react';
import useGetRestaurant from '@/hooks/useGetRestaurants';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import RestaurantInfo from '@/components/RestaurantInfo';
import OrderSummary from '@/components/OrderSummary';
import MenuItems from '@/components/MenuItems';
import CheckOut from '@/components/CheckOut';
import banner from '../assets/restaurant1.jpg';
import useCreateCheckoutSession from '@/hooks/useCreateCheckoutSession';

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const restaurant: Restaurant = {
  _id: '90709809198sf90akjaz78',
  user: '897109rj1gs989asf9100',
  restaurantName: 'new ho king',
  city: 'toronto',
  country: 'canada',
  deliveryPrice: 10,
  estimatedDeliveryTime: 20,
  cuisines: ['chinese', 'fastfood', 'organic', 'noodles', 'vegan'],
  menuItems: [
    {
      _id: 'random_id_1',
      name: 'fried rice',
      price: 15
    },
    {
      _id: 'random_id_2',
      name: 'dip sauce',
      price: 7
    },
    {
      _id: 'random_id_3',
      name: 'dumplings',
      price: 6
    },
    {
      _id: 'random_id_4',
      name: 'chicken stew',
      price: 12
    },
  ],
  imageUrl: 'randomimageurl',
  lastUpdated: '2024-05-13',
}

const RestaurantDetails = () => {
  const { id } = useParams();

  const { isLoading: isRestaurantLoading, } = useGetRestaurant(id);
  const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();
  
  useDocumentTitle(`${restaurant.restaurantName}`);

 
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored_items = sessionStorage.getItem(`cartItems-${id}`);
    return stored_items? JSON.parse(stored_items) : [];
  });

  const onCheckOut = async (userData: UserFormData) => {
    if (!restaurant) return;
    
    const checkoutData: CheckoutRequestType = {
      cartItems: cartItems.map(cartItem => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      deliveryDetails: {
        name: userData.name,
        city: userData.city,
        email: userData.email,
        addressLine1: userData.addressLine1,
      },
      restaurantId: restaurant._id,
    }

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  }

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

      sessionStorage.setItem(
        `cartItems-${id}`, 
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  }

  const decreaseCart = (menu_item: CartItem) => {
    setCartItems((prev) => {
      const cartItems = prev.map(cartitem => 
        cartitem._id === menu_item._id 
        ? cartitem.quantity > 1 
          ? { 
              ...cartitem, 
              quantity: cartitem.quantity - 1 
            } 
          : cartitem
        : cartitem
      );

      sessionStorage.setItem(
        `cartItems-${id}`, 
        JSON.stringify(cartItems)
      );

      return cartItems;
    });
  }

  const removeFromCart = (cart_item: CartItem) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item._id !== cart_item._id);

      sessionStorage.setItem(
        `cartItems-${id}`, 
        JSON.stringify(updatedCart)
      );

      return updatedCart;
    });
  }

  if (isRestaurantLoading) return <p className='pt-14 min-h-[500px]'>loading...</p>

  return (
    <div className='pt-14'>
      <div className='space-y-4'>
        <AspectRatio ratio={16/5}>
          <img 
            src={banner} 
            alt='restaurant banner' 
            className='rounded-3xl object-cover h-full w-full'
          />
        </AspectRatio>
        <div className='space-y-2 capitalize'>
          <p className='md:text-4xl font-bold text-xl'>{restaurant.restaurantName}</p>
          <p className='md:text-lg font-semibold'>
            {restaurant.city}, {restaurant.country}
          </p>
          <div className='flex gap-8 flex-col md:flex-row'>
            <p className='flex'>
              {restaurant.cuisines.map((cuisine, index) => (
                <span key={cuisine} className='flex'>
                  <span className='text-gray-600 text-[16px]'>{cuisine}</span>
                  {index < restaurant.cuisines.length - 1 && <Dot />}
                </span>
              ))}
            </p>
            <div className='border py-2 px-4 rounded-md ml-2 flex w-full justify-center md:justify-end'>
              <div className='flex gap-4 md:items-end'>
                <div className='flex flex-col items-center'>
                  <span className='font font-semibold'>delivery time</span>
                  <span className='text-gray-800 font-semibold'>
                    Mon - Sat: 
                    <span className='font-normal ml-1'>09:00AM - 10:00PM</span>
                  </span>
                </div>
                <Separator orientation='vertical' />
                <div className='flex flex-col items-center'>
                  <span className='font-semibold text-sm'>delivery price</span>
                  <span className='text-gray-600 font-semibold'>${restaurant.deliveryPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className='w-[400px] mt-4 md:mt-0' />
      <div className='grid md:grid-cols-[4fr_2fr] gap-5 md:px-32 mt-8'>
        <div className='flex flex-col gap-4'>
          {/* <RestaurantInfo 
            restaurant={restaurant} 
          /> */}
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
            <CardFooter className='grid place-items-center'>
              <CheckOut 
                disabled={cartItems.length === 0} 
                onCheckout={onCheckOut}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
