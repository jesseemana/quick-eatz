import { useState } from 'react';
import { useParams } from 'react-router';
import { CheckoutRequestType, MenuItem, Restaurant } from '@/types';
import { Card, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { UserFormData } from '@/schemas/user-profile';
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
  cuisines: ['chinese', 'breakfast', 'organic', 'noodles', 'vegan'],
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

    await createCheckoutSession(checkoutData);
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
      )

      sessionStorage.setItem(
        `cartItems-${id}`, 
        JSON.stringify(cartItems)
      );

      return cartItems;
    })
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
