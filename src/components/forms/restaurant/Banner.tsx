import { 
  FormField, 
  FormItem, 
  FormControl, 
  FormMessage, 
  FormDescription, 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { AspectRatio } from '@/components/ui/aspect-ratio';


const Banner = () => {
  const { watch, control } = useFormContext();

  const existing_image_url = watch('imageUrl');
  
  return (
    <div className='space-y-2'>
      <>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be used as your restaurant's banner. Adding a new image will overwrite the existing one.
        </FormDescription>
      </>

      <div className='flex flex-col gap-8 md:w-[50%]'>
        {existing_image_url && (
          <AspectRatio ratio={16 / 9}>
            <img 
              src={existing_image_url} 
              alt='Restaurant banner' 
              className='rounded-full object-cover h-full w-full' 
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
                  className='bg-white' 
                  type='file' 
                  accept='.jpg, .jpeg, .png' 
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
