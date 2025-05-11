import { useEffect, useState } from "react"
import type { Movie } from "../types/Movie"
import { movieService } from "../services/movieService"
import { MovieInfoContent } from "../components/movie/MovieInfoContent"
import { useParams } from "react-router-dom"
import EditMovieDrawer from "../components/movie/EditMovieDrawer"
import { DeleteMovieModal } from "../components/movie/DeleteMovieModal"

export default function MoviePage() {
    const { id } = useParams<{ id: string }>()

    const [movie, setMovie] = useState<Movie | null>(null)
    const [loading, setLoading] = useState(true)
    const [editMovie, setEditMovie] = useState(false);
    const [deleteMovie, setDeleteMovie] = useState(false);

    async function refetchMovie() {
        if(editMovie) setEditMovie(false);
        if (!id) return;
        setLoading(true);
        try {
          const data = await movieService.getById(id);
          setMovie(data);
        } catch (err) {
          console.error("Erro ao buscar filme", err);
        } finally {
          setLoading(false);
        }
      }
      
    useEffect(() => {
        refetchMovie();
    }, [id])

    if (loading) return <p className="text-white p-4">Carregando...</p>
    if (!movie) return <p className="text-white p-4">Filme não encontrado.</p>

    return (
        <>
            <EditMovieDrawer
                id={id!}
                initialValues={movie}
                isOpen={editMovie}
                onUpdated={refetchMovie}
                onClose={() => { setEditMovie(false) }}
            />
            <DeleteMovieModal
                id={id!}
                isOpen={deleteMovie} 
                onClose={() => setDeleteMovie(false)}
            />
            <MovieInfoContent
                movie={movie}
                onEdit={() => setEditMovie(true)}
                onDelete={() => setDeleteMovie(true)}
            />
        </>
    )
}