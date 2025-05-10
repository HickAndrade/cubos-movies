import { useEffect, useState } from "react"
import type { Movie } from "../../types/Movie"
import { movieService } from "../../services/movieService"
import { MovieCard } from "./MovieCard"

function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    async function fetchMovies() {
        const res = await movieService.getAll({ page })

        setMovies(res.data)
        setTotalPages(res.lastPage)
    }

    useEffect(() => {
        fetchMovies();
    }, [page])

    return (
        <div className="
        p-6 grid 
        grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-6
        rounded 
        bg-mauve-alpha-3
        backdrop-blur-[2px]
        
        ">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )
}

export default MovieList