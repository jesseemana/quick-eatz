import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface LayOutProps {
  children: React.ReactNode 
  styles?: string 
  showHero?: boolean
}

const Layout = ({ children, styles, showHero }: LayOutProps) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header styles={styles} />
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
