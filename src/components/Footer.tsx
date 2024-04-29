const Footer = () => {
  return (
    <div className='bg-orange-500 py-4'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <span className='text-2xl text-white font-bold tracking-tight capitalize'>
          quick eatz
        </span>
        <span className='text-white font-normal tracking-tight flex gap-4'>
          <a href='#'>Privacy Policy</a>
          <a href='#'>Terms of Service</a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
