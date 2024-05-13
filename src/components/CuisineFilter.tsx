import { cuisine_list } from '@/constants/constants';
import { Label } from './ui/label';
import { Check } from 'lucide-react';
import { ChangeEvent } from 'react';

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const CuisineFilter = ({ onChange, selectedCuisines, isExpanded, onExpandedClick }:  Props) => {

  function handleCuisineChange(e: ChangeEvent<HTMLInputElement>) { 
    const cuisineList = e.target.value;
    const isChecked = e.target.checked;

    const newCuisineList = isChecked 
      ? [...selectedCuisines, cuisineList] 
      : selectedCuisines.filter(cuisine => cuisine !== cuisineList)

    onChange(newCuisineList);
  }

  const handleResetFilters = () => onChange([]);

  return (
    <>
      <div className='flex justify-between items-center px-2'>
        <p className='text-md font-semibold mb-2 capitalize'>filter by cuisine</p>
        <button 
          onClick={handleResetFilters} 
          className='text-sm font-semibold mb-2 underline cursor-pointer text-blue-500 capitalize'
        >
          reset filter
        </button>
      </div>

      <div className='space-y-1 flex flex-col'>
        {cuisine_list.map(cuisine => {
          const isSelected = selectedCuisines.includes(cuisine);

          return (
            <div key={cuisine} className='flex flex-col'>
              <input 
                id={`cuisine_${cuisine}`} 
                type='checkbox' 
                checked={isSelected}
                value={cuisine}
                className='hidden'
                onChange={handleCuisineChange}
              />
              <Label 
                htmlFor={`cuisine_${cuisine}`}
                className={`flex flex-1 items-center cursor-pointer text text-sm rounded-full px-4 py-2 ${
                  isSelected 
                  ? 'border border-green-600 text-green-600' 
                  : 'border border-slate-300'
                }`}
              >
                {isSelected && <Check size={20} strokeWidth={3} />}
                {cuisine}
              </Label>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default CuisineFilter;
