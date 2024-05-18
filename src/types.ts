import { UserFormData } from './schemas/user-profile';

export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type CheckoutRequestType = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email?: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export type UserData = {
  name: string
  city: string
  country: string
  addressLine1: string
}

export type FormProps = {
  onSave: (userData: UserFormData) => void
  isLoading?: boolean
  checkOut?: boolean
  currentUser: User
  title?: string
  buttonText?: string
}

export type MenuItem = {
  _id: string;
  name: string;
  ingridients?: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  delivery: boolean,
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  deliveryTime: string;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type OrderStatus =
  | 'placed'
  | 'paid'
  | 'inProgress'
  | 'outForDelivery'
  | 'delivered';

export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
