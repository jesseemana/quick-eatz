import landingImage from '../assets/landing.png';
import appDownloadImage from '../assets/appDownload.png';
// import SearchBar, { SearchForm } from '@/components/SearchBar';
// import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  // const navigate = useNavigate();

  // const handleSearchSubmit = (searchFormValues: SearchForm) => {
  //   navigate({
  //     pathname: `/search/${searchFormValues.searchQuery}`,
  //   });
  // };

  return (
    <div className='flex flex-col gap-12'>
      <div className='md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16'>
        <h1 className='md:text-5xl text-3xl font-bold tracking-tight text-orange-600'>
          Tuck into a takeway today
        </h1>
        <p className='text-xl text-gray-700'>Your next meal is just a click away!</p>
        {/* <SearchBar
          placeHolder='Search by City or Town'
          onSubmit={handleSearchSubmit}
        /> */}
      </div>
      <div className='grid md:grid-cols-2 gap-5'>
        <img src={landingImage} />
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
          <p className='font-bold text-3xl tracking-tighter text-gray-900 capitalize'>
            order takeaway even faster!
          </p>
          <p className='text-gray-700'>
            Download the Quick Eatz app for faster ordering and personalised recommendations.
          </p>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
