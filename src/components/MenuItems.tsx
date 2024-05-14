import { MenuItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const MenuItems = ({ menuItem, addToCart }: {
  menuItem: MenuItem;
  addToCart: () => void;
}) => {
  return (
    <Card 
      onClick={addToCart} 
      className='cursor-pointer' 
    >
      <CardHeader>
        <CardTitle className='capitalize'>
          {menuItem.name}
        </CardTitle>
      </CardHeader>
      <CardContent className='font-bold'>
        ${menuItem.price} 
      </CardContent>
    </Card>
  )
}

export default MenuItems;
