import { z } from "zod";

/** Тело POST /auth/login */
export const LoginBodySchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(128),
  keepMeSignedIn: z.boolean().default(false),
});

export type LoginBody = z.infer<typeof LoginBodySchema>;
export type LoginBodyInput = z.input<typeof LoginBodySchema>;
