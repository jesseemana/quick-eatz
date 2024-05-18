import banner from '../assets/restaurant1.jpg';
import { AspectRatio } from './ui/aspect-ratio';

const Banner = ({ image }: { image: string }) => {
  return (
    <>
      <div className='md:hidden'>
        <AspectRatio ratio={16/6}>
          <img 
            src={image || banner} 
            alt='restaurant banner' 
            className='rounded-xl object-cover h-full w-full'
          />
          </AspectRatio>
      </div>
      <div className='hidden md:block'>
        <AspectRatio ratio={16/4}>
          <img 
            src={image || banner} 
            alt='restaurant banner' 
            className='rounded-3xl object-cover h-full w-full'
          />
          </AspectRatio>
      </div>
    </>
  )
}

export default Banner;
