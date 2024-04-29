import './global.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Toaster } from 'sonner';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
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
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>
          <App />
          <Toaster 
            visibleToasts={1} 
            position='top-right' 
            richColors 
          />
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
