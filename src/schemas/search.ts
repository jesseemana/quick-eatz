import { z } from 'zod';

export const searchSchema = z.object({
  searchQuery: z.string({
    required_error: 'Restaurant name or location is required',
  }),
});

export type SearchForm = z.infer<typeof searchSchema>;
