import { Routes, Route } from 'react-router';
import { HomePage, NotFound, Profile } from './pages';
import Layout from './layouts/Layout';
import ProtectedRoute from './auth/ProtectedRoute';
import AuthCallBackPage from './pages/AuthCallBackPage';
import Restaurant from './pages/Restaurant';

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
  )
}

export default App;
