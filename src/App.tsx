import { Routes, Route } from 'react-router';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Edit from './pages/Edit';
import Restaurant from './pages/Restaurant';
import AuthCallBackPage from './pages/AuthCallBackPage';
import OrderStatus from './pages/OrderStatus';
import SearchResults from './pages/SearchResults';
import RestaurantDetails from './pages/RestaurantDetails';
import ProtectedRoute from './auth/ProtectedRoute';


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

      <Route element={<ProtectedRoute />}>
        <Route 
          path='/edit-profile' 
          element={
            <Layout>
              <Edit />
            </Layout>
          } 
        />
      </Route>
      
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
