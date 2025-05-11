import type { Movie } from "../types/Movie";
import VoteAverage from "./movies/VoteAverage";


interface Props {
  movie: Movie;
}

export function MovieStats({ movie }: Props) {
  const hours = Math.floor(movie.duration / 60);
  const mins = movie.duration % 60;
  const formattedDuration = `${hours}h ${mins}m`;

  return (
    <div className="flex font-montserrat flex-wrap gap-6 mt-4 w-1/2 items-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
        <div className="bg-gray-800/70 rounded-md p-4">
          <p className="text-[10px] uppercase text-gray-300">Popularidade</p>
          <p className="mt-1 text-sm font-semibold text-white">
            {movie.popularity}
          </p>
        </div>

        <div className="bg-gray-800/70 rounded-md p-4">
          <p className="text-[10px] uppercase text-gray-300">Votos</p>
          <p className="mt-1 text-sm font-semibold text-white">
            {movie.voteCount}
          </p>
        </div>

        <div className="bg-gray-800/70 rounded-md p-4">
          <p className="text-[10px] uppercase text-gray-300">Lançamento</p>
          <p className="mt-1 text-sm font-semibold text-white">
            {movie.releaseDate}
          </p>
        </div>

    
        <div className="bg-gray-800/70 rounded-md p-4">
          <p className="text-[10px] uppercase text-gray-300">Duração</p>
          <p className="mt-1 text-sm font-semibold text-white">
            {formattedDuration}
          </p>
        </div>

        
        <div className="bg-gray-800/70 rounded-md p-4">
          <p className="text-[10px] uppercase text-gray-300">Situação</p>
          <p className="mt-1 text-sm font-semibold text-white">
            {movie.status}
          </p>
        </div>

        <div className="bg-gray-800/70 rounded-md p-4">
          <p className="text-[10px] uppercase text-gray-300">Idioma</p>
          <p className="mt-1 text-sm font-semibold text-white">
            {movie.language}
          </p>
        </div>

        <div className="bg-gray-800/70 rounded-md p-4">
          <p className="text-[10px] uppercase text-gray-300">Orçamento</p>
          <p className="mt-1 text-sm font-semibold text-white">
            ${movie.budget}M
          </p>
        </div>

        <div className="bg-gray-800/70 rounded-md p-4">
          <p className="text-[10px] uppercase text-gray-300">Receita</p>
          <p className="mt-1 text-sm font-semibold text-white">
            ${movie.revenue}M
          </p>
        </div>

        
        <div className="bg-gray-800/70 rounded-md p-4">
          <p className="text-[10px] uppercase text-gray-300">Lucro</p>
          <p className="mt-1 text-sm font-semibold text-white">
            ${movie.revenue - movie.budget}M
          </p>
        </div>
      </div>

      {movie.voteAverage != null && (
        <div className="w-20 h-20">
          <VoteAverage voteAverage={movie.voteAverage} />
        </div>
      )}
    </div>
  );
}
