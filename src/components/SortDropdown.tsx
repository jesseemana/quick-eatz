import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
} from './ui/dropdown-menu';
import { sort_options } from '@/constants/constants';


const SortDropdown = ({ onChange, sortOption, }: { 
  onChange: (value: string) => void, 
  sortOption: string, 
}) => {
  const sort_label = sort_options.find(option => option.value === sortOption)?.label || sort_options[0].label

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer flex items-start'>
        <span className='w-auto shadow bg-gray-50 p-2 text-gray-700 rounded-sm font-normal hover:bg-gray-50 hover:border-gray-50 hover:shadow-md'>
          Sort by: {sort_label}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-40 md:mr-12'>
        {sort_options.map(option => (
          <DropdownMenuItem 
            key={option.value} 
            className='cursor-pointer' 
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortDropdown;
