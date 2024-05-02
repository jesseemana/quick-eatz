import { Routes, Route } from 'react-router';
import { HomePage, NotFound, Profile } from './pages';
import Layout from './layouts/Layout';
import AuthCallBackPage from './pages/AuthCallBackPage';

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
      <Route path='/auth-callback' element={<AuthCallBackPage />} />
      <Route path='/user' element={
        <Layout styles='bg-black'>
          <Profile/>
        </Layout>
        } 
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App;
