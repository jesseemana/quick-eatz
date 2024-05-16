import { Routes, Route } from 'react-router';
import { 
  HomePage, 
  NotFound, 
  Profile, 
  SearchPage, 
  Restaurant, 
  AuthCallBackPage, 
} from './pages';
import Layout from './layouts/Layout';
import ProtectedRoute from './auth/ProtectedRoute';
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
        element={
          <Layout styles='bg-black'>
            <SearchPage />
          </Layout> 
        } 
      />

      <Route 
        path='/restaurant/:id' 
        element={
          <Layout styles='bg-black'>
            <RestaurantDetails />
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
