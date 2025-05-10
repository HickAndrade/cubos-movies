import { z } from "zod"

export const createMovieSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  originalTitle: z.string().min(1, "Título original é obrigatório"),
  description: z.string().min(10, "Descrição deve ter ao menos 10 caracteres"),
  releaseDate: z.string().min(1, "Data de lançamento é obrigatória"),
  duration: z.coerce.number().positive("Duração deve ser positiva"),
  language: z.string().min(1, "Idioma é obrigatório"),
  status: z.string().min(1, "Status é obrigatório"),
  genres: z.array(z.string()).min(1, "Informe ao menos um gênero"),
  budget: z.coerce.number().min(0),
  revenue: z.coerce.number().min(0),
  coverImageUrl: z.string().url("URL inválida").optional(),
  trailerUrl: z.string().url("URL inválida").optional()
})

export type CreateMovieData = z.infer<typeof createMovieSchema>
