import { z } from 'zod';

export const restaurantSchema = z
  .object({
    restaurantName: z.string({
      required_error: 'restuarant name is required',
    }).trim(),
    city: z.string({
      required_error: 'city is required',
    }).trim(),
    country: z.string({
      required_error: 'country is required',
    }).trim(),
    deliveryPrice: z.coerce.number({
      required_error: 'delivery price is required',
      invalid_type_error: 'must be a valid number',
    }),
    deliveryMax: z.coerce.number({
      required_error: 'delivery max price is required',
      invalid_type_error: 'must be a valid number',
    }),
    deliveryMin: z.coerce.number({
      required_error: 'delivery min price is required',
      invalid_type_error: 'must be a valid number',
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: 'estimated delivery time is required',
      invalid_type_error: 'must be a valid number',
    }),
    cuisines: z.array(z.string().trim()).nonempty({
      message: 'please select at least one item',
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, 'name is required').trim(),
        price: z.coerce.number().min(1, 'price is required'),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: 'image is required' }).optional(),
    thumbNailUrl: z.string().optional(),
    thumbNailFile: z.instanceof(File, { message: 'thumbnail is required' }).optional(),
  }).refine((data) => data.thumbNailUrl || data.thumbNailFile, {
    message: 'Provide thumbnail url or thumbnail file',
    path: ['thumbNailFile'],
  }).refine((data) => data.imageUrl || data.imageFile, {
    message: 'Provide image url or image file',
    path: ['imageFile'],
  });

export type RestaurantFormData = z.infer<typeof restaurantSchema>;
