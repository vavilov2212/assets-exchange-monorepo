import { z } from 'zod';

/** Тело POST /auth/login */
export const LoginBodySchema = z.object({
    email: z.string().email(),
});
export type LoginBody = z.infer<typeof LoginBodySchema>;