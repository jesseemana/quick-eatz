import { Separator } from './ui/separator';
import appDownloadImage from '../assets/appDownload.png';
import { FacebookIcon, Twitter, Instagram, } from 'lucide-react';


const Footer = () => {
  return (
    <>
      <Separator />
      <div className='py-4 md:py-8 text-black'>
        <div className='md:container mx-auto justify-between items-center px-4 md:px-0'>
          <div className='py-2 lg:grid lg:grid-cols-2 flex md:space-x-8 lg:space-x-4 flex-col md:flex-row'>
            <div>
              <h1 className='text-2xl font-bold tracking-tight capitalize'>quick eatz</h1>
              <img 
                src={appDownloadImage} 
                alt='app download icons'
                className='lg:mt-40 md:mt-4 mb-2 hidden md:block'
              />
            </div>
            <div className='flex flex-col md:flex-row lg:gap-20 gap-4 mt-4 md:mt-0'>
              <ul className='leading-9 text-gray-800 font-normal tracking-tigh'>
                <li><a href='#'>Get help</a></li>
                <li><a href='#'>Add your restaurant</a></li>
                <li><a href='#'>Sign up to deliver</a></li>
                <li><a href='#'>Create a business account</a></li>
              </ul>  
              <ul className='leading-9 text-gray-800 font-normal tracking-tigh'>
                <li><a href='#'>Restaurants near me</a></li>
                <li><a href='#'>View all cities</a></li>
                <li><a href='#'>View all countries</a></li>
                <li><a href='#'>Pick up near me</a></li>
                <li><a href='#'>Shop groceries</a></li>
              </ul>
              <a href='#'>
                <img 
                  src={appDownloadImage} 
                  alt='app download icons'
                  className='mt-2 mb-2 md:hidden'
                />
              </a>
            </div>
          </div>
          <Separator />
          <div className='flex justify-between pt-4 flex-col md:flex-row items-center'>
            <div className='flex gap-4'>
              <FacebookIcon />
              <Twitter className='fill-black' />
              <Instagram />
            </div>
            <div className='font-normal tracking-tight flex gap-4'>
              <a href='#'>Privacy Policy</a>
              <a href='#'>Terms of Service</a>
              <a href='#'>Pricing</a>
            </div>
          </div>
          <div className='grid place-items-center md:flex md:justify-end'>
            <p>2024 Quick Eatz</p>
          </div>
        </div>
      </div>
    </>

  );
};

export default Footer;
