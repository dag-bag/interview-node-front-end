import { z } from 'zod';

export const productQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    category: z.string().optional(),
    q: z.string().optional(),
  }),
});