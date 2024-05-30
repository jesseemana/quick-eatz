import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
} from './ui/dropdown-menu';
import { sortOptions } from '@/constants/constants';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SortDropdown = ({ onChange, isExpanded, onExpand }: { 
  onChange: (value: string) => void, 
  onExpand: () => void, 
  isExpanded: boolean, 
}) => {
  return (
    <div className='flex gap-2 px-4'>
      <DropdownMenu>
        <DropdownMenuTrigger 
          onClick={onExpand} 
          className='rounded-full px-4 py-2 text-[14px] bg-gray-100 font-semibold'
        >
          {isExpanded 
          ? <span className='flex'>
              Delivery <ChevronUp strokeWidth={1} />
            </span> 
          : <span className='flex'>
              Delivery <ChevronDown strokeWidth={1} />
            </span>}
        </DropdownMenuTrigger>
        <DropdownMenuContent className='lg:ml-14 ml-4'>
          {sortOptions.map((option) => (
            <DropdownMenuItem 
              key={option.value} 
              className='cursor-pointer capitalize' 
              onClick={() => onChange(option.value)}
            >
              sort by {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SortDropdown;
