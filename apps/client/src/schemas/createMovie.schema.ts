import { z } from "zod"

export const createMovieSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  originalTitle: z.string().min(1, "Título original é obrigatório"),
  description: z.string().min(10, "Descrição deve ter ao menos 10 caracteres"),
  tagline: z.string().max(1000).optional(),
  popularity: z.coerce.number().min(0, "Popularidade deve ser positiva"),
  voteCount: z.coerce.number().int().min(0, "Número de votos deve ser positivo"),
  releaseDate: z.string().min(1, "Data de lançamento é obrigatória"),
  duration: z.coerce.number().int().positive("Duração deve ser positiva"),
  status: z.string().min(1, "Status é obrigatório"),
  language: z.string().min(1, "Idioma é obrigatório"),
  budget: z.coerce.number().min(0),
  revenue: z.coerce.number().min(0),
  genres: z
    .string()
    .transform((val) =>
      val
        .split(',')
        .map((g) => g.trim())
        .filter((g) => g.length > 0)
    )
    .refine((arr) => arr.length > 0, {
      message: "Informe ao menos um gênero",
    }),
    coverImageFile: z
    .any()
    .transform((files) =>
        files instanceof FileList && files.length > 0 ? files[0] : null
    )
    .refine((file) => file instanceof File, {
        message: "É preciso escolher uma imagem",
    }),
  trailerUrl: z.string().url("URL inválida").optional(),
})

export type CreateMovieData = z.infer<typeof createMovieSchema>
export type RawMovieFormData = z.input<typeof createMovieSchema>
