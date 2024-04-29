import hero from '../assets/hero.png';

const Hero = () => {
  return (
    <>
      <img 
        src={hero} 
        alt='hero image' 
        className='w-full max-h-[600px] object-cover'
      />
    </>
  )
}

export default Hero;
