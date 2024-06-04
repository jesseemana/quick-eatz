import { useFormContext } from 'react-hook-form';
import { 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormMessage, 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AspectRatio } from '@/components/ui/aspect-ratio';


const ThumbNail = () => {
  const { control, watch } = useFormContext();

  const existingThumbNail = watch('thumbNail');
  
  return (
    <div className='space-y-2'>
      <>
        <h2 className='md:text-2xl text-xl font-bold'>Thumbnail</h2>
        <FormDescription className='text-sm'>
          Add an image that'll be used restaurant thumbnail
        </FormDescription>
      </>

      <div className='flex flex-col gap-8 md:w-[50%]'>
        {existingThumbNail && (
          <AspectRatio ratio={16/7}>
            <img 
              src={existingThumbNail} 
              alt='restaurant thumbnail image' 
              className='rounded-md object-cover h-full w-full'
            />
          </AspectRatio>
        )}
        
        <FormField 
          control={control} 
          name='thumbNailFile' 
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  type='file' 
                  className='bg-white' 
                  accept='.jpg, .jpeg, .png, .webp' 
                  onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
      </div>
    </div>
  );
}

export default ThumbNail;
