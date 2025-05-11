import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { Movie, MovieListRef } from "../../types/Movie";
import type { FilterMovieData } from "../../schemas/filterMovie.schema";
import { movieService } from "../../services/movieService";
import { MovieCard } from "./MovieCard";
import { Pagination } from "../ui/Pagination";

interface MovieListProps {
  filterText: string;
  filters: FilterMovieData;
}
const MovieList = forwardRef<MovieListRef, MovieListProps>(({ filterText, filters }, ref) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchMovies() {
    setLoading(true);
    try {
      const res = await movieService.getAll({
        page,
        search: filterText || undefined,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        minDuration: filters.minDuration ? Number(filters.minDuration) : undefined,
        maxDuration: filters.maxDuration ? Number(filters.maxDuration) : undefined,
        language: filters.language || undefined,
      });

      setMovies(res.data);
      setTotalPages(res.lastPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useImperativeHandle(ref, () => ({
    refetch: fetchMovies,
  }));

  useEffect(() => {
    fetchMovies();
  }, [
    page,
    filterText,
    filters.startDate,
    filters.endDate,
    filters.minDuration,
    filters.maxDuration,
    filters.language,
  ]);

  return (
    <div className="bg-yellow">
      {!loading && movies.length === 0 && <p>Nenhum filme encontrado.</p>}
      <div className="p-6 min-h-[782px] 
      grid justify-center 
      min-[430px]:grid-cols-2 
      sm:grid-cols-2
      md:grid-cols-3 
      lg:grid-cols-4 
      xl:grid-cols-5 
      gap-6 rounded bg-mauve-alpha-3 backdrop-blur-[2px]">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
});

export default MovieList;