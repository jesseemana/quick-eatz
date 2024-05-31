import { useNavigate } from 'react-router';
import { SearchForm } from '@/schemas/search';
import HomeSearch from './HomeSearch';
import hero from '../assets/hero.jpg';

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = (searchValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchValues.searchQuery}`,
    });
  }

  return (
    <div id='hero'>
      <div className='relative'>
        <img 
          src={hero} 
          alt='hero image' 
          className='w-full object-cover min-h-screen lg:max-h-[600px]'
          loading='lazy'
        />
        <div className='absolute md:top-[35%] top-[25%] left-7'>
          <HomeSearch onSubmit={handleSearch} />
        </div>
      </div>
    </div>
  )
}

export default Hero;
