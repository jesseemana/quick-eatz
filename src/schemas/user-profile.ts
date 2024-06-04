import { z } from 'zod';

export const userSchema = z.object({
  name: z.string({
    required_error: 'please provide a name'
  }).min(1),
  email: z.string().optional(),
  phone: z.string({
    required_error: 'please provide your phone numer'
  }),
  addressLine1: z.string({
    required_error: 'please provide an address line'
  }).min(1),
  city: z.string({
    required_error: 'please provide a city'
  }).min(1),
  country: z.string({
    required_error: 'please provide a country'
  }).min(1),
});

export type UserFormData = z.infer<typeof userSchema>;
