import { createContext, useContext, useState } from 'react';

type RestauranIdProviderState = {
  id: string
  setRestaurantId: (id: string) => void
}

const initialState: RestauranIdProviderState = {
  id: '',
  setRestaurantId: () => null
}

const RestauranIdProviderContext = createContext<RestauranIdProviderState>(initialState);

export const RestaurantIdProvider = ({ children }: { children: React.ReactNode }) => {
  const [id, setRestaurantId] = useState<string>('');

  const value = {
    id,
    setRestaurantId: (id: string) => setRestaurantId(id),
  }

  return (
    <RestauranIdProviderContext.Provider value={value}>
      {children}
    </RestauranIdProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRestaurantId = () => {
  const context = useContext(RestauranIdProviderContext);
  return context;
}
