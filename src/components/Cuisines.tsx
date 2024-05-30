import { cuisines } from '@/constants/constants';
import { Label } from './ui/label';

const Cuisines = ({ onChange, selectedCuisines, }: { 
  onChange: (cuisines: string[]) => void
  selectedCuisines: string[] 
}) => {
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) =>  {
    const cuisines = e.target.value;
    const isSelected = e.target.checked;

    const newCuisines = isSelected 
      ? [...selectedCuisines, cuisines] 
      : selectedCuisines.filter(cuisine => cuisine !== cuisines)

    onChange(newCuisines);
  }

  return (
    <div className='flex overflow-hidden gap-4'>
      {cuisines.map((cuisine) => {
        const isSelected = selectedCuisines.includes(cuisine.name);
        return (
          <div 
            key={cuisine.name} 
            className='flex flex-col'
          >
            <input 
              id={`cuisine_${cuisine.name}`}
              type='checkbox' 
              value={cuisine.name}
              className='hidden'
              checked={isSelected}
              onChange={handleChecked}
            />
            <Label 
              htmlFor={`cuisine_${cuisine.name}`}
              className={`flex flex-1 items-center flex-col w-16 text-gray-800 font-medium cursor-pointer p-1 ${
                isSelected ? 'border-b-2 border-gray-700' : 'border-none'
              }`}
            >
              <img 
                src={cuisine.icon} 
                alt={cuisine.name} 
                className='w-14 h-14' 
              />
              {cuisine.name}
            </Label>
          </div>
        )
      })}
    </div>
  );
}

export default Cuisines;
