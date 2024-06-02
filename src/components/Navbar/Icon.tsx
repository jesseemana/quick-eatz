import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps {
  IconComponent: LucideIcon;
  size?: number;
  className?: string;
}

const IconWrapper: React.FC<IconProps> = ({ IconComponent, size = 20, className }) => {
  return (
    <IconComponent  
      size={size} 
      className={cn('text-gray-700', className)}
    />
  );
};

export default IconWrapper;
