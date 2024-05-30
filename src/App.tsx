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
        element={<HomePage />}
      />

      <Route 
        path='/auth-callback' 
        element={<AuthCallBackPage />} 
      />

      <Route 
        path='/search/:city' 
        element={
          <Layout>
            <SearchResults />
          </Layout>
        } 
      />

      <Route 
        path='/restaurant/:id' 
        element={
          <Layout>
            <RestaurantDetails />
          </Layout>
        } 
      />

      <Route 
        path='/order-status' 
        element={
          <Layout>
            <OrderStatus />
          </Layout>
        }
      />

      <Route 
        path='/manage-restaurant' 
        element={
          <Layout>
            <Restaurant />
          </Layout>
        } 
      />

      <Route element={<ProtectedRoute />}>
        <Route 
          path='/user' 
          element={
            <Layout>
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
