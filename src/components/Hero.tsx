import { useNavigate } from 'react-router';
import hero from '../assets/hero.jpg';
import HomeSearch, { SearchForm } from './HomeSearch';

const Hero = () => {
  const navigate = useNavigate();

  function handleSearch(searchValues: SearchForm) {
    navigate({
      pathname: `/search/${searchValues.searchQuery}`,
    });
  }

  return (
    <div id='hero'>
      <img 
        src={hero} 
        alt='hero image' 
        className='w-full object-cover min-h-screen lg:max-h-[600px] relative'
      />
      <div className='grid place-items-center md:flex'>
        <HomeSearch 
          onSubmit={handleSearch} 
          styles='absolute md:top-[30%] lg:left-[3%] top-[20%]' 
        />
      </div>
    </div>
  )
}

export default Hero;
