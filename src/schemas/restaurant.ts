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
    thumbNail: z.string().optional(),
    thumbNailFile: z.instanceof(File, { message: 'thumbnail is required' }).optional(),
  }).refine((data) => data.imageUrl || data.imageFile, {
    message: 'Either image URL or image File must be provided',
    path: ['imageFile'],
  }).refine((data) => data.thumbNail || data.thumbNailFile, {
    message: 'Either image URL or image File must be provided',
    path: ['thumbNail'],
  });

export type RestaurantFormData = z.infer<typeof restaurantSchema>;
