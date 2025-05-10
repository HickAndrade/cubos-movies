export interface Movie {
    id: number
    title: string
    originalTitle: string
    description: string
    tagline?: string
    popularity?: number
    voteCount?: number
    voteAverage?: number
    releaseDate: string
    duration: number
    status: string
    language: string
    budget: number
    revenue: number
    genres: string[]
    coverImageUrl?: string
    trailerUrl?: string
    notified: boolean
  }
  