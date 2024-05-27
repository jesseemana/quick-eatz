import { Routes, Route } from 'react-router';
import { 
  HomePage, 
  NotFound, 
  Profile, 
  Restaurant, 
  AuthCallBackPage, 
} from './pages';
import Layout from './layouts/Layout';
import ProtectedRoute from './auth/ProtectedRoute';
import OrderStatus from './pages/OrderStatus';
import SearchResults from './pages/SearchResults';
import RestaurantDetails from './pages/RestaurantDetails';


const App = () => {
  return (
    <Routes>
      <Route 
        path='/'
        element={
          <Layout showHero styles='bg-transparent'>
            <HomePage />
          </Layout>
        }
      />

      <Route 
        path='/auth-callback' 
        element={<AuthCallBackPage />} 
      />

      <Route 
        path='/search/:city' 
        element={<SearchResults />} 
      />

      <Route 
        path='/restaurant/:id' 
        element={<RestaurantDetails />} 
      />

      <Route 
        path='/order-status' 
        element={
          <Layout styles='bg-black'>
            <OrderStatus />
          </Layout>
        }
      />

      <Route 
        path='/manage-restaurant' 
        element={
          <Layout styles='bg-black'>
            <Restaurant />
          </Layout>
        } 
      />

      <Route element={<ProtectedRoute />}>
        <Route 
          path='/user' 
          element={
            <Layout styles='bg-black'>
              <Profile/>
            </Layout>
          } 
        />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
