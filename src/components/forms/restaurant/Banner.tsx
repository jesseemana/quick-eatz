import { useFormContext } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormControl, 
  FormMessage, 
  FormDescription, 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AspectRatio } from '@/components/ui/aspect-ratio';


const Banner = () => {
  const { watch, control } = useFormContext();

  const existingImageUrl = watch('imageUrl');
  
  return (
    <div className='space-y-2'>
      <>
        <h2 className='text-2xl font-bold'>Image</h2>
        <FormDescription>
          Add an image that will be used as your restaurant's banner. Adding a new image will overwrite the existing one.
        </FormDescription>
      </>

      <div className='flex flex-col gap-8 md:w-[50%]'>
        {existingImageUrl && (
          <AspectRatio ratio={16/9}>
            <img 
              src={existingImageUrl} 
              alt='Restaurant banner' 
              className='rounded-md object-cover h-full w-full' 
            />
          </AspectRatio>
        )}
        
        <FormField 
          control={control} 
          name='imageFile' 
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
  )
}

export default Banner;
