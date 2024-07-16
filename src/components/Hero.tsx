import { useNavigate } from 'react-router';
import { SearchForm } from '@/schemas/search';
import HomeSearch from './HomeSearch';

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
          src={'https://res.cloudinary.com/djcxl7oim/image/upload/v1717935640/quickeatz/header_ombe6v.png'} 
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
