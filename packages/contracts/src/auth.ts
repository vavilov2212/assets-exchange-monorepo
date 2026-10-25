import { z } from 'zod';

/** Тело POST /auth/login */
export const LoginBodySchema = z.object({
    email: z.string().trim().toLowerCase().email(),
});
export type LoginBody = z.infer<typeof LoginBodySchema>;