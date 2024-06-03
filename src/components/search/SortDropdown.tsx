import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
} from '../ui/dropdown-menu';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { sortOptions } from '@/constants/constants';

type DropdownProps = { 
  onChange: (value: string) => void, 
  isExpanded: boolean, 
  onExpand: () => void, 
}

const SortDropdown = ({ onChange, isExpanded, onExpand }: DropdownProps) => {
  return (
    <div className='flex gap-2 px-4'>
      <DropdownMenu onOpenChange={onExpand}>
        <DropdownMenuTrigger className='rounded-full px-4 py-2 text-[14px] bg-gray-100 font-semibold'> 
          {isExpanded ? (
            <span className='flex'>
              Delivery <ChevronUp strokeWidth={1} />
            </span>) : (
            <span className='flex'>
              Delivery <ChevronDown strokeWidth={1} />
            </span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className='lg:ml-14 ml-4'>
          {sortOptions.map((option) => (
            <DropdownMenuItem 
              key={option.value} 
              className='cursor-pointer' 
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
