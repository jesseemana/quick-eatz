import { useNavigate } from 'react-router';
import { SearchForm } from '@/schemas/search';
import HomeSearch from './HomeSearch';
import hero from '../assets/hero.jpg';
import { useCity } from '@/context/CityProvider';

const Hero = () => {
  const navigate = useNavigate();
  const { setCity } = useCity();

  const handleSearch = (searchValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchValues.searchQuery}`,
    });
    setCity(searchValues.searchQuery);
  }

  return (
    <div id='hero'>
      <img 
        src={hero} 
        alt='hero image' 
        className='w-full object-cover min-h-screen lg:max-h-[600px]'
        loading='lazy'
      />
      <div className='absolute md:top-[35%] top-[25%] left-5 flex items-center justify-center'>
        <HomeSearch onSubmit={handleSearch} />
      </div>
    </div>
  )
}

export default Hero;
