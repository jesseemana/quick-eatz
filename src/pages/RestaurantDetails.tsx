import { toast } from 'sonner';
import { useState } from 'react';
import { useParams } from 'react-router';
import { SearchState } from './SearchResults';
import { SearchForm } from '@/schemas/search';
import { UserFormData } from '@/schemas/user-profile';
import { Separator } from '@/components/ui/separator';
import { Card, CardFooter } from '@/components/ui/card';
import { CheckoutRequestType, MenuItem, Restaurant } from '@/types';
import useCreateCheckoutSession from '@/hooks/useCreateCheckoutSession';
import useGetRestaurant from '@/hooks/useGetRestaurants';
import OrderSummary from '@/components/OrderSummary';
import SearchHeader from '@/components/SearchHeader';
import Banner from '@/components/Banner';
import CheckOut from '@/components/CheckOut';
import MenuItems from '@/components/MenuItems';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import RestaurantInfo from '@/components/RestaurantInfo';
import RestaurantLoader from '@/components/RestaurantLoader';


export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};


const restaurant: Restaurant = {
  _id: '90709809198sf90akjaz78',
  user: '897109rj1gs989asf9100',
  restaurantName: 'New Ho King',
  city: 'toronto',
  country: 'canada',
  delivery: true,
  deliveryPrice: 200000,
  deliveryMin: 10,
  deliveryMax: 30,
  deliveryTime: 30,
  estimatedDeliveryTime: 20,
  cuisines: ['chinese', 'fastfood', 'noodles', 'vegan', 'american'],
  menuItems: [
    {
      _id: 'random_id_1',
      name: 'kendrick lamar special',
      ingridients: 'Fried rice, dip sauce, blammy.',
      price: 1500
    },
    {
      _id: 'random_id_2',
      name: 'hot wings',
      ingridients: 'Fried chicken, chilli sauce, chips, pepsi or coke.',
      price: 200
    },
    {
      _id: 'random_id_3',
      name: 'magherita pizza',
      ingridients: 'Tomato, mozarella, basil & olive oil.',
      price: 1000
    },
    {
      _id: 'random_id_4',
      name: 'calamari fritti',
      ingridients: 'Deep fried calamari, smoked paprika, olives & preserved lemon.',
      price: 1200
    },
    {
      _id: 'random_id_5',
      name: 'bacon & avo & feta pizza',
      ingridients: 'Tomato, mozarella, bacon, avocadp & feta.',
      price: 1200
    },
    {
      _id: 'random_id_6',
      name: 'melanzane parmigiana',
      ingridients: 'Aurbegine, mozarella, napolitana & basil aioli.',
      price: 1480
    },
  ],
  imageUrl: '',
  lastUpdated: '2024-05-13',
}


const RestaurantDetails = () => {
  const { id } = useParams();

  const { isLoading: isRestaurantLoading, } = useGetRestaurant(id);
  const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();
  
  useDocumentTitle(`Order ${restaurant.restaurantName}`);
 
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored_items = sessionStorage.getItem(`cartItems-${id}`);
    return stored_items? JSON.parse(stored_items) : [];
  });

  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch'
  });

  const onCheckOut = async (user_data: UserFormData) => {
    if (!restaurant) return;
    
    const checkoutData: CheckoutRequestType = {
      cartItems: cartItems.map(cart_item => ({
        menuItemId: cart_item._id,
        name: cart_item.name,
        quantity: cart_item.quantity.toString(),
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

  function addToCart(menu_item: MenuItem) {
    setCartItems((prev) => {
      const existing_item = prev.find(cart_item => cart_item._id === menu_item._id);

      let updatedCartItems;

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

  function decreaseCart(menu_item: CartItem) { 
    setCartItems((prev) => {
      const cartItems = prev.map(cart_item => 
        cart_item._id === menu_item._id 
        ? cart_item.quantity > 1 
          ? { 
              ...cart_item, 
              quantity: cart_item.quantity - 1 
            } 
          : cart_item
        : cart_item
      );

      sessionStorage.setItem(
        `cartItems-${id}`, 
        JSON.stringify(cartItems)
      );

      return cartItems;
    });
  }

  function removeFromCart(cart_item: CartItem) { 
    setCartItems((prev) => {
      const updatedCart = prev.filter(item => item._id !== cart_item._id);

      sessionStorage.setItem(
        `cartItems-${id}`, 
        JSON.stringify(updatedCart)
      );

      toast.success('Item removed');

      return updatedCart;
    });
  }

  function handleSearch(data: SearchForm) {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: data.searchQuery,
      page: 1
    }));
  }

  return (
    <>
      <SearchHeader 
        searchState={searchState} 
        handleSearch={handleSearch} 
      />
      {isRestaurantLoading ? <RestaurantLoader /> : (
      <div className='container'>
        <div className='space-y-2'>
          <Banner image={restaurant.imageUrl} />
          <RestaurantInfo restaurant={restaurant} />
        </div>
        <Separator className='md:w-[380px] lg:w-[500px] mt-4 md:mt-0' />
        <div className='grid md:grid-cols-[4fr_2fr] gap-5 mt-4'>
          <div className='gap-4'>
            <h1 className='text-2xl font-semibold tracking-tight capitalize'>menu</h1>
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
                addToCart={addToCart}
                cartItems={cartItems} 
                restaurant={restaurant} 
                decreaseCart={decreaseCart}
                removeFromCart={removeFromCart}
              />
              <CardFooter className='grid place-items-center'>
                <CheckOut 
                  onCheckout={onCheckOut}
                  checkout={cartItems.length > 0}
                  disabled={cartItems.length === 0} 
                  isLoading={isCheckoutLoading}
                />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>)}
    </>
  );
}

export default RestaurantDetails;
