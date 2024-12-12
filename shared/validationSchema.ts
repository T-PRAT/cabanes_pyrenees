import { z } from 'zod'

export const loginSchema = z.object({
   username: z
      .string()
      .min(3, { message: "Le nom d'utilisateur doit contenir au moins 3 caractères" })
      .max(31, { message: "Le nom d'utilisateur ne doit pas dépasser 31 caractères" })
      .regex(/^[a-zA-Z0-9_]+$/, { message: "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres et des underscores" }),
   password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }).max(24, { message: 'Le mot de passe ne doit pas dépasser 24 caractères' }),
})

export const signupSchema = z.object({
   username: z
      .string()
      .min(3, { message: "Le nom d'utilisateur doit contenir au moins 3 caractères" })
      .max(31, { message: "Le nom d'utilisateur ne doit pas dépasser 31 caractères" })
      .regex(/^[a-zA-Z0-9_]+$/, { message: "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres et des underscores" }),
   email: z.string().email({ message: "L'adresse email n'est pas valide" }),
   password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }).max(24, { message: 'Le mot de passe ne doit pas dépasser 24 caractères' }),
})

export const hutSchema = z.object({
   name: z.string().min(3, { message: 'Le nom doit contenir au moins 3 caractères' }).max(255, { message: 'Le nom ne doit pas dépasser 255 caractères' }),
   description: z.string().max(1000, { message: 'La description ne doit pas dépasser 1000 caractères' }),
   summerCapacity: z.number().int().min(0, { message: 'La capacité été doit être au moins 0' }),
   winterCapacity: z.number().int().min(0, { message: 'La capacité hiver doit être au moins 0' }),
   altitude: z.number().int().min(0, { message: "L'altitude doit être au moins 0" }).max(3404, { message: "L'altitude ne doit pas dépasser 3404 mètres" }),
   latitude: z.string().regex(/^-?([1-8]?[0-9](\.\d+)?|90(\.0+)?)/, { message: "La latitude n'est pas valide" }),
   longitude: z.string().regex(/^-?((1[0-7][0-9]|[1-9]?[0-9])(\.\d+)?|180(\.0+)?)/, { message: "La longitude n'est pas valide" }),
   userId: z.number().int({ message: "L'ID utilisateur doit être un nombre entier" }),
})
