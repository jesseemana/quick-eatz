import { MenuItem } from '@/types';
import { Card } from './ui/card';
import { PlusIcon } from 'lucide-react';

const MenuItems = ({ menuItem, addToCart, }: {
  menuItem: MenuItem;
  addToCart: () => void;
}) => {
  return (
    <Card className='rounded-lg shadow-sm w-full p-4' >
      <>
        <h1 className='capitalize font-semibold'>{menuItem.name}</h1>
        <p className='text-gray-700'>${(menuItem.price).toFixed(2)}</p>
        <p className='text-gray-500'>{menuItem.ingridients}</p>
      </>
      <div className='grid place-content-end justify-end'>
        <button 
          onClick={addToCart}
          className='border rounded-full p-2 text-black shadow-md'
        > 
          <PlusIcon />
        </button>
      </div>
    </Card>
  )
}

export default MenuItems;
