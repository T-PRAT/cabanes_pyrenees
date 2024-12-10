import { z } from 'zod'

export const loginSchema = z.object({
   username: z
      .string()
      .min(3)
      .max(31)
      .regex(/^[a-zA-Z0-9_]+$/),
   password: z.string().min(8).max(24),
})

export const signupSchema = z.object({
   username: z
      .string()
      .min(3)
      .max(31)
      .regex(/^[a-zA-Z0-9_]+$/),
   email: z.string().email(),
   password: z.string().min(8).max(24),
})
