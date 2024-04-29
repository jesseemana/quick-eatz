import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import Layout from './layouts/Layout';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route 
        path='/'
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App;
