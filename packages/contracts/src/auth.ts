import { z } from 'zod';

/** Тело POST /auth/login */
export const LoginBodySchema = z.object({});
export type LoginBody = z.infer<typeof LoginBodySchema>;