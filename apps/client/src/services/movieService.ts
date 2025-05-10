import type { CreateMovieData } from "../schemas/createMovie.schema"
import type { Movie } from "../types/Movie"
import { api } from "./api"

interface GetMoviesParams {
  search?: string
  startDate?: string
  endDate?: string
  minDuration?: number
  maxDuration?: number
  language?: string
  page?: number
  limit?: number
}

interface GetMoviesResponse {
    data: Movie[]
    total: number
    page: number
    lastPage: number
}

export const movieService = {
    async getAll(params?: GetMoviesParams): Promise<GetMoviesResponse> {
        const movies = await api.get<GetMoviesResponse>('/movies', { params })

        return movies.data;
    },

    async getById(id: number): Promise<Movie> {
        const res = await api.get(`/movies/${id}`)
        return res.data
      },

      async create(data: CreateMovieData): Promise<Movie> {
        const res = await api.post("/movies", data)
        return res.data
      },

      async update(id: number, data: Partial<CreateMovieData>): Promise<Movie> {
        const res = await api.patch(`/movies/${id}`, data)
        return res.data
      },

      async delete(id: number): Promise<void> {
        await api.delete(`/movies/${id}`)
      }
}