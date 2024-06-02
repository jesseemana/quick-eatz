import { cuisines } from '@/constants/constants';
import { Label } from './ui/label';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from './ui/carousel';

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
    <div className='container'>
      <Carousel>
        <CarouselContent className='-ml-4 p-1'>
          {cuisines.map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine.name);
            return (
              <div key={cuisine.name} >
                <CarouselItem className='basis-1/3 pl-4'>
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
                    className={`flex flex-1 items-center flex-col w-14 md:w-20 text-gray-800 font-medium cursor-pointer p-1 ${
                      isSelected ? 'border-b-2 border-slate-500' : 'border-none'
                    }`}
                  >
                    <img 
                      src={cuisine.icon} 
                      alt={cuisine.name} 
                      className='w-14 h-14' 
                    />
                    {cuisine.name}
                  </Label>
                </CarouselItem>
              </div>
            )}
          )}
        </CarouselContent>
        <CarouselPrevious className='hidden md:flex' />
        <CarouselNext className='hidden md:flex' />
      </Carousel>
    </div>
  );
}

export default Cuisines;
