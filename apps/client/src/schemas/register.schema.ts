import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, 'Nome obrigatório'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Minímo 6 caracteres'),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não são iguais.'
})

export type RegisterData = z.infer<typeof registerSchema>;