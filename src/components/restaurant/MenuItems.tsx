import { toast } from 'sonner';
import { PlusIcon } from 'lucide-react';
import { MenuItem } from '@/types';
import { Card } from '../ui/card';


const MenuItems = ({ menuItem, addToCart, }: {
  menuItem: MenuItem;
  addToCart: () => void;
}) => {
  function handleCart() {
    addToCart();
    toast.success('Item added');
  }
  
  return (
    <Card className='rounded-lg shadow-sm w-full p-4' >
      <>
        <h1 className='capitalize font-semibold'>{menuItem.name}</h1>
        <p className='text-gray-700'>
          MWK{(menuItem.price / 100).toFixed(2)}
        </p>
        <p className='text-gray-500'>{menuItem.ingridients}</p>
      </>
      <div className='grid place-content-end justify-end'>
        <button 
          onClick={handleCart}
          className='border rounded-full p-2 text-black shadow-md'
        > 
          <PlusIcon />
        </button>
      </div>
    </Card>
  )
}

export default MenuItems;
