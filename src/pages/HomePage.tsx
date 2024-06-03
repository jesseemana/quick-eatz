import landingImage from '../assets/landing.png';
import appDownloadImage from '../assets/appDownload.png';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Header from '@/components/header/Header';


const HomePage = () => {
  useDocumentTitle('Quick Eatz - Your Next Meal Delivered At Your At Your Door');
  return (
    <>
      <Header />
      <Hero />
      <div className='flex flex-col gap-12 py-10'>
        <div className='grid md:grid-cols-2 gap-5'>
          <img 
            src={landingImage} 
            alt='application landing page image'
            className='h-auto w-auto'
          />
          <div className='flex flex-col items-center justify-center gap-4 text-center'>
            <p className='font-bold text-3xl tracking-tighter text-gray-900 capitalize'>
              order takeaway even faster!
            </p>
            <p className='text-gray-700'>
              Download the Quick Eatz app for faster ordering and personalised recommendations.
            </p>
            <img 
              src={appDownloadImage} 
              alt='app download image' 
              className='h-auto w-auto'
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
