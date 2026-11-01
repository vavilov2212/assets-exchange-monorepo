import { z } from 'zod';

/** Тело POST /auth/login */
export const LoginBodySchema = z.object({
    email: z.string().email().trim().toLowerCase(),
    password: z.string().trim(),
    keepMeSignedIn: z.boolean(),
});

export type LoginBody = z.infer<typeof LoginBodySchema>;
export type LoginBodyInput = z.input<typeof LoginBodySchema>;