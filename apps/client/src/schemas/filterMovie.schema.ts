import { z } from "zod"

export const filterMovieSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  minDuration: z.string().optional(), 
  maxDuration: z.string().optional(),
  language: z.string().optional(),
  genres: z.string().optional(),

})

export type FilterMovieData = z.infer<typeof filterMovieSchema>
