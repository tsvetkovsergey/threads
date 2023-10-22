import * as z from 'zod';

export const CommunityValidation = z.object({
  name: z.string().min(2).max(30),
  bio: z.string().min(0).max(1000),
});
