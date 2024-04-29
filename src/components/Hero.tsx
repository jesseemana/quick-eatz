import hero from '../assets/header2.jpg';

const Hero = () => {
  return (
    <div id='hero'>
      <img 
        src={hero} 
        alt='hero image' 
        className='w-full max-h-[600px] object-cover md:min-h-screen'
      />
    </div>
  )
}

export default Hero;
