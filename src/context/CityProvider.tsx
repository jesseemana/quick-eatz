import { createContext, useContext, useState } from 'react';

type CityProviderState = {
  city: string
  setCity: (city: string) => void
}

const initialState: CityProviderState = {
  city: '',
  setCity: () => null,
}

const CityProviderContext = createContext<CityProviderState>(initialState);

export const CityProvider = ({ children }: { children: React.ReactNode }) => {
  const [city, setCity] = useState<string>('');

  const value = {
    city,
    setCity: (city: string) => setCity(city),
  }

  return (
    <CityProviderContext.Provider value={value}>
      {children}
    </CityProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCity = () => {
  const context = useContext(CityProviderContext);

  return context;
}
