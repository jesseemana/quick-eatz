import { LucideIcon } from 'lucide-react';

interface IconProps {
  IconComponent: LucideIcon;
  color?: string;
  size?: number;
}

const IconWrapper: React.FC<IconProps> = ({ IconComponent, color = 'black', size = 20 }) => {
  return (
    <IconComponent 
      color={color} 
      size={size} 
    />
  );
};

export default IconWrapper;
