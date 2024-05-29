import Footer from '@/components/Footer';
import Header from '@/components/SearchHeader';
import { useNavigate } from 'react-router-dom';
import { SearchForm } from '@/schemas/search';
import { useCity } from '@/context/CityProvider';
import { useSearchState } from '@/context/SearchQueryProvider';

const Layout = ({ children, }: {
  children: React.ReactNode 
}) => {
  const { city } = useCity()
  const { searchState, setSearchState } = useSearchState();

  const navigate = useNavigate()

  const handleSearch = (data: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: data.searchQuery,
      page: 1
    }));

    navigate({
      pathname: `/search/${city}`,
    });
  }

  return (
    <div className={`flex flex-col min-h-screen container mx-auto`}>
      <Header 
        city={city} 
        handleSearch={handleSearch} 
        searchState={searchState} 
      />
      <main className='flex-1'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
