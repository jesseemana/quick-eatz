import './global.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';
import { SearchStateProvider } from './context/SearchQueryProvider';
import { CityProvider } from './context/CityProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CartProvider } from './context/CartProvider';
import { RestaurantIdProvider } from './context/RestaurantIdProvider';
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RestaurantIdProvider>
      <SearchStateProvider>
        <CartProvider>
          <CityProvider>
            <Router>
              <QueryClientProvider client={queryClient}>
                <Auth0ProviderWithNavigate>
                  <App />
                  <Toaster 
                    richColors 
                    visibleToasts={1} 
                    position='bottom-right' 
                  />
                </Auth0ProviderWithNavigate>
              </QueryClientProvider>
            </Router>
          </CityProvider>
        </CartProvider>
      </SearchStateProvider>
    </RestaurantIdProvider>
  </React.StrictMode>
);
