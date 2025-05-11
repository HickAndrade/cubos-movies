import type { CreateMovieData, RawMovieFormData } from "../schemas/createMovie.schema"
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

      async create(data: RawMovieFormData, file?: File): Promise<Movie> {
        const form = new FormData()

        Object.entries(data).forEach(([key, value]) => {
            if (key === "coverImageFile") return
            form.append(key, String(value))
          })
        
          if (file) {
            form.append("file", file)
          }
        
          const res = await api.post("/movies", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })

        return res.data
      },

      async update(id: number, data: Partial<CreateMovieData>): Promise<Movie> {
        const res = await api.patch(`/movies/${id}`, data)
        return res.data
      },

      async delete(id: number): Promise<void> {
        await api.delete(`/movies/${id}`)
      },

      async findLanguages(): Promise<string[]>{
        const languages = await api.get('/movies/languages')

        return languages.data;
      },

      async findGenres(): Promise<string[]> {
        const genres = await api.get('/movies/genres')

        return genres.data;
      },

      async sendCover(id: number, file: File){
        const form = new FormData()

        form.append('file', file)

        const res = await api.post(`/movies/${id}/cover`, form, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return res.data;
      }
}