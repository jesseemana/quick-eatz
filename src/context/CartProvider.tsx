import { createContext, useContext, useState } from 'react';
import { useRestaurantId } from './RestaurantIdProvider';
import { MenuItem } from '@/types';
import { toast } from 'sonner';

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

type CartProviderState = {
  cartItems: CartItem[]
  setCartItems: (cartItem: CartItem[]) => void
  addToCart: (menuITem: MenuItem) => void
  decreaseCart: (item: CartItem) => void
  removeFromCart: (item: CartItem) => void
}

const initialState: CartProviderState = {
  cartItems: [],
  setCartItems: () => null,
  addToCart: () => null,
  decreaseCart: () => null,
  removeFromCart: () => null,
}

const CartProviderContext = createContext<CartProviderState>(initialState);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { id } = useRestaurantId();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored_items = sessionStorage.getItem(`cartItems-${id}`);
    return stored_items ? JSON.parse(stored_items) : [];
  });

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

  const value = {
    cartItems,
    setCartItems: (cartItems: CartItem[]) => setCartItems(cartItems),
    addToCart: (menuItem: MenuItem) => addToCart(menuItem),
    decreaseCart: (item: CartItem) => decreaseCart(item),
    removeFromCart: (cartItem: CartItem) => removeFromCart(cartItem),
  }

  return (
    <CartProviderContext.Provider value={value}>
      {children}
    </CartProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartProviderContext);
  return context;
}
