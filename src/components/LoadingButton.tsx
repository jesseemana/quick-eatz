import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

const LoadingButton = ({ title='submitting' }: { title?: string }) => {
  return (
    <Button 
      disabled 
      className='disabled:cursor-not-allowed'
    >
      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      {title}...
    </Button>
  );
};

export default LoadingButton;
