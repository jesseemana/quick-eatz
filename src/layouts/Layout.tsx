import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Layout = ({ children, showHero = false }: { children: React.ReactNode, showHero?: boolean }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main>
        {showHero && <Hero />}
        <div className='container mx-auto flex-1 py-10'>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
