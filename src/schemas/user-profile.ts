import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, 'name is required'),
  addressLine1: z.string().min(1, 'Address Line 1 is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
});

export type UserFormData = z.infer<typeof userSchema>;
